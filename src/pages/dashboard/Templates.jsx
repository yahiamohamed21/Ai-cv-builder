import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Templates() {
    const { t } = useTranslation();
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col font-display text-slate-900 dark:text-slate-100 bg-background-light dark:bg-background-dark antialiased overflow-x-hidden">
            <main className="max-w-[1280px] mx-auto w-full px-6 py-8 md:py-12 flex-1">
                {/* Hero Section */}
                <div className="flex flex-col gap-4 mb-10 text-center md:text-left">
                    <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">{t('templates_hero_title')}</h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl font-medium opacity-80">{t('templates_hero_desc')}</p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 mb-8 border-b border-primary/5 dark:border-slate-800 pb-6">
                    <button className="flex h-10 shrink-0 items-center justify-center rounded-full bg-primary px-6 text-white text-sm font-bold transition-all shadow-md shadow-primary/20 hover:bg-primary/90">
                        {t('templates_filter_all')}
                    </button>
                    <button className="flex h-10 shrink-0 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-6 text-slate-600 dark:text-slate-400 hover:border-primary/40 hover:text-primary dark:hover:text-primary text-sm font-semibold transition-all shadow-sm">
                        {t('templates_filter_tech')}
                    </button>
                    <button className="flex h-10 shrink-0 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-6 text-slate-600 dark:text-slate-400 hover:border-primary/40 hover:text-primary dark:hover:text-primary text-sm font-semibold transition-all shadow-sm">
                        {t('templates_filter_business')}
                    </button>
                    <button className="flex h-10 shrink-0 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-6 text-slate-600 dark:text-slate-400 hover:border-primary/40 hover:text-primary dark:hover:text-primary text-sm font-semibold transition-all shadow-sm">
                        {t('templates_filter_academic')}
                    </button>
                    <button className="flex h-10 shrink-0 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-6 text-slate-600 dark:text-slate-400 hover:border-primary/40 hover:text-primary dark:hover:text-primary text-sm font-semibold transition-all shadow-sm">
                        {t('templates_filter_executive')}
                    </button>
                    <button className="flex h-10 shrink-0 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-6 text-slate-600 dark:text-slate-400 hover:border-primary/40 hover:text-primary dark:hover:text-primary text-sm font-semibold transition-all shadow-sm">
                        {t('templates_filter_creative')}
                    </button>
                    <div className="ml-auto flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm font-medium mt-4 lg:mt-0">
                        <span>{t('templates_sort_by')}</span>
                        <select className="bg-transparent border-none focus:ring-0 text-primary font-bold py-0 cursor-pointer outline-none dark:bg-slate-900">
                            <option>{t('templates_sort_pop')}</option>
                            <option>{t('templates_sort_new')}</option>
                            <option>{t('templates_sort_ats')}</option>
                        </select>
                    </div>
                </div>

                {/* Template Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {/* Card 1 */}
                    <div className="group flex flex-col gap-4">
                        <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 aspect-[3/4]">
                            <img alt="Resume Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHADAzMTVd3uC1SjIOgBA6lkh_Zn3jQqlJcZjZBWPilKwjmJ0MOSTYocLO7-_-ZhaEGw0p4cLek4IATPTxKwLsfmxExEGOShHKVUj6eeM2XhJeMxJmHc-3GECBqKmgA1I1biB-7VAcJocCddyjLEBrdvtis80kf3MUatdU2_SoEUwC88L_mcb9LXxdbhZhxKA2HuEEnb6JcnInNqjuqIQ2ft5n2VLt_Dz6XrcErkw92SNhi38OAJTtQX0nMO2WMtRaypY4LMYWYcUF" />
                            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6">
                                <Link to="/builder?template=modern" className="w-full py-3 bg-primary text-white rounded-lg font-bold shadow-xl flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary/90">
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                    {t('templates_card_use')}
                                </Link>
                                <button className="w-full py-3 bg-white text-primary rounded-lg font-bold border border-primary/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 hover:bg-slate-50">
                                    {t('templates_card_preview')}
                                </button>
                            </div>
                            <div className="absolute top-3 right-3 bg-primary text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded shadow-sm">{t('templates_badge_popular')}</div>
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">{t('templates_t1_title')}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">{t('templates_t1_desc')}</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="group flex flex-col gap-4">
                        <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 aspect-[3/4]">
                            <img alt="Resume Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBycBl1dBujaXlQR456FnhsLAJC-ISbjg2lqEDLYneXBkQeaQfm6QDmzi5h5y9ZPb8Yt5IDzfy1kdifd-Y5KMvSr_2L8UKp_BzJYZJg4ggiFhy_VkWC9SY4RxsqbDLwndNqqXJEiue1vlGQptq1hst8-QPWbpihcoJU67RPj3-JiZ0jTrkgZjcvMMJtWEgnSr8qDaYbxWrb1yGSufK06leh6-9q4DidjUvfysi7zeQCVU8LXAVISTIpNJXR7LPgowaMsoLjrT8bj0UJ" />
                            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6">
                                <Link to="/builder?template=professional" className="w-full py-3 bg-primary text-white rounded-lg font-bold shadow-xl flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary/90">
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                    {t('templates_card_use')}
                                </Link>
                                <button className="w-full py-3 bg-white text-primary rounded-lg font-bold border border-primary/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 hover:bg-slate-50">
                                    {t('templates_card_preview')}
                                </button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">{t('templates_t2_title')}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">{t('templates_t2_desc')}</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="group flex flex-col gap-4">
                        <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 aspect-[3/4]">
                            <img alt="Resume Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-50AkbwcpMpPV8d4GMAHWTjug-SVGs8n_ZGcahqUwadechoyBRZUaLd3MomAy7aR3F76e4dOY7OS08aKAknFxh6NCIWEIBAoongcKOI9ZTPKvb-8ES3pEwHBn_oGX9uYpIz_A5h_f2FK0n1NTwZ409YUBzUHcR6DWGug4BxR5jpcMH7ej_SWwFNAZCi0fdBC6nz8Pttufa52YJEpJByiZbLTvsZpLksjZCbmPn0OGjd_ME6m6PmFsrQRDXv1Yec8MdyNC4dzQJb13" />
                            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6">
                                <Link to="/builder?template=creative" className="w-full py-3 bg-primary text-white rounded-lg font-bold shadow-xl flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary/90">
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                    {t('templates_card_use')}
                                </Link>
                                <button className="w-full py-3 bg-white text-primary rounded-lg font-bold border border-primary/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 hover:bg-slate-50">
                                    {t('templates_card_preview')}
                                </button>
                            </div>
                            <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded shadow-sm">{t('templates_badge_new')}</div>
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">{t('templates_t3_title')}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">{t('templates_t3_desc')}</p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="group flex flex-col gap-4">
                        <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 aspect-[3/4]">
                            <img alt="Resume Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADP9ftCh9msq0KN9Fr2t25-Ja_KcqWry991h8GAoNgOhxT7bE4QjoZGX4jCeimms5RURIZJaEBajvUvCE3DzSEPE6QXPDbJec6hWWVmVc50zuVPERLtwm6KZNoobC4vfd0D2OGL-uI2G1EOpxYlSNl_GWR_ueJxFvPl1qHYMlNrXxPjPlFQV5Tzfz7ipSoTl4MybFOQCZLJWPId99bJHk7OONfEI9JGioNUYv8p3AZsDHFpszAXQeD3L7NyvhfHWtDR9r6mnAAkvoQ" />
                            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6">
                                <Link to="/builder" className="w-full py-3 bg-primary text-white rounded-lg font-bold shadow-xl flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary/90">
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                    {t('templates_card_use')}
                                </Link>
                                <button className="w-full py-3 bg-white text-primary rounded-lg font-bold border border-primary/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 hover:bg-slate-50">
                                    {t('templates_card_preview')}
                                </button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">{t('templates_t4_title')}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">{t('templates_t4_desc')}</p>
                        </div>
                    </div>

                    {/* Card 5 */}
                    <div className="group flex flex-col gap-4">
                        <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 aspect-[3/4]">
                            <img alt="Resume Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoK4kDDRQb3_eTjesRFHzJDceIM2U26KivwjZ0M8Xe_2VvlhMaMrazVVdJThiaMsvzVR4fnCUD_8tjA6EV7s4zYFRnF_IB5IAAxmrp5lZcgEmsX_UZLygKt1BgPfHmRd9y6ZQ28EXPpU98jShBahGoseWWLI9fDOGzNyFzCAueTiPPonByX9Z77YyfSHyB4n4BbCxchdnfeJEsayKT9qXyc6kWSvFQEqY1NNNHKViweSBOlyt49lO7POrzKp6t2EeXrBKHyS14nDfD" />
                            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6">
                                <Link to="/builder" className="w-full py-3 bg-primary text-white rounded-lg font-bold shadow-xl flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary/90">
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                    {t('templates_card_use')}
                                </Link>
                                <button className="w-full py-3 bg-white text-primary rounded-lg font-bold border border-primary/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 hover:bg-slate-50">
                                    {t('templates_card_preview')}
                                </button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">{t('templates_t5_title')}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">{t('templates_t5_desc')}</p>
                        </div>
                    </div>

                    {/* Card 6 */}
                    <div className="group flex flex-col gap-4">
                        <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 aspect-[3/4]">
                            <img alt="Resume Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCc8DnRaRjo5-79tnINdKWlttrjAYChK1gnEF3Gx_Eimve3nPlqt6xCtD5YPB4MXTMVdQUOjZKVnE4VGKbuHvfP_N5xQyfc7nNji0qNgTs6xkS-__MJVCA_UWa9QIDNNl3q1895mxo6mcowpFdxPiuoqIfqawEtH9yGcA7PM_NPqWDqUTdZ_avu8YyYLzlCAEZxxG8-fx0rp9rhBuN8R7c3d5UpAfdYryShAMR1T_xpe6hg0jMqv6FYNCsfHYBLpPGkUCcHPgw3oeR" />
                            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6">
                                <Link to="/builder" className="w-full py-3 bg-primary text-white rounded-lg font-bold shadow-xl flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary/90">
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                    {t('templates_card_use')}
                                </Link>
                                <button className="w-full py-3 bg-white text-primary rounded-lg font-bold border border-primary/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 hover:bg-slate-50">
                                    {t('templates_card_preview')}
                                </button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">{t('templates_t6_title')}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">{t('templates_t6_desc')}</p>
                        </div>
                    </div>

                    {/* Card 7 */}
                    <div className="group flex flex-col gap-4">
                        <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 aspect-[3/4]">
                            <img alt="Resume Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlT1UWp4Xn1BFI4HAl202VI6YdtXUI_pInx7gTftJqCe2u2TNjvo5148N8STSYH28Ii5GlvCXQmTIdrJTg_JNQ-TuMTq_bTmXCSHT3nZCz-pN5b9ZR0QM9OepOFtjZTqOmwzpQIWnSyzkz6DFp_INUoc8HUXk9ktco1hNM3YH4F8ANRfl0EE6NxZREhWOuTtodhPl-nvyVMADE3gRf8PYh0f1pEZNfr6cRwUsCwiKqwEij2wyoHpalGi652ZkFoQj1xJZc-9UD37nR" />
                            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6">
                                <Link to="/builder" className="w-full py-3 bg-primary text-white rounded-lg font-bold shadow-xl flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary/90">
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                    {t('templates_card_use')}
                                </Link>
                                <button className="w-full py-3 bg-white text-primary rounded-lg font-bold border border-primary/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 hover:bg-slate-50">
                                    {t('templates_card_preview')}
                                </button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">{t('templates_t7_title')}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">{t('templates_t7_desc')}</p>
                        </div>
                    </div>

                    {/* Card 8 */}
                    <div className="group flex flex-col gap-4">
                        <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 aspect-[3/4]">
                            <img alt="Resume Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlrfLKZjvA4K414K0BHPq1wDOeohkdkjPEXHyErTyVWTkjHqIcCX9ucI72voiOjcQ26eHARpxaZ3JP1_iq8paZj_L8KfFvcUoqH11k-YH1flzoucqgiQcL6e1c17P__EHFPvDKiHqzTQ9Mpdpv3YOfjqjV68_oDzx4Y7tAmPeuv6ZMZD6EUt8lTT1Aip2lkLK44Tx3ee4rA-QxXm3p4yAFue9j839p1MX-BvKWISeEqV-rzkdpilUYu_V4NStJMAR98GK_vbnqi9XF" />
                            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6">
                                <Link to="/builder" className="w-full py-3 bg-primary text-white rounded-lg font-bold shadow-xl flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary/90">
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                    {t('templates_card_use')}
                                </Link>
                                <button className="w-full py-3 bg-white text-primary rounded-lg font-bold border border-primary/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 hover:bg-slate-50">
                                    {t('templates_card_preview')}
                                </button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight group-hover:text-primary transition-colors">{t('templates_t8_title')}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">{t('templates_t8_desc')}</p>
                        </div>
                    </div>
                </div>

                {/* Recently Added Header */}
                <div className="mt-16 mb-8 flex items-center justify-between">
                    <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight tracking-tight">{t('templates_inspire_title')}</h2>
                    <Link to="/templates" className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                        {t('templates_inspire_view_all')}
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                </div>

                {/* Smaller Inspiration Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md">
                        <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">developer_mode</span>
                        </div>
                        <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white">{t('templates_i1_title')}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t('templates_i1_desc')}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md">
                        <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">palette</span>
                        </div>
                        <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white">{t('templates_i2_title')}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t('templates_i2_desc')}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md">
                        <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">analytics</span>
                        </div>
                        <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white">{t('templates_i3_title')}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t('templates_i3_desc')}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md">
                        <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">rocket_launch</span>
                        </div>
                        <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-white">{t('templates_i4_title')}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t('templates_i4_desc')}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}