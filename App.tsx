
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import type { HangoverPackage, OtherService } from './types';

// ICONS =======================================================================
const MailIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25-2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;
const PhoneIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.211-.998-.58-1.35l-3.952-3.952a2.25 2.25 0 00-3.182 0l-1.928 1.928a15.01 15.01 0 01-7.126-7.126l1.928-1.928a2.25 2.25 0 000-3.182L5.602 3.085a2.25 2.25 0 00-1.35-.58H2.25A2.25 2.25 0 000 4.5v2.25z" /></svg>;
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>;
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" /></svg>;
const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.613-1.476l-6.238 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>;
const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>;
const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>;
const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const MinusIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" /></svg>;
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>;
const XIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
const LocationMarkerIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>;
const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const PackageIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>;
const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" /></svg>;
const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>;
const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.5 21.75l-.398-1.188a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.188-.398a2.25 2.25 0 001.423-1.423l.398-1.188 1.188.398a2.25 2.25 0 001.423 1.423l.398 1.188-1.188.398a2.25 2.25 0 00-1.423 1.423z" /></svg>;
const StarIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.116 3.986 1.24 5.381c.28 1.223-1.043 2.15-2.125 1.55l-4.672-2.82-4.672 2.82c-1.082.6-2.405-.327-2.125-1.55l1.24-5.381-4.116-3.986c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" /></svg>;
const LeafIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}><path d="M14.25,3.545c0.803,0.301,1.53,0.73,2.219,1.281l-8.484,8.484c-1.269-0.844-2.062-2.25-2.062-3.812 c0-2.613,2.138-4.75,4.75-4.75C11.953,4.75,13.188,5.266,14.25,3.545z M5.219,13.281c-0.551,0.688-0.98,1.414-1.281,2.219 c-1.719-1.062-2.828-2.922-2.828-5.031c0-3.156,2.594-5.75,5.75-5.75c1.562,0,2.969,0.797,3.812,2.062L5.219,13.281z" /></svg>;
const StomachIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>;
const CocktailIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75V4.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5h7.5" /></svg>;
const PlaneIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>;


// DATA ========================================================================
const hangoverPackagesData: HangoverPackage[] = [
    { 
        title: "Hangover Basic", 
        inclusions: [
            "Premium Hydration",
            "Comfort Support Infusion",
            "Digestive Comfort Support",
            "Digestive Wellness Support",
            "Essential B Vitamin Complex",
            "Advanced Antioxidant Support",
            "With Registered Nurse"
        ] 
    },
    { 
        title: "Hangover Premium", 
        popular: true, 
        inclusions: [
            "Premium Hydration Blend",
            "Comfort Support Infusion",
            "Digestive Comfort Support",
            "Digestive Wellness Support",
            "Essential B Vitamin Complex",
            "Vitamin C Wellness Support",
            "Advanced Antioxidant Support",
            "Professional Medical Team Care",
            "Including Travel Insurance Report"
        ] 
    },
    { 
        title: "Hangover Super Premium", 
        inclusions: [
            "Premium Hydration Blend",
            "Comfort Support Infusion",
            "Digestive Comfort Support",
            "Digestive Wellness Support",
            "Essential B Vitamin Complex",
            "Vitamin C Wellness Support",
            "Complete Nutrition Blend",
            "Advanced Antioxidant Support",
            "Oxygen Wellness Session 30min",
            "With Registered Nurse & Doctor Nurse & Doctor",
            "Including Travel Insurance Report"
        ] 
    },
];

const otherServicesData: OtherService[] = [
    {
        title: "Jetlag Packages",
        description: "Beat jet lag and bounce back faster with our refreshing IV therapy. Feel recharged and ready for your trip or recovery.",
        icon: PlaneIcon
    },
     { 
        title: "Hangover Packages", 
        description: "Combat hangover symptoms with fast IV hydration. Recover quickly and comfortably right at your villa or hotel.", 
        icon: CocktailIcon 
    },
    { 
        title: "Vitamin Booster Packages", 
        description: "Boost your immunity and energy with our vitamin-packed IV therapy. Get the nutrients you need for wellness and vitality.", 
        icon: SparklesIcon 
    },
    { 
        title: "Tropical Flu Packages", 
        description: "Fight tropical flu symptoms and recover faster with our tailored IV therapy. Hydrate, protect, and restore your body.", 
        icon: LeafIcon
    },
    { 
        title: "Bali Belly Packages", 
        description: "Relieve symptoms of Bali Belly quickly with our specialized IV therapy. Rehydrate and restore balance without leaving your location.", 
        icon: StomachIcon
    },
];


// Reusable Animation Component
const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string; animation?: string; delay?: string; as?: React.ElementType; [x: string]: any; }> = ({ children, className = '', animation = 'animate-fadeInUp', delay = '', as: Component = 'div', ...rest }) => {
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <Component ref={ref} className={`${className} ${isVisible ? `${animation} ${delay}` : 'initial-hidden'}`} {...rest}>
            {children}
        </Component>
    );
};


// COMPONENTS ==================================================================
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks = ["About Us", "Promotions", "IV Therapies", "Tests", "Doctor On Call", "Blogs"];
    
    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isMenuOpen]);

    return (
        <>
            <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm">
                {/* Top Bar */}
                <div className="bg-background-alt border-b border-border-color hidden md:block">
                    <div className="container mx-auto px-6 py-2 flex justify-end items-center text-sm text-secondary space-x-6">
                        <a href="mailto:mail@example.com" className="flex items-center hover:text-accent transition-colors">
                            <MailIcon className="w-4 h-4 mr-2"/>
                            mail@example.com
                        </a>
                        <a href="tel:+6285142740977" className="flex items-center hover:text-accent transition-colors">
                            <PhoneIcon className="w-4 h-4 mr-2"/>
                            +62 851-4274-0977
                        </a>
                    </div>
                </div>

                {/* Main Nav */}
                <div className="border-b border-border-color">
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <a href="#" className="flex items-center">
                            <span className="font-bold text-base sm:text-lg text-primary uppercase">Mounty Health Center</span>
                        </a>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center space-x-6">
                            {navLinks.map(link => (
                                <a key={link} href="#" className={`font-semibold text-sm ${link === "Promotions" ? "text-accent" : "text-primary"} hover:text-accent transition-colors`}>{link}</a>
                            ))}
                        </nav>

                        <div className="flex items-center gap-4">
                            <a href="#" className="text-primary hover:text-accent transition-colors hidden sm:inline"><InstagramIcon className="w-6 h-6"/></a>
                            <a href="#" className="text-primary hover:text-accent transition-colors hidden sm:inline"><FacebookIcon className="w-6 h-6"/></a>
                            <a href="#contact" className="bg-accent text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-accent-hover transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 text-sm hidden sm:inline-block">
                                Book Now
                            </a>
                            
                            {/* Mobile menu button */}
                            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden text-primary p-2" aria-label="Open menu">
                                <MenuIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar & Overlay */}
            <>
                {/* Overlay */}
                <div
                    className={`fixed inset-0 bg-primary/40 z-40 transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setIsMenuOpen(false)}
                    aria-hidden="true"
                ></div>

                {/* Sidebar */}
                <aside
                    className={`fixed top-0 right-0 h-full w-full max-w-xs bg-background shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="sidebar-title"
                >
                    <div className="flex justify-between items-center p-4 border-b border-border-color">
                        <h2 id="sidebar-title" className="font-bold text-lg text-primary uppercase">Menu</h2>
                        <button onClick={() => setIsMenuOpen(false)} className="p-2" aria-label="Close menu">
                            <XIcon className="w-6 h-6 text-primary" />
                        </button>
                    </div>
                    <nav className="flex flex-col h-full p-4">
                        <div className="flex-grow space-y-2">
                            {navLinks.map(link => (
                                <a key={link} href="#" onClick={() => setIsMenuOpen(false)} className={`block font-semibold text-lg text-left py-2 px-3 rounded-md ${link === "Promotions" ? "text-accent bg-accent/10" : "text-primary"} hover:bg-gray-100 transition-colors`}>{link}</a>
                            ))}
                        </div>
                        <div className="mt-6 pt-6 border-t border-border-color">
                             <a href="#contact" onClick={() => setIsMenuOpen(false)} className="w-full text-center bg-accent text-white font-semibold px-5 py-3 rounded-lg hover:bg-accent-hover transition-all duration-300 shadow-sm text-base">
                                Book Now
                            </a>
                            <div className="flex justify-center gap-6 mt-6">
                                <a href="#" className="text-primary hover:text-accent transition-colors"><InstagramIcon className="w-8 h-8"/></a>
                                <a href="#" className="text-primary hover:text-accent transition-colors"><FacebookIcon className="w-8 h-8"/></a>
                            </div>
                        </div>
                    </nav>
                </aside>
            </>
        </>
    );
};

const Hero = () => (
    <>
        <section 
            className="bg-primary text-white py-16 sm:py-20"
        >
            <div className="container mx-auto px-6 text-center relative z-10">
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight initial-hidden animate-fadeInDown">HANGOVER PACKAGES</h1>
                <p className="max-w-3xl mx-auto text-base sm:text-lg mb-8 font-light initial-hidden animate-fadeInUp animation-delay-200">
                    Specifically designed to combat the symptoms of a hangover, our Hangover Packages offer fast relief through IV hydration, ensuring you recover quickly and comfortably right at your villa or hotel.
                </p>
                <a href="#hangover-packages" className="bg-white text-accent font-bold py-2.5 px-6 text-base sm:py-3 sm:px-8 sm:text-lg rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl initial-hidden animate-fadeInUp animation-delay-400 inline-block">
                    Book Now
                </a>
            </div>
        </section>
        <div className="bg-accent text-white font-semibold text-center py-3 px-4 text-sm tracking-wider">
            24/7 PROFESSIONAL WELLNESS CARE | FREE HOME DELIVERY
        </div>
    </>
);

const PackageCard: React.FC<{ packageInfo: HangoverPackage }> = ({ packageInfo }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="bg-white border border-border-color rounded-2xl p-6 flex flex-col w-full h-full relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            {packageInfo.popular && <div className="absolute top-4 -right-12 bg-accent text-white text-xs font-bold px-12 py-1.5 transform rotate-45">POPULAR</div>}
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-accent mb-4">{packageInfo.title}</h3>
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-center text-left py-3 border-t border-b border-border-color text-secondary hover:text-primary transition-colors"
                    aria-expanded={isOpen}
                >
                    <span className="font-semibold">Show Inclusions</span>
                    {isOpen ? <MinusIcon className="w-5 h-5"/> : <PlusIcon className="w-5 h-5"/>}
                </button>
                <div 
                    ref={contentRef}
                    style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
                    className="overflow-hidden transition-all duration-500 ease-in-out">
                    <ul className="space-y-3 pt-4">
                        {packageInfo.inclusions.map((item, i) => (
                            <li key={i} className="flex items-center text-secondary">
                                <CheckIcon className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const ServiceCard: React.FC<{ service: OtherService }> = ({ service }) => (
    <div className="text-center group h-full flex flex-col p-2">
         <div className="relative mb-6">
             <div className="bg-white rounded-2xl shadow-lg w-full h-40 sm:h-44 flex items-center justify-center hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                 <service.icon className="w-16 h-16 sm:w-20 sm:h-20 text-accent/80 transition-transform duration-300 group-hover:scale-110"/>
             </div>
             <div className="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2">
                 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-full flex items-center justify-center shadow-lg border-4 border-background-alt">
                     <StarIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white"/>
                 </div>
             </div>
         </div>
         <div className="flex flex-col flex-grow px-1 sm:px-2">
            <h3 className="font-bold text-base sm:text-lg text-primary mt-2 sm:mt-4">{service.title}</h3>
            <p className="text-secondary text-sm my-2 flex-grow">{service.description}</p>
            <a href="#contact" className="mt-auto bg-accent text-white font-semibold px-6 py-2 rounded-lg hover:bg-accent-hover transition-all duration-300 shadow-sm text-sm inline-block hover:shadow-lg hover:-translate-y-0.5">
               Book Now
           </a>
         </div>
    </div>
);

const Carousel = <T extends {}>({ 
    items, 
    renderItem, 
    itemsToShow: itemsToShowProp = { mobile: 1, tablet: 2, desktop: 3 }
}: { 
    items: T[], 
    renderItem: (item: T) => React.ReactNode, 
    itemsToShow?: { mobile: number, tablet: number, desktop: number }
}) => {
    const [slidesToShow, setSlidesToShow] = useState(itemsToShowProp.desktop);
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef(0);
    
    const getSlidesToShow = useCallback(() => {
        if (typeof window === 'undefined') return itemsToShowProp.desktop;
        if (window.innerWidth >= 1024) return itemsToShowProp.desktop;
        if (window.innerWidth >= 768) return itemsToShowProp.tablet;
        return itemsToShowProp.mobile;
    }, [itemsToShowProp]);

    useEffect(() => {
        const handleResize = () => {
            const newSlidesToShow = getSlidesToShow();
            setSlidesToShow(newSlidesToShow);
            setCurrentIndex(0);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [getSlidesToShow]);

    const maxIndex = items.length > slidesToShow ? items.length - slidesToShow : 0;

    const handlePrevClick = () => {
        setCurrentIndex(prev => Math.max(0, prev - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    
    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEndX = e.changedTouches[0].clientX;
        if (touchStartX.current - touchEndX > 50) {
            handleNextClick();
        } else if (touchStartX.current - touchEndX < -50) {
            handlePrevClick();
        }
    };

    if (!items.length) return null;

    return (
        <div className="relative">
            <div className="overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}
                >
                    {items.map((item, index) => (
                        <div key={index} style={{ flex: `0 0 ${100 / slidesToShow}%` }} className="px-3 h-full">
                            {renderItem(item)}
                        </div>
                    ))}
                </div>
            </div>
             <button 
                onClick={handlePrevClick} 
                aria-label="Previous slide" 
                disabled={currentIndex === 0}
                className="p-2 rounded-full bg-white/70 backdrop-blur-sm border border-border-color text-secondary hover:bg-white transition absolute left-0 sm:-left-2 top-1/2 -translate-y-1/2 z-10 shadow-md hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed">
                <ArrowLeftIcon className="w-5 h-5"/>
            </button>
             <button 
                onClick={handleNextClick} 
                aria-label="Next slide" 
                disabled={currentIndex >= maxIndex}
                className="p-2 rounded-full bg-white/70 backdrop-blur-sm border border-border-color text-secondary hover:bg-white transition absolute right-0 sm:-right-2 top-1/2 -translate-y-1/2 z-10 shadow-md hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed">
                <ArrowRightIcon className="w-5 h-5"/>
            </button>
        </div>
    );
};


const HangoverPackagesSection = () => {
    return (
        <AnimatedSection as="section" id="hangover-packages" className="py-16 sm:py-20 bg-background-alt">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-12 text-center text-primary">HANGOVER PACKAGES</h2>
                <Carousel
                    items={hangoverPackagesData}
                    renderItem={(pkg) => <PackageCard packageInfo={pkg as HangoverPackage} />}
                    itemsToShow={{ mobile: 1, tablet: 2, desktop: 3 }}
                />
            </div>
        </AnimatedSection>
    );
};


const HangoverInfoSection = () => (
    <AnimatedSection as="section" className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
                <div className="flex justify-center items-center bg-background-alt p-8 rounded-2xl h-full min-h-[280px] sm:min-h-[350px]">
                    <CocktailIcon className="w-32 h-32 sm:w-40 sm:h-40 text-accent" />
                </div>
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">FEELING HANGOVER? WE HELP YOU.</h2>
                    <p className="text-secondary mb-4">A hangover can dehydrate you rapidly, especially with symptoms like:</p>
                    <div className="space-y-3 mb-4">
                        <div className="flex items-start">
                            <CheckIcon className="w-6 h-6 text-accent mr-3 flex-shrink-0 mt-1" />
                            <span className="text-secondary">Headaches</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="w-6 h-6 text-accent mr-3 flex-shrink-0 mt-1" />
                            <span className="text-secondary">Nausea</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="w-6 h-6 text-accent mr-3 flex-shrink-0 mt-1" />
                            <span className="text-secondary">Vomiting</span>
                        </div>
                    </div>
                    <p className="text-secondary mb-4">These can leave you feeling exhausted, dizzy, and generally unwell, sometimes causing your heart to beat irregularly.</p>
                    <p className="text-secondary">Our Hangover IV Therapy is designed to quickly replenish your body's fluids and essential nutrients. We deliver this effective treatment directly to your hotel or villa, making it convenient for you to recover without needing to leave your room.</p>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

const CTASection = () => (
    <AnimatedSection as="section" className="py-12 sm:py-16">
        <div className="container mx-auto px-6">
            <div className="bg-accent text-white rounded-2xl p-8 sm:p-10 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">READY FOR YOUR TREATMENT?</h2>
                <p className="mb-6">We can come to you so you can feel as comfortable as possible.</p>
                <a href="#contact" className="bg-white text-accent font-bold py-2.5 px-6 text-base sm:py-3 sm:px-8 sm:text-lg rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md inline-block transform hover:scale-105">
                    Book An Appointment
                </a>
            </div>
        </div>
    </AnimatedSection>
);

const HowItWorksSection = () => {
    const steps = [
        {
            icon: PackageIcon,
            title: "CHOOSE YOUR PACKAGE",
            description: "",
            details: null,
            button: null
        },
        {
            icon: CalendarIcon,
            title: "BOOK AN APPOINTMENT",
            description: "",
            details: ["AT OUR CLINIC", "TO YOUR VILLA"],
            button: "Book An Appointment"
        },
        {
            icon: HeartIcon,
            title: "GET TREATED & BECOME HEALTHY",
            description: "Based on your preference, we will come to your house or you can come to us.",
            details: null,
            button: null
        }
    ];

    return (
        <AnimatedSection as="section" className="py-16 sm:py-20 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl sm:text-4xl font-bold mb-12 sm:mb-20 text-center text-primary">WHAT TO EXPECT. STEP BY STEP</h2>
                <div className="space-y-16 md:space-y-20">
                    {steps.map((step, index) => (
                        <AnimatedSection key={step.title} as="div">
                            <div className={`grid lg:grid-cols-2 gap-12 items-center ${index === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                                <div className={`flex justify-center items-center bg-background-alt p-8 sm:p-12 rounded-2xl min-h-[300px] lg:min-h-[400px] h-full ${index === 1 ? 'lg:col-start-2' : ''}`}>
                                     <step.icon className="w-28 h-28 lg:w-36 lg:h-36 text-accent" />
                                </div>
                                <div className={`flex flex-col justify-center ${index === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                                    <step.icon className="w-12 h-12 text-accent mb-4" />
                                    <h3 className="text-2xl sm:text-3xl font-bold text-accent mb-4">{step.title}</h3>
                                    {step.description && <p className="text-secondary flex items-center gap-2"><CheckIcon className="w-6 h-6 text-accent"/>{step.description}</p>}
                                    {step.details && (
                                        <ul className="space-y-2 my-4">
                                            {step.details.map(detail => (
                                                <li key={detail} className="flex items-center text-secondary gap-2"><CheckIcon className="w-6 h-6 text-accent"/> {detail}</li>
                                            ))}
                                        </ul>
                                    )}
                                    {step.button && (
                                         <a href="#contact" className="mt-4 bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-accent-hover transition-all duration-300 shadow-sm text-center max-w-xs hover:shadow-lg hover:-translate-y-0.5">
                                            {step.button}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

const OtherServicesSection = () => {
    const workingHours = [
        { day: "Monday", hours: "7:00 AM – 11:00 PM" },
        { day: "Tuesday", hours: "7:00 AM – 11:00 PM" },
        { day: "Wednesday", hours: "7:00 AM – 11:00 PM" },
        { day: "Thursday", hours: "7:00 AM – 11:00 PM" },
        { day: "Friday", hours: "7:00 AM – 11:00 PM" },
        { day: "Saturday", hours: "7:00 AM – 11:00 PM" },
        { day: "Sunday", hours: "7:00 AM – 11:00 PM" },
    ];
    
    return (
        <AnimatedSection as="section" className="py-16 sm:py-20 bg-background-alt">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-12 text-center text-primary">IV DRIPS AT YOUR VILLA OR HOTEL</h2>
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2">
                        <Carousel
                            items={otherServicesData}
                            renderItem={(service) => <ServiceCard service={service as OtherService} />}
                            itemsToShow={{ mobile: 1, tablet: 2, desktop: 2 }}
                        />
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-border-color mt-8 lg:mt-0">
                        <h3 className="font-bold text-xl text-primary mb-4">WORKING HOURS</h3>
                        <p className="text-secondary text-sm mb-4">Find our opening times below</p>
                        <div className="space-y-3">
                            {workingHours.map(item => (
                                <div key={item.day} className="flex flex-col items-start gap-1 md:flex-row md:items-center md:justify-between text-sm border-t border-border-color pt-3 pb-1">
                                    <span className="text-primary font-medium">{item.day}</span>
                                    <span className="text-secondary">{item.hours}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};


const Footer = () => {
    const navLinks = {
        "About Us": "#",
        "Promotions": "#",
        "IV Therapies": "#",
        "Tests": "#",
        "Doctor On Call": "#",
        "Blogs": "#",
    };
    return (
    <footer id="contact" className="bg-primary text-white">
        <div className="container mx-auto px-6 pt-16 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
                {/* Column 1: Logo & Social */}
                <div className="md:col-span-2 lg:col-span-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start items-center mb-4">
                        <span className="font-bold text-lg uppercase">Mounty Health Center</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-6 max-w-sm mx-auto md:mx-0">Health Treatments at the comfort of your home. From general assessments, hangover cures, vitamins boosts to bali belly relief packages and wound treatments.</p>
                    <div className="flex gap-4 justify-center md:justify-start">
                        <a href="#" className="text-gray-300 hover:text-white transition-colors"><InstagramIcon className="w-6 h-6"/></a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors"><FacebookIcon className="w-6 h-6"/></a>
                    </div>
                </div>
                
                {/* Column 2: Quick Links */}
                 <div className="text-center sm:text-left">
                    <h3 className="font-bold mb-4 text-lg">Quick Links</h3>
                    <ul className="space-y-2">
                        {Object.entries(navLinks).map(([name, href]) => (
                            <li key={name}><a href={href} className="text-gray-300 text-sm hover:text-white transition-colors">{name}</a></li>
                        ))}
                    </ul>
                </div>

                {/* Column 3: Get in Touch */}
                <div className="text-center sm:text-left">
                    <h3 className="font-bold mb-4 text-lg">Get In Touch</h3>
                    <address className="not-italic text-sm text-gray-300 space-y-4">
                        <div className="flex items-start justify-center sm:justify-start">
                           <LocationMarkerIcon className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                           <span>Jl. Kepaon indah No.8, Pemogan, Denpasar Selatan</span>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start">
                           <MailIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                           <a href="mailto:mail@example.com" className="hover:text-white">mail@example.com</a>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start">
                           <WhatsappIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                           <a href="https://wa.me/6285142740977" className="hover:text-white">+62 851-4274-0977</a>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start">
                            <ClockIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                            <span>24/7 Open</span>
                        </div>
                    </address>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-10 pt-6 sm:mt-12 text-center text-xs text-gray-400">
                <p>&copy; {new Date().getFullYear()} Mounty Health Center | All Rights Reserved.</p>
            </div>
        </div>
        <a href="https://wa.me/6285142740977" target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 bg-green-500 text-white p-3.5 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-110 z-50">
            <WhatsappIcon className="w-8 h-8"/>
        </a>
    </footer>
    )
};


// MAIN APP COMPONENT =========================================================
export default function App() {
  return (
    <div className="bg-background">
      <Header />
      <main>
        <Hero />
        <HangoverPackagesSection />
        <HangoverInfoSection />
        <CTASection />
        <HowItWorksSection />
        <OtherServicesSection />
      </main>
      <Footer />
    </div>
  )
}