import React, { useState } from "react";
import { 
  SERVICES_DATA, 
  PRICING_PLANS, 
  TESTIMONIALS_DATA, 
  TRAINERS_IMAGE, 
  ABOUT_GALL_IMAGE 
} from "../data";

interface LandingPageProps {
  onAuthTrigger: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function LandingPage({ onAuthTrigger, isDarkMode, onToggleTheme }: LandingPageProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  // Micro-interactive simulation for Live Performance Metrics
  const [powerOverride, setPowerOverride] = useState(482);
  const [intensityOverride, setIntensityOverride] = useState(94);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail("");
        setSubscribed(false);
        alert(`Performance Newsletter configured safely for: ${newsletterEmail}`);
      }, 2000);
    }
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={`font-sans min-h-screen transition-colors duration-300 ${isDarkMode ? "dark bg-navy-deep text-white" : "bg-white text-on-surface"}`}>
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 w-full z-40 bg-white/90 dark:bg-navy-deep/90 backdrop-blur-md border-b-[0.5px] border-gray-200 dark:border-white/10 transition-all duration-300">
        <nav className="flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
          <a className="font-sans text-3xl font-black tracking-tighter text-on-surface dark:text-white uppercase select-none" href="#">
            FitForge
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a 
              className="font-sans font-medium text-sm text-gray-500 hover:text-forest-vibrant dark:text-gray-400 dark:hover:text-primary-fixed transition-colors" 
              href="#services"
            >
              Services
            </a>
            <a 
              className="font-sans font-medium text-sm text-gray-500 hover:text-forest-vibrant dark:text-gray-400 dark:hover:text-primary-fixed transition-colors" 
              href="#advantage"
            >
              Features
            </a>
            <a 
              className="font-sans font-medium text-sm text-gray-500 hover:text-forest-vibrant dark:text-gray-400 dark:hover:text-primary-fixed transition-colors" 
              href="#pricing"
            >
              Pricing
            </a>
            <a 
              className="font-sans font-medium text-sm text-gray-500 hover:text-forest-vibrant dark:text-gray-400 dark:hover:text-primary-fixed transition-colors" 
              href="#about"
            >
              About
            </a>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button 
              onClick={onToggleTheme}
              className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-on-surface dark:text-white transition-colors duration-200 flex items-center justify-center cursor-pointer"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <span className="material-icons">{isDarkMode ? "light_mode" : "dark_mode"}</span>
            </button>

            {/* CTA action button */}
            <button 
              onClick={onAuthTrigger}
              className="bg-forest-vibrant hover:bg-forest-vibrant/90 text-white px-6 py-2.5 font-sans font-bold text-sm tracking-wider uppercase active:scale-[0.98] transition-all duration-200 rounded-none cursor-pointer"
            >
              Join Now
            </button>
          </div>
        </nav>
      </header>

      {/* 2. Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-navy-deep">
        <div className="absolute inset-0 z-0 opacity-55">
          <img 
            alt="FitForge Professional Athletic Trainers" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
            src={TRAINERS_IMAGE}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-forest-vibrant/20 border border-forest-vibrant/30 px-3 py-1.5 rounded-full">
              <span className="material-icons text-primary-fixed text-sm animate-pulse">explore</span>
              <span className="font-mono text-[10px] text-primary-fixed font-bold tracking-widest uppercase">
                NEW BRANCH OPEN IN PIPLAN
              </span>
            </div>
            
            <h1 className="font-sans text-5xl md:text-6xl font-black text-white leading-tight tracking-tight uppercase">
              Train <span className="text-forest-vibrant dark:text-primary-fixed">Smarter.</span><br/>
              Live <span className="text-coral-punch">Stronger.</span>
            </h1>
            
            <p className="font-sans text-sm text-gray-300 max-w-lg leading-relaxed">
              Experience the next evolution of fitness. We combine elite human coaching with AI-driven performance metrics to engineer your peak physical state.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={onAuthTrigger}
                className="bg-forest-vibrant hover:bg-forest-vibrant/90 text-white px-8 py-4 font-sans font-bold text-xs tracking-wider uppercase active:scale-[0.98] transition-all rounded-none flex items-center gap-2 cursor-pointer shadow-md"
              >
                Start Free Trial
                <span className="material-icons text-sm">arrow_forward</span>
              </button>
              <a 
                href="#services"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 font-sans font-bold text-xs tracking-wider uppercase hover:bg-white/20 active:scale-[0.98] transition-all rounded-none block text-center"
              >
                Explore Programs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Social Proof Strip (Borders exactly matching image specs) */}
      <section className="bg-[#121417] border-y border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center md:border-r border-white/5 last:border-0 py-2">
            <div className="font-mono text-[11px] text-primary-fixed mb-1 uppercase tracking-widest">MEMBERS</div>
            <div className="font-sans text-3xl font-black text-white">3,500+</div>
          </div>
          <div className="text-center md:border-r border-white/5 last:border-0 py-2">
            <div className="font-mono text-[11px] text-coral-punch mb-1 uppercase tracking-widest">LOCATION</div>
            <div className="font-sans text-3xl font-black text-white">Piplan</div>
          </div>
          <div className="text-center md:border-r border-white/5 last:border-0 py-2">
            <div className="font-mono text-[11px] text-amber-energy mb-1 uppercase tracking-widest font-semibold">CERTIFIED COACHES</div>
            <div className="font-sans text-3xl font-black text-white">45+</div>
          </div>
          <div className="text-center py-2">
            <div className="font-mono text-[11px] text-blue-400 mb-1 uppercase tracking-widest">SUCCESS RATE</div>
            <div className="font-sans text-3xl font-black text-white">98%</div>
          </div>
        </div>
      </section>

      {/* 4. Elite Training Services Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6" id="services">
        <div className="mb-16">
          <span className="font-mono text-[11px] font-bold text-forest-vibrant dark:text-primary-fixed tracking-widest uppercase">
            CAPABILITIES 01
          </span>
          <h2 className="font-sans text-4xl font-extrabold mt-2 tracking-tight">
            Elite Training Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((item, idx) => (
            <div 
              key={idx}
              onClick={onAuthTrigger}
              className={`cursor-pointer p-8 flex flex-col justify-between group rounded-lg border-[0.5px] border-gray-200 dark:border-white/10 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${item.themeClass}`}
            >
              <div>
                <span className={`material-icons text-3xl mb-6 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </span>
                <h3 className="font-sans text-lg font-bold mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-gray-500 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <span className={`mt-8 font-mono text-[11px] font-bold hover:underline flex items-center gap-2 tracking-widest ${item.color}`}>
                LEARN MORE <span className="material-icons text-xs">arrow_forward</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. The Advantage Section (AI/Tech layout matches image exactly) */}
      <section className="bg-[#f0f0f4] dark:bg-[#1a1c1f] dark:border-y dark:border-white/5 py-24" id="advantage">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left Advantage Details */}
            <div className="lg:w-1/2 space-y-8">
              <div>
                <span className="font-mono text-[11px] font-bold text-forest-vibrant dark:text-primary-fixed tracking-widest uppercase">
                  ADVANTAGE 02
                </span>
                <h2 className="font-sans text-4xl font-black mt-4 mb-6 leading-tight">
                  Engineering Growth Through Precision Data
                </h2>
                <p className="font-sans text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  At FitForge, we don't guess. We measure. Our proprietary ForgeOS integrates AI body composition analysis with real-time wearable data to adjust your training volume every session dynamically.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-forest-vibrant text-white p-3 rounded">
                    <span className="material-icons text-white">analytics</span>
                  </div>
                  <div>
                    <h4 className="font-sans text-base font-extrabold">AI Body Analysis</h4>
                    <p className="font-sans text-sm text-gray-400 mt-1">Bi-weekly 3D body scans tracking muscle density, symmetry and local body index.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-coral-punch text-white p-3 rounded">
                    <span className="material-icons text-white">smartphone</span>
                  </div>
                  <div>
                    <h4 className="font-sans text-base font-extrabold">ForgeOS Mobile App</h4>
                    <p className="font-sans text-sm text-gray-400 mt-1">Log lifts, calculate active strain and water metrics, and message your biomechanics coach 24/7.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Advantage Live Visualizer Panel (Matches design specs exactly) */}
            <div className="lg:w-1/2 w-full space-y-6">
              <div className="bg-navy-deep dark:bg-black/40 p-8 rounded-xl accent-bar-amber col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-[11.5px] text-amber-energy font-bold tracking-widest uppercase">
                    LIVE PERFORMANCE METRICS
                  </span>
                  <span className="bg-amber-energy/20 text-amber-energy px-2.5 py-1 rounded text-[10px] font-bold tracking-widest uppercase">
                    STRENGTH PHASE
                  </span>
                </div>

                {/* Simulated Interactive Training Graph (allows slider feedback to feel alive) */}
                <div className="flex items-end gap-3 h-32 mb-6">
                  <div className="w-full bg-amber-energy/20 rounded-t h-[35%] transition-all duration-700"></div>
                  <div className="w-full bg-amber-energy/40 rounded-t h-[55%] transition-all duration-700"></div>
                  <div className="w-full bg-amber-energy/60 rounded-t h-[80%] transition-all duration-700"></div>
                  <div className="w-full bg-amber-energy/80 rounded-t h-[70%] transition-all duration-700"></div>
                  <div className="w-full bg-amber-energy rounded-t h-[95%] transition-all duration-700" style={{ height: `${intensityOverride - 10}%` }}></div>
                  <div className="w-full bg-amber-energy rounded-t h-[100%] transition-all duration-700" style={{ height: `${intensityOverride}%` }}></div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/5 p-3 rounded border border-white/5 cursor-pointer hover:bg-white/10" onClick={() => setPowerOverride(prev => prev + 5)}>
                    <div className="font-mono text-white/50 text-[9px] uppercase tracking-wider">AVG POWER</div>
                    <div className="font-mono text-amber-energy text-lg font-bold">{powerOverride}W</div>
                  </div>
                  <div className="bg-white/5 p-3 rounded border border-white/5 cursor-pointer hover:bg-white/10" onClick={() => setIntensityOverride(prev => prev >= 100 ? 90 : prev + 2)}>
                    <div className="font-mono text-white/50 text-[9px] uppercase tracking-wider">INTENSITY</div>
                    <div className="font-mono text-amber-energy text-lg font-bold">{intensityOverride}%</div>
                  </div>
                  <div className="bg-white/5 p-3 rounded border border-white/5">
                    <div className="font-mono text-white/50 text-[9px] uppercase tracking-wider">LOAD RECOVERY</div>
                    <div className="font-mono text-amber-energy text-lg font-bold">82h</div>
                  </div>
                </div>

                <p className="text-[11px] text-center text-gray-500 mt-4 font-mono select-none">
                  💡 Click boxes to simulate biometric sensor feedback
                </p>
              </div>

              {/* Live Status Indicators (Matches design specs exactly) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-white/5 p-6 rounded-xl border-[0.5px] border-gray-200 dark:border-white/10 shadow-sm flex flex-col justify-between">
                  <div className="w-12 h-12 rounded-full bg-forest-tint dark:bg-primary-fixed/10 flex items-center justify-center mb-4 text-forest-vibrant dark:text-primary-fixed">
                    <span className="material-icons">radar</span>
                  </div>
                  <div>
                    <div className="text-xl font-bold">99.8%</div>
                    <div className="text-[10px] font-mono text-gray-500 tracking-wider">SENSOR ACCURACY</div>
                  </div>
                </div>

                <div className="bg-white dark:bg-white/5 p-6 rounded-xl border-[0.5px] border-gray-200 dark:border-white/10 shadow-sm flex flex-col justify-between">
                  <div className="w-12 h-12 rounded-full bg-coral-tint dark:bg-coral-punch/10 flex items-center justify-center mb-4 text-coral-punch">
                    <span className="material-icons">schedule</span>
                  </div>
                  <div>
                    <div className="text-xl font-bold">24/7</div>
                    <div className="text-[10px] font-mono text-gray-500 tracking-wider">BIO-TRACKING</div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. Membership Tiers */}
      <section className="py-24 max-w-7xl mx-auto px-6" id="pricing">
        <div className="text-center mb-16">
          <span className="font-mono text-[11px] font-bold text-coral-punch tracking-widest uppercase">
            PRICING 03
          </span>
          <h2 className="font-sans text-4xl font-extrabold mt-2 tracking-tight">
            Choose Your Performance Level
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PRICING_PLANS.map((plan, idx) => (
            <div 
              key={idx}
              className={`p-8 rounded-xl flex flex-col justify-between border-[0.5px] transition-all transform hover:-translate-y-1 hover:shadow-xl ${
                plan.isPopular 
                  ? "bg-[#121417] text-white border-forest-vibrant border-2 scale-105 z-10 shadow-2xl" 
                  : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10"
              }`}
            >
              <div>
                {plan.isPopular && (
                  <div className="inline-block bg-forest-vibrant text-white text-[9px] font-mono tracking-widest font-black uppercase px-3 py-1 rounded-full mb-6">
                    MOST POPULAR
                  </div>
                )}
                
                <h3 className="font-sans text-xl font-bold uppercase tracking-wide">
                  {plan.name}
                </h3>
                
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className={`text-xs ${plan.isPopular ? "text-gray-400" : "text-gray-500"}`}>PKR</span>
                  <span className="text-4xl font-black">{plan.price.toLocaleString()}</span>
                  <span className={`text-xs ${plan.isPopular ? "text-gray-400" : "text-gray-500"}`}>/{plan.billing}</span>
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3 text-sm">
                      <span className="material-icons text-forest-vibrant dark:text-primary-fixed text-base">check_circle</span>
                      <span className={plan.isPopular ? "text-gray-200" : "text-gray-600 dark:text-gray-300"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={onAuthTrigger}
                className={`mt-10 w-full py-3.5 font-sans font-bold text-xs tracking-wider uppercase transition-all duration-200 active:scale-[0.98] border rounded-none cursor-pointer ${
                  plan.isPopular 
                    ? "bg-forest-vibrant hover:bg-forest-vibrant/95 border-transparent text-white" 
                    : plan.colorTheme === "coral"
                      ? "border-coral-punch text-coral-punch hover:bg-coral-punch hover:text-white"
                      : "border-on-surface dark:border-white text-on-surface dark:text-white hover:bg-on-surface hover:text-white dark:hover:bg-white dark:hover:text-navy-deep"
                }`}
              >
                {plan.isPopular ? `Join ${plan.name}` : plan.colorTheme === "coral" ? "Inquire Now" : "Select Plan"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Our Story */}
      <section className="bg-gray-100 dark:bg-black/20 py-24 overflow-hidden shadow-inner" id="about">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Warehouse gym Image block with overlay */}
            <div className="lg:w-1/2 relative">
              <div className="w-full h-[450px] bg-slate-200 dark:bg-white/5 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  alt="FitForge warehouse compound lifting racks" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  src={ABOUT_GALL_IMAGE}
                />
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-forest-vibrant text-white p-6 rounded-xl hidden md:block border-l-4 border-l-primary-fixed">
                <div className="font-sans text-3xl font-black">12+</div>
                <div className="font-mono text-[9px] font-bold tracking-widest text-primary-fixed uppercase leading-tight mt-1">
                  YEARS OF ELITE<br/>COACHING
                </div>
              </div>
            </div>

            {/* Legacy Text columns */}
            <div className="lg:w-1/2 space-y-6">
              <span className="font-mono text-[11px] font-bold text-amber-energy tracking-widest uppercase">
                OUR LEGACY 04
              </span>
              <h2 className="font-sans text-4xl font-extrabold tracking-tight">
                Built for the Obsessed
              </h2>
              <p className="font-sans text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                FitForge began in a small garage with one goal: to bring professional athlete-level training to everyone. Today, our Performance Centers are the benchmark for high-performance fitness in Piplan and beyond.
              </p>
              <p className="font-sans text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Our mission is simple: To provide the environment, the expertise, and the technology needed for human potential to flourish. We don't just build bodies; we forge discipline.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-1">
                  <div className="font-sans text-base font-bold">The Environment</div>
                  <p className="text-xs text-gray-500">Sound-engineered floors and optimal volumetric lighting designed to maintain focus.</p>
                </div>
                <div className="space-y-1">
                  <div className="font-sans text-base font-bold">The Community</div>
                  <p className="text-xs text-gray-500">A high-performance network of achievers who push each other to break plateaus daily.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Athlete Feedback (Testimonials Slide matching screenshot exactly) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="font-mono text-[11px] font-bold text-forest-vibrant dark:text-primary-fixed tracking-widest uppercase">
              VOICES 05
            </span>
            <h2 className="font-sans text-4xl font-black mt-2 tracking-tight">
              Athlete Success
            </h2>
          </div>
          <div className="flex gap-2.5">
            <button 
              onClick={handlePrevTestimonial}
              className="p-3.5 rounded-full border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 text-on-surface dark:text-white transition-all active:scale-95 flex items-center justify-center cursor-pointer"
              title="Previous Success Story"
            >
              <span className="material-icons">chevron_left</span>
            </button>
            <button 
              onClick={handleNextTestimonial}
              className="p-3.5 rounded-full bg-forest-vibrant text-white hover:bg-forest-vibrant/90 transition-all active:scale-95 flex items-center justify-center cursor-pointer"
              title="Next Success Story"
            >
              <span className="material-icons">chevron_right</span>
            </button>
          </div>
        </div>

        {/* 3 columns on Desktop, active indicator highlighted */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t, idx) => {
            const isSlideActive = idx === activeTestimonialIndex;
            return (
              <div 
                key={idx}
                className={`p-8 rounded-2xl border-[0.5px] relative transition-all duration-300 transform hover:-translate-y-1 ${
                  isSlideActive 
                    ? "bg-white dark:bg-white/10 border-forest-vibrant shadow-xl" 
                    : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/5"
                }`}
              >
                <span className="material-icons text-5xl text-forest-vibrant/10 absolute top-4 right-4 rotate-180 select-none">
                  format_quote
                </span>

                <div className="flex gap-0.5 mb-6 text-amber-energy">
                  {[...Array(t.rating)].map((_, r_idx) => (
                    <span key={r_idx} className="material-icons text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  ))}
                </div>

                <p className="font-sans text-[14px] leading-relaxed mb-8 italic text-gray-600 dark:text-gray-300">
                  "{t.feedback}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300/30">
                    <img className="w-full h-full object-cover" src={t.avatarUrl} alt={t.name} referrerPolicy="referrer" />
                  </div>
                  <div>
                    <div className="font-sans font-bold text-sm text-on-surface dark:text-white">{t.name}</div>
                    <div className="text-[10px] text-gray-400 font-mono font-semibold uppercase tracking-wider mt-0.5">{t.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. Final CTA Banner section */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-forest-vibrant rounded-3xl p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
          </div>
          
          <h2 className="font-sans text-4xl md:text-5xl font-black text-white mb-6 relative z-10 leading-tight">
            Stop Training Blindly.<br/>Forge Your Future Today.
          </h2>
          
          <p className="font-sans text-sm text-primary-fixed max-w-xl mb-10 relative z-10 leading-relaxed font-medium">
            Join the 3,500+ members who have already discovered the FitForge advantage. Your first 3D body analysis and custom warm-up check are completely redeemable in your digital tracker.
          </p>

          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <button 
              onClick={onAuthTrigger}
              className="bg-white text-forest-vibrant px-9 py-4.5 font-sans font-extrabold text-xs uppercase tracking-widest hover:bg-primary-fixed transition-all rounded-none cursor-pointer"
            >
              Claim Your Free Session
            </button>
            <button 
              onClick={() => alert("Virtual Gym Volumetric Tour matches branch cameras. Log into your dashboard to activate live view.")}
              className="bg-navy-deep text-white px-9 py-4.5 font-sans font-extrabold text-xs uppercase tracking-widest hover:brightness-110 transition-all rounded-none cursor-pointer border border-white/10"
            >
              View Branch Tour
            </button>
          </div>
        </div>
      </section>

      {/* 10. Complete Corporate and Biomechanics Footer */}
      <footer className="bg-[#121417] text-gray-300 border-t-4 border-forest-vibrant pt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 pb-12">
          
          <div className="space-y-6">
            <div className="font-sans text-3xl font-black text-white uppercase">
              FitForge
            </div>
            <p className="font-sans text-sm text-gray-400 leading-relaxed">
              Elite performance centers dedicated to engineering the peak physical state through precision biometric tracking data and human coaching expertise.
            </p>
            <div className="flex gap-4">
              <a href="#link" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-forest-vibrant hover:text-forest-vibrant transition-all">
                <span className="material-icons text-sm">public</span>
              </a>
              <a href="#link" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-forest-vibrant hover:text-forest-vibrant transition-all">
                <span className="material-icons text-sm">share</span>
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div className="font-mono text-xs font-bold text-amber-energy tracking-widest uppercase">
              CONTACT
            </div>
            <ul className="space-y-4 font-sans text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <span className="material-icons text-sm text-forest-vibrant mt-0.5">location_on</span>
                <span>Piplan Branch: Industrial Area Phase II, Piplan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="material-icons text-sm text-forest-vibrant">call</span>
                <span>+1 (555) FIT-FORGE</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="material-icons text-sm text-forest-vibrant">mail</span>
                <span>hello@fitforge.com</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="font-mono text-xs font-bold text-amber-energy tracking-widest uppercase">
              RESOURCES
            </div>
            <ul className="space-y-3 font-sans text-sm text-gray-400">
              <li><a className="hover:text-primary-fixed hover:underline transition-all" href="#piplan">Privacy Policy</a></li>
              <li><a className="hover:text-primary-fixed hover:underline transition-all" href="#piplan">Terms of Service</a></li>
              <li><a className="hover:text-primary-fixed hover:underline transition-all" href="#piplan">Fitness Safety Rules</a></li>
              <li><a className="hover:text-primary-fixed hover:underline transition-all" href="#piplan">Coach Career Portal</a></li>
            </ul>
          </div>

          {/* Connected newsletter form */}
          <div className="space-y-6">
            <div className="font-mono text-xs font-bold text-amber-energy tracking-widest uppercase">
              NEWSLETTER
            </div>
            <p className="text-xs text-gray-400">
              Get weekly scientific protocols and biomechanics tips directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="flex">
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Email address"
                  className="bg-white/5 border-[0.5px] border-white/15 rounded-l-md px-4 py-2.5 w-full text-white text-sm focus:ring-1 focus:ring-forest-vibrant outline-none font-sans"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-forest-vibrant hover:bg-forest-vibrant/90 text-white px-4 rounded-r-md transition-all flex items-center justify-center cursor-pointer"
                  disabled={subscribed}
                >
                  <span className="material-icons text-sm">{subscribed ? "done" : "send"}</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 border-t border-white/5 text-center text-xs text-gray-500 font-mono">
          <p>© 2024 FitForge Performance Centers. All rights reserved. Registered location Piplan branch.</p>
        </div>
      </footer>
    </div>
  );
}
