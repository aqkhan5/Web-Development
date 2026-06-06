import React, { useState, useEffect, useRef } from "react";
import { Workout, UserProgress, CoachingMessage } from "../types";

interface MemberDashboardProps {
  userEmail: string;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function MemberDashboard({ userEmail, onLogout, isDarkMode, onToggleTheme }: MemberDashboardProps) {
  // Mock Progress State (can be adjusted by training logs / sliders)
  const [metrics, setMetrics] = useState<UserProgress>({
    vo2Max: 54.2,
    recoveryScore: 92,
    heartRate: 64,
    caloriesBurned: 840,
    dailyStreak: 12,
    lastScanned: "2 Hours Ago",
  });

  // Logged Activity Items List
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: "W1",
      name: "Barbell Back Squat",
      category: "Strength",
      sets: 5,
      reps: 5,
      weight: 120,
      durationMinutes: 35,
      timestamp: "Today at 08:30"
    },
    {
      id: "W2",
      name: "3D Spatial Mobility Routine",
      category: "Mobility",
      sets: 3,
      reps: 10,
      weight: 0,
      durationMinutes: 15,
      timestamp: "Today at 09:10"
    }
  ]);

  // Exercise Inputs for logger form
  const [workoutName, setWorkoutName] = useState("Deadlift");
  const [workoutCategory, setWorkoutCategory] = useState<"Strength" | "Cardio" | "Mobility">("Strength");
  const [setsInput, setSetsInput] = useState(4);
  const [repsInput, setRepsInput] = useState(8);
  const [weightInput, setWeightInput] = useState(100);

  // Chat/Coach History State (default welcome message)
  const [chatHistory, setChatHistory] = useState<CoachingMessage[]>([
    {
      id: "M1",
      sender: "coach",
      text: `### FitForge AI Assistant Initialized
Welcome back, Athlete. I have synchronized with your biological status:
*   **VO2 Max: ${metrics.vo2Max}** (Top 5% of age bracket)
*   **Recovery Status: ${metrics.recoveryScore}%** (Optimal)
*   **Resting Heart Rate: ${metrics.heartRate} bpm** (Highly efficient cardiac muscle)

Today, your central nervous system (CNS) shows no metrics of cumulative residual micro-tears or overtraining fatigue. You are fully authorized for **High Intensity & Power Recruits**.

Ask me for zone calculations, custom warm-up scripts, or sports diet adjustments.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [currentMessage, setCurrentMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat window to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isGenerating]);

  // Log a custom training exercise
  const handleLogWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workoutName) return;

    const newWorkout: Workout = {
      id: Math.random().toString(),
      name: workoutName,
      category: workoutCategory as any,
      sets: Number(setsInput),
      reps: Number(repsInput),
      weight: Number(weightInput),
      durationMinutes: 20,
      timestamp: "Just logged"
    };

    setWorkouts([newWorkout, ...workouts]);

    // Improve stats slightly to reward performance log!
    setMetrics(prev => ({
      ...prev,
      caloriesBurned: prev.caloriesBurned + 180,
      heartRate: 72, // elevated pulse from exercises
      vo2Max: Number((prev.vo2Max + 0.1).toFixed(1)),
      recoveryScore: Math.max(30, prev.recoveryScore - 8) // training uses recovery index!
    }));

    // Alert completion
    alert(`Logged ${workoutName} safely. Biometrics updated dynamically.`);
  };

  // Trigger server-side Gemini Coaching agent proxy
  const triggerCoachQuery = async (promptText: string) => {
    if (isGenerating) return;
    setIsGenerating(true);

    const userMsg: CoachingMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, userMsg]);

    try {
      const response = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metrics,
          currentMessage: promptText,
          chatHistory: chatHistory.map(m => ({ role: m.sender, text: m.text }))
        })
      });

      const data = await response.json();
      
      const coachMsg: CoachingMessage = {
        id: Math.random().toString(),
        sender: "coach",
        text: data.text || "I was unable to retrieve a response. Ensure your endpoint setup is complete.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => [...prev, coachMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: CoachingMessage = {
        id: Math.random().toString(),
        sender: "coach",
        text: "🚨 **Biometric Network Lag:** Server is restoring background calculations. Check console headers.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, errorMsg]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;
    triggerCoachQuery(currentMessage);
    setCurrentMessage("");
  };

  // Reset metrics to optimal state
  const handleRestSimulate = () => {
    setMetrics({
      vo2Max: 54.2,
      recoveryScore: 98,
      heartRate: 60,
      caloriesBurned: 0,
      dailyStreak: 13,
      lastScanned: "Just now (Full sleep cycle simulated)"
    });
    alert("Simulating 8 hours deep REM sleep. Biometrics restored to 98% Optimal.");
  };

  return (
    <div className={`min-h-screen font-sans ${isDarkMode ? "dark bg-navy-deep text-white" : "bg-[#f5f5f9] text-on-surface"}`}>
      {/* Upper Active Dashboard Header Bar */}
      <header className="bg-white dark:bg-black/40 border-b-[0.5px] border-gray-200 dark:border-white/10 py-4 px-6 md:px-12 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <h1 className="font-sans text-2xl font-black tracking-tighter text-on-surface dark:text-white uppercase select-none">
              FitForge
            </h1>
            <span className="bg-forest-vibrant text-white text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full">
              ATHLETE PRESTIGE
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onToggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer text-gray-400 dark:text-white"
            >
              <span className="material-icons">{isDarkMode ? "light_mode" : "dark_mode"}</span>
            </button>
            <span className="text-sm font-semibold max-w-[170px] truncate" title={userEmail}>
              👤 {userEmail}
            </span>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 uppercase font-mono tracking-widest border border-transparent transition-all cursor-pointer rounded-none"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
        
        {/* Welcome Block Vitals Layout */}
        <div className="bg-[#121417] text-white p-6 md:p-8 rounded-xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none select-none">
            <span className="material-icons text-9xl">analytics</span>
          </div>

          <div className="space-y-2 relative z-10">
            <div className="text-primary-fixed font-mono text-xs tracking-widest uppercase">BIOMETRICS INTEGRITY DASHBOARD</div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Active Athlete Profile</h2>
            <p className="text-sm text-gray-400">CNS Scan completed successfully. Data synchronized with FitForge Piplan center tracking arrays.</p>
          </div>

          <div className="flex flex-wrap gap-4 relative z-10 w-full md:w-auto">
            <button
              onClick={handleRestSimulate}
              className="bg-amber-energy hover:bg-amber-energy/90 text-white font-mono text-xs font-bold tracking-widest uppercase px-6 py-3 transition-colors rounded-none w-full sm:w-auto cursor-pointer"
            >
              🔋 Simulate Rest Cycle
            </button>
          </div>
        </div>

        {/* Dynamic biological statistics cards deck */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white dark:bg-white/5 p-6 rounded-xl border-[0.5px] border-gray-200 dark:border-white/10 shadow-sm accent-bar-forest">
            <p className="font-mono text-[10px] text-forest-vibrant dark:text-primary-fixed mb-2 uppercase tracking-widest font-bold">
              Aerobic Capacity (VO2 Max)
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black">{metrics.vo2Max}</span>
              <span className="text-xs text-emerald-500 font-bold">mL/kg/min</span>
            </div>
            <div className="text-xs text-gray-500 mt-2 font-sans">
              Top Tier anaerobic reserve score
            </div>
          </div>

          <div className="bg-white dark:bg-white/5 p-6 rounded-xl border-[0.5px] border-gray-200 dark:border-white/10 shadow-sm accent-bar-amber">
            <p className="font-mono text-[10px] text-amber-energy mb-2 uppercase tracking-widest font-bold">
              Recovery Scoring
            </p>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-black ${metrics.recoveryScore >= 80 ? "text-emerald-500" : "text-amber-500"}`}>{metrics.recoveryScore}%</span>
              <span className="text-xs text-gray-500 uppercase font-bold font-mono">
                {metrics.recoveryScore >= 85 ? "OPTIMAL" : "LOAD STRESS"}
              </span>
            </div>
            {/* Simple colored bar represent score */}
            <div className="w-full bg-gray-200 dark:bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-forest-vibrant h-full transition-all duration-500" 
                style={{ width: `${metrics.recoveryScore}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white dark:bg-white/5 p-6 rounded-xl border-[0.5px] border-gray-200 dark:border-white/10 shadow-sm border-l-4 border-l-red-500">
            <p className="font-mono text-[10px] text-red-500 mb-2 uppercase tracking-widest font-bold">
              Cardiac Rate (Pulse)
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black">{metrics.heartRate}</span>
              <span className="text-xs text-gray-500 font-bold">BPM Rest</span>
            </div>
            <div className="text-xs text-gray-500 mt-2 font-sans flex items-center gap-1">
              <span className="animate-ping inline-block w-1.5 h-1.5 rounded-full bg-red-500"></span>
              Live telemetry active
            </div>
          </div>

          <div className="bg-white dark:bg-white/5 p-6 rounded-xl border-[0.5px] border-gray-200 dark:border-white/10 shadow-sm accent-bar-coral">
            <p className="font-mono text-[10px] text-coral-punch mb-2 uppercase tracking-widest font-bold">
              Active Streak Counter
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black">{metrics.dailyStreak}</span>
              <span className="text-xs text-coral-punch font-extrabold uppercase font-mono">DAYS AT PIPLAN</span>
            </div>
            <div className="text-xs text-gray-500 mt-2 font-sans">
              Scan: {metrics.lastScanned}
            </div>
          </div>

        </div>

        {/* Split Screen Panel for Dashboard functions: Left Logger/Workouts, Right ForgeAI Coach */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Workout logger & activities list (5 columns on desktop) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Workout logger form block */}
            <div className="bg-white dark:bg-white/5 p-6 rounded-xl border-[0.5px] border-gray-200 dark:border-white/10 shadow-sm">
              <h3 className="font-sans text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-icons text-forest-vibrant">post_add</span> Log New Performance Set
              </h3>
              
              <form onSubmit={handleLogWorkout} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-gray-500">Exercise Name</label>
                    <input 
                      type="text" 
                      value={workoutName} 
                      onChange={(e) => setWorkoutName(e.target.value)} 
                      className="w-full border-[0.5px] border-gray-300 dark:border-white/10 rounded px-2.5 py-1.5 text-xs bg-white dark:bg-white/5 dark:text-white focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-gray-500">Type</label>
                    <select 
                      value={workoutCategory} 
                      onChange={(e) => setWorkoutCategory(e.target.value as any)}
                      className="w-full border-[0.5px] border-gray-300 dark:border-white/10 rounded px-2.5 py-1.5 text-xs bg-white dark:bg-white/5 dark:text-white focus:outline-none"
                    >
                      <option value="Strength">Strength</option>
                      <option value="Cardio">Cardio</option>
                      <option value="Mobility">Mobility</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-gray-500">Sets</label>
                    <input 
                      type="number" 
                      value={setsInput} 
                      onChange={(e) => setSetsInput(Number(e.target.value))} 
                      className="w-full border-[0.5px] border-gray-300 dark:border-white/10 rounded px-2.5 py-1.5 text-xs bg-white dark:bg-white/5 dark:text-white focus:outline-none"
                      min={1}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-gray-500">Reps</label>
                    <input 
                      type="number" 
                      value={repsInput} 
                      onChange={(e) => setRepsInput(Number(e.target.value))} 
                      className="w-full border-[0.5px] border-gray-300 dark:border-white/10 rounded px-2.5 py-1.5 text-xs bg-white dark:bg-white/5 dark:text-white focus:outline-none"
                      min={1}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-gray-500">Load (kg)</label>
                    <input 
                      type="number" 
                      value={weightInput} 
                      onChange={(e) => setWeightInput(Number(e.target.value))} 
                      className="w-full border-[0.5px] border-gray-300 dark:border-white/10 rounded px-2.5 py-1.5 text-xs bg-white dark:bg-white/5 dark:text-white focus:outline-none"
                      min={0}
                      required
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-forest-vibrant text-white font-mono text-xs font-bold tracking-widest uppercase hover:brightness-110 shadow-sm active:scale-95 transition-all cursor-pointer rounded-none"
                >
                  LOG SET REQUISITION
                </button>
              </form>
            </div>

            {/* List of active logged activities */}
            <div className="bg-white dark:bg-white/5 p-6 rounded-xl border-[0.5px] border-gray-200 dark:border-white/10 shadow-sm">
              <h3 className="font-sans text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-icons text-forest-vibrant">history</span> Historic Workouts Log
              </h3>
              
              <div className="space-y-4 max-h-[350px] overflow-y-auto custom-scrollbar">
                {workouts.map((w) => (
                  <div key={w.id} className="p-4 border-[0.5px] border-gray-200 dark:border-white/5 rounded-lg flex justify-between items-center group bg-white dark:bg-white/5 hover:border-gray-400 dark:hover:border-white/20 transition-all">
                    <div className="space-y-1">
                      <div className="font-sans font-bold text-sm tracking-tight">{w.name}</div>
                      <div className="flex gap-2 items-center text-[10px] text-gray-400 font-mono">
                        <span className="bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded uppercase font-bold text-[9px]">{w.category}</span>
                        <span>•</span>
                        <span>{w.timestamp}</span>
                      </div>
                    </div>
                    
                    <div className="text-right font-mono text-xs font-semibold">
                      <div className="text-on-surface dark:text-white font-black">{w.sets} × {w.reps}</div>
                      <div className="text-gray-400 text-[10px]">{w.weight > 0 ? `${w.weight} kg` : "Bodyweight"}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: ForgeAI Coach panel using Gemini SDK chat proxy (7 columns on desktop) */}
          <div className="lg:col-span-7 bg-white dark:bg-white/5 rounded-xl border-[0.5px] border-gray-200 dark:border-white/10 shadow-sm flex flex-col h-[650px] justify-between overflow-hidden">
            
            {/* Coach Panel Header */}
            <div className="p-4 bg-gray-50 dark:bg-black/20 border-b-[0.5px] border-gray-200 dark:border-white/10 flex justify-between items-center whitespace-nowrap">
              <div className="flex items-center gap-2">
                <span className="animate-pulse inline-block w-2.5 h-2.5 rounded-full bg-forest-vibrant dark:bg-primary-fixed"></span>
                <span className="font-sans font-extrabold text-sm text-on-surface dark:text-white">ForgeAI Biometric Agent</span>
              </div>
              <span className="font-mono text-[10px] bg-forest-vibrant/20 text-forest-vibrant dark:text-primary-fixed px-2 py-0.5 rounded font-bold uppercase tracking-widest">
                Gemini 3.5 Flash Active
              </span>
            </div>

            {/* Chat Messages Log view */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4 custom-scrollbar bg-gray-50/50 dark:bg-[#121417]/40 leading-relaxed font-sans text-sm">
              {chatHistory.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
                >
                  <div className="text-[9px] text-gray-400 font-mono mb-1">{msg.sender === "user" ? "Athlete" : "ForgeAI Coach"} • {msg.timestamp}</div>
                  
                  <div className={`p-4 rounded-lg text-sm select-text ${
                    msg.sender === "user" 
                      ? "bg-forest-vibrant text-white rounded-tr-none text-right font-medium" 
                      : "bg-white dark:bg-white/5 border-[0.5px] border-gray-200 dark:border-white/10 text-on-surface dark:text-gray-200 rounded-tl-none leading-relaxed prose prose-sm dark:prose-invert"
                  }`}>
                    {/* Simplified formatting parser */}
                    {msg.text.split("\n").map((line, lidx) => {
                      if (line.startsWith("### ")) {
                        return <h4 key={lidx} className="font-black text-forest-vibrant dark:text-primary-fixed mt-3 mb-1 text-sm">{line.substring(4)}</h4>;
                      }
                      if (line.startsWith("*   **") || line.startsWith("-   **") || line.startsWith("* **")) {
                        // Bold parsing
                        const cleanLine = line.replace(/^[*\s-]+\s*\*\*/, "").replace(/\*\*/, "");
                        return <li key={lidx} className="ml-4 list-disc text-xs text-gray-500 dark:text-gray-300 mt-1">{cleanLine}</li>;
                      }
                      if (line.startsWith("* ") || line.startsWith("- ")) {
                        return <li key={lidx} className="ml-4 list-disc text-xs text-gray-400 mt-0.5">{line.substring(2)}</li>;
                      }
                      return <p key={lidx} className="text-xs leading-relaxed mt-1 font-sans">{line}</p>;
                    })}
                  </div>
                </div>
              ))}

              {isGenerating && (
                <div className="flex flex-col items-start mr-auto max-w-[80%]">
                  <div className="text-[9px] text-gray-400 font-mono mb-1">ForgeAI Coach • Calculating...</div>
                  <div className="bg-white dark:bg-white/5 border-[0.5px] border-gray-200 dark:border-white/10 p-4 rounded-lg rounded-tl-none flex items-center gap-2">
                    <span className="animate-spin inline-block w-4 h-4 rounded-full border-2 border-forest-vibrant border-t-transparent"></span>
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Mapping sports biometrics...</span>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Quick Presets / Triggers list */}
            <div className="px-6 py-3 bg-gray-50/90 dark:bg-black/40 border-t border-b border-gray-200 dark:border-white/5 flex gap-2 overflow-x-auto custom-scrollbar whitespace-nowrap scroll-smooth py-2.5">
              <button 
                onClick={() => triggerCoachQuery("Analyze my squats recovery plan with 92% status.")}
                className="bg-white dark:bg-white/5 hover:border-forest-vibrant text-xs py-1.5 px-3 rounded border border-gray-200 dark:border-white/10 font-sans text-xs cursor-pointer focus:outline-none shrink-0"
              >
                🏋️‍♂️ Recovery Plan Analysis
              </button>
              <button 
                onClick={() => triggerCoachQuery("Suggest pre-workout and post-workout nutrition layout")}
                className="bg-white dark:bg-white/5 hover:border-forest-vibrant text-xs py-1.5 px-3 rounded border border-gray-200 dark:border-white/10 font-sans text-xs cursor-pointer focus:outline-none shrink-0"
              >
                🍏 Pre/Post Nutrition Layout
              </button>
              <button 
                onClick={() => triggerCoachQuery("Provide zone-5 HIIT cardiovascular cardiac protocols")}
                className="bg-white dark:bg-white/5 hover:border-forest-vibrant text-xs py-1.5 px-3 rounded border border-gray-200 dark:border-white/10 font-sans text-xs cursor-pointer focus:outline-none shrink-0"
              >
                🏃‍♂️ Zone-5 HIIT Protocols
              </button>
            </div>

            {/* Live Message Input bar */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-black/30 border-t border-gray-200 dark:border-white/10 flex gap-2">
              <input 
                type="text" 
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Ask biological coaching calculations or protocol metrics..."
                className="w-full bg-gray-100 dark:bg-white/5 dark:text-white text-sm px-4 py-3 border-[0.5px] border-gray-300 dark:border-white/10 outline-none focus:border-forest-vibrant transition-all"
                disabled={isGenerating}
              />
              <button 
                type="submit" 
                className="bg-forest-vibrant text-white px-6 font-mono text-xs font-bold tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all select-none rounded-none cursor-pointer"
                disabled={isGenerating}
              >
                ASK
              </button>
            </form>

          </div>

        </div>

      </main>
    </div>
  );
}
