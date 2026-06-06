import React, { useState } from "react";
import { BARBALL_GYM_MEMBER_IMAGE } from "../data";

interface AuthPageProps {
  onLoginSuccess: (email: string) => void;
  onClose: () => void;
}

export default function AuthPage({ onLoginSuccess, onClose }: AuthPageProps) {
  const [email, setEmail] = useState("name@performance.com");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please fill in a valid email address.");
      return;
    }
    // Success login!
    onLoginSuccess(email);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white text-on-surface select-none">
      {/* 1. Left Side: Motivational Impact Section */}
      <section className="relative hidden md:flex md:w-1/2 lg:w-3/5 min-h-screen bg-navy-deep overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-60 filter saturate-75 brightness-75"
          alt="Athlete doing barbell squats in modern high-intensity gym center"
          referrerPolicy="no-referrer"
          src={BARBALL_GYM_MEMBER_IMAGE}
        />
        
        {/* Branding Overlay */}
        <div className="absolute top-12 left-12 z-20">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 group mb-4"
          >
            <span className="material-icons text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
            <span className="font-mono text-xs tracking-widest uppercase">BACK TO HOME</span>
          </button>
          <h1 className="font-sans text-3xl font-black tracking-tighter text-white uppercase">FITFORGE</h1>
        </div>

        {/* Central Content Overlay */}
        <div className="relative z-10 m-auto px-12 max-w-2xl">
          <div className="accent-bar-forest pl-8 space-y-4">
            <p className="font-mono text-xs font-semibold text-primary-fixed tracking-widest uppercase">
              PERFORMANCE PROTOCOL
            </p>
            <h2 className="font-sans text-5xl font-black text-white leading-none tracking-tight italic uppercase block">
              FORGE YOUR<br/>ULTIMATE SELF.
            </h2>
            <p className="text-gray-300 font-sans text-sm max-w-md opacity-90 leading-relaxed">
              Access elite coaching, real-time AI biometrics, and precision-engineered training schedules designed for those who refuse to settle.
            </p>
          </div>

          {/* Floating Performance Metrics (Visual Flourish matches design exactly) */}
          <div className="mt-16 grid grid-cols-2 gap-6">
            <div className="glass-dark p-6 rounded-lg border-[0.5px] border-white/20">
              <p className="font-mono text-[10px] text-amber-energy mb-2 uppercase tracking-widest">
                VO2 MAX TREND
              </p>
              <div className="flex items-end gap-2">
                <span className="font-mono text-2xl font-bold text-white">54.2</span>
                <span className="text-primary-fixed text-xs pb-1 font-semibold">+1.4%</span>
              </div>
            </div>

            <div className="glass-dark p-6 rounded-lg border-[0.5px] border-white/20">
              <p className="font-mono text-[10px] text-primary-fixed mb-2 uppercase tracking-widest">
                RECOVERY SCORE
              </p>
              <div className="flex items-end gap-2">
                <span className="font-mono text-2xl font-bold text-white">92%</span>
                <span className="text-amber-energy text-xs pb-1 font-semibold">OPTIMAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
      </section>

      {/* 2. Right Side: Clean Auth Form */}
      <section className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-24 bg-[#f9f9fd] dark:bg-[#121417] relative min-h-screen">
        
        {/* Mobile / Screen Close Nav */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 text-on-surface dark:text-white transition-colors duration-200"
          title="Back to home page"
        >
          <span className="material-icons">close</span>
        </button>

        {/* Mobile Brand Header */}
        <div className="md:hidden absolute top-8 left-8">
          <h1 className="font-sans text-2xl font-black tracking-tighter text-forest-vibrant uppercase">FITFORGE</h1>
        </div>

        <div className="w-full max-w-md space-y-8">
          <header className="space-y-2">
            <h2 className="font-sans text-3xl font-black text-on-surface dark:text-white leading-tight">Welcome Back</h2>
            <p className="font-sans text-sm text-gray-500 dark:text-gray-400">Resume your transformation journey and athletic coaching logs.</p>
          </header>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-100 text-red-800 rounded text-sm border-l-4 border-red-600">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Email Field with label layout matches design perfectly */}
              <div className="space-y-2">
                <label className="font-mono text-[11px] font-bold text-gray-600 dark:text-gray-300 flex items-center gap-2 uppercase tracking-widest" htmlFor="email">
                  <span className="material-icons text-sm">mail</span> EMAIL ADDRESS
                </label>
                <input
                  className="w-full px-4 py-3 bg-white dark:bg-white/5 dark:text-white border-[0.5px] border-gray-300 dark:border-white/10 focus:border-forest-vibrant focus:ring-1 focus:ring-forest-vibrant focus:outline-none transition-all duration-200 font-sans text-sm rounded-none"
                  id="email"
                  type="email"
                  placeholder="name@performance.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Field with masking toggle layout */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-mono text-[11px] font-bold text-gray-600 dark:text-gray-300 flex items-center gap-2 uppercase tracking-widest" htmlFor="password">
                    <span className="material-icons text-sm">lock</span> PASSWORD
                  </label>
                  <a 
                    href="#forgot" 
                    onClick={(e) => { e.preventDefault(); alert("Verification token has been mapped. Use standard credentials to log in or click button directly."); }}
                    className="text-xs font-semibold text-forest-vibrant hover:underline transition-all duration-200"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    className="w-full px-4 py-3 bg-white dark:bg-white/5 dark:text-white border-[0.5px] border-gray-300 dark:border-white/10 focus:border-forest-vibrant focus:ring-1 focus:ring-forest-vibrant focus:outline-none transition-all duration-200 font-sans text-sm rounded-none pr-10"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-all focus:outline-none"
                    title="Toggle password visibility"
                  >
                    <span className="material-icons text-lg">{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Button matches design exactly */}
            <button
              type="submit"
              className="w-full py-4 bg-forest-vibrant hover:bg-forest-vibrant/90 text-white font-mono text-xs font-bold tracking-widest uppercase active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer shadow-sm rounded-none"
            >
              SIGN IN TO DASHBOARD
              <span className="material-icons text-sm">arrow_forward</span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-gray-300 dark:border-white/10"></div>
            <span className="flex-shrink mx-4 font-mono text-[10px] text-gray-400 uppercase tracking-wider">
              Or continue with
            </span>
            <div className="flex-grow border-t border-gray-300 dark:border-white/10"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onLoginSuccess("google.user@fitforge.com")}
              className="flex items-center justify-center gap-2 py-3 px-4 border-[0.5px] border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-200 text-sm font-sans font-medium hover:scale-[0.98] rounded-none cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span>Google</span>
            </button>

            <button
              onClick={() => onLoginSuccess("apple.user@fitforge.com")}
              className="flex items-center justify-center gap-2 py-3 px-4 border-[0.5px] border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-200 text-sm font-sans font-medium hover:scale-[0.98] rounded-none cursor-pointer"
            >
              <svg className="w-5 h-5 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C4.38 16.92 3.5 11.53 5.35 8.28c.92-1.62 2.54-2.62 4.14-2.62 1.25 0 2.17.47 3.03.47.85 0 2.2-.6 3.68-.45 1.5.15 2.68.73 3.44 1.83-3.1 1.86-2.6 6.1.48 7.37-.62 1.5-1.45 3.04-2.43 4.4h-.6zM12.03 5.43c-.2-2.4 1.86-4.5 4.16-4.5.3.02.6.05.9.1-2.4 2.8-1.5 5.5-1.5 5.5a4.2 4.2 0 0 1-3.56-1.1z"></path>
              </svg>
              <span>Apple</span>
            </button>
          </div>

          <footer className="pt-8 text-center">
            <p className="font-sans text-sm text-gray-400">
              Don't have an account? 
              <button 
                type="button"
                onClick={() => { alert("Account initialization active. Standard demo credential mapped directly onto validation layers."); }}
                className="font-bold text-forest-vibrant dark:text-primary-fixed hover:underline ml-1 cursor-pointer focus:outline-none"
              >
                Forge one now
              </button>
            </p>
          </footer>
        </div>

        {/* Footer Small Print (Matches design exactly) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full text-center px-6 pointer-events-none">
          <p className="font-mono text-[9px] text-gray-400/90 tracking-widest uppercase max-w-sm mx-auto leading-relaxed">
            © 2024 FITFORGE PERFORMANCE CENTERS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </section>
    </div>
  );
}
