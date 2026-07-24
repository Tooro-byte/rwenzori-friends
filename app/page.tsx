"use client";

import React, { useState, useEffect } from "react";
import { 
  Trees, 
  Heart, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  Target, 
  CheckCircle2, 
  PieChart, 
  UserPlus, 
  Sparkles,
  Mail,
  MapPin,
  Phone,
  Send
} from "lucide-react";

export default function Home() {
  // Campaign & Donation State
  const [donatedAmount, setDonatedAmount] = useState(3200);
  const goalAmount = 5000;
  const pricePerSeedling = 2; // $2 per seedling
  const [selectedTier, setSelectedTier] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");

  // Mouse spotlight position
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll state for sticky header bar
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Impact Calculator state
  const [calculatorAmount, setCalculatorAmount] = useState(50);

  // Volunteer recruitment form state
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);
  const [volunteerName, setVolunteerName] = useState("");
  const [volunteerRole, setVolunteerRole] = useState("Field Planter");

  const percentage = Math.min(Math.round((donatedAmount / goalAmount) * 100), 100);
  const remaining = Math.max(goalAmount - donatedAmount, 0);
  const seedlingsPlanted = Math.floor(donatedAmount / pricePerSeedling);

  // Mouse movement listener for cursor spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll listener for persistent sticky bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDonate = (amount: number) => {
    setDonatedAmount((prev) => prev + amount);
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (volunteerName.trim()) {
      setVolunteerSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen bg-emerald-950 text-slate-100 font-sans relative overflow-x-hidden scroll-smooth">
      {/* 💡 1. Cursor Light Spotlight Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(52, 211, 153, 0.07), transparent 80%)`,
        }}
      />

      {/* 2. Floating Sticky Navigation Bar (Appears on Scroll) */}
      <div
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          showStickyBar
            ? "translate-y-0 opacity-100 shadow-2xl bg-emerald-950/90 backdrop-blur-md border-b border-emerald-800/80"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Trees className="w-6 h-6 text-emerald-400" />
            <span className="font-bold text-white text-sm hidden sm:inline">
              Friends Action For Nature
            </span>
            <span className="text-xs bg-emerald-900/80 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-700/50">
              {percentage}% Funded
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-emerald-200 hidden md:inline">
              ${remaining.toLocaleString()} needed to reach goal
            </span>
            <a
              href="#hero"
              className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-extrabold px-4 py-2 rounded-lg text-xs transition shadow-lg flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-emerald-950" />
              Donate Now
            </a>
          </div>
        </div>
      </div>

      {/* 3. Main Header Navigation */}
      <nav className="border-b border-emerald-800/50 bg-emerald-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-900/50 border border-emerald-700/50 rounded-xl">
              <Trees className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="font-bold text-lg text-white tracking-wide">
              Friends Action For Nature
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-emerald-200 font-medium">
            <a href="#hero" className="hover:text-emerald-400 transition">Campaign</a>
            <a href="#impact" className="hover:text-emerald-400 transition">Impact Calculator</a>
            <a href="#volunteer" className="hover:text-emerald-400 transition">Volunteer</a>
            <a href="#transparency" className="hover:text-emerald-400 transition">Transparency</a>
          </div>

          <a
            href="#hero"
            className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-4 py-2 rounded-xl transition text-sm shadow-md"
          >
            Donate Seedlings
          </a>
        </div>
      </nav>

      {/* 4. Hero Section & Live Donation Tracker */}
      <section id="hero" className="max-w-6xl mx-auto px-6 pt-12 pb-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Story & Photo */}
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full">
            <Target className="w-4 h-4 text-emerald-400" /> Kyanduli Village Reforestation Project
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Help Us Plant <span className="text-emerald-400">2,500 Seedlings</span> to Restore Kyanduli Village
          </h1>

          <p className="text-emerald-100/80 text-lg leading-relaxed">
            Severe deforestation has stripped Kyanduli Village of its native flora. 
            Join <strong className="text-white">Friends Action For Nature</strong> to supply local farmers with 
            indigenous tree seedlings, preventing soil erosion and rebuilding the green canopy.
          </p>

          <div className="relative rounded-2xl overflow-hidden border border-emerald-800/80 shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80" 
              alt="Hands holding tree seedling" 
              className="w-full h-48 object-cover hover:scale-105 transition duration-500"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-emerald-950/90 to-transparent p-3 text-xs text-emerald-200">
              🌱 Native seedlings ready for planting in Kyanduli Village
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-emerald-200/80">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>100% Transparent Funding</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" />
              <span>Community-Led Initiative</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Donation Card */}
        <div className="bg-emerald-900/40 border border-emerald-700/50 rounded-2xl p-6 shadow-2xl backdrop-blur-sm space-y-6">
          <div className="flex justify-between items-end border-b border-emerald-800/60 pb-4">
            <div>
              <p className="text-xs font-medium text-emerald-300 uppercase tracking-wider">
                Funds Raised
              </p>
              <h2 className="text-3xl font-black text-white">
                ${donatedAmount.toLocaleString()}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-emerald-300 uppercase tracking-wider">
                Target Goal
              </p>
              <p className="text-xl font-bold text-emerald-200">
                ${goalAmount.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-emerald-200 font-semibold">
              <span>{percentage}% Funded</span>
              <span>${remaining.toLocaleString()} Needed</span>
            </div>
            <div className="w-full bg-emerald-950 rounded-full h-3.5 overflow-hidden border border-emerald-800">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(52,211,153,0.5)]"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-center text-emerald-300/80 pt-1">
              🌱 <strong className="text-white">{seedlingsPlanted.toLocaleString()}</strong> seedlings funded so far!
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-semibold text-emerald-200 uppercase tracking-wider block">
              Select Donation Amount ($2 = 1 Seedling)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[10, 25, 50].map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedTier(amount);
                    setCustomAmount("");
                  }}
                  className={`py-2.5 rounded-lg font-bold border transition text-sm ${
                    selectedTier === amount && !customAmount
                      ? "bg-emerald-400 text-emerald-950 border-emerald-400 shadow-md"
                      : "bg-emerald-950/60 border-emerald-700/60 text-emerald-100 hover:border-emerald-400"
                  }`}
                >
                  ${amount}
                  <span className="block text-[10px] font-normal opacity-80">
                    {amount / pricePerSeedling} Trees
                  </span>
                </button>
              ))}
            </div>

            <input
              type="number"
              placeholder="Or enter custom amount ($)"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedTier(null);
              }}
              className="w-full bg-emerald-950/80 border border-emerald-700/60 rounded-lg px-3 py-2 text-sm text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400 transition"
            />
          </div>

          <button
            onClick={() => {
              const val = customAmount ? parseFloat(customAmount) : selectedTier;
              if (val && val > 0) handleDonate(val);
            }}
            className="w-full bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-extrabold py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 group text-base"
          >
            <Heart className="w-5 h-5 fill-emerald-950 group-hover:scale-110 transition" />
            Complete Donation
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. Interactive Impact Calculator Section */}
      <section id="impact" className="border-t border-emerald-800/50 bg-emerald-900/20 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-900/80 px-3 py-1 rounded-full border border-emerald-700/50 inline-block">
              Interactive Tool
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Calculate Your Environmental Impact
            </h2>
            <p className="text-emerald-200/80 leading-relaxed">
              Drag the slider to see how your contribution directly transforms Kyanduli Village. Every dollar helps purchase, protect, and plant native trees.
            </p>

            <div className="bg-emerald-950/80 border border-emerald-800 p-6 rounded-2xl space-y-6 shadow-lg">
              <div className="flex justify-between items-center">
                <span className="text-emerald-300 font-semibold">Your Contribution:</span>
                <span className="text-2xl font-extrabold text-emerald-400">${calculatorAmount}</span>
              </div>

              <input 
                type="range" 
                min="10" 
                max="500" 
                step="10"
                value={calculatorAmount}
                onChange={(e) => setCalculatorAmount(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer h-2 bg-emerald-900 rounded-lg"
              />

              <div className="grid grid-cols-3 gap-4 text-center pt-2">
                <div className="bg-emerald-900/50 border border-emerald-800 p-3 rounded-xl">
                  <p className="text-2xl font-bold text-white">{calculatorAmount / 2}</p>
                  <p className="text-[11px] text-emerald-300 uppercase mt-1">Trees Planted</p>
                </div>
                <div className="bg-emerald-900/50 border border-emerald-800 p-3 rounded-xl">
                  <p className="text-2xl font-bold text-white">{(calculatorAmount * 2.5).toFixed(0)}</p>
                  <p className="text-[11px] text-emerald-300 uppercase mt-1">Sq. Meters Restored</p>
                </div>
                <div className="bg-emerald-900/50 border border-emerald-800 p-3 rounded-xl">
                  <p className="text-2xl font-bold text-white">{(calculatorAmount * 0.1).toFixed(1)} t</p>
                  <p className="text-[11px] text-emerald-300 uppercase mt-1">CO₂ Absorbed / Yr</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-emerald-800/80 shadow-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80" 
              alt="Young seedling growing in soil" 
              className="w-full h-[380px] object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent p-6 flex flex-col justify-end">
              <span className="text-emerald-400 font-bold text-sm">Reforestation in Progress</span>
              <p className="text-emerald-100/90 text-sm">Restoring natural canopy and supporting indigenous wildlife in Kyanduli.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Volunteer Recruitment Section */}
      <section id="volunteer" className="py-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-2xl overflow-hidden border border-emerald-800/80 shadow-2xl order-2 md:order-1 group">
          <img 
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80" 
            alt="Community volunteers planting trees" 
            className="w-full h-[400px] object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent p-6 flex flex-col justify-end">
            <span className="text-emerald-400 font-bold text-sm">Community Field Work</span>
            <p className="text-emerald-100/90 text-sm">Join over 40+ local volunteers making hands-on impact on the ground.</p>
          </div>
        </div>

        <div className="space-y-6 order-1 md:order-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-900/80 px-3 py-1 rounded-full border border-emerald-700/50 inline-block">
            Get Involved
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Join the Field Team in Kyanduli
          </h2>
          <p className="text-emerald-200/80 leading-relaxed">
            Can’t donate financially? Give your time! We are recruiting passionate local volunteers for upcoming planting drives, community outreach, and logistics support.
          </p>

          {volunteerSubmitted ? (
            <div className="bg-emerald-900/60 border border-emerald-500 p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-6 h-6" />
                <span>Application Submitted!</span>
              </div>
              <p className="text-emerald-200 text-sm">
                Thank you, <strong className="text-white">{volunteerName}</strong>! Our field coordinator will contact you shortly about joining as a <strong>{volunteerRole}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleVolunteerSubmit} className="bg-emerald-900/40 border border-emerald-800 p-6 rounded-2xl space-y-4 shadow-lg">
              <div>
                <label className="text-xs font-medium text-emerald-300 block mb-1">Your Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter your name"
                  value={volunteerName}
                  onChange={(e) => setVolunteerName(e.target.value)}
                  className="w-full bg-emerald-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-emerald-300 block mb-1">Preferred Volunteer Role</label>
                <select 
                  value={volunteerRole}
                  onChange={(e) => setVolunteerRole(e.target.value)}
                  className="w-full bg-emerald-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="Field Planter">Tree Planting & Fieldwork</option>
                  <option value="Logistics Assistant">Logistics & Transportation</option>
                  <option value="Community Coordinator">Community Outreach & Education</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm"
              >
                <UserPlus className="w-4 h-4" />
                Apply as Volunteer
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 7. Financial Transparency & Donor Feed */}
      <section id="transparency" className="border-t border-emerald-800/50 bg-emerald-900/20 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-900/80 px-3 py-1 rounded-full border border-emerald-700/50 inline-block">
              100% Accountability
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Where Your Money Goes
            </h2>
            <p className="text-emerald-200/80 leading-relaxed">
              We ensure every dollar is maximized for on-the-ground ecological restoration in Kyanduli Village.
            </p>

            <div className="space-y-3">
              <div className="bg-emerald-950/80 border border-emerald-800 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-400/20 p-2.5 rounded-lg text-emerald-400">
                    <Trees className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Seedling Purchasing & Nursery Care</p>
                    <p className="text-xs text-emerald-300/80">Indigenous species sourced from local nurseries</p>
                  </div>
                </div>
                <span className="font-extrabold text-emerald-400 text-lg">85%</span>
              </div>

              <div className="bg-emerald-950/80 border border-emerald-800 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-400/20 p-2.5 rounded-lg text-emerald-400">
                    <PieChart className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Field Logistics & Soil Preparation</p>
                    <p className="text-xs text-emerald-300/80">Tools, compost, and transportation to Kyanduli</p>
                  </div>
                </div>
                <span className="font-extrabold text-emerald-400 text-lg">15%</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-950/80 border border-emerald-800 p-6 rounded-2xl space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white">Recent Supporters</h3>
              </div>
              <span className="text-xs text-emerald-400 font-semibold">Live Updates</span>
            </div>

            <div className="space-y-3">
              {[
                { name: "Sarah M.", amount: "$50", time: "3 mins ago", trees: "25 Trees" },
                { name: "David K.", amount: "$100", time: "14 mins ago", trees: "50 Trees" },
                { name: "Anonymous Donor", amount: "$20", time: "1 hour ago", trees: "10 Trees" },
                { name: "Kyanduli Youth Club", amount: "$250", time: "3 hours ago", trees: "125 Trees" },
              ].map((donor, idx) => (
                <div key={idx} className="bg-emerald-900/40 border border-emerald-800/60 p-3 rounded-xl flex justify-between items-center text-sm">
                  <div>
                    <p className="font-semibold text-white">{donor.name}</p>
                    <p className="text-xs text-emerald-300/80">{donor.trees} funded</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-400">{donor.amount}</p>
                    <p className="text-[10px] text-emerald-400/60">{donor.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Full 4-Column Footer */}
      <footer className="border-t border-emerald-800/60 bg-emerald-950/95 text-emerald-200 text-sm">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Column 1: Organization & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-900/60 border border-emerald-700/50 rounded-xl">
                <Trees className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="font-bold text-lg text-white tracking-wide">
                Friends Action For Nature
              </span>
            </div>
            <p className="text-emerald-300/80 text-xs leading-relaxed">
              Empowering local communities in Kyanduli Village through sustainable afforestation, soil protection, and indigenous seedling nursery development.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Registered NGO Initiative</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-emerald-300/80">
              <li>
                <a href="#hero" className="hover:text-emerald-400 transition">Donation Campaign</a>
              </li>
              <li>
                <a href="#impact" className="hover:text-emerald-400 transition">Impact Calculator</a>
              </li>
              <li>
                <a href="#volunteer" className="hover:text-emerald-400 transition">Join Field Team</a>
              </li>
              <li>
                <a href="#transparency" className="hover:text-emerald-400 transition">Financial Accountability</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Field Office</h4>
            <ul className="space-y-2.5 text-xs text-emerald-300/80">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Kyanduli Reforestation Hub, Uganda</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>contact@friendsactionnature.org</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+256 700 000 000</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Stay Updated</h4>
            <p className="text-xs text-emerald-300/80">
              Receive quarterly field reports and photo updates from Kyanduli Village.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full bg-emerald-900/50 border border-emerald-800 rounded-lg px-3 py-2 text-xs text-white placeholder-emerald-500 focus:outline-none focus:border-emerald-400 pr-9"
                />
                <button 
                  type="submit" 
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-emerald-500 text-emerald-950 rounded-md hover:bg-emerald-400 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-900/80 py-6 bg-emerald-950/80">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-emerald-400/70">
            <p>© 2026 Friends Action For Nature. Kyanduli Village Reforestation Project.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-emerald-300 transition">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-300 transition">Terms of Service</a>
              <a href="#" className="hover:text-emerald-300 transition">Audit Reports</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}