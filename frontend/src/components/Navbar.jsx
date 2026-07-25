import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { APP_NAME } from '../utils/constants';
import { useAuth } from '../context/AuthContext';
import { Landmark, User, LogOut, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-blue-600 hover:opacity-90 transition">
            <Landmark className="w-7 h-7 stroke-[2.2]" />
            <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900">
              {APP_NAME}
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6 text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/schemes"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }
            >
              Schemes
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }
            >
              About
            </NavLink>

            {/* Authenticated Links */}
            {isAuthenticated && role === 'ROLE_ADMIN' && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-600 font-semibold flex items-center gap-1'
                    : 'text-slate-600 hover:text-slate-900 flex items-center gap-1'
                }
              >
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Admin Dashboard
              </NavLink>
            )}

            {isAuthenticated && (
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-600 font-semibold flex items-center gap-1'
                    : 'text-slate-600 hover:text-slate-900 flex items-center gap-1'
                }
              >
                <User className="w-4 h-4 text-blue-600" />
                Profile
              </NavLink>
            )}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/profile"
                  className="text-xs text-slate-600 hover:text-blue-600 font-semibold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {user?.name || 'User'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;

