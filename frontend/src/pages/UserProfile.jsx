import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  ShieldCheck,
  Building2,
  Calendar,
  DollarSign,
  Briefcase,
  Users,
  Bookmark,
  Trash2,
  ExternalLink,
  Award,
  Save,
  CheckCircle2
} from 'lucide-react';

const STATE_OPTIONS = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir'
];

const GENDER_OPTIONS = ['MALE', 'FEMALE', 'OTHER'];
const CASTE_OPTIONS = ['GENERAL', 'OBC', 'SC', 'ST', 'MINORITY'];
const OCCUPATION_OPTIONS = ['Farmer', 'Student', 'Self-Employed', 'Salaried', 'Unemployed', 'Other'];

const UserProfile = () => {
  const { user: authUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [removingBookmarkId, setRemovingBookmarkId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchProfileAndBookmarks = async () => {
    setLoading(true);
    try {
      // Fetch profile
      const profileRes = await api.get('/users/profile');
      if (profileRes.data && profileRes.data.success) {
        const fullUser = profileRes.data.data;
        setProfileData(fullUser);

        const p = fullUser.profile || {};
        reset({
          gender: p.gender || 'MALE',
          state: p.state || 'Maharashtra',
          casteCategory: p.casteCategory || 'GENERAL',
          annualIncome: p.annualIncome !== undefined ? p.annualIncome : 300000,
          dob: p.dob || '',
          occupation: p.occupation || 'Student',
        });
      }

      // Fetch bookmarks
      const bookmarksRes = await api.get('/users/bookmarks');
      if (bookmarksRes.data && bookmarksRes.data.success) {
        setBookmarks(bookmarksRes.data.data || []);
      }
    } catch (err) {
      console.error('Error loading profile data:', err);
      toast.error('Failed to load profile details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileAndBookmarks();
  }, []);

  const handleProfileSubmit = async (data) => {
    setSaving(true);
    try {
      const payload = {
        gender: data.gender,
        state: data.state,
        casteCategory: data.casteCategory,
        annualIncome: Number(data.annualIncome),
        dob: data.dob,
        occupation: data.occupation,
      };

      const response = await api.put('/users/profile', payload);
      if (response.data && response.data.success) {
        toast.success('Demographic profile updated successfully!');
        fetchProfileAndBookmarks();
      } else {
        toast.error(response.data?.message || 'Failed to update profile.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      const msg = err.response?.data?.message || 'Failed to update profile.';
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveBookmark = async (schemeId) => {
    setRemovingBookmarkId(schemeId);
    try {
      const response = await api.delete(`/users/bookmarks/${schemeId}`);
      if (response.data && response.data.success) {
        toast.success('Bookmark removed.');
        setBookmarks((prev) => prev.filter((b) => (b.id || b._id) !== schemeId));
      } else {
        toast.error(response.data?.message || 'Failed to remove bookmark.');
      }
    } catch (err) {
      console.error('Error removing bookmark:', err);
      toast.error('Failed to remove bookmark.');
    } finally {
      setRemovingBookmarkId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Loader />
        <p className="text-center text-slate-500 text-xs mt-3">Loading profile details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-md shrink-0">
            {authUser?.name ? authUser.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{profileData?.fullName || profileData?.name || authUser?.name}</h1>
              <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 text-[11px] font-semibold rounded-full border border-blue-400/30">
                {profileData?.role || authUser?.role || 'ROLE_USER'}
              </span>
            </div>
            <p className="text-xs text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              {profileData?.email || authUser?.email}
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-xs text-slate-200 flex items-center gap-2 shrink-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Active Citizen Session</span>
        </div>
      </div>

      {/* Grid Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Profile Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Demographic Profile for Eligibility Assessment
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Update your personal demographic parameters to ensure accurate government scheme recommendations.
              </p>
            </div>

            <form onSubmit={handleSubmit(handleProfileSubmit)} className="space-y-5">
              
              {/* Gender & State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Gender */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Gender *</label>
                  <select
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    {...register('gender', { required: 'Gender is required' })}
                  >
                    {GENDER_OPTIONS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                {/* State */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">State of Residence *</label>
                  <select
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    {...register('state', { required: 'State is required' })}
                  >
                    {STATE_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Caste Category & Occupation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Caste Category */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Social / Caste Category *</label>
                  <select
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    {...register('casteCategory', { required: 'Category is required' })}
                  >
                    {CASTE_OPTIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Occupation */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Occupation *</label>
                  <select
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    {...register('occupation', { required: 'Occupation is required' })}
                  >
                    {OCCUPATION_OPTIONS.map((occ) => (
                      <option key={occ} value={occ}>{occ}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Annual Income & Date of Birth */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Annual Income */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Annual Family Income (₹) *</label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="number"
                      placeholder="300000"
                      className={`w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border ${
                        errors.annualIncome ? 'border-red-400' : 'border-slate-300'
                      } rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                      {...register('annualIncome', {
                        required: 'Annual income is required',
                        min: { value: 0, message: 'Income cannot be negative' },
                      })}
                    />
                  </div>
                  {errors.annualIncome && (
                    <p className="text-[11px] text-red-500 mt-0.5">{errors.annualIncome.message}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">Date of Birth *</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      className={`w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border ${
                        errors.dob ? 'border-red-400' : 'border-slate-300'
                      } rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                      {...register('dob', { required: 'Date of Birth is required' })}
                    />
                  </div>
                  {errors.dob && (
                    <p className="text-[11px] text-red-500 mt-0.5">{errors.dob.message}</p>
                  )}
                </div>

              </div>

              {/* Submit Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Saving Profile...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Profile Changes
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Right Column: Bookmarked Schemes List (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-blue-600 fill-blue-600" />
                Bookmarked Schemes ({bookmarks.length})
              </h2>
            </div>

            {bookmarks.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <Bookmark className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500 font-medium">No bookmarked schemes yet.</p>
                <p className="text-[11px] text-slate-400">
                  Explore schemes and click "Save Scheme" to track them here.
                </p>
                <Link
                  to="/schemes"
                  className="inline-block mt-2 text-xs text-blue-600 font-semibold hover:underline"
                >
                  Browse Schemes Catalog
                </Link>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {bookmarks.map((scheme) => {
                  const sId = scheme.id || scheme._id;
                  const isRemoving = removingBookmarkId === sId;
                  return (
                    <div
                      key={sId}
                      className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 transition space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">
                          {scheme.category || 'General'}
                        </span>
                        <button
                          onClick={() => handleRemoveBookmark(sId)}
                          disabled={isRemoving}
                          className="text-slate-400 hover:text-red-600 p-1 rounded transition"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                        {scheme.title}
                      </h3>

                      <div className="flex items-center justify-between pt-1 text-[11px]">
                        <span className="text-slate-500 truncate max-w-[150px]">
                          {scheme.department || 'Government Initiative'}
                        </span>
                        <Link
                          to={`/schemes/${sId}`}
                          className="text-blue-600 font-bold hover:underline flex items-center gap-1 shrink-0"
                        >
                          View
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};

export default UserProfile;
