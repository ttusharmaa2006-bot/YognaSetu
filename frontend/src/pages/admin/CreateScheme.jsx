import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import SchemeForm from '../../components/admin/SchemeForm';
import toast from 'react-hot-toast';
import { ArrowLeft, PlusCircle } from 'lucide-react';

const CreateScheme = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateScheme = async (payload) => {
    setLoading(true);
    try {
      const response = await api.post('/schemes', payload);
      if (response.data && response.data.success) {
        toast.success('Government Scheme created successfully!');
        navigate('/admin/schemes');
      } else {
        toast.error(response.data?.message || 'Failed to create scheme.');
      }
    } catch (error) {
      console.error('Error creating scheme:', error);
      const errorMessage =
        error.response?.data?.message ||
        (error.response?.data?.errors ? Object.values(error.response.data.errors).join(', ') : 'Failed to create scheme.');
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
          <PlusCircle className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Create New Government Scheme
          </h1>
          <p className="text-xs text-slate-500">
            Publish a new scheme with eligibility parameters, documentation list, and official links.
          </p>
        </div>
      </div>

      {/* Reusable Scheme Form */}
      <SchemeForm onSubmit={handleCreateScheme} loading={loading} submitText="Publish Scheme" />

    </div>
  );
};

export default CreateScheme;
