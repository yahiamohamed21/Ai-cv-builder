import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../ui/Button';
import Logo from '../ui/Logo/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faMoon, faSun, faGlobe } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
    const { t } = useTranslation();
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { language, changeLanguage } = useLanguage();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: language === 'ar' ? 'الرئيسية' : 'Home', path: '/' },
        { name: language === 'ar' ? 'من نحن' : 'About Us', path: '/about' },
        { name: language === 'ar' ? 'خطاب التغطية' : 'Cover Letter', path: '/cover-letter' },
        { name: language === 'ar' ? 'المدونة' : 'Blog', path: '/blog' },
        { name: language === 'ar' ? 'اتصل بنا' : 'Contact Us', path: '/contact' },
    ];

    const handleLanguageToggle = () => {
        changeLanguage(language === 'en' ? 'ar' : 'en');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 glass border-b border-white/20 dark:border-gray-800/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Logo />
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex gap-8 lg:gap-12 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-colors ${isActive(link.path)
                                        ? 'text-[var(--color-primary)]'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary)]'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right section */}
                    <div className="hidden md:flex items-center gap-4">
                        <button onClick={handleLanguageToggle} className="p-2 px-3 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 flex items-center gap-2">
                            <FontAwesomeIcon icon={faGlobe} />
                            <span className="text-sm font-medium">{language === 'en' ? 'AR' : 'EN'}</span>
                        </button>

                        {user ? (
                            <div className="flex items-center gap-4 ms-4 border-s border-gray-200 dark:border-gray-800 ps-4">
                                <Link to="/dashboard">
                                    <Button variant="ghost">{t('dashboard')}</Button>
                                </Link>
                                <Button variant="outline" onClick={logout}>{t('logout')}</Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 ms-4 border-s border-gray-200 dark:border-gray-800 ps-4">
                                <Link to="/login">
                                    <Button variant="ghost">{t('login')}</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary">{t('register')}</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center gap-2">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600 dark:text-gray-300 w-10 h-10 flex items-center justify-center">
                            <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} size="lg" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden glass border-t border-white/20 dark:border-gray-800/30">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-[var(--color-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button
                            onClick={handleLanguageToggle}
                            className="w-full text-left px-3 py-2 flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                        >
                            <FontAwesomeIcon icon={faGlobe} />
                            <span>{language === 'en' ? 'Switch to Arabic' : 'التبديل للإنجليزية'}</span>
                        </button>

                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-2 px-3">
                            {user ? (
                                <>
                                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button variant="primary" className="w-full">{t('dashboard')}</Button>
                                    </Link>
                                    <Button variant="outline" className="w-full" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>{t('logout')}</Button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button variant="outline" className="w-full">{t('login')}</Button>
                                    </Link>
                                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button variant="primary" className="w-full">{t('register')}</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
