
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import type { HangoverPackage, OtherService } from './types';

// ICONS =======================================================================
const PhoneIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.211-.998-.58-1.35l-3.952-3.952a2.25 2.25 0 00-3.182 0l-1.928 1.928a15.01 15.01 0 01-7.126-7.126l1.928-1.928a2.25 2.25 0 000-3.182L5.602 3.085a2.25 2.25 0 00-1.35-.58H2.25A2.25 2.25 0 000 4.5v2.25z" /></svg>;
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" /></svg>;
const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.613-1.476l-6.238 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>;
const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>;
const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>;
const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const MinusIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" /></svg>;
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>;
const StomachIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>;
const CocktailIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75V4.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5h7.5" /></svg>;
const TattooIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.62a8.983 8.983 0 013.362-3.362c.329-.125.65-.244.974-.344z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214C14.054 4.195 12.216 3 10.5 3 7.239 3 4.5 5.739 4.5 9c0 1.954.962 3.743 2.5 4.95.42.327.855.623 1.312.883C9.366 16.273 10.5 17.25 10.5 18.75c0 .792.297 1.518.791 2.082M16.5 9.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" /></svg>;
const MicroscopeIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>;


// DATA ========================================================================
const whatsappLink = "https://wa.me/6285142740977";
const instagramLink = "https://www.instagram.com/mountyhealthcenter/";

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
    return (
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm">
            {/* Top Bar */}
            <div className="bg-background-alt border-b border-border-color hidden md:block">
                <div className="container mx-auto px-4 sm:px-6 py-2 flex justify-end items-center text-sm text-secondary space-x-6">
                    <a href="tel:+6285142740977" className="flex items-center hover:text-accent transition-colors">
                        <PhoneIcon className="w-4 h-4 mr-2"/>
                        +62 851-4274-0977
                    </a>
                </div>
            </div>

            {/* Main Nav */}
            <div className="border-b border-border-color">
                <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                    <a href="/" className="flex items-center">
                        <span className="font-bold text-base sm:text-lg text-primary uppercase">Mounty Health Center</span>
                    </a>

                    <div className="flex items-center gap-4">
                        <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors">
                            <InstagramIcon className="w-6 h-6"/>
                        </a>
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-accent text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-accent-hover transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 text-sm">
                            Book Now
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

const Hero = () => (
    <>
        <section 
            className="bg-primary text-white py-12 sm:py-16"
        >
            <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight initial-hidden animate-fadeInDown">PREMIUM IV THERAPY & AT-HOME WELLNESS</h1>
                <p className="max-w-3xl mx-auto text-base sm:text-lg mb-8 font-light initial-hidden animate-fadeInUp animation-delay-200">
                    Your trusted partner in Bali for rapid recovery and wellness. We specialize in IV therapies for Bali Belly, hangovers, immune boosts, painless tattoos, and provide convenient at-home lab tests.
                </p>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-white text-accent font-bold py-2.5 px-6 text-base sm:py-3 sm:px-8 sm:text-lg rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl initial-hidden animate-fadeInUp animation-delay-400 inline-block">
                    Book Your Treatment
                </a>
            </div>
        </section>
        <div className="bg-accent text-white font-semibold text-center py-3 px-4 text-sm tracking-wider">
            24/7 PROFESSIONAL WELLNESS CARE | FREE HOME DELIVERY
        </div>
    </>
);

const Carousel: React.FC<{ items: any[]; renderItem: (item: any, index: number) => React.ReactNode; itemsToShow: { mobile: number; tablet: number; desktop: number; }; }> = ({ items, renderItem, itemsToShow }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalItems = items.length;

    const getVisibleItemsCount = useCallback(() => {
        if (typeof window === 'undefined') return itemsToShow.desktop;
        const width = window.innerWidth;
        if (width >= 1024) return itemsToShow.desktop;
        if (width >= 768) return itemsToShow.tablet;
        return itemsToShow.mobile;
    }, [itemsToShow]);

    const [visibleItemsCount, setVisibleItemsCount] = useState(getVisibleItemsCount());

    useEffect(() => {
        const handleResize = () => setVisibleItemsCount(getVisibleItemsCount());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [getVisibleItemsCount]);
    
    useEffect(() => {
        if (currentIndex > totalItems - visibleItemsCount) {
            setCurrentIndex(Math.max(0, totalItems - visibleItemsCount));
        }
    }, [visibleItemsCount, currentIndex, totalItems]);


    const canGoPrev = currentIndex > 0;
    const canGoNext = currentIndex < totalItems - visibleItemsCount;

    const goPrev = () => canGoPrev && setCurrentIndex(prev => prev - 1);
    const goNext = () => canGoNext && setCurrentIndex(prev => prev + 1);

    const itemWidth = 100 / visibleItemsCount;

    return (
        <div className="relative">
            <div className="overflow-hidden">
                <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * itemWidth}%)` }}
                >
                    {items.map((item, index) => (
                        <div key={index} className="flex-shrink-0 px-2 sm:px-3" style={{ width: `${itemWidth}%` }}>
                           {renderItem(item, index)}
                        </div>
                    ))}
                </div>
            </div>

            {totalItems > visibleItemsCount && (
                <>
                    <button 
                        onClick={goPrev} 
                        disabled={!canGoPrev}
                        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg border border-border-color disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:bg-background-alt z-10"
                        aria-label="Previous"
                    >
                        <ArrowLeftIcon className="w-6 h-6 text-primary" />
                    </button>
                    <button 
                        onClick={goNext} 
                        disabled={!canGoNext}
                        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg border border-border-color disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:bg-background-alt z-10"
                        aria-label="Next"
                    >
                        <ArrowRightIcon className="w-6 h-6 text-primary" />
                    </button>
                </>
            )}
        </div>
    );
};

const PackageCard: React.FC<{ packageInfo: HangoverPackage }> = ({ packageInfo }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="bg-white border border-border-color rounded-2xl p-4 sm:p-6 flex flex-col w-full h-full relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            {packageInfo.popular && <div className="absolute top-4 -right-12 bg-accent text-white text-xs font-bold px-12 py-1.5 transform rotate-45">POPULAR</div>}
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-accent mb-4 h-14">{packageInfo.title}</h3>
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
                    <ul className="space-y-3 pt-4 text-sm">
                        {packageInfo.inclusions.map((item, i) => (
                            <li key={i} className="flex items-start text-secondary">
                                <CheckIcon className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const PainlessTattooSection = () => (
    <AnimatedSection as="section" id="painless-tattoo" className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
                <div className="flex justify-center items-center bg-background-alt p-8 rounded-2xl h-full min-h-[280px] sm:min-h-[350px] order-last lg:order-first">
                    <TattooIcon className="w-32 h-32 sm:w-40 sm:h-40 text-accent" />
                </div>
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">PAINLESS TATTOO EXPERIENCE</h2>
                    <p className="text-secondary mb-4">In collaboration with top tattoo studios, we introduce a revolutionary concept for a comfortable tattoo session. Say goodbye to the pain and focus on the art.</p>
                    <div className="space-y-3 mb-4">
                        <div className="flex items-start">
                            <CheckIcon className="w-6 h-6 text-accent mr-3 flex-shrink-0 mt-1" />
                            <span className="text-secondary"><strong>Pain Killer Drip:</strong> Administered to minimize pain during your session.</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="w-6 h-6 text-accent mr-3 flex-shrink-0 mt-1" />
                            <span className="text-secondary"><strong>Immune Booster:</strong> Helps your body heal faster and reduces the risk of infection post-tattoo.</span>
                        </div>
                    </div>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-4 bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-accent-hover transition-all duration-300 shadow-sm text-center inline-block hover:shadow-lg hover:-translate-y-0.5">
                        Book for my Studio
                    </a>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

const BaliBellySection = () => (
    <AnimatedSection as="section" id="bali-belly" className="py-12 sm:py-16 bg-background-alt">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
                 <div className="flex justify-center items-center bg-white p-8 rounded-2xl h-full min-h-[280px] sm:min-h-[350px]">
                    <StomachIcon className="w-32 h-32 sm:w-40 sm:h-40 text-accent" />
                </div>
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">QUICK RELIEF FOR BALI BELLY</h2>
                    <p className="text-secondary mb-4">Don't let Bali Belly ruin your vacation. Symptoms like dehydration, nausea, and an upset stomach require immediate attention. Our Bali Belly IV package is designed for rapid recovery.</p>
                    <p className="text-secondary mb-4">We deliver a potent blend of hydration, vitamins, and medication directly to you, helping you get back on your feet and enjoy paradise again.</p>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-4 bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-accent-hover transition-all duration-300 shadow-sm text-center inline-block hover:shadow-lg hover:-translate-y-0.5">
                        Get Bali Belly Relief
                    </a>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

const HangoverPackagesSection = () => {
    return (
        <AnimatedSection as="section" id="hangover-packages" className="py-12 sm:py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
                    <div className="order-last lg:order-first">
                        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">FEELING HANGOVER? WE HELP YOU.</h2>
                        <p className="text-secondary mb-4">A hangover can dehydrate you rapidly, causing headaches, nausea, and fatigue. These symptoms can leave you feeling exhausted and unwell.</p>
                        <p className="text-secondary">Our Hangover IV Therapy is designed to quickly replenish your body's fluids and essential nutrients. We deliver this effective treatment directly to your hotel or villa, making it convenient for you to recover without needing to leave your room.</p>
                         <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-6 bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-accent-hover transition-all duration-300 shadow-sm text-center inline-block hover:shadow-lg hover:-translate-y-0.5">
                            Relieve My Hangover
                        </a>
                    </div>
                     <div className="flex justify-center items-center bg-background-alt p-8 rounded-2xl h-full min-h-[280px] sm:min-h-[350px]">
                        <CocktailIcon className="w-32 h-32 sm:w-40 sm:h-40 text-accent" />
                    </div>
                </div>
                <div className="mt-16">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-12 text-center text-primary">CHOOSE YOUR HANGOVER PACKAGE</h3>
                    <Carousel
                        items={hangoverPackagesData}
                        renderItem={(pkg) => <PackageCard packageInfo={pkg as HangoverPackage} />}
                        itemsToShow={{ mobile: 1, tablet: 2, desktop: 3 }}
                    />
                </div>
            </div>
        </AnimatedSection>
    );
};

const ImmuneBoosterSection = () => (
    <AnimatedSection as="section" id="immune-booster" className="py-12 sm:py-16 bg-background-alt">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
                <div className="flex justify-center items-center bg-white p-8 rounded-2xl h-full min-h-[280px] sm:min-h-[350px]">
                    <HeartIcon className="w-32 h-32 sm:w-40 sm:h-40 text-accent" />
                </div>
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">IMMUNE BOOSTER & WELLNESS</h2>
                    <p className="text-secondary mb-4">Strengthen your body's natural defenses and enhance your vitality. Our Immune Booster IV Drip is packed with vitamins and antioxidants to help you stay healthy and energized during your travels.</p>
                    <p className="text-secondary mb-4">Perfect for pre-emptive care, fighting fatigue, or accelerating recovery from illness. Invest in your wellness and feel your best.</p>
                     <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-4 bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-accent-hover transition-all duration-300 shadow-sm text-center inline-block hover:shadow-lg hover:-translate-y-0.5">
                        Boost My Immunity
                    </a>
                </div>
            </div>
        </div>
    </AnimatedSection>
);

const LabTestsSection = () => (
    <AnimatedSection as="section" id="lab-tests" className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
                <div className="order-last lg:order-first">
                    <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">AT-HOME LABORATORY TESTS</h2>
                    <p className="text-secondary mb-4">Health concerns can't wait. We provide professional, on-call lab testing services in the comfort of your home or hotel. Get peace of mind without the hassle of clinic visits.</p>
                    <div className="space-y-3 mb-6">
                        <div className="flex items-start">
                            <CheckIcon className="w-6 h-6 text-accent mr-3 flex-shrink-0 mt-1" />
                            <span className="text-secondary"><strong>Dengue Fever Test:</strong> Quick and accurate on-site testing for dengue fever, a common concern in tropical climates.</span>
                        </div>
                        <div className="flex items-start">
                            <CheckIcon className="w-6 h-6 text-accent mr-3 flex-shrink-0 mt-1" />
                            <span className="text-secondary"><strong>Other Standard Tests:</strong> Contact us for a full range of available laboratory tests.</span>
                        </div>
                    </div>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-accent-hover transition-all duration-300 shadow-sm text-center inline-block hover:shadow-lg hover:-translate-y-0.5">
                        Request a Lab Test
                    </a>
                </div>
                <div className="flex justify-center items-center bg-background-alt p-8 rounded-2xl h-full min-h-[280px] sm:min-h-[350px]">
                    <MicroscopeIcon className="w-32 h-32 sm:w-40 sm:h-40 text-accent" />
                </div>
            </div>
        </div>
    </AnimatedSection>
);

const Footer = () => {
    const workingHours = [
        { day: 'Monday', time: '24 Hours' },
        { day: 'Tuesday', time: '24 Hours' },
        { day: 'Wednesday', time: '24 Hours' },
        { day: 'Thursday', time: '24 Hours' },
        { day: 'Friday', time: '24 Hours' },
        { day: 'Saturday', time: '24 Hours' },
        { day: 'Sunday', time: '24 Hours' },
    ];
    
    return (
        <footer className="bg-primary text-white">
            <div className="container mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* About */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <h3 className="font-bold text-lg uppercase mb-4">Mounty Health Center</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Providing premium on-call IV therapies and wellness services across Bali. Your health and comfort are our priority, 24/7.
                        </p>
                         <div className="flex space-x-4 mt-6">
                            <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                                <InstagramIcon className="w-7 h-7" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg uppercase mb-4">Services</h3>
                        <ul className="space-y-3">
                            <li><a href="#painless-tattoo" className="text-gray-300 hover:text-white transition-colors text-sm">Painless Tattoo</a></li>
                            <li><a href="#bali-belly" className="text-gray-300 hover:text-white transition-colors text-sm">Bali Belly Relief</a></li>
                            <li><a href="#hangover-packages" className="text-gray-300 hover:text-white transition-colors text-sm">Hangover Packages</a></li>
                            <li><a href="#immune-booster" className="text-gray-300 hover:text-white transition-colors text-sm">Immune Booster</a></li>
                            <li><a href="#lab-tests" className="text-gray-300 hover:text-white transition-colors text-sm">Lab Tests</a></li>
                        </ul>
                    </div>

                    {/* Working Hours */}
                    <div>
                         <h3 className="font-bold text-lg uppercase mb-4">Working Hours</h3>
                         <div className="space-y-2 text-sm">
                             {workingHours.map(item => (
                                 <div key={item.day} className="flex justify-between text-gray-300">
                                     <span>{item.day}</span>
                                     <span className="font-medium text-white">{item.time}</span>
                                 </div>
                             ))}
                         </div>
                    </div>

                    {/* Contact */}
                     <div>
                        <h3 className="font-bold text-lg uppercase mb-4">Contact Us</h3>
                        <p className="text-gray-300 mb-4 text-sm">
                            Ready to feel better? Contact us now for a free consultation or to book a service.
                        </p>
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-white text-accent font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg inline-block text-center w-full sm:w-auto">
                           <WhatsappIcon className="w-5 h-5 inline-block mr-2" />
                           Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
            <div className="bg-black/20 py-4">
                 <div className="container mx-auto px-4 sm:px-6 text-center text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} Mounty Health Center. All Rights Reserved.
                 </div>
            </div>
        </footer>
    );
};

const FloatingWhatsAppButton = () => (
    <a 
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110 z-20"
        aria-label="Chat on WhatsApp"
    >
        <WhatsappIcon className="w-8 h-8"/>
    </a>
);


const App = () => {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <PainlessTattooSection />
                <BaliBellySection />
                <HangoverPackagesSection />
                <ImmuneBoosterSection />
                <LabTestsSection />
            </main>
            <Footer />
            <FloatingWhatsAppButton />
        </>
    );
};

export default App;
