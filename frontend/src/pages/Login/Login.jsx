import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs = {};
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!validateEmail(form.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!form.password) {
      errs.password = "Password is required.";
    } else if (form.password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  const [authError, setAuthError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setAuthError("");
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("nw_auth", "true");
      localStorage.setItem("nw_token", res.data.access_token);
      navigate("/");
    } catch (err) {
      setAuthError(
        err.response?.data?.detail || "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-12 relative overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl" />

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
            NextWatch
          </span>
        </Link>

        {/* Center content */}
        <div className="z-10">
          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            Your personal<br />
            <span className="text-cyan-400">movie universe</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-10">
            Discover, track, and get AI-powered recommendations tailored just for you.
          </p>

          {/* Feature list */}
          <div className="space-y-4">
            {[
              { icon: "🤖", title: "ML Recommendations", desc: "Smart picks based on your taste" },
              { icon: "❤️", title: "Personal Watchlist", desc: "Save movies to watch later" },
              { icon: "⭐", title: "Rate & Review", desc: "Share your opinions with the world" },
            ].map((f) => (
              <div key={f.title} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl shrink-0">
                  {f.icon}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{f.title}</p>
                  <p className="text-slate-500 text-xs">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <p className="text-slate-600 text-xs z-10">© 2025 NextWatch · All rights reserved</p>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link to="/" className="flex items-center justify-center gap-2 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 ml-0.5">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              NextWatch
            </span>
          </Link>

          <h1 className="text-3xl font-black text-white mb-1">Welcome back</h1>
          <p className="text-slate-500 text-sm mb-8">Sign in to continue to NextWatch</p>

          {/* Google */}
          <button
            type="button"
            onClick={() => alert("Google OAuth will be connected with backend. Coming soon!")}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold py-3.5 px-4 rounded-xl text-sm transition-all duration-200 hover:scale-[1.01] shadow-md mb-6 relative"
          >
            <svg viewBox="0 0 48 48" className="w-5 h-5 shrink-0">
              <path fill="#FFC107" d="M43.6 20H24v8h11.1C33.5 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.4-4z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.1 0-9.4-3.3-11-7.9l-6.5 5C9.9 39.8 16.4 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20H24v8h11.1c-.8 2.3-2.3 4.2-4.3 5.5l6.2 5.2C40.9 35.4 44 30.1 44 24c0-1.3-.1-2.7-.4-4z"/>
            </svg>
            Continue with Google
            <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-200 text-slate-500 text-xs font-semibold px-2 py-0.5 rounded-full">Soon</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-slate-600 text-xs font-medium">or continue with email</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {/* Auth error banner */}
          {authError && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
              </svg>
              {authError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Email address</label>
              <div className={`flex items-center bg-slate-800/60 border rounded-xl px-4 py-3.5 transition-all duration-200
                ${errors.email
                  ? "border-red-500/70 ring-1 ring-red-500/20 bg-red-500/5"
                  : "border-slate-700 focus-within:border-cyan-500/70 focus-within:ring-2 focus-within:ring-cyan-500/15 focus-within:bg-slate-800"}`}>
                <FaEnvelope className={`mr-3 shrink-0 ${errors.email ? "text-red-400" : "text-slate-500"}`} size={15} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="bg-transparent outline-none text-white w-full placeholder:text-slate-600 text-sm"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 shrink-0"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-slate-300 text-sm font-semibold">Password</label>
                <Link to="/forgot-password" className="text-cyan-400 text-xs hover:text-cyan-300 transition-colors font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className={`flex items-center bg-slate-800/60 border rounded-xl px-4 py-3.5 transition-all duration-200
                ${errors.password
                  ? "border-red-500/70 ring-1 ring-red-500/20 bg-red-500/5"
                  : "border-slate-700 focus-within:border-cyan-500/70 focus-within:ring-2 focus-within:ring-cyan-500/15 focus-within:bg-slate-800"}`}>
                <FaLock className={`mr-3 shrink-0 ${errors.password ? "text-red-400" : "text-slate-500"}`} size={14} />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="bg-transparent outline-none text-white w-full placeholder:text-slate-600 text-sm"
                />
                <button type="button" onClick={() => setShowPass((v) => !v)}
                  className="ml-2 text-slate-500 hover:text-slate-300 transition-colors shrink-0">
                  {showPass ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 shrink-0"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-400 hover:bg-cyan-300 disabled:opacity-60 text-slate-950 font-bold py-3.5 rounded-xl text-sm transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Signing in...
                </>
              ) : "Sign In →"}
            </button>

          </form>

          <p className="text-center text-slate-500 text-sm mt-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
              Create one for free
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
