import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Sparkles,
  Award,
  CheckCircle2,
  X,
  ArrowRight,
  ShieldAlert,
  Brain,
  Moon,
  Heart,
  Activity,
  Flame,
  Users,
  Compass,
} from 'lucide-react';
import { MentalHealthArticle, ArticleTopic } from '../types';
import { mentalHealthArticles } from '../data/articlesData';
import { useLanguage } from '../context/LanguageContext';

interface CopingStrategiesSectionProps {
  onBookPsychiatrist: () => void;
}

export const CopingStrategiesSection: React.FC<CopingStrategiesSectionProps> = ({
  onBookPsychiatrist,
}) => {
  const { language, t } = useLanguage();
  const [selectedTopic, setSelectedTopic] = useState<ArticleTopic>('all');
  const [activeArticle, setActiveArticle] = useState<MentalHealthArticle | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const topicsList: { key: ArticleTopic; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: t.topicAll, icon: <Compass className="w-3.5 h-3.5" /> },
    { key: 'anxiety', label: t.topicAnxiety, icon: <Activity className="w-3.5 h-3.5" /> },
    { key: 'depression', label: t.topicDepression, icon: <Brain className="w-3.5 h-3.5" /> },
    { key: 'sleep', label: t.topicSleep, icon: <Moon className="w-3.5 h-3.5" /> },
    { key: 'stress', label: t.topicStress, icon: <Flame className="w-3.5 h-3.5" /> },
    { key: 'mindfulness', label: t.topicMindfulness, icon: <Heart className="w-3.5 h-3.5" /> },
    { key: 'relationships', label: t.topicRelationships, icon: <Users className="w-3.5 h-3.5" /> },
  ];

  const filteredArticles = mentalHealthArticles.filter((art) => {
    return selectedTopic === 'all' || art.topic === selectedTopic;
  });

  const handleOpenArticle = (art: MentalHealthArticle) => {
    setActiveArticle(art);
    setCompletedSteps({});
  };

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const getTopicColor = (topic: string) => {
    switch (topic) {
      case 'anxiety':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'depression':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'sleep':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'stress':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'mindfulness':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'relationships':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      default:
        return 'bg-teal-50 text-teal-800 border-teal-200';
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-slate-100/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-100/80 text-teal-900 text-xs font-bold border border-teal-200 mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>{t.articlesSectionBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {t.articlesSectionTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
            {t.articlesSectionSubtitle}
          </p>

          {/* Topic Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {topicsList.map((top) => {
              const isSelected = selectedTopic === top.key;
              const count =
                top.key === 'all'
                  ? mentalHealthArticles.length
                  : mentalHealthArticles.filter((a) => a.topic === top.key).length;

              return (
                <button
                  key={top.key}
                  onClick={() => setSelectedTopic(top.key)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20 scale-105'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 shadow-2xs'
                  }`}
                >
                  {top.icon}
                  <span>{top.label}</span>
                  <span
                    className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? 'bg-teal-900/60 text-teal-100'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article) => {
              const title = article.title[language];
              const summary = article.summary[language];
              const evidence = article.evidenceBase[language];

              return (
                <div
                  key={article.id}
                  onClick={() => handleOpenArticle(article)}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border shadow-xs backdrop-blur-md bg-white/95 ${getTopicColor(
                            article.topic
                          )}`}
                        >
                          {article.topic}
                        </span>
                      </div>

                      <div className="absolute bottom-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-900/80 text-white backdrop-blur-md">
                          <Clock className="w-3 h-3 text-teal-300" />
                          <span>{article.readTime}</span>
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-teal-700">
                        <Award className="w-3.5 h-3.5" />
                        <span className="line-clamp-1">{evidence}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug line-clamp-2">
                        {title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {summary}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium truncate max-w-[170px]">
                      {article.medicalReviewer.split(',')[0]}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 group-hover:translate-x-1 transition-transform">
                      <span>{t.readGuideBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 max-w-md mx-auto">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-xs font-semibold text-slate-600">{t.noArticlesFound}</p>
          </div>
        )}
      </div>

      {/* Full Article & Practice Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 z-20 p-2 text-white/90 hover:text-white bg-slate-900/50 hover:bg-slate-900/80 rounded-full backdrop-blur-md transition-all shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Scroll Content */}
            <div className="overflow-y-auto flex-1">
              {/* Header Hero */}
              <div className="relative h-64 sm:h-72">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title[language]}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7 text-white">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-teal-500 text-white">
                      {activeArticle.topic}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-white/20 backdrop-blur-md text-white">
                      {activeArticle.readTime}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-white/20 backdrop-blur-md text-teal-200">
                      {activeArticle.evidenceBase[language]}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-tight text-white">
                    {activeArticle.title[language]}
                  </h2>

                  <p className="text-xs text-teal-200/90 font-medium mt-1">
                    {t.reviewedBy}: {activeArticle.medicalReviewer}
                  </p>
                </div>
              </div>

              {/* Article Content & Interactive Protocol */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Clinical Key Takeaway Box */}
                <div className="p-5 rounded-2xl bg-teal-50/80 border border-teal-200 text-teal-950 space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    <span>{t.keyTakeaway}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                    "{activeArticle.keyTakeaway[language]}"
                  </p>
                </div>

                {/* Full Clinical Summary */}
                <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {activeArticle.fullContent[language]}
                </div>

                {/* Step-by-Step Interactive Coping Exercise Protocol */}
                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      <span>{t.interactiveSteps}</span>
                    </h4>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {Object.values(completedSteps).filter(Boolean).length} /{' '}
                      {activeArticle.actionableSteps[language].length} completed
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {activeArticle.actionableSteps[language].map((step, idx) => {
                      const isDone = !!completedSteps[idx];
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleStep(idx)}
                          className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                            isDone
                              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 line-through opacity-75'
                              : 'bg-white border-slate-200/80 text-slate-800 hover:border-teal-300 shadow-2xs'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => toggleStep(idx)}
                            className="w-4 h-4 mt-0.5 text-teal-600 rounded focus:ring-teal-500 cursor-pointer shrink-0"
                          />
                          <span className="text-xs sm:text-sm font-medium leading-relaxed">
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Doctor CTA Banner */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <h5 className="text-xs sm:text-sm font-bold text-white">
                      {t.articleNeedDoctorNotice}
                    </h5>
                    <p className="text-[11px] text-teal-200/80">
                      {language === 'am'
                        ? 'ከባለሙያ የአእምሮ ሐኪሞች ጋር በቀጥታ በቪዲዮ ወይም በአካል ይማከሩ።'
                        : 'Connect directly with board-certified psychiatrists for individualized care.'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveArticle(null);
                      onBookPsychiatrist();
                    }}
                    className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
                  >
                    {t.articleBookSpecialistBtn}
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Bottom Close */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs rounded-xl transition-colors"
              >
                {t.closeGuide}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
