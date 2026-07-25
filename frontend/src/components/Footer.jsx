import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../utils/constants';
import { Landmark, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <Landmark className="w-6 h-6 text-blue-400" />
              <span className="font-heading font-bold text-lg">{APP_NAME}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering citizens by facilitating seamless discovery and eligibility analysis for Central & State Government Welfare Schemes.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">About YognaSetu</Link>
              </li>
            </ul>
          </div>

          {/* Repository & Meta */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Project Links</h4>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
