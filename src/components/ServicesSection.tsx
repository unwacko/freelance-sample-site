import React from 'react';
import { motion } from 'motion/react';
import { Database, Languages, Tag, Star } from 'lucide-react';
import { MANAGER_REVIEWS } from '../data';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      title: 'Data Annotation',
      icon: <Database className="w-6 h-6 text-blue-600 dark:text-red-500" />,
      description: 'Reviewing, structuring, and annotating text and multi-modal data for machine learning models, ensuring adherence to project guidelines and quality standards.'
    },
    {
      title: 'Marathi & English Translation',
      icon: <Languages className="w-6 h-6 text-blue-600 dark:text-red-500" />,
      description: 'Accurate translation and linguistic review between English and Marathi. Focus on grammatical precision, cultural context, and terminology consistency.'
    },
    {
      title: 'Data Labelling',
      icon: <Tag className="w-6 h-6 text-blue-600 dark:text-red-500" />,
      description: 'Categorizing datasets, tagging entities, classifying sentiment, and labelling text or media according to client specifications.'
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50 dark:bg-[#111111] border-t border-slate-200 dark:border-[#262626] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-20">
        
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-red-950/30 text-blue-700 dark:text-red-400 text-xs font-semibold border border-blue-200 dark:border-red-900/50">
            Services & Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Services Offered
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
            I perform data annotation, translation, and labelling across Mercor, Welocalize, OneForma, and Outlier, as well as for independent clients.
          </p>
        </div>

        {/* 3 Core Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((svc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl border border-slate-200 dark:border-[#262626] space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#222] flex items-center justify-center">
                  {svc.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{svc.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {svc.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* About Section */}
        <div className="bg-white dark:bg-[#1a1a1a] p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-[#262626] space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#222] text-slate-700 dark:text-slate-300 text-xs font-semibold">
            About
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Professional Background & Approach
          </h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            I am Piyush Pitre, an independent freelance specialist working with major platforms including Mercor, Welocalize, OneForma, and Outlier. My work centers on careful attention to guidelines, rigorous consistency, and reliable delivery for organizations and research teams requiring dependable data annotation and translation services.
          </p>
        </div>

        {/* Reviews Section */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Manager Reviews
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Feedback from managers and leads across platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MANAGER_REVIEWS.map((rev) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl border border-slate-200 dark:border-[#262626] space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-[#222] text-slate-700 dark:text-slate-300 font-semibold">
                      {rev.platform}
                    </span>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                    "{rev.reviewText}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-[#262626]">
                  <div className="font-bold text-sm text-slate-900 dark:text-white">{rev.role}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Platform Lead • {rev.platform}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
