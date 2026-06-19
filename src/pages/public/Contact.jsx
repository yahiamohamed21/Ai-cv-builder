import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <main className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden bg-primary/5 dark:bg-primary/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">{t('contact_badge')}</span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1]">
              {t('contact_title_1')} <span className="text-primary">{t('contact_title_accent')}</span> {t('contact_title_2')}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto md:mx-0">
              {t('contact_desc')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-xl shadow-primary/25">
                <span className="material-symbols-outlined text-sm ltr:mr-1 rtl:ml-1">help</span>
                {t('contact_btn_help')}
              </button>
              <button className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors">
                {t('contact_btn_faq')}
              </button>
            </div>
          </div>
          <div className="flex-1 w-full max-w-lg">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative group">
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply transition-opacity group-hover:opacity-0"></div>
              <img className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" data-alt="Modern professional woman smiling in office setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSwfqAqx-838vZp_jsRJWkvMh4o_o4I_KieUQrlq0wnoQqDJWqVpiwBFQ-aHGBiFlqVMOzdLEK3EUVG8Pn2AeDgxEdpNohBSL2dySXKPARoaYODq9ni48qWDjyScl3SzXN2py2x8tS3vliWyt3Ln8RNDbweG5nxG16KWTiKRcC7o9oCFawIU0aqy3eX0nHE7TdQWzOLLaJOQ9JCVGb8_lrAab4I31lkFqCJurgFODjONZaRwf3W4PX9zrRxuHg3AfquEiQsglwavIb" alt="Support" />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-2xl border border-white/20">
                <p className="text-slate-900 dark:text-white font-medium italic">{t('contact_testimonial')}</p>
                <p className="mt-2 text-primary font-bold text-sm">{t('contact_testimonial_author')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="max-w-6xl mx-auto py-24 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t('contact_form_title')}</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">{t('contact_form_desc')}</p>
            </div>
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('contact_lbl_name')}</label>
                  <input className="w-full h-14 px-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white" placeholder={t('contact_ph_name')} type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('contact_lbl_email')}</label>
                  <input className="w-full h-14 px-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white" placeholder={t('contact_ph_email')} type="email" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('contact_lbl_subject')}</label>
                <select className="w-full h-14 px-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white appearance-none">
                  <option>{t('contact_subj_1')}</option>
                  <option>{t('contact_subj_2')}</option>
                  <option>{t('contact_subj_3')}</option>
                  <option>{t('contact_subj_4')}</option>
                  <option>{t('contact_subj_5')}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('contact_lbl_message')}</label>
                <textarea className="w-full p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white resize-none" placeholder={t('contact_ph_message')} rows="5"></textarea>
              </div>
              <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2" type="submit">
                <span className="material-symbols-outlined ltr:mr-1 rtl:ml-1">send</span>
                {t('contact_btn_send')}
              </button>
            </form>
          </div>
          {/* Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{t('contact_info_title')}</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{t('contact_info_email')}</p>
                      <a className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" href="mailto:hello@aicvbuilder.com">hello@aicvbuilder.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <span className="material-symbols-outlined">phone</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{t('contact_info_call')}</p>
                      <p className="text-slate-500 dark:text-slate-400" dir="ltr">+201090411612</p>
                      <p className="text-xs text-slate-400">{t('contact_info_hours')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <span className="material-symbols-outlined">location_on</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{t('contact_info_visit')}</p>
                      <p className="text-slate-500 dark:text-slate-400">{t('contact_info_address_1')}<br />{t('contact_info_address_2')}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{t('contact_follow_title')}</h3>
                <div className="flex gap-4">
                  <a className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all" href="#">
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                  </a>
                  <a className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all" href="#">
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                  </a>
                  <a className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all" href="#">
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path></svg>
                  </a>
                </div>
              </div>
            </div>
            {/* Mini Map */}
            <div className="w-full h-48 rounded-2xl overflow-hidden relative border border-slate-200 dark:border-slate-800" data-location="San Francisco" style={{}}>
              <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <img className="w-full h-full object-cover opacity-60 grayscale" data-alt="Stylized map showing office location in San Francisco" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2CLB3p_gW7gdNhx_nGH7x16xl9Gb6UehAs75HqdDaI3iev0tA9BzBCg1lV_3h3jLdk22o9HnCK7koCkj6cRlGRkpCp-l4-6C3UwIdPu1aHGEhsJuhWk8PVxRNAfE4fqm84orwT3G1TSqeAYXRo-oX16__Pv306jSGR_D55GOw6slhtCjMn_p3R2eGErhRrgxSCMdzNrsJjCFqQnKPL4gJB1BgFH3whYFAOHkIuNgED-kmhGjbKUgjWt1HkJqRT5wL9R1IlmSS7gwM" alt="map" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="size-10 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                    <span className="material-symbols-outlined text-primary text-3xl font-bold">location_on</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 px-3 py-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur rounded-lg text-[10px] font-bold text-slate-500 uppercase">
                {t('contact_map_label')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Center Preview */}
      <section className="bg-slate-900 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">{t('contact_help_title')}</h2>
          <p className="text-slate-400 text-lg">{t('contact_help_desc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left group" href="#">
              <span className="material-symbols-outlined text-primary mb-4 block">account_circle</span>
              <h4 className="text-white font-bold mb-2">{t('contact_h1_title')}</h4>
              <p className="text-sm text-slate-400 group-hover:text-slate-200">{t('contact_h1_desc')}</p>
            </a>
            <a className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left group" href="#">
              <span className="material-symbols-outlined text-primary mb-4 block">description</span>
              <h4 className="text-white font-bold mb-2">{t('contact_h2_title')}</h4>
              <p className="text-sm text-slate-400 group-hover:text-slate-200">{t('contact_h2_desc')}</p>
            </a>
            <a className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-left group" href="#">
              <span className="material-symbols-outlined text-primary mb-4 block">download</span>
              <h4 className="text-white font-bold mb-2">{t('contact_h3_title')}</h4>
              <p className="text-sm text-slate-400 group-hover:text-slate-200">{t('contact_h3_desc')}</p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}