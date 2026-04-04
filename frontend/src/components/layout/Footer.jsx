import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0c17] border-t border-white/10 text-white/60 py-20 px-6 sm:px-12 relative z-50 font-['DM_Sans']">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <Link to="/app" className="block hover:opacity-80 transition-opacity">
              <img src="/zorvyn-logo.png" alt="Zorvyn Fintech" style={{ height: '28px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm font-light">
              Building secure, compliant, and intelligent financial systems that scale with you. Trusted by 600+ companies worldwide.
            </p>
            <div className="pt-4">
              <a href="mailto:contact@zorvyn.io" className="block text-white hover:text-[#6c63ff] font-medium transition-colors mb-2">contact@zorvyn.io</a>
              <a href="#" className="block text-white hover:text-[#6c63ff] font-medium transition-colors">LinkedIn</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-['Sora'] font-semibold mb-6">Products</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><a href="#" className="hover:text-white transition-colors">Zorvyn Ledger</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Zorvyn Comply</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Zorvyn Insight</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-['Sora'] font-semibold mb-6">Solutions</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><a href="#" className="hover:text-white transition-colors">For Startups</a></li>
              <li><a href="#" className="hover:text-white transition-colors">For SMEs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">For Enterprises</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-['Sora'] font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-white font-['Sora'] font-semibold mb-6">Features</h4>
            <ul className="space-y-4 text-sm font-light mb-8">
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="w-full md:w-1/3">
            <h4 className="text-white font-['Sora'] font-semibold mb-4">Subscribe to Updates</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter your work email" className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#6c63ff]" />
              <button className="bg-[#6c63ff] hover:bg-[#5a52d5] text-white px-6 py-2 rounded-full font-medium text-sm transition-colors shrink-0">Submit</button>
            </div>
          </div>
          
          <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm font-light text-white/40">
            <p>© 2026 Zorvyn FinTech Pvt. Ltd. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
