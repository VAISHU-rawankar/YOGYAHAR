import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import loginBg from "../assets/hero-photo.jpg";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      navigate("/admin");
    } catch {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#fbf3e7] overflow-hidden">
      {/* Left side: Branding banner (visible on md and up) */}
      <div className="hidden md:block md:w-1/2 lg:w-3/5 relative">
        <img
          src={loginBg}
          alt="Yogyahar Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark brand overlay for premium aesthetics */}
        <div className="absolute inset-0 bg-[#1f2b12]/50 backdrop-blur-[0.5px]" />
        
        {/* Floating branding/text */}
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-white z-10 text-left">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-white hover:opacity-90 transition-opacity">
            <img src="/logo.png" alt="Yogyahar Logo" className="h-[48px] w-auto brightness-0 invert" />
          </Link>
          <div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-2">
              Eat Right, Live Bright.
            </h1>
            <p className="text-sm text-stone-200/90 max-w-md font-medium">
              Access the Yogyahar Control Panel to manage subscriptions, products, blog posts, and site settings.
            </p>
          </div>
          <p className="text-xs text-stone-300/80">© 2025 YOGYAHAR. All rights reserved.</p>
        </div>
      </div>

      {/* Right side: Login form */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center items-center px-6 py-12 relative">
        {/* Decorative Brand Circles for premium feel */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10" style={{background: '#cfe04a', filter: 'blur(80px)', transform: 'translate(40%, -40%)'}} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-15" style={{background: '#2f4a1f', filter: 'blur(80px)', transform: 'translate(-40%, 40%)'}} />

        <div className="w-full max-w-sm relative z-10">
          {/* Back Link */}
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6b6b5c] hover:text-[#2f4a1f] mb-6 transition-colors group text-left w-full">
            <span>&larr;</span> Back to Home
          </Link>

          {/* Card */}
          <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-xl border border-[#eee3cf]/70 text-left">
            {/* Logo & Header */}
            <div className="flex items-center gap-3.5 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#eef4e2] flex items-center justify-center text-2xl shadow-inner border border-[#dcecc4]">
                🥦
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#2f4a1f] font-display" style={{margin: 0}}>
                  Yogyahar CMS
                </h2>
                <p className="text-xs text-[#a69d85] font-medium" style={{margin: 0}}>Control Panel Authentication</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="flex flex-col gap-2">
                <span className="text-xs font-bold text-[#2f4a1f] uppercase tracking-wider pl-1">
                  Username
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter admin username"
                  className="rounded-2xl border border-[#e6dcc8] bg-white px-4 py-3.5 text-sm text-[#2b2b1f] placeholder-[#a69d85] outline-none focus:border-[#2f4a1f] focus:ring-1 focus:ring-[#2f4a1f] transition-all shadow-inner"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs font-bold text-[#2f4a1f] uppercase tracking-wider pl-1">
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="rounded-2xl border border-[#e6dcc8] bg-white px-4 py-3.5 text-sm text-[#2b2b1f] placeholder-[#a69d85] outline-none focus:border-[#2f4a1f] focus:ring-1 focus:ring-[#2f4a1f] transition-all shadow-inner"
                />
              </label>

              {error && (
                <div className="bg-[#fcf1f3] border border-[#f5d6dc] rounded-2xl p-3.5 text-xs text-[#6e2438] font-bold">
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#f0b429] hover:bg-[#d99e1f] disabled:opacity-60 px-6 py-4 text-xs font-extrabold text-[#2b2b1f] transition-all shadow-sm flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-[#2b2b1f] border-t-transparent rounded-full animate-spin"></span>
                    Logging In...
                  </>
                ) : (
                  "Log In to Dashboard"
                )}
              </button>
            </form>
          </div>

          {/* Footer info */}
          <p className="text-center text-[10px] text-[#a69d85] mt-6">
            Authorized personnel only. Sessions are monitored for security.
          </p>
        </div>
      </div>
    </div>
  );
}
