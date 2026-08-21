import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getPasswordStrength(password) {
  if (!password) return null;
  if (password.length < 6) return { label: "Too short", color: "bg-red-500", width: "w-1/4", text: "text-red-400" };
  if (password.length < 8) return { label: "Weak", color: "bg-orange-400", width: "w-2/4", text: "text-orange-400" };
  if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) return { label: "Fair", color: "bg-yellow-400", width: "w-3/4", text: "text-yellow-400" };
  return { label: "Strong", color: "bg-green-400", width: "w-full", text: "text-green-400" };
}

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const strength = getPasswordStrength(form.password);

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Full name is required.";
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
    if (!form.confirm) {
      errs.confirm = "Please confirm your password.";
    } else if (form.confirm !== form.password) {
      errs.confirm = "Passwords do not match.";
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
      await axios.post("http://localhost:8000/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      // Auto login after register
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("nw_auth", "true");
      localStorage.setItem("nw_token", res.data.access_token);
      navigate("/");
    } catch (err) {
      setAuthError(
        err.response?.data?.detail || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const ErrorMsg = ({ msg }) => msg ? (
    <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5">
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 shrink-0">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
      </svg>
      {msg}
    </p>
  ) : null;

  return (
    <div className="min-h-screen bg-slate-950 flex">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-12 relative overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl" />

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

        {/* Center */}
        <div className="z-10">
          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            Start your<br />
            <span className="text-cyan-400">movie journey</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-10">
            Create your free account and unlock personalized recommendations powered by ML.
          </p>
          <div className="space-y-4">
            {[
              { icon: "🚀", title: "Free forever", desc: "No credit card required" },
              { icon: "🤖", title: "AI-powered picks", desc: "Recommendations that get smarter over time" },
              { icon: "🔒", title: "Secure & private", desc: "Your data stays yours" },
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

        <p className="text-slate-600 text-xs z-10">© 2025 NextWatch · All rights reserved</p>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link to="/" className="flex items-center justify-center gap-2 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 ml-0.5"><path d="M8 5v14l11-7z" /></svg>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">NextWatch</span>
          </Link>

          <h1 className="text-3xl font-black text-white mb-1">Create account</h1>
          <p className="text-slate-500 text-sm mb-8">Join NextWatch for free — no credit card needed</p>

          {/* Auth error */}
          {authError && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
              </svg>
              {authError}
            </div>
          )}

          {/* Google */}
          <button className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold py-3.5 px-4 rounded-xl text-sm transition-all duration-200 hover:scale-[1.01] shadow-md mb-6">
            <svg viewBox="0 0 48 48" className="w-5 h-5 shrink-0">
              <path fill="#FFC107" d="M43.6 20H24v8h11.1C33.5 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.4-4z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.1 0-9.4-3.3-11-7.9l-6.5 5C9.9 39.8 16.4 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20H24v8h11.1c-.8 2.3-2.3 4.2-4.3 5.5l6.2 5.2C40.9 35.4 44 30.1 44 24c0-1.3-.1-2.7-.4-4z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-slate-600 text-xs font-medium">or register with email</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Full Name</label>
              <div className={`flex items-center bg-slate-800/60 border rounded-xl px-4 py-3.5 transition-all duration-200
                ${errors.name ? "border-red-500/70 ring-1 ring-red-500/20 bg-red-500/5" : "border-slate-700 focus-within:border-cyan-500/70 focus-within:ring-2 focus-within:ring-cyan-500/15 focus-within:bg-slate-800"}`}>
                <FaUser className={`mr-3 shrink-0 ${errors.name ? "text-red-400" : "text-slate-500"}`} size={14} />
                <input type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder="Vishal Fulbandhe"
                  className="bg-transparent outline-none text-white w-full placeholder:text-slate-600 text-sm" />
              </div>
              <ErrorMsg msg={errors.name} />
            </div>

            {/* Email */}
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Email address</label>
              <div className={`flex items-center bg-slate-800/60 border rounded-xl px-4 py-3.5 transition-all duration-200
                ${errors.email ? "border-red-500/70 ring-1 ring-red-500/20 bg-red-500/5" : "border-slate-700 focus-within:border-cyan-500/70 focus-within:ring-2 focus-within:ring-cyan-500/15 focus-within:bg-slate-800"}`}>
                <FaEnvelope className={`mr-3 shrink-0 ${errors.email ? "text-red-400" : "text-slate-500"}`} size={15} />
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com"
                  className="bg-transparent outline-none text-white w-full placeholder:text-slate-600 text-sm" />
              </div>
              <ErrorMsg msg={errors.email} />
            </div>

            {/* Password */}
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Password</label>
              <div className={`flex items-center bg-slate-800/60 border rounded-xl px-4 py-3.5 transition-all duration-200
                ${errors.password ? "border-red-500/70 ring-1 ring-red-500/20 bg-red-500/5" : "border-slate-700 focus-within:border-cyan-500/70 focus-within:ring-2 focus-within:ring-cyan-500/15 focus-within:bg-slate-800"}`}>
                <FaLock className={`mr-3 shrink-0 ${errors.password ? "text-red-400" : "text-slate-500"}`} size={14} />
                <input type={showPass ? "text" : "password"} name="password" value={form.password} onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="bg-transparent outline-none text-white w-full placeholder:text-slate-600 text-sm" />
                <button type="button" onClick={() => setShowPass((v) => !v)}
                  className="ml-2 text-slate-500 hover:text-slate-300 transition-colors shrink-0">
                  {showPass ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>
              {/* Strength bar */}
              {form.password && strength && (
                <div className="mt-2.5">
                  <div className="flex gap-1 mb-1">
                    {["w-1/4","w-2/4","w-3/4","w-full"].map((w, i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300
                        ${strength.width === "w-1/4" && i === 0 ? "bg-red-500" :
                          strength.width === "w-2/4" && i <= 1 ? "bg-orange-400" :
                          strength.width === "w-3/4" && i <= 2 ? "bg-yellow-400" :
                          strength.width === "w-full" ? "bg-green-400" : "bg-slate-700"}`} />
                    ))}
                  </div>
                  <p className={`text-xs font-medium ${strength.text}`}>{strength.label} password</p>
                </div>
              )}
              <ErrorMsg msg={errors.password} />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">Confirm Password</label>
              <div className={`flex items-center bg-slate-800/60 border rounded-xl px-4 py-3.5 transition-all duration-200
                ${errors.confirm ? "border-red-500/70 ring-1 ring-red-500/20 bg-red-500/5" : "border-slate-700 focus-within:border-cyan-500/70 focus-within:ring-2 focus-within:ring-cyan-500/15 focus-within:bg-slate-800"}`}>
                <FaLock className={`mr-3 shrink-0 ${errors.confirm ? "text-red-400" : "text-slate-500"}`} size={14} />
                <input type={showConfirm ? "text" : "password"} name="confirm" value={form.confirm} onChange={handleChange}
                  placeholder="Repeat your password"
                  className="bg-transparent outline-none text-white w-full placeholder:text-slate-600 text-sm" />
                <button type="button" onClick={() => setShowConfirm((v) => !v)}
                  className="ml-2 text-slate-500 hover:text-slate-300 transition-colors shrink-0">
                  {showConfirm ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>
              <ErrorMsg msg={errors.confirm} />
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full bg-cyan-400 hover:bg-cyan-300 disabled:opacity-60 text-slate-950 font-bold py-3.5 rounded-xl text-sm transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 mt-2">
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Creating account...
                </>
              ) : "Create Account →"}
            </button>

          </form>

          <p className="text-center text-slate-500 text-sm mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">Sign in</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;
