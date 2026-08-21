import Navbar from "../../components/layout/Navbar";
import { FaUser, FaHeart, FaStar, FaFilm } from "react-icons/fa";

function Profile() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Profile Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">

          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-cyan-500 flex items-center justify-center text-white shrink-0 ring-4 ring-cyan-400/30">
            <FaUser size={36} />
          </div>

          {/* Info */}
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-black text-white">Vishal</h1>
            <p className="text-slate-400 text-sm mt-1">vishal@nextwatch.com</p>
            <p className="text-slate-600 text-xs mt-2">Member since July 2025</p>
            <button className="mt-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-5 py-2 rounded-lg text-sm transition-all duration-200">
              Edit Profile
            </button>
          </div>

          {/* Stats */}
          <div className="sm:ml-auto flex gap-6 text-center">
            <div>
              <div className="text-2xl font-black text-cyan-400">24</div>
              <div className="text-slate-500 text-xs mt-1">Watched</div>
            </div>
            <div>
              <div className="text-2xl font-black text-cyan-400">3</div>
              <div className="text-slate-500 text-xs mt-1">Watchlist</div>
            </div>
            <div>
              <div className="text-2xl font-black text-cyan-400">12</div>
              <div className="text-slate-500 text-xs mt-1">Reviews</div>
            </div>
          </div>

        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center gap-4 hover:border-cyan-400/40 transition-all duration-200">
            <FaHeart className="text-cyan-400 text-2xl shrink-0" />
            <div>
              <div className="text-white font-bold">My Watchlist</div>
              <div className="text-slate-500 text-xs mt-0.5">3 movies saved</div>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center gap-4 hover:border-cyan-400/40 transition-all duration-200">
            <FaStar className="text-yellow-400 text-2xl shrink-0" />
            <div>
              <div className="text-white font-bold">My Ratings</div>
              <div className="text-slate-500 text-xs mt-0.5">12 movies rated</div>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center gap-4 hover:border-cyan-400/40 transition-all duration-200">
            <FaFilm className="text-cyan-400 text-2xl shrink-0" />
            <div>
              <div className="text-white font-bold">Watch History</div>
              <div className="text-slate-500 text-xs mt-0.5">24 movies watched</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;
