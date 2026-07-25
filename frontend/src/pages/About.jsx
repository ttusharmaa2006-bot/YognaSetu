import React from 'react';
import { APP_NAME } from '../utils/constants';
import { Target, Cpu, Shield, Users, Layers, CheckCircle2 } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About {APP_NAME}
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Connecting citizens with central and state welfare initiatives through standardized eligibility discovery.
        </p>
      </div>

      {/* What is YognaSetu */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3 text-blue-600">
          <Shield className="w-6 h-6" />
          <h2 className="text-xl font-bold text-slate-900">What is {APP_NAME}?</h2>
        </div>
        <p className="text-slate-600 leading-relaxed text-sm">
          {APP_NAME} is a centralized welfare discovery platform engineered to make government schemes accessible, transparent, and easy to evaluate for citizens across India—including students, farmers, women, and under-represented communities.
        </p>
        <p className="text-slate-600 leading-relaxed text-sm">
          Instead of manually browsing through dozens of fragmented ministry websites, beneficiaries can access standardized scheme schemas, requirements, and eligibility evaluations on a single unified client interface.
        </p>
      </section>

      {/* Purpose */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 text-blue-600">
          <Target className="w-6 h-6" />
          <h2 className="text-xl font-bold text-slate-900">Our Purpose & Mission</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Information Standardization
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Consolidating diverse state and central scheme specifications into structured, human-readable data formats.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Automated Eligibility Checking
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Evaluating complex eligibility criteria (age, income, occupation, category) instantly without bureaucracy.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Role-Based Access
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Providing dedicated citizen profiles for saving schemes and secure administrative portals for scheme creation.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Zero-Barrier UI Design
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clean, responsive layouts designed with accessible typography and intuitive navigation.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 text-blue-600">
          <Cpu className="w-6 h-6" />
          <h2 className="text-xl font-bold text-slate-900">Technology Stack</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Frontend Stack */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-200 pb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              Frontend Client
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="font-semibold text-slate-800">Core Framework</span>
                <span className="text-slate-500">React 18</span>
              </li>
              <li className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="font-semibold text-slate-800">Build Tool</span>
                <span className="text-slate-500">Vite 5</span>
              </li>
              <li className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="font-semibold text-slate-800">Styling Engine</span>
                <span className="text-slate-500">Tailwind CSS 3</span>
              </li>
              <li className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="font-semibold text-slate-800">Client Routing</span>
                <span className="text-slate-500">React Router DOM 6</span>
              </li>
              <li className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="font-semibold text-slate-800">HTTP Client</span>
                <span className="text-slate-500">Axios</span>
              </li>
              <li className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="font-semibold text-slate-800">Iconography</span>
                <span className="text-slate-500">Lucide React</span>
              </li>
            </ul>
          </div>

          {/* Backend Stack */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-200 pb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              Backend Services
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="font-semibold text-slate-800">Runtime & JDK</span>
                <span className="text-slate-500">Java 21</span>
              </li>
              <li className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="font-semibold text-slate-800">Framework</span>
                <span className="text-slate-500">Spring Boot 3.3.x</span>
              </li>
              <li className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="font-semibold text-slate-800">Security</span>
                <span className="text-slate-500">Spring Security 6 (JWT)</span>
              </li>
              <li className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="font-semibold text-slate-800">Database</span>
                <span className="text-slate-500">Spring Data MongoDB</span>
              </li>
              <li className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="font-semibold text-slate-800">Documentation</span>
                <span className="text-slate-500">Swagger / OpenAPI 3</span>
              </li>
              <li className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="font-semibold text-slate-800">Build Manager</span>
                <span className="text-slate-500">Apache Maven</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;
