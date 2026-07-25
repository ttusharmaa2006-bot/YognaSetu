import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Loader from '../../components/Loader';
import { 
  ShieldCheck, 
  Layers, 
  PlusCircle, 
  CheckCircle2, 
  FileText, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

const AdminDashboard = () => {
  const [totalSchemes, setTotalSchemes] = useState(0);
  const [activeSchemes, setActiveSchemes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      setLoading(true);
      try {
        const response = await api.get('/schemes');
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          const schemesList = response.data.data;
          setTotalSchemes(schemesList.length);
          setActiveSchemes(schemesList.filter(s => s.active !== false).length);
        }
      } catch (error) {
        console.error('Error fetching admin dashboard metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardMetrics();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            Admin Management Portal
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Administrator Dashboard
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Manage public government welfare schemes, edit eligibility parameters, and publish new citizen initiatives.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/admin/schemes/create"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-3 rounded-xl shadow transition"
          >
            <PlusCircle className="w-4 h-4" />
            Create Scheme
          </Link>
        </div>
      </div>

      {/* Metrics Counter Section */}
      {loading ? (
        <div className="py-8">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Total Schemes Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Schemes</span>
              <div className="text-3xl font-extrabold text-slate-900">{totalSchemes}</div>
              <p className="text-xs text-slate-500 font-medium">All registered schemes in database</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Layers className="w-7 h-7" />
            </div>
          </div>

          {/* Active Schemes Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Schemes</span>
              <div className="text-3xl font-extrabold text-emerald-600">{activeSchemes}</div>
              <p className="text-xs text-slate-500 font-medium">Currently visible to public citizens</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
          </div>

        </div>
      )}

      {/* Quick Navigation Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Manage Schemes Card */}
          <Link
            to="/admin/schemes"
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition space-y-4 group block"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition flex items-center justify-between">
                <span>Manage Schemes</span>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                View complete list of schemes, filter by category or title, edit details, or deactivate outdated initiatives.
              </p>
            </div>
          </Link>

          {/* Create New Scheme Card */}
          <Link
            to="/admin/schemes/create"
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition space-y-4 group block"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition flex items-center justify-between">
                <span>Create New Scheme</span>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition" />
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Publish a new government welfare initiative with eligibility rules, required documentation, and official portal links.
              </p>
            </div>
          </Link>

        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
