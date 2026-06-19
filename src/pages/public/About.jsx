import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-200 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center w-full">
        {/* Hero Section */}
        <div className="w-full max-w-[1200px] px-6 lg:px-10 py-12 lg:py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
              {t('about_title_1')} <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">{t('about_title_accent')}</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg lg:text-xl font-medium leading-relaxed max-w-lg">
              {t('about_desc')}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/register">
                <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-base font-bold transition-all hover:bg-primary/90 hover:scale-[1.02] shadow-lg shadow-primary/20">
                  {t('about_get_started')}
                </button>
              </Link>
              <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-base font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined ltr:mr-2 rtl:ml-2">play_circle</span>
                {t('about_watch_video')}
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 w-full h-[400px] bg-center bg-no-repeat bg-cover rounded-3xl shadow-2xl relative overflow-hidden group border border-slate-100 dark:border-slate-800" data-alt="Group of diverse professionals working together on laptops" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCa3j7OuHLA2vodzhkYzmmvkD1wPcUWhDJxzQr6-KdflvtE4lY3UxP8WpnPLQQVIMtuNEkXX3a8khQaNh9oiZtCzNu_YKKWw-19Ksi6LR4LntzVGXrd3AfTXQ0TXXtW-JxDfOP3CvyyE3Z1KTjPLF7YPbTrljXMXasokbXnutoj1bxV7CIJh5jvHPOf3hbm2iBOtp0JUiFZbGzmsyXIu8ELtyndMadttsjZBCM29w3UTfa3O-4_nSnJ6IC6wuBtTqXNGeRQVTfmnkM1')" }}>
            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="w-full bg-white dark:bg-slate-900/50 border-y border-slate-200 dark:border-white/5 py-16 backdrop-blur-sm">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <p className="text-primary text-4xl lg:text-5xl font-black tracking-tight">{t('about_stat1_val')}</p>
              <p className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-sm">{t('about_stat1_lbl')}</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-primary text-4xl lg:text-5xl font-black tracking-tight">{t('about_stat2_val')}</p>
              <p className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-sm">{t('about_stat2_lbl')}</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-primary text-4xl lg:text-5xl font-black tracking-tight flex items-center justify-center ltr:flex-row rtl:flex-row-reverse" dir="ltr">{t('about_stat3_val')}<span className="text-2xl text-slate-300 dark:text-slate-700">/5</span></p>
              <p className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-sm">{t('about_stat3_lbl')}</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-primary text-4xl lg:text-5xl font-black tracking-tight" dir="ltr">{t('about_stat4_val')}</p>
              <p className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-sm">{t('about_stat4_lbl')}</p>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="w-full max-w-[1200px] px-6 py-24">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="h-64 bg-center bg-cover rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800" data-alt="Modern collaborative workspace meeting" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsh6xfQVOgZ4I_gHSRgdiluCzomqxnk6VXuY4Y2SqoHVLFLZNJreUJVkJmZeGNxTMtCWUtc2S8THdl6K3cW9PmY1T7bUP-ul7yTyC5hDcsMWogLmJ9rKgl02cGft-PbCP3wZZY9OduoiRU3yFsruB5nHZ-7o5y2bU6U1ArxUPPD0RLb9ECFzzrMQwtxSMPzoMiDHA36SeLk24gHXg3_wY85ctGHqIOwYreP8BTNnrWsY0w_5MGQWIqpWTf6kQQKw6HwKmJSOEPxymP')" }}></div>
              <div className="h-64 bg-center bg-cover rounded-2xl shadow-lg mt-12 border border-slate-100 dark:border-slate-800" data-alt="Team brainstorming session with sticky notes" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBGO_mvFXJCUb2DcEj6-7qclPZOY3dF2joh3rBtOrwAlcK5wL1u3Pflt-tLGlgaE8CYe6YdKoGy5yut8co_ZysStYgGHPgacFiNlyPCHK4cPzkl5JX05zkS2osZ90YdIYK_iYNdaiANvLiOVNClen3vqfXyClxtYMMjj67A3BXSKDAulyG8iMfis_DDLxc7IC0BX4MNsjhWbOib-rYqRGQ2Cww_SmVH1PBnZcr_dqZm6wxBHjx89XDp2FFS9v8Q5L1OeniScAHuXYwG')" }}></div>
            </div>
            <div className="md:w-1/2">
              <div className="flex items-center gap-2 mb-6">
                <span className="h-0.5 w-8 bg-primary rounded-full"></span>
                <span className="text-primary font-bold uppercase tracking-widest text-sm">{t('about_story_badge')}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black mb-8 text-slate-900 dark:text-white tracking-tight">{t('about_story_title')}</h2>
              <div className="space-y-6 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                <p>{t('about_story_p1')}</p>
                <p>{t('about_story_p2')}</p>
                <p>{t('about_story_p3')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="w-full bg-slate-50 dark:bg-[#0d101b] py-24 border-y border-slate-200 dark:border-white/5">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">{t('about_why_title')}</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">{t('about_why_desc')}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-[#161b22] p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center mb-8">
                  <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{t('about_w1_title')}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{t('about_w1_desc')}</p>
              </div>
              <div className="bg-white dark:bg-[#161b22] p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center mb-8">
                  <span className="material-symbols-outlined text-primary text-3xl">person</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{t('about_w2_title')}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{t('about_w2_desc')}</p>
              </div>
              <div className="bg-white dark:bg-[#161b22] p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center mb-8">
                  <span className="material-symbols-outlined text-primary text-3xl">trending_up</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{t('about_w3_title')}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{t('about_w3_desc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="w-full max-w-[1200px] px-6 py-24">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">{t('about_team_title')}</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">{t('about_team_desc')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {/* CEO */}
            <div className="flex flex-col items-center text-center group">
              <div className="size-48 lg:size-56 rounded-[2rem] bg-center bg-cover mb-6 shadow-xl border border-slate-200 dark:border-white/10 group-hover:-translate-y-2 transition-transform duration-300 overflow-hidden" data-alt="Male CEO in business attire" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDlFQfkqMUnRKnOoks9w79rgxskzmk9zPPKNu8yC1gx6mrPTqGxcsNplbPi6MM2Wy-w6D2V6bmjuWn1s_GLK_9w665WxFYqT9R5RzgUB4APAIC9Ub2oHAn09tQGxXT3GvS9ksxZRVcaQ4PQIHoq8n_yQ92qU-JEj9Sm0kYUmfa0DTiovWXzWPKTcfqlk0fMg5yHHc5fn_vLzgyLsPJoJIaPWEOqox2ks-GCvkRoD2c72zORrKJSeD4uTDIyqK380OCT0NmN7LWxfCpb')" }}></div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white">David Chen</h4>
              <p className="text-primary font-bold mb-3">{t('about_t1_role')}</p>
              <p className="text-slate-600 dark:text-slate-400 font-medium max-w-xs">{t('about_t1_desc')}</p>
            </div>
            {/* Designer */}
            <div className="flex flex-col items-center text-center group">
              <div className="size-48 lg:size-56 rounded-[2rem] bg-center bg-cover mb-6 shadow-xl border border-slate-200 dark:border-white/10 group-hover:-translate-y-2 transition-transform duration-300 overflow-hidden" data-alt="Female Lead Designer smiling" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBqXb-qiLjf8eOtcJ1Sgm1gJ_wcbQQoGf3ogJcjiZ1dWwR3aIFWjZNsF9EvVVWGxN2SdPn02rR0Yar9-qzixBu0aMmlsJ4kwgQ1Omnu-8aE4uwUpxL-LRpJSgGC3Sp4rxZ2EskiEeO31dWKp0vR203Jxf4g_RcQB1T93Xx63pNRWAGXQxBK9ATFEkd2Afn1bTSMlup1KaYq755m6VC0d4VLImuyyVAa1gJuscnXby5J5mpDEgPr0JzBtqS9InkfwSFmZJBINhkR7Dz8')" }}></div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white">Sarah Jenkins</h4>
              <p className="text-primary font-bold mb-3">{t('about_t2_role')}</p>
              <p className="text-slate-600 dark:text-slate-400 font-medium max-w-xs">{t('about_t2_desc')}</p>
            </div>
            {/* AI Engineer */}
            <div className="flex flex-col items-center text-center group">
              <div className="size-48 lg:size-56 rounded-[2rem] bg-center bg-cover mb-6 shadow-xl border border-slate-200 dark:border-white/10 group-hover:-translate-y-2 transition-transform duration-300 overflow-hidden" data-alt="Male AI Engineer with glasses" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuByXRvQLGZ9iM-h40zmIhol5PXum7WQSc1cDygRPX_e9J-Es2oUQL1rrxRGGlCyTQFuJcIzVTvidiuNOfnvurfbkRJgP7OGSq2k8jHe34e-oCBZQahTxMAVTEDcNi_uEzjU4s_NCRyu7M86JHbUkmHryQnLI01RWa7qFm5z1t6iyqPR42rEUQzjXHUg6jlkfA28U6irZQbIMsP5L9bAkBnlCP4ZA7P6ZnjxL4SKLJ2TbDnGVW0NQzjd-TQyqrmi2V21XuTe1Gsa1O6o')" }}></div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white">Dr. Marcus Thorne</h4>
              <p className="text-primary font-bold mb-3">{t('about_t3_role')}</p>
              <p className="text-slate-600 dark:text-slate-400 font-medium max-w-xs">{t('about_t3_desc')}</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="w-full max-w-[1200px] px-6 pb-24">
          <div className="bg-primary rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 size-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 size-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">{t('about_cta_title')}</h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
                {t('about_cta_desc')}
              </p>
              <Link to="/register">
                <button className="bg-white text-primary px-12 py-5 rounded-2xl text-xl font-black hover:bg-slate-50 transition-all shadow-xl hover:scale-105">
                  {t('about_cta_btn')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-background-dark border-t border-slate-100 dark:border-slate-800 py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary p-2 rounded-lg">
                  <span className="material-symbols-outlined text-white text-sm">auto_awesome</span>
                </div>
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">AI CV Builder</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs leading-relaxed font-medium">{t('footer_desc')}</p>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-400">{t('footer_product')}</h5>
              <ul className="space-y-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                <li><Link className="hover:text-primary transition-colors" to="/register">{t('footer_resume_builder')}</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/templates">{t('footer_cv_templates')}</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/">{t('footer_cover_letter')}</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/about">{t('footer_pricing')}</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-400">{t('footer_support')}</h5>
              <ul className="space-y-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                <li><Link className="hover:text-primary transition-colors" to="/contact">{t('footer_help_center')}</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/contact">{t('footer_contact_us')}</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/">{t('footer_privacy')}</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/">{t('footer_terms')}</Link></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-400">{t('footer_newsletter')}</h5>
              <div className="flex gap-2">
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-primary focus:border-primary px-4 py-3 placeholder:text-slate-400 ltr:pl-4 rtl:pr-4" placeholder={t('footer_email_placeholder')} type="email" />
                <button className="bg-primary text-white px-4 rounded-xl hover:opacity-90 flex items-center justify-center transition-opacity shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-xl rtl:rotate-180">send</span>
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 dark:border-slate-800 text-center md:flex md:justify-between items-center">
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">{t('footer_copyright')}</p>
            <div className="flex justify-center gap-6 mt-6 md:mt-0">
              <Link className="text-slate-400 hover:text-primary transition-colors" to="/"><span className="material-symbols-outlined text-xl">public</span></Link>
              <Link className="text-slate-400 hover:text-primary transition-colors" to="/"><span className="material-symbols-outlined text-xl">alternate_email</span></Link>
              <Link className="text-slate-400 hover:text-primary transition-colors" to="/"><span className="material-symbols-outlined text-xl">language</span></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}