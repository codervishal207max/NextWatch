from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.database import get_db
from app.models.movie import Movie
from app.schemas.movie import MovieOut
from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/movies", tags=["Movies"])

@router.get("/", response_model=List[MovieOut])
def get_movies(
    skip: int = 0,
    limit: int = 20,
    genre: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user)
):
    query = db.query(Movie)
    if genre and genre != "All":
        query = query.filter(Movie.genres.ilike(f"%{genre}%"))
    return query.order_by(Movie.popularity.desc()).offset(skip).limit(limit).all()

@router.get("/trending", response_model=List[MovieOut])
def get_trending(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user)
):
    return db.query(Movie).order_by(Movie.popularity.desc()).limit(12).all()

@router.get("/top-rated", response_model=List[MovieOut])
def get_top_rated(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user)
):
    return db.query(Movie).order_by(Movie.rating.desc()).limit(12).all()

@router.get("/search", response_model=List[MovieOut])
def search_movies(
    q: str = Query(..., min_length=1),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user)
):
    return db.query(Movie).filter(Movie.title.ilike(f"%{q}%")).limit(10).all()

@router.get("/{movie_id}", response_model=MovieOut)
def get_movie(
    movie_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user)
):
    movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie
