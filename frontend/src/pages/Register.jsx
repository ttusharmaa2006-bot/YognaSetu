import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, User, Mail, Lock, ShieldAlert } from 'lucide-react';

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'ROLE_USER',
    },
  });

  const onSubmit = async (data) => {
    setServerError('');
    const result = await registerUser(data);
    if (result.success) {
      navigate('/login');
    } else if (result.error) {
      setServerError(result.error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl mx-auto flex items-center justify-center">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create your Account</h1>
          <p className="text-xs text-slate-500">
            Sign up to explore government schemes & check your eligibility
          </p>
        </div>

        {/* Server Error Alert */}
        {serverError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs text-red-700">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-500" />
            <span>{serverError}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Full Name */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="John Doe"
                className={`w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border ${
                  errors.name ? 'border-red-400' : 'border-slate-300'
                } rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                {...register('name', {
                  required: 'Full name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                })}
              />
            </div>
            {errors.name && (
              <p className="text-[11px] text-red-500 mt-0.5">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                placeholder="name@example.com"
                className={`w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border ${
                  errors.email ? 'border-red-400' : 'border-slate-300'
                } rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                {...register('email', {
                  required: 'Email address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address',
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-red-500 mt-0.5">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                placeholder="••••••••"
                className={`w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border ${
                  errors.password ? 'border-red-400' : 'border-slate-300'
                } rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="text-[11px] text-red-500 mt-0.5">{errors.password.message}</p>
            )}
          </div>

          {/* Account Role (Disabled & Fixed to Citizen / ROLE_USER) */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Account Type</label>
            <input
              type="text"
              value="Citizen / Beneficiary (ROLE_USER)"
              disabled
              className="w-full px-3 py-2 text-sm bg-slate-100 border border-slate-200 text-slate-500 rounded-lg cursor-not-allowed select-none"
            />
            <input type="hidden" value="ROLE_USER" {...register('role')} />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition disabled:opacity-50"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Redirect to Login */}
        <div className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Log in here
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;
