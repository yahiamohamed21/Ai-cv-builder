import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

export default function AdminTemplates() {
    const [activeTab, setActiveTab] = useState('All');
    const { t, i18n } = useTranslation();
    const isAr = (i18n.resolvedLanguage || i18n.language) === 'ar';

    const tabs = [
        { id: 'All', label: t('admin_tpl_all'), count: 24 },
        { id: 'Professional', label: t('admin_tpl_professional'), count: 12 },
        { id: 'Creative', label: t('admin_tpl_creative'), count: 8 },
        { id: 'Modern', label: t('admin_tpl_modern'), count: 4 },
        { id: 'Drafts', label: t('admin_tpl_drafts'), count: 3 },
    ];

    const [templatesList, setTemplatesList] = useState([
        {
            id: 1,
            title: 'Executive Pro',
            desc: 'Clean, structured layout for corporate leaders.',
            image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=500&auto=format&fit=crop', // Placeholder document image
            usage: '4.2k',
            status: 'PUBLISHED',
            category: 'Professional'
        },
        {
            id: 2,
            title: 'Artistic Edge',
            desc: 'Vibrant design for designers and artists.',
            image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=500&auto=format&fit=crop',
            usage: '2.8k',
            status: 'PUBLISHED',
            category: 'Creative'
        },
        {
            id: 3,
            title: 'Tech Innovator',
            desc: 'Developer focused layout with skills matrix.',
            image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop',
            usage: '152',
            status: 'DRAFT',
            category: 'Modern'
        }
    ]);

    const [editingTemplate, setEditingTemplate] = useState(null);

    // Apply Tab Filtering
    const filteredTemplates = templatesList.filter(tpl => {
        if (activeTab === 'All') return true;
        if (activeTab === 'Drafts') return tpl.status === 'DRAFT';
        return tpl.category === activeTab;
    });

    const templates = filteredTemplates;

    const handleDeleteTemplate = (id) => {
        Swal.fire({
            title: isAr ? 'هل أنت متأكد؟' : 'Are you sure?',
            text: isAr ? 'سيتم حذف قالب السيرة الذاتية هذا!' : 'This template will be deleted permanent!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: isAr ? 'نعم، احذفه!' : 'Yes, delete it!',
            cancelButtonText: isAr ? 'إلغاء' : 'Cancel',
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#475569'
        }).then((result) => {
            if (result.isConfirmed) {
                setTemplatesList(prev => prev.filter(t => t.id !== id));
                Swal.fire({
                    title: isAr ? 'تم الحذف!' : 'Deleted!',
                    text: isAr ? 'تم حذف القالب بنجاح.' : 'Template has been deleted successfully.',
                    icon: 'success',
                    confirmButtonColor: 'var(--color-primary)'
                });
            }
        });
    };

    return (
        <div className="space-y-6">
            {/* Page Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <select className="appearance-none bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-4 pr-10 text-sm font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] shadow-sm">
                            <option>{t('admin_tpl_sort_used')}</option>
                            <option>{t('admin_tpl_sort_newest')}</option>
                            <option>{t('admin_tpl_sort_alpha')}</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[20px]">expand_more</span>
                    </div>
                    <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                        <button className="p-1.5 bg-white dark:bg-[#161b22] shadow-sm rounded-lg text-[var(--color-primary)] flex items-center justify-center transition-all">
                            <span className="material-symbols-outlined text-[20px]">grid_view</span>
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg flex items-center justify-center transition-all">
                            <span className="material-symbols-outlined text-[20px]">view_list</span>
                        </button>
                    </div>
                </div>
                
                <button className="bg-[var(--color-primary)] hover:brightness-110 text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-[var(--color-primary)]/20 flex items-center gap-2 text-sm justify-center sm:w-auto w-full">
                    <span className="material-symbols-outlined text-[20px]">add_circle</span>
                    {t('admin_tpl_add_new')}
                </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200 dark:border-slate-800 overflow-x-auto hide-scrollbar">
                <div className="flex items-center gap-6 min-w-max px-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 pt-2 text-sm font-bold transition-all border-b-2 ${
                                activeTab === tab.id 
                                ? 'border-[var(--color-primary)] text-[var(--color-primary)]' 
                                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                            }`}
                        >
                            {tab.label} <span className={`ml-1 px-2 py-0.5 rounded-full text-[10px] ${activeTab === tab.id ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'bg-slate-100 dark:bg-slate-800'}`}>({tab.count})</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
                {templates.map((template) => (
                    <div key={template.id} className="bg-white dark:bg-[#161b22] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group hover:shadow-md transition-all flex flex-col">
                        <div className="relative aspect-[3/4] bg-slate-100 dark:bg-[#0f1115] p-6 overflow-hidden flex items-center justify-center">
                            <img src={template.image} alt={template.title} className="w-full h-full object-cover rounded-md shadow-md group-hover:scale-105 transition-transform duration-500" />
                            
                            {/* Status Badge */}
                            <div className={`absolute top-4 right-4 px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                                template.status === 'PUBLISHED' 
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                                : 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                            }`}>
                                {template.status}
                            </div>
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-slate-900 dark:text-white text-lg">{template.title}</h3>
                                <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#0f1115] px-2 py-1 rounded-lg text-xs font-bold border border-slate-100 dark:border-slate-800">
                                    <span className="material-symbols-outlined text-[14px]">group</span>
                                    {template.usage}
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-1 pr-4">{template.desc}</p>
                            
                            <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <button 
                                    onClick={() => setEditingTemplate(template)}
                                    className="flex-1 bg-slate-50 hover:bg-slate-100 dark:bg-[#0f1115] dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold py-2 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-2 text-sm"
                                >
                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                    {t('admin_tpl_btn_edit')}
                                </button>
                                <button 
                                    onClick={() => handleDeleteTemplate(template.id)}
                                    className="size-10 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-red-50 dark:bg-[#0f1115] dark:hover:bg-red-500/10 text-slate-400 hover:text-red-500 border border-slate-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-500/20 transition-all shrink-0"
                                >
                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Create New Layout Card */}
                <button 
                    onClick={() => {
                        Swal.fire({
                            title: isAr ? 'إضافة قالب جديد' : 'Add New Template',
                            html: `
                                <input id="swal-input1" class="swal2-input" placeholder="${isAr ? 'اسم القالب' : 'Template Title'}">
                                <input id="swal-input2" class="swal2-input" placeholder="${isAr ? 'الوصف' : 'Description'}">
                                <select id="swal-input3" class="swal2-select" style="margin-top: 15px; width: 80%; padding: 10px; border-radius: 8px;">
                                    <option value="Professional">${isAr ? 'مهني' : 'Professional'}</option>
                                    <option value="Creative">${isAr ? 'إبداعي' : 'Creative'}</option>
                                    <option value="Modern">${isAr ? 'عصري' : 'Modern'}</option>
                                </select>
                            `,
                            showCancelButton: true,
                            confirmButtonText: isAr ? 'إنشاء' : 'Create',
                            cancelButtonText: isAr ? 'إلغاء' : 'Cancel',
                            confirmButtonColor: 'var(--color-primary)',
                            preConfirm: () => {
                                const title = document.getElementById('swal-input1').value;
                                const desc = document.getElementById('swal-input2').value;
                                const category = document.getElementById('swal-input3').value;
                                if (!title || !desc) {
                                    Swal.showValidationMessage(isAr ? 'يرجى ملء جميع الحقول!' : 'Please fill out all fields!');
                                }
                                return { title, desc, category };
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                const newTpl = {
                                    id: Date.now(),
                                    title: result.value.title,
                                    desc: result.value.desc,
                                    category: result.value.category,
                                    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=500&auto=format&fit=crop',
                                    usage: '0',
                                    status: 'DRAFT'
                                };
                                setTemplatesList(prev => [...prev, newTpl]);
                                Swal.fire({
                                    icon: 'success',
                                    title: isAr ? 'تم الإنشاء!' : 'Created!',
                                    text: isAr ? 'تمت إضافة قالب السيرة الذاتية بنجاح.' : 'New template layout added successfully.',
                                    confirmButtonColor: 'var(--color-primary)'
                                });
                            }
                        });
                    }}
                    className="flex flex-col items-center justify-center aspect-[3/4] sm:aspect-auto sm:h-full bg-slate-50/50 dark:bg-[#161b22]/50 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all group p-6 text-center min-h-[400px]"
                >
                    <div className="size-16 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[var(--color-primary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-3xl">add</span>
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-2">{t('admin_tpl_create_layout')}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[200px]">{t('admin_tpl_create_desc')}</p>
                </button>
            </div>

            {/* Edit Template Modal */}
            {editingTemplate && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setEditingTemplate(null)}></div>
                    {/* Modal Card */}
                    <div className="relative w-full max-w-md bg-white dark:bg-[#161b22] border border-slate-205 dark:border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 text-slate-900 dark:text-white">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">{isAr ? 'تعديل بيانات القالب' : 'Edit Template Details'}</h3>
                            <button onClick={() => setEditingTemplate(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            setTemplatesList(prev => prev.map(t => t.id === editingTemplate.id ? editingTemplate : t));
                            setEditingTemplate(null);
                            Swal.fire({
                                icon: 'success',
                                title: isAr ? 'تم التحديث!' : 'Updated!',
                                text: isAr ? 'تم حفظ التعديلات بنجاح.' : 'Template details updated successfully.',
                                confirmButtonColor: 'var(--color-primary)'
                            });
                        }} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1.5">{isAr ? 'اسم القالب' : 'Template Title'}</label>
                                <input 
                                    type="text"
                                    value={editingTemplate.title}
                                    onChange={(e) => setEditingTemplate({ ...editingTemplate, title: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1.5">{isAr ? 'وصف القالب' : 'Template Description'}</label>
                                <textarea 
                                    value={editingTemplate.desc}
                                    onChange={(e) => setEditingTemplate({ ...editingTemplate, desc: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                    rows="3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1.5">{isAr ? 'القسم' : 'Category'}</label>
                                    <select 
                                        value={editingTemplate.category}
                                        onChange={(e) => setEditingTemplate({ ...editingTemplate, category: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    >
                                        <option value="Professional">Professional</option>
                                        <option value="Creative">Creative</option>
                                        <option value="Modern">Modern</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1.5">{isAr ? 'الحالة' : 'Status'}</label>
                                    <select 
                                        value={editingTemplate.status}
                                        onChange={(e) => setEditingTemplate({ ...editingTemplate, status: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    >
                                        <option value="PUBLISHED">PUBLISHED</option>
                                        <option value="DRAFT">DRAFT</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-2 justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                                <button 
                                    type="button" 
                                    onClick={() => setEditingTemplate(null)} 
                                    className="px-4 py-2 border border-slate-200 dark:border-slate-750 text-slate-500 dark:text-slate-400 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    {isAr ? 'إلغاء' : 'Cancel'}
                                </button>
                                <button 
                                    type="submit" 
                                    className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:brightness-110 shadow-md shadow-primary/20 transition-all"
                                >
                                    {isAr ? 'حفظ' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
