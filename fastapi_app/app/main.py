from fastapi import FastAPI

from .routers import managers, tokens, products, conversations

app = FastAPI(title="Niko Sale API")

app.include_router(managers.router)
app.include_router(tokens.router)
app.include_router(products.router)
app.include_router(conversations.router)
