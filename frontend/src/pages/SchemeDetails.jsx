import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Building2,
  CheckCircle2,
  AlertCircle,
  FileText,
  UserCheck,
  Award,
  Sparkles,
  ShieldCheck,
  Briefcase,
  Users,
  DollarSign,
  Bookmark
} from 'lucide-react';

const SchemeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarking, setBookmarking] = useState(false);

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to save/bookmark schemes.');
      return;
    }
    setBookmarking(true);
    try {
      const response = await api.post(`/users/bookmarks/${id}`);
      if (response.data && response.data.success) {
        toast.success(`"${scheme.title}" saved to your bookmarks!`);
      } else {
        toast.error(response.data?.message || 'Failed to bookmark scheme.');
      }
    } catch (err) {
      console.error('Error bookmarking scheme:', err);
      toast.error('Failed to save bookmark.');
    } finally {
      setBookmarking(false);
    }
  };

  useEffect(() => {
    const fetchSchemeDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/schemes/${id}`);
        if (response.data && response.data.success) {
          setScheme(response.data.data);
        } else {
          setError(response.data?.message || 'Scheme details not found.');
        }
      } catch (err) {
        console.error('Error fetching scheme details:', err);
        setError('Unable to load scheme details. The requested scheme may not exist or backend service is unavailable.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSchemeDetails();
    }
  }, [id]);

  const handleVisitOfficialSite = () => {
    const targetUrl = scheme?.officialWebsite || scheme?.officialLink;
    if (targetUrl) {
      const formattedUrl = targetUrl.startsWith('http://') || targetUrl.startsWith('https://')
        ? targetUrl
        : `https://${targetUrl}`;
      window.open(formattedUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Loader />
        <p className="text-center text-slate-500 text-xs mt-3">Fetching official scheme details...</p>
      </div>
    );
  }

  if (error || !scheme) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold text-red-900">Scheme Not Found</h2>
          <p className="text-sm text-red-700">{error || 'The requested scheme could not be retrieved.'}</p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => navigate('/schemes')}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Schemes
            </button>
          </div>
        </div>
      </div>
    );
  }

  const eligibility = scheme.eligibility || {};

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Navigation Bar */}
      <div>
        <Link
          to="/schemes"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Schemes
        </Link>
      </div>

      {/* Main Details Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="relative h-64 sm:h-80 bg-slate-100">
          {scheme.imageUrl ? (
            <img
              src={scheme.imageUrl}
              alt={scheme.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=80';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center p-8 text-white">
              <Award className="w-20 h-20 text-white/30" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-sm">
                {scheme.category || 'Welfare Scheme'}
              </span>
              {scheme.schemeType && (
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-lg border border-white/30">
                  {scheme.schemeType} SCHEME
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              {scheme.title}
            </h1>

            {scheme.department && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 mt-2 font-medium">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>{scheme.department}</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">Application Deadline</span>
              <span className="text-sm font-bold text-slate-800">
                {scheme.lastDate ? scheme.lastDate : 'Open Year-Round'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">Status</span>
              <span className="text-sm font-bold text-emerald-700 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Active Government Initiative
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-start sm:justify-end gap-3">
            {isAuthenticated && (
              <button
                onClick={handleBookmark}
                disabled={bookmarking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm px-5 py-3 rounded-xl border border-slate-300 shadow-sm transition disabled:opacity-50"
              >
                <Bookmark className="w-4 h-4 text-blue-600 fill-blue-600" />
                {bookmarking ? 'Saving...' : 'Save Scheme'}
              </button>
            )}
            {(scheme.officialWebsite || scheme.officialLink) && (
              <button
                onClick={handleVisitOfficialSite}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-sm transition"
              >
                Visit Official Website
                <ExternalLink className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Overview, Benefits, Required Documents */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Description Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Scheme Overview
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {scheme.description || 'No detailed description available for this scheme.'}
            </p>
          </div>

          {/* Key Benefits Section */}
          {scheme.benefits && (
            <div className="bg-gradient-to-br from-blue-50/70 to-indigo-50/70 rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-blue-950 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Key Scheme Benefits
              </h2>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200 text-sm text-slate-800 leading-relaxed font-medium">
                {scheme.benefits}
              </div>
            </div>
          )}

          {/* Required Documents Section */}
          {scheme.requiredDocuments && scheme.requiredDocuments.length > 0 && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Required Documents
              </h2>
              <p className="text-xs text-slate-500">
                Keep the following documents handy when applying via the official government portal:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {scheme.requiredDocuments.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right 1 Column: Eligibility Summary Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5 sticky top-24">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <UserCheck className="w-5 h-5 text-blue-600" />
              Eligibility Criteria
            </h2>

            <div className="space-y-4 text-xs">
              
              {/* Age Limits */}
              {(eligibility.minAge !== undefined || eligibility.maxAge !== undefined) && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">Age Bracket</span>
                    <span className="text-sm font-bold text-slate-800">
                      {eligibility.minAge ?? 0} to {eligibility.maxAge ?? 'No upper limit'} Years
                    </span>
                  </div>
                </div>
              )}

              {/* Annual Income */}
              {eligibility.maxAnnualIncome !== undefined && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">Max Annual Income</span>
                    <span className="text-sm font-bold text-slate-800">
                      {eligibility.maxAnnualIncome > 9000000 
                        ? 'No Income Limit' 
                        : `Up to ₹${eligibility.maxAnnualIncome.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                </div>
              )}

              {/* Occupations */}
              {eligibility.occupations && eligibility.occupations.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">Eligible Occupations</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {eligibility.occupations.map((occ, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 font-medium rounded text-[11px]">
                          {occ}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Caste Categories */}
              {eligibility.casteCategories && eligibility.casteCategories.length > 0 && (
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block mb-1.5">Social Category</span>
                  <div className="flex flex-wrap gap-1">
                    {eligibility.casteCategories.map((caste, i) => (
                      <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 font-medium rounded text-[11px]">
                        {caste}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Target Genders */}
              {eligibility.genders && eligibility.genders.length > 0 && (
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block mb-1.5">Gender Eligibility</span>
                  <div className="flex flex-wrap gap-1">
                    {eligibility.genders.map((g, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-800 font-semibold rounded text-[11px]">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Application Note */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-relaxed mt-4">
              <span className="font-bold block">Important Notice:</span>
              YognaSetu provides scheme information for discovery purposes. Applications are processed directly on official government web portals.
            </div>

            {/* Official Link Button */}
            {(scheme.officialWebsite || scheme.officialLink) && (
              <button
                onClick={handleVisitOfficialSite}
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition shadow-sm mt-2"
              >
                Visit Official Website
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};

export default SchemeDetails;
