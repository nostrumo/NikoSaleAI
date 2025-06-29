from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from . import models, schemas

class ManagerCRUD:
    """CRUD операции для менеджеров."""

    @staticmethod
    async def create(session: AsyncSession, data: schemas.ManagerCreate) -> models.Manager:
        manager = models.Manager(**data.dict())
        session.add(manager)
        await session.commit()
        await session.refresh(manager)
        return manager

    @staticmethod
    async def get_list(session: AsyncSession) -> list[models.Manager]:
        result = await session.execute(select(models.Manager))
        return result.scalars().all()

    @staticmethod
    async def get(session: AsyncSession, manager_id: int) -> models.Manager | None:
        result = await session.execute(select(models.Manager).where(models.Manager.id == manager_id))
        return result.scalar_one_or_none()

    @staticmethod
    async def delete(session: AsyncSession, manager_id: int) -> None:
        manager = await ManagerCRUD.get(session, manager_id)
        if manager:
            await session.delete(manager)
            await session.commit()

class TokenCRUD:
    """CRUD для токенов маркетплейсов."""

    @staticmethod
    async def add(session: AsyncSession, data: schemas.MarketplaceTokenCreate) -> models.MarketplaceToken:
        token = models.MarketplaceToken(**data.dict())
        session.add(token)
        await session.commit()
        await session.refresh(token)
        return token

    @staticmethod
    async def delete(session: AsyncSession, store_id: int, service_name: str) -> None:
        result = await session.execute(
            select(models.MarketplaceToken).where(
                models.MarketplaceToken.store_id == store_id,
                models.MarketplaceToken.service_name == service_name,
            )
        )
        token = result.scalar_one_or_none()
        if token:
            await session.delete(token)
            await session.commit()

    @staticmethod
    async def list(session: AsyncSession, store_id: int) -> list[models.MarketplaceToken]:
        result = await session.execute(
            select(models.MarketplaceToken).where(models.MarketplaceToken.store_id == store_id)
        )
        return result.scalars().all()

class ProductCRUD:
    """CRUD для продуктов."""

    @staticmethod
    async def create(session: AsyncSession, data: schemas.ProductCreate, image_keys: list[str]) -> models.Product:
        product = models.Product(
            title=data.title,
            description=data.description,
            specifications=data.specifications,
            marketplaces=data.marketplaces,
            image_keys=image_keys,
        )
        session.add(product)
        await session.commit()
        await session.refresh(product)
        return product

    @staticmethod
    async def get(session: AsyncSession, product_id: int) -> models.Product | None:
        result = await session.execute(select(models.Product).where(models.Product.id == product_id))
        return result.scalar_one_or_none()

    @staticmethod
    async def list(session: AsyncSession) -> list[models.Product]:
        result = await session.execute(select(models.Product))
        return result.scalars().all()

class ConversationCRUD:
    """CRUD для сообщений переписки."""

    @staticmethod
    async def add_message(session: AsyncSession, data: schemas.ConversationMessageCreate) -> models.ConversationMessage:
        msg = models.ConversationMessage(
            external_id=data.external_id,
            product_id=data.product,
            text=data.text,
            marketplace=data.marketplace,
            from_manager=data.from_manager,
        )
        session.add(msg)
        await session.commit()
        await session.refresh(msg)
        return msg

    @staticmethod
    async def get_by_external_id(session: AsyncSession, external_id: str) -> list[models.ConversationMessage]:
        result = await session.execute(
            select(models.ConversationMessage).where(models.ConversationMessage.external_id == external_id)
        )
        return result.scalars().all()
