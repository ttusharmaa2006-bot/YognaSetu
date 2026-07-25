import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Loader from '../../components/Loader';
import DeleteConfirmationModal from '../../components/admin/DeleteConfirmationModal';
import toast from 'react-hot-toast';
import { 
  PlusCircle, 
  Search, 
  Eye, 
  Edit3, 
  Trash2, 
  Building2, 
  Calendar, 
  Award,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

const ManageSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const response = await api.get('/schemes');
      if (response.data && response.data.success) {
        setSchemes(response.data.data || []);
      } else {
        toast.error(response.data?.message || 'Failed to load schemes');
      }
    } catch (error) {
      console.error('Error fetching schemes for management:', error);
      toast.error('Unable to fetch schemes. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  const openDeleteModal = (scheme) => {
    setSelectedScheme(scheme);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedScheme(null);
    setDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedScheme) return;
    const schemeId = selectedScheme.id || selectedScheme._id;
    setDeleting(true);

    try {
      const response = await api.delete(`/schemes/${schemeId}`);
      if (response.data && response.data.success) {
        toast.success(`Scheme "${selectedScheme.title}" deleted successfully!`);
        closeDeleteModal();
        fetchSchemes(); // Auto refresh table
      } else {
        toast.error(response.data?.message || 'Failed to delete scheme.');
      }
    } catch (error) {
      console.error('Delete scheme error:', error);
      const errorMsg = error.response?.data?.message || 'Failed to delete scheme.';
      toast.error(errorMsg);
    } finally {
      setDeleting(false);
    }
  };

  // Filter schemes locally based on search input
  const filteredSchemes = schemes.filter((scheme) => {
    const q = searchQuery.toLowerCase();
    return (
      (scheme.title && scheme.title.toLowerCase().includes(q)) ||
      (scheme.category && scheme.category.toLowerCase().includes(q)) ||
      (scheme.department && scheme.department.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 mb-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Admin Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Manage Government Schemes
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            View, edit, deactivate, or add new welfare programs.
          </p>
        </div>

        <Link
          to="/admin/schemes/create"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow transition shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Create New Scheme
        </Link>
      </div>

      {/* Filter / Search Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-5 h-5 text-slate-400 ml-2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter schemes by title, category, or department..."
          className="w-full text-sm bg-transparent focus:outline-none placeholder-slate-400"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-slate-400 hover:text-slate-600 font-semibold px-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* Schemes Data Table */}
      {loading ? (
        <div className="py-16">
          <Loader />
          <p className="text-center text-slate-500 text-xs mt-2">Loading scheme records...</p>
        </div>
      ) : filteredSchemes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">No Schemes Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery ? `No schemes matching "${searchQuery}".` : 'No government schemes have been added yet.'}
          </p>
          {!searchQuery && (
            <Link
              to="/admin/schemes/create"
              className="inline-block px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition mt-2"
            >
              Add First Scheme
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Scheme</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Deadline</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredSchemes.map((scheme) => {
                  const schemeId = scheme.id || scheme._id;
                  return (
                    <tr key={schemeId} className="hover:bg-slate-50/80 transition">
                      
                      {/* Image & Title Column */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                            {scheme.imageUrl ? (
                              <img
                                src={scheme.imageUrl}
                                alt={scheme.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=150&q=80';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white">
                                <Award className="w-5 h-5 text-white/50" />
                              </div>
                            )}
                          </div>
                          <div className="space-y-0.5">
                            <span className="font-bold text-slate-900 block leading-snug line-clamp-1">
                              {scheme.title}
                            </span>
                            {scheme.department && (
                              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                                <Building2 className="w-3 h-3 text-slate-400" />
                                {scheme.department}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[11px] font-bold rounded-lg border border-blue-100 inline-block">
                          {scheme.category || 'General'}
                        </span>
                      </td>

                      {/* Deadline */}
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{scheme.lastDate ? scheme.lastDate : 'No Deadline'}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {scheme.active !== false ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-full border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-600 text-[11px] font-bold rounded-full border border-slate-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                            Inactive
                          </span>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          
                          {/* View Button */}
                          <Link
                            to={`/schemes/${schemeId}`}
                            title="View Details"
                            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          {/* Edit Button */}
                          <Link
                            to={`/admin/schemes/edit/${schemeId}`}
                            title="Edit Scheme"
                            className="p-2 text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => openDeleteModal(scheme)}
                            title="Delete Scheme"
                            className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        schemeTitle={selectedScheme?.title || ''}
        loading={deleting}
      />

    </div>
  );
};

export default ManageSchemes;
