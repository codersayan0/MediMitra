from typing import Generic, Optional, TypeVar
from pydantic import BaseModel

T = TypeVar("T")


class ApiResponse(BaseModel, Generic[T]):
    """Matches the frontend's ApiResponse<T> shape exactly: {success, data?, message?}."""

    success: bool
    data: Optional[T] = None
    message: Optional[str] = None