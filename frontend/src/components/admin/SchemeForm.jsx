import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Building2, 
  Globe, 
  Calendar, 
  FileText, 
  Award, 
  CheckCircle2, 
  Users, 
  DollarSign, 
  Briefcase,
  Layers,
  ArrowRight
} from 'lucide-react';

const CATEGORIES = [
  'Agriculture',
  'Education',
  'Healthcare',
  'Financial Inclusion',
  'Housing',
  'Women Empowerment',
  'Employment',
  'Social Security'
];

const GENDER_OPTIONS = ['MALE', 'FEMALE', 'OTHER'];
const CASTE_OPTIONS = ['GENERAL', 'OBC', 'SC', 'ST', 'MINORITY'];

const SchemeForm = ({ initialData, onSubmit, loading, submitText = 'Save Scheme' }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: 'Agriculture',
      department: '',
      schemeType: 'CENTRAL',
      benefits: '',
      requiredDocuments: '',
      officialWebsite: '',
      lastDate: '',
      imageUrl: '',
      active: true,
      minAge: 18,
      maxAge: 70,
      maxAnnualIncome: 600000,
      genders: ['MALE', 'FEMALE'],
      casteCategories: ['GENERAL', 'OBC', 'SC', 'ST'],
      occupations: 'Farmer, Student, Self-Employed, Salaried, Unemployed',
    },
  });

  // Populate initial values in edit mode
  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'Agriculture',
        department: initialData.department || '',
        schemeType: initialData.schemeType || 'CENTRAL',
        benefits: initialData.benefits || '',
        requiredDocuments: Array.isArray(initialData.requiredDocuments)
          ? initialData.requiredDocuments.join(', ')
          : initialData.requiredDocuments || '',
        officialWebsite: initialData.officialWebsite || initialData.officialLink || '',
        lastDate: initialData.lastDate || '',
        imageUrl: initialData.imageUrl || '',
        active: initialData.active !== undefined ? initialData.active : true,
        minAge: initialData.eligibility?.minAge ?? '',
        maxAge: initialData.eligibility?.maxAge ?? '',
        maxAnnualIncome: initialData.eligibility?.maxAnnualIncome ?? '',
        genders: initialData.eligibility?.genders || ['MALE', 'FEMALE'],
        casteCategories: initialData.eligibility?.casteCategories || ['GENERAL', 'OBC', 'SC', 'ST'],
        occupations: Array.isArray(initialData.eligibility?.occupations)
          ? initialData.eligibility.occupations.join(', ')
          : initialData.eligibility?.occupations || '',
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data) => {
    const formattedPayload = {
      title: data.title.trim(),
      description: data.description.trim(),
      category: data.category.trim(),
      department: data.department.trim(),
      schemeType: data.schemeType,
      benefits: data.benefits.trim(),
      requiredDocuments: data.requiredDocuments
        ? data.requiredDocuments.split(',').map((d) => d.trim()).filter(Boolean)
        : [],
      officialWebsite: data.officialWebsite.trim(),
      officialLink: data.officialWebsite.trim(),
      lastDate: data.lastDate || null,
      imageUrl: data.imageUrl ? data.imageUrl.trim() : null,
      active: Boolean(data.active),
      eligibility: {
        minAge: data.minAge !== '' ? Number(data.minAge) : null,
        maxAge: data.maxAge !== '' ? Number(data.maxAge) : null,
        maxAnnualIncome: data.maxAnnualIncome !== '' ? Number(data.maxAnnualIncome) : null,
        genders: Array.isArray(data.genders) ? data.genders : [],
        casteCategories: Array.isArray(data.casteCategories) ? data.casteCategories : [],
        occupations: data.occupations
          ? data.occupations.split(',').map((o) => o.trim()).filter(Boolean)
          : [],
      },
    };

    onSubmit(formattedPayload);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      
      {/* Basic Scheme Metadata */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            General Information
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Enter scheme title, category, department, and website URL.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Title */}
          <div className="md:col-span-2 space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Scheme Title *</label>
            <input
              type="text"
              placeholder="e.g. Pradhan Mantri Awas Yojana"
              className={`w-full px-4 py-2.5 text-sm bg-slate-50 border ${
                errors.title ? 'border-red-400' : 'border-slate-300'
              } rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              {...register('title', { required: 'Scheme title is required' })}
            />
            {errors.title && <p className="text-[11px] text-red-500 mt-0.5">{errors.title.message}</p>}
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Category *</label>
            <select
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              {...register('category', { required: 'Category is required' })}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-[11px] text-red-500 mt-0.5">{errors.category.message}</p>}
          </div>

          {/* Department */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Ministry / Department *</label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="e.g. Ministry of Housing and Urban Affairs"
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border ${
                  errors.department ? 'border-red-400' : 'border-slate-300'
                } rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                {...register('department', { required: 'Department is required' })}
              />
            </div>
            {errors.department && <p className="text-[11px] text-red-500 mt-0.5">{errors.department.message}</p>}
          </div>

          {/* Scheme Type */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Scheme Type *</label>
            <select
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              {...register('schemeType', { required: 'Scheme type is required' })}
            >
              <option value="CENTRAL">CENTRAL (Central Government)</option>
              <option value="STATE">STATE (State Government)</option>
            </select>
          </div>

          {/* Last Date */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Application Deadline</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                {...register('lastDate')}
              />
            </div>
          </div>

          {/* Official Website URL */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Official Website URL *</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="url"
                placeholder="https://pmaymis.gov.in"
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border ${
                  errors.officialWebsite ? 'border-red-400' : 'border-slate-300'
                } rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                {...register('officialWebsite', {
                  required: 'Official website URL is required',
                  pattern: {
                    value: /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/.*)?$/i,
                    message: 'Please enter a valid web URL',
                  },
                })}
              />
            </div>
            {errors.officialWebsite && (
              <p className="text-[11px] text-red-500 mt-0.5">{errors.officialWebsite.message}</p>
            )}
          </div>

          {/* Image URL */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Banner Image URL</label>
            <input
              type="url"
              placeholder="https://images.example.gov.in/scheme.jpg"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              {...register('imageUrl')}
            />
          </div>

          {/* Active Checkbox */}
          <div className="md:col-span-2 flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="active"
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              {...register('active')}
            />
            <label htmlFor="active" className="text-xs font-semibold text-slate-700 cursor-pointer">
              Mark scheme as active and publicly visible
            </label>
          </div>

        </div>
      </div>

      {/* Description & Benefits Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Description, Benefits & Documents
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Provide detailed scheme summaries and required documents list.</p>
        </div>

        <div className="space-y-6">
          
          {/* Description */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Scheme Overview / Description *</label>
            <textarea
              rows="4"
              placeholder="Enter full scheme description, objective, and scope..."
              className={`w-full p-4 text-sm bg-slate-50 border ${
                errors.description ? 'border-red-400' : 'border-slate-300'
              } rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              {...register('description', { required: 'Description is required' })}
            ></textarea>
            {errors.description && <p className="text-[11px] text-red-500 mt-0.5">{errors.description.message}</p>}
          </div>

          {/* Benefits */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Scheme Benefits *</label>
            <textarea
              rows="3"
              placeholder="e.g. Financial support of ₹6,000 per year or 6.5% interest subsidy."
              className={`w-full p-4 text-sm bg-slate-50 border ${
                errors.benefits ? 'border-red-400' : 'border-slate-300'
              } rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              {...register('benefits', { required: 'Benefits statement is required' })}
            ></textarea>
            {errors.benefits && <p className="text-[11px] text-red-500 mt-0.5">{errors.benefits.message}</p>}
          </div>

          {/* Required Documents (Comma-separated) */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Required Documents (Comma-separated) *</label>
            <input
              type="text"
              placeholder="Aadhaar Card, Income Certificate, Bank Passbook, Identity Proof"
              className={`w-full px-4 py-2.5 text-sm bg-slate-50 border ${
                errors.requiredDocuments ? 'border-red-400' : 'border-slate-300'
              } rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              {...register('requiredDocuments', { required: 'At least one document is required' })}
            />
            {errors.requiredDocuments && (
              <p className="text-[11px] text-red-500 mt-0.5">{errors.requiredDocuments.message}</p>
            )}
            <p className="text-[11px] text-slate-400">Separate multiple documents using commas.</p>
          </div>

        </div>
      </div>

      {/* Eligibility Parameters Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Eligibility Requirements
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Specify age, income limits, gender, category, and occupation criteria.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Min Age */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Minimum Age (Years)</label>
            <input
              type="number"
              placeholder="18"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              {...register('minAge')}
            />
          </div>

          {/* Max Age */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Maximum Age (Years)</label>
            <input
              type="number"
              placeholder="70"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              {...register('maxAge')}
            />
          </div>

          {/* Max Annual Income */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Max Annual Income (₹)</label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="number"
                placeholder="600000"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                {...register('maxAnnualIncome')}
              />
            </div>
          </div>

          {/* Gender checkboxes */}
          <div className="md:col-span-3 space-y-2">
            <label className="block text-xs font-semibold text-slate-700">Eligible Genders</label>
            <div className="flex flex-wrap gap-4">
              {GENDER_OPTIONS.map((gender) => (
                <label key={gender} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    value={gender}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    {...register('genders')}
                  />
                  {gender}
                </label>
              ))}
            </div>
          </div>

          {/* Caste Categories checkboxes */}
          <div className="md:col-span-3 space-y-2">
            <label className="block text-xs font-semibold text-slate-700">Eligible Social Categories</label>
            <div className="flex flex-wrap gap-4">
              {CASTE_OPTIONS.map((caste) => (
                <label key={caste} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    value={caste}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    {...register('casteCategories')}
                  />
                  {caste}
                </label>
              ))}
            </div>
          </div>

          {/* Occupations (Comma-separated) */}
          <div className="md:col-span-3 space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Eligible Occupations (Comma-separated)</label>
            <input
              type="text"
              placeholder="Farmer, Student, Self-Employed, Salaried, Unemployed"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              {...register('occupations')}
            />
          </div>

        </div>
      </div>

      {/* Submit Controls */}
      <div className="flex items-center justify-end gap-4">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-8 py-3 rounded-xl shadow-md transition disabled:opacity-50"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Saving...
            </>
          ) : (
            <>
              {submitText}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

    </form>
  );
};

export default SchemeForm;
