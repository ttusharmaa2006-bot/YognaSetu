import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import SchemeForm from '../../components/admin/SchemeForm';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';
import { ArrowLeft, Edit3, AlertCircle } from 'lucide-react';

const EditScheme = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchemeDetails = async () => {
      setFetching(true);
      setError(null);
      try {
        const response = await api.get(`/schemes/${id}`);
        if (response.data && response.data.success) {
          setInitialData(response.data.data);
        } else {
          setError(response.data?.message || 'Failed to load scheme details.');
        }
      } catch (err) {
        console.error('Error fetching scheme for editing:', err);
        setError('Unable to load scheme details. The requested scheme may not exist.');
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchSchemeDetails();
    }
  }, [id]);

  const handleUpdateScheme = async (payload) => {
    setSubmitting(true);
    try {
      const response = await api.put(`/schemes/${id}`, payload);
      if (response.data && response.data.success) {
        toast.success('Government Scheme updated successfully!');
        navigate('/admin/schemes');
      } else {
        toast.error(response.data?.message || 'Failed to update scheme.');
      }
    } catch (err) {
      console.error('Error updating scheme:', err);
      const errorMessage =
        err.response?.data?.message ||
        (err.response?.data?.errors ? Object.values(err.response.data.errors).join(', ') : 'Failed to update scheme.');
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (fetching) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Loader />
        <p className="text-center text-slate-500 text-xs mt-3">Loading scheme details for editing...</p>
      </div>
    );
  }

  if (error || !initialData) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold text-red-900">Scheme Not Found</h2>
          <p className="text-sm text-red-700">{error || 'Scheme records could not be found.'}</p>
          <Link
            to="/admin/schemes"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Manage Schemes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Back Link */}
      <div>
        <Link
          to="/admin/schemes"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Manage Schemes
        </Link>
      </div>

      {/* Page Title Header */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
          <Edit3 className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Edit Government Scheme
          </h1>
          <p className="text-xs text-slate-500">
            Update scheme metadata, eligibility requirements, or deadline info for "{initialData.title}".
          </p>
        </div>
      </div>

      {/* Reusable Scheme Form */}
      <SchemeForm
        initialData={initialData}
        onSubmit={handleUpdateScheme}
        loading={submitting}
        submitText="Update Scheme"
      />

    </div>
  );
};

export default EditScheme;
