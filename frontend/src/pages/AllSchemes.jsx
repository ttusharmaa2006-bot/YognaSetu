import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { 
  Search, 
  Filter, 
  Calendar, 
  Building2, 
  ArrowRight, 
  AlertCircle, 
  RefreshCw,
  Sparkles,
  Award,
  Bookmark
} from 'lucide-react';

const CATEGORY_OPTIONS = [
  'All',
  'Agriculture',
  'Education',
  'Healthcare',
  'Financial Inclusion',
  'Housing',
  'Women Empowerment',
  'Employment',
  'Social Security'
];

const AllSchemes = () => {
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  
  const initialKeyword = searchParams.get('keyword') || searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter local states
  const [searchKeyword, setSearchKeyword] = useState(initialKeyword);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Fetch all schemes or filtered schemes
  const fetchSchemes = async (keyword = '', category = 'All') => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (keyword.trim()) {
        response = await api.get(`/schemes/search?keyword=${encodeURIComponent(keyword.trim())}`);
      } else if (category && category !== 'All') {
        response = await api.get(`/schemes/category/${encodeURIComponent(category)}`);
      } else {
        response = await api.get('/schemes');
      }

      if (response.data && response.data.success) {
        setSchemes(response.data.data || []);
      } else {
        setError(response.data?.message || 'Failed to fetch schemes.');
      }
    } catch (err) {
      console.error('Error fetching schemes:', err);
      setError('Unable to load government schemes. Please verify backend service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes(searchKeyword, selectedCategory);
  }, [selectedCategory]);

  const handleBookmark = async (schemeId, schemeTitle) => {
    if (!isAuthenticated) {
      toast.error('Please log in to save/bookmark schemes.');
      return;
    }
    try {
      const response = await api.post(`/users/bookmarks/${schemeId}`);
      if (response.data && response.data.success) {
        toast.success(`"${schemeTitle}" bookmarked!`);
      } else {
        toast.error(response.data?.message || 'Failed to bookmark scheme.');
      }
    } catch (err) {
      console.error('Bookmark error:', err);
      toast.error('Failed to bookmark scheme.');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSchemes(searchKeyword, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSearchKeyword('');
  };

  const handleResetFilters = () => {
    setSearchKeyword('');
    setSelectedCategory('All');
    fetchSchemes('', 'All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Controls Section */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-10 text-white shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Government Welfare Portal
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Discover Government Schemes
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Browse active Central and State Government initiatives designed to provide financial, educational, and social support.
          </p>
        </div>

        {/* Search Bar & Category Filter */}
        <form onSubmit={handleSearchSubmit} className="mt-8 grid grid-cols-1 sm:grid-cols-12 gap-3">
          
          {/* Keyword Search Input */}
          <div className="sm:col-span-7 relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search schemes by keyword, title, or department..."
              className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 transition"
            />
          </div>

          {/* Category Dropdown */}
          <div className="sm:col-span-3 relative flex items-center">
            <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full pl-10 pr-8 py-3 bg-slate-800 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition cursor-pointer appearance-none"
            >
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900 text-white">
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 pointer-events-none text-slate-400 text-xs">▼</div>
          </div>

          {/* Search Button */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full h-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition shadow-md flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Active Filter Indicator */}
      {(searchKeyword || selectedCategory !== 'All') && (
        <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <span>Filtering by:</span>
            {searchKeyword && (
              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full font-semibold text-xs">
                Keyword: "{searchKeyword}"
              </span>
            )}
            {selectedCategory !== 'All' && (
              <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full font-semibold text-xs">
                Category: {selectedCategory}
              </span>
            )}
          </div>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1 text-xs text-blue-600 font-semibold hover:underline"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        </div>
      )}

      {/* Schemes Grid or State Messages */}
      {loading ? (
        <div className="py-16">
          <Loader />
          <p className="text-center text-slate-500 text-xs mt-2">Loading active schemes...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-lg mx-auto space-y-3">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
          <h3 className="text-lg font-bold text-red-900">Error Loading Schemes</h3>
          <p className="text-sm text-red-700">{error}</p>
          <button
            onClick={() => fetchSchemes(searchKeyword, selectedCategory)}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      ) : schemes.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Schemes Found</h3>
          <p className="text-sm text-slate-500">
            We couldn't find any schemes matching your criteria. Try adjusting your search query or filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            View All Schemes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => (
            <div
              key={scheme.id || scheme._id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Image or Banner Header */}
                <div className="relative h-44 bg-slate-100 overflow-hidden">
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
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-4">
                      <Award className="w-12 h-12 text-white/40" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-blue-700 text-xs font-bold rounded-lg shadow-sm border border-slate-200">
                      {scheme.category || 'Welfare'}
                    </span>
                    {scheme.schemeType && (
                      <span className="px-2 py-0.5 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-semibold rounded-md uppercase tracking-wider">
                        {scheme.schemeType}
                      </span>
                    )}
                  </div>
                  {isAuthenticated && (
                    <button
                      onClick={() => handleBookmark(scheme.id || scheme._id, scheme.title)}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md text-slate-700 hover:text-blue-600 rounded-full shadow-sm border border-slate-200 transition"
                      title="Bookmark / Save Scheme"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug line-clamp-2">
                    {scheme.title}
                  </h3>

                  {scheme.department && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <Building2 className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">{scheme.department}</span>
                    </div>
                  )}

                  {scheme.description && (
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {scheme.description}
                    </p>
                  )}

                  {scheme.benefits && (
                    <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700 font-medium space-y-0.5">
                      <span className="text-[10px] text-blue-600 font-extrabold uppercase tracking-wide block">Key Benefit</span>
                      <p className="line-clamp-2">{scheme.benefits}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Action Bar */}
              <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{scheme.lastDate ? scheme.lastDate : 'No Deadline'}</span>
                </div>

                <Link
                  to={`/schemes/${scheme.id || scheme._id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition"
                >
                  View Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default AllSchemes;
