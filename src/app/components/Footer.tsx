import { motion } from "motion/react";
import { Link } from "react-router";
import { Linkedin, Twitter, Instagram } from "lucide-react";
import imgFooterBg from "figma:asset/056cdbd1f8a175155566298749983a8a99c64ec8.png";
import imgLuuzonLarge from "figma:asset/e590c364f51c97c732e14f442ebd1311fc7618c2.png";

export function Footer() {
  return (
    <footer className="flex flex-col w-full font-sans">
      {/* Top Section - CTA */}
      

      {/* Bottom Section - Brand & Links */}
      <div className="relative w-full min-h-[600px] bg-transparent flex flex-col">
        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto p-4 md:p-8 flex items-center justify-center min-h-[600px]">

          {/* The Content Box */}
          <div className="w-full rounded-[2rem] p-8 md:p-16 lg:p-20 shadow-xl overflow-hidden text-[#1a1a1a] relative bg-[#000000]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              
              {/* Left Column */}
              <div className="flex flex-col justify-between h-full min-h-[400px] gap-12">
                <div className="space-y-10">
                  <h2 className="font-['Instrument_Serif:Regular',serif] text-5xl md:text-6xl lg:text-7xl leading-[0.9] uppercase tracking-tight max-w-xl text-[#ffffff]">
                    Get updates on fun stuff you probably want to know about in your inbox.
                  </h2>
                  
                  <div className="relative max-w-md border-b border-black/20 pb-2 group focus-within:border-black/60 transition-colors">
                    <input 
                      type="email" 
                      placeholder="Email address" 
                      className="w-full bg-transparent border-none outline-none text-lg placeholder:text-black/40 pb-2 focus:ring-0 text-[#1a1a1a]"
                    />
                    <button className="absolute right-0 bottom-3 text-black/60 hover:text-black transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Payment Icons Row */}
                
              </div>

              {/* Right Column */}
              <div className="flex flex-col justify-between h-full gap-12">
                 <div className="grid grid-cols-2 gap-8 md:gap-16">
                     <div>
                        <h3 className="font-bold text-lg mb-6 font-sans text-[#fcfcfc]">Menu</h3>
                        <ul className="space-y-4 text-sm font-medium text-black/60 font-sans">
                            <li><Link to="#" className="hover:text-black transition-colors">Shop All</Link></li>
                            <li><Link to="#" className="hover:text-black transition-colors">About Us</Link></li>
                            <li><Link to="#" className="hover:text-black transition-colors">Community</Link></li>
                            <li><Link to="#" className="italic hover:text-black transition-colors">(Vibes)</Link></li>
                        </ul>
                     </div>
                     <div>
                        <h3 className="font-bold text-lg mb-6 font-sans text-[#ffffff]">Support</h3>
                        <ul className="space-y-4 text-sm font-medium text-black/60 font-sans">
                            <li><Link to="#" className="hover:text-black transition-colors">Shipping & Returns</Link></li>
                            <li><Link to="#" className="hover:text-black transition-colors">Help & FAQ</Link></li>
                            <li><Link to="#" className="hover:text-black transition-colors">Terms & Conditions</Link></li>
                            <li><Link to="#" className="hover:text-black transition-colors">Privacy Policy</Link></li>
                            <li><Link to="#" className="hover:text-black transition-colors">Contact</Link></li>
                        </ul>
                     </div>
                 </div>

                 <div className="flex justify-between items-end mt-auto pt-8 border-t border-black/5">
                    <div className="flex items-center gap-4">
                      <a href="#" className="p-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                        <Instagram className="w-4 h-4" />
                      </a>
                      <a href="#" className="p-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a href="#" className="p-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                    
                    {/* Logo/Triangle */}
                    <div>
                        <img 
                          src={imgLuuzonLarge} 
                          alt="LUUZON" 
                          className="w-24 md:w-32 object-contain opacity-80 invert brightness-0" 
                        />
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
