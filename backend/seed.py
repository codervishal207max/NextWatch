"""
Seed script — loads Indian + Hollywood movies into the database.
Run: python seed.py
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.database import SessionLocal, engine
from app.models.movie import Movie
from app.db.database import Base

Base.metadata.create_all(bind=engine)

MOVIES = [
    # ── Bollywood / Indian ──────────────────────────────────────────
    {"tmdb_id": 19404,  "title": "Dilwale Dulhania Le Jayenge", "year": 1995, "rating": 8.1, "genres": "Romance,Drama",        "popularity": 95.0, "overview": "A young man and woman fall in love on a trip through Europe, but the girl's father has arranged her marriage to someone else."},
    {"tmdb_id": 346698, "title": "Bahubali: The Beginning",     "year": 2015, "rating": 8.0, "genres": "Action,Drama",         "popularity": 98.0, "overview": "A young man raised in the mountains discovers his royal heritage and joins a rebellion to reclaim his kingdom."},
    {"tmdb_id": 407436, "title": "Dangal",                      "year": 2016, "rating": 8.4, "genres": "Drama,Sport",          "popularity": 97.0, "overview": "Former wrestler Mahavir Singh Phogat trains his daughters to become world-class wrestlers."},
    {"tmdb_id": 338189, "title": "PK",                          "year": 2014, "rating": 8.1, "genres": "Comedy,Drama",         "popularity": 94.0, "overview": "An alien on Earth loses his remote control and embarks on a hilarious journey to retrieve it."},
    {"tmdb_id": 161687, "title": "3 Idiots",                    "year": 2009, "rating": 8.4, "genres": "Comedy,Drama",         "popularity": 96.0, "overview": "Two friends search for their lost companion while recalling their college days and the lessons they learned."},
    {"tmdb_id": 297762, "title": "Bajrangi Bhaijaan",           "year": 2015, "rating": 8.0, "genres": "Drama,Adventure",      "popularity": 93.0, "overview": "A devoted man takes it upon himself to return a lost mute Pakistani girl to her homeland."},
    {"tmdb_id": 110120, "title": "Lagaan",                      "year": 2001, "rating": 8.1, "genres": "Drama,Sport,History",  "popularity": 90.0, "overview": "In Victorian India, a small village challenges British rulers to a cricket match to avoid paying taxes."},
    {"tmdb_id": 443130, "title": "Andhadhun",                   "year": 2018, "rating": 8.3, "genres": "Thriller,Crime",       "popularity": 92.0, "overview": "A series of events changes the life of a blind pianist who witnesses the murder of a film actor."},
    {"tmdb_id": 474353, "title": "Gully Boy",                   "year": 2019, "rating": 7.9, "genres": "Drama,Music",          "popularity": 88.0, "overview": "A young man from the Mumbai slums rises to become a rap star."},
    {"tmdb_id": 590223, "title": "Article 15",                  "year": 2019, "rating": 8.1, "genres": "Crime,Drama,Thriller", "popularity": 87.0, "overview": "A police officer investigates the disappearance of two young Dalit girls in a small town."},
    {"tmdb_id": 400928, "title": "Uri: The Surgical Strike",    "year": 2019, "rating": 8.2, "genres": "Action,War,Drama",     "popularity": 91.0, "overview": "The Indian Army plans a covert operation in retaliation for a terrorist attack on its base."},
    {"tmdb_id": 556574, "title": "Shershaah",                   "year": 2021, "rating": 8.4, "genres": "Action,Drama,War",     "popularity": 93.0, "overview": "The story of Param Vir Chakra awardee Captain Vikram Batra who sacrificed his life in the Kargil War."},
    {"tmdb_id": 585511, "title": "RRR",                         "year": 2022, "rating": 7.8, "genres": "Action,Drama",         "popularity": 96.0, "overview": "A fictional tale of two real legendary heroes and their journey away from home before they took on the British Empire."},
    {"tmdb_id": 675353, "title": "KGF: Chapter 2",              "year": 2022, "rating": 8.2, "genres": "Action,Crime,Drama",   "popularity": 95.0, "overview": "Rocky's massive stature makes him an indomitable force as he sets out to take control of Kolar Gold Fields."},
    {"tmdb_id": 763188, "title": "Pathaan",                     "year": 2023, "rating": 5.9, "genres": "Action,Thriller",      "popularity": 89.0, "overview": "An exiled spy returns to save India from a massive terrorist plot."},
    {"tmdb_id": 855292, "title": "Jawan",                       "year": 2023, "rating": 6.8, "genres": "Action,Thriller",      "popularity": 91.0, "overview": "A man is driven by a personal vendetta to rectify the wrongs in society."},
    {"tmdb_id": 891699, "title": "Animal",                      "year": 2023, "rating": 7.4, "genres": "Action,Crime,Drama",   "popularity": 90.0, "overview": "A son's obsessive love for his father turns violent when his family is threatened."},
    {"tmdb_id": 213121, "title": "Queen",                       "year": 2014, "rating": 8.2, "genres": "Drama,Comedy",         "popularity": 88.0, "overview": "A Delhi girl from a conservative family sets out on a solo honeymoon after her engagement is called off."},
    {"tmdb_id": 376867, "title": "Masaan",                      "year": 2015, "rating": 8.1, "genres": "Drama,Romance",        "popularity": 82.0, "overview": "Two love stories set in Varanasi depict the intersection of caste, love and society."},
    {"tmdb_id": 339964, "title": "Dil Dhadakne Do",             "year": 2015, "rating": 7.3, "genres": "Drama,Comedy",         "popularity": 83.0, "overview": "A dysfunctional family comes to terms with their issues during a Mediterranean cruise."},

    # ── Hollywood ───────────────────────────────────────────────────
    {"tmdb_id": 27205,  "title": "Inception",           "year": 2010, "rating": 8.8, "genres": "Sci-Fi,Thriller,Action",   "popularity": 99.0, "overview": "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea."},
    {"tmdb_id": 155,    "title": "The Dark Knight",     "year": 2008, "rating": 9.0, "genres": "Action,Crime,Drama",       "popularity": 100.0,"overview": "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and DA Harvey Dent."},
    {"tmdb_id": 157336, "title": "Interstellar",        "year": 2014, "rating": 8.6, "genres": "Sci-Fi,Drama,Adventure",   "popularity": 98.0, "overview": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."},
    {"tmdb_id": 13,     "title": "Forrest Gump",        "year": 1994, "rating": 8.8, "genres": "Drama,Romance,Comedy",     "popularity": 97.0, "overview": "The presidencies of Kennedy and Johnson through the eyes of an Alabama man with an IQ of 75."},
    {"tmdb_id": 680,    "title": "Pulp Fiction",        "year": 1994, "rating": 8.9, "genres": "Crime,Thriller,Drama",     "popularity": 96.0, "overview": "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence."},
    {"tmdb_id": 129,    "title": "Spirited Away",       "year": 2001, "rating": 8.6, "genres": "Animation,Adventure",      "popularity": 95.0, "overview": "A young girl wanders into a world ruled by gods, witches, and spirits where humans are changed into beasts."},
    {"tmdb_id": 550,    "title": "Fight Club",          "year": 1999, "rating": 8.8, "genres": "Drama,Thriller",           "popularity": 97.0, "overview": "An insomniac office worker forms an underground fight club with a soap salesman."},
    {"tmdb_id": 238,    "title": "The Godfather",       "year": 1972, "rating": 9.2, "genres": "Crime,Drama",              "popularity": 98.0, "overview": "An aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son."},
    {"tmdb_id": 278,    "title": "The Shawshank Redemption","year":1994,"rating": 9.3,"genres": "Drama,Crime",             "popularity": 99.0, "overview": "Two imprisoned men bond over years, finding solace and redemption through acts of common decency."},
    {"tmdb_id": 475557, "title": "Joker",               "year": 2019, "rating": 8.4, "genres": "Crime,Drama,Thriller",     "popularity": 96.0, "overview": "A failed comedian is driven to insanity and becomes the criminal mastermind known as the Joker."},
    {"tmdb_id": 496243, "title": "Parasite",            "year": 2019, "rating": 8.5, "genres": "Thriller,Drama,Comedy",    "popularity": 95.0, "overview": "Greed and class discrimination threaten the symbiotic relationship between the wealthy Park family and the poor Kim clan."},
    {"tmdb_id": 399579, "title": "Oppenheimer",         "year": 2023, "rating": 8.5, "genres": "Drama,History,Thriller",   "popularity": 97.0, "overview": "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II."},
    {"tmdb_id": 438631, "title": "Dune",                "year": 2021, "rating": 8.0, "genres": "Sci-Fi,Adventure,Drama",   "popularity": 94.0, "overview": "Paul Atreides leads nomadic tribes in a revolt against the galactic emperor."},
    {"tmdb_id": 335984, "title": "Blade Runner 2049",   "year": 2017, "rating": 8.0, "genres": "Sci-Fi,Drama,Mystery",     "popularity": 90.0, "overview": "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard."},
    {"tmdb_id": 603,    "title": "The Matrix",          "year": 1999, "rating": 8.7, "genres": "Sci-Fi,Action",            "popularity": 97.0, "overview": "A computer hacker learns about the true nature of reality and his role in the war against its controllers."},
    {"tmdb_id": 424,    "title": "Schindler's List",    "year": 1993, "rating": 9.0, "genres": "Drama,History,War",        "popularity": 93.0, "overview": "In German-occupied Poland, Oskar Schindler saves the lives of more than a thousand Jewish refugees."},
    {"tmdb_id": 372058, "title": "Your Name",           "year": 2016, "rating": 8.4, "genres": "Animation,Romance,Drama",  "popularity": 91.0, "overview": "Two strangers find themselves linked in a bizarre way when they discover they are swapping bodies."},
    {"tmdb_id": 346364, "title": "It",                  "year": 2017, "rating": 7.3, "genres": "Horror,Drama",             "popularity": 89.0, "overview": "A group of bullied kids band together when a monster, taking the appearance of a clown, begins hunting children."},
    {"tmdb_id": 419430, "title": "Get Out",             "year": 2017, "rating": 7.7, "genres": "Horror,Thriller,Mystery",  "popularity": 88.0, "overview": "A young African-American visits his white girlfriend's family estate where unsettling secrets lurk."},
    {"tmdb_id": 299534, "title": "Avengers: Endgame",  "year": 2019, "rating": 8.4, "genres": "Action,Sci-Fi,Adventure",  "popularity": 100.0,"overview": "After the devastating events of Infinity War, the universe is in ruins. The Avengers assemble once more."},
    {"tmdb_id": 531428, "title": "Portrait of a Lady on Fire","year":2019,"rating":8.1,"genres":"Romance,Drama",          "popularity": 80.0, "overview": "On an isolated island in Brittany, a female painter falls in love with her reluctant subject."},
]

def seed():
    db = SessionLocal()
    try:
        existing = db.query(Movie).count()
        if existing > 0:
            print(f"✅ Database already has {existing} movies. Skipping seed.")
            return

        for m in MOVIES:
            movie = Movie(**m, poster_path=None)
            db.add(movie)
        db.commit()
        print(f"✅ Seeded {len(MOVIES)} movies successfully!")
    except Exception as e:
        db.rollback()
        print(f"❌ Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed()
