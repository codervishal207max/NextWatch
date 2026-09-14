from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.schemas.movie import MovieOut
from app.api.deps import get_current_user
from app.models.user import User
from app.models.movie import Movie
from app.models.watchlist import Watchlist

router = APIRouter(prefix="/api/recommendations", tags=["Recommendations"])

@router.get("/", response_model=List[MovieOut])
def get_recommendations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    ML Recommendation endpoint.
    TODO: Replace with ML model inference once model is trained.
    Currently returns top rated movies not in user's watchlist.
    """
    # Get user's watchlist movie IDs
    watchlist_ids = [
        w.movie_id for w in db.query(Watchlist).filter(
            Watchlist.user_id == current_user.id
        ).all()
    ]

    # Return top rated movies not in watchlist
    query = db.query(Movie).order_by(Movie.rating.desc())
    if watchlist_ids:
        query = query.filter(Movie.id.notin_(watchlist_ids))

    return query.limit(12).all()


@router.post("/ml-predict")
def ml_predict(movie_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """
    ML Model inference hook.
    Tumhara trained model yahan call hoga.
    Input: movie_id (user ne jo dekha)
    Output: list of recommended movie IDs
    """
    # TODO: import your trained model here
    # from ml.inference.predictor import get_recommendations
    # recommended_ids = get_recommendations(movie_id, current_user.id)

    # Placeholder — returns similar genre movies
    source = db.query(Movie).filter(Movie.id == movie_id).first()
    if not source:
        raise HTTPException(status_code=404, detail="Movie not found")

    similar = db.query(Movie).filter(
        Movie.genres.ilike(f"%{source.genres.split(',')[0]}%"),
        Movie.id != movie_id
    ).order_by(Movie.rating.desc()).limit(8).all()

    return similar
