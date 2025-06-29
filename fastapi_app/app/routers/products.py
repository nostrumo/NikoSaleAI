from fastapi import HTTPException, APIRouter, Depends, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession

from .. import schemas, crud
from ..database import get_session
from ..storage import MinioStorage

router = APIRouter(prefix="/api/products", tags=["products"])

storage = MinioStorage()

@router.post("/", response_model=schemas.ProductRead)
async def create_product(
    title: str,
    description: str | None = None,
    specifications: str | None = None,
    marketplaces: list[str] | None = None,
    images: list[UploadFile] | None = File(None),
    session: AsyncSession = Depends(get_session),
):
    """Создаёт продукт с загрузкой изображений в MinIO."""
    files_data = [await f.read() for f in images] if images else []
    keys = storage.upload_files(files_data) if files_data else []
    data = schemas.ProductCreate(
        title=title,
        description=description,
        specifications=specifications,
        marketplaces=marketplaces,
    )
    product = await crud.ProductCRUD.create(session, data, keys)
    return product

@router.get("/{product_id}", response_model=schemas.ProductRead)
async def get_product(product_id: int, session: AsyncSession = Depends(get_session)):
    """Получить продукт по ID."""
    product = await crud.ProductCRUD.get(session, product_id)
    if not product:
        raise HTTPException(status_code=404)
    return product

@router.get("/", response_model=list[schemas.ProductRead])
async def list_products(session: AsyncSession = Depends(get_session)):
    """Список продуктов."""
    return await crud.ProductCRUD.list(session)
