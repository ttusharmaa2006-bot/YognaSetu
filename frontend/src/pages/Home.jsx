import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';
import { 
  Search, 
  GraduationCap, 
  Sprout, 
  HeartPulse, 
  Wallet, 
  ShieldCheck, 
  ArrowRight,
  Calendar,
  Building2,
  Award
} from 'lucide-react';

const CATEGORIES = [
  { name: 'Agriculture', icon: Sprout, count: '12+ Schemes' },
  { name: 'Education', icon: GraduationCap, count: '18+ Schemes' },
  { name: 'Healthcare', icon: HeartPulse, count: '9+ Schemes' },
  { name: 'Financial Inclusion', icon: Wallet, count: '15+ Schemes' },
];

const Home = () => {
  const navigate = useNavigate();
  const [latestSchemes, setLatestSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLatestSchemes = async () => {
      setLoading(true);
      try {
        // Fetch latest active schemes
        let response = await api.get('/schemes/latest');
        if (response.data && response.data.success && response.data.data && response.data.data.length > 0) {
          setLatestSchemes(response.data.data.slice(0, 6));
        } else {
          // Fallback to general schemes endpoint if latest endpoint returns empty
          const fallbackRes = await api.get('/schemes');
          if (fallbackRes.data && fallbackRes.data.success) {
            setLatestSchemes((fallbackRes.data.data || []).slice(0, 6));
          }
        }
      } catch (error) {
        console.error('Error loading latest schemes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestSchemes();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/schemes?keyword=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/schemes');
    }
  };

  return (
    <div className="space-y-16 py-8">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
          <ShieldCheck className="w-4 h-4" />
          Single Window Government Welfare Portal
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          Discover Welfare Schemes & Check Your <span className="text-blue-600">Eligibility</span> Effortlessly
        </h1>
        
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          YognaSetu connects citizens directly with Central and State Government schemes tailored to their socio-economic profile.
        </p>

        {/* Functional Search Box */}
        <div className="max-w-2xl mx-auto pt-2">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center bg-white rounded-xl shadow-sm border border-slate-300 p-1.5 focus-within:ring-2 focus-within:ring-blue-500 transition">
            <Search className="w-5 h-5 text-slate-400 ml-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search schemes by keyword, ministry, or category..."
              className="w-full px-3 py-2 text-sm text-slate-800 bg-transparent focus:outline-none placeholder-slate-400"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition shrink-0"
            >
              Search
            </button>
          </form>
          <p className="text-xs text-slate-400 text-left mt-2 pl-1">
            Popular searches: Agriculture, Post-Matric, PM-Kisan, Healthcare
          </p>
        </div>
      </section>

      {/* Project Introduction Section */}
      <section className="bg-slate-100/70 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-xl font-bold text-slate-900">What is YognaSetu?</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                YognaSetu acts as a digital bridge between government initiatives and citizens. By digitizing eligibility requirements and standardizing scheme information, we ensure eligible beneficiaries never miss out on vital government assistance.
              </p>
            </div>
            <div className="shrink-0">
              <div className="px-5 py-3 bg-blue-50 border border-blue-200 rounded-xl text-center">
                <span className="block text-2xl font-extrabold text-blue-600">100%</span>
                <span className="text-xs font-semibold text-slate-600">Free Public Platform</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Browse Categories</h2>
            <p className="text-sm text-slate-500">Explore government welfare schemes categorized by sector</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                to={`/schemes?category=${encodeURIComponent(cat.name)}`}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow transition space-y-3 block group"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition">{cat.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{cat.count}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Latest Government Schemes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Latest Government Schemes</h2>
            <p className="text-sm text-slate-500">Recently published welfare schemes and financial assistance programs</p>
          </div>
          <Link
            to="/schemes"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-xl transition"
          >
            Browse All Schemes
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12">
            <Loader />
          </div>
        ) : latestSchemes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
            <p className="text-sm text-slate-600">No active government schemes currently found in the system.</p>
            <Link
              to="/schemes"
              className="inline-block text-xs text-blue-600 font-semibold hover:underline"
            >
              Explore Schemes Page
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestSchemes.map((scheme) => (
              <div
                key={scheme.id || scheme._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Scheme Image or Decorative Top Header */}
                  <div className="relative h-40 bg-slate-100 overflow-hidden">
                    {scheme.imageUrl ? (
                      <img
                        src={scheme.imageUrl}
                        alt={scheme.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-blue-700 to-indigo-800 flex items-center justify-center p-4">
                        <Award className="w-10 h-10 text-white/30" />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-md text-blue-700 text-xs font-bold rounded-lg shadow-sm border border-slate-200">
                      {scheme.category || 'Welfare'}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug line-clamp-2">
                      {scheme.title}
                    </h3>
                    
                    {scheme.department && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{scheme.department}</span>
                      </div>
                    )}

                    {scheme.description && (
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {scheme.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{scheme.lastDate || 'No deadline'}</span>
                  </div>

                  <Link
                    to={`/schemes/${scheme.id || scheme._id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition"
                  >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA to browse all schemes */}
        <div className="text-center pt-4">
          <Link
            to="/schemes"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition"
          >
            Browse All Schemes
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Find Schemes Suited For Your Profile
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Our eligibility assessment system helps you identify schemes based on age, income, category, and state of residence.
          </p>
          <div className="pt-2">
            <Link
              to="/schemes"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-sm transition"
            >
              Explore All Available Schemes
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
