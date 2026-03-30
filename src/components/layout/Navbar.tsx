'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useAuth, UserButton, SignInButton } from "@clerk/nextjs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const router = useRouter();

  // Scroll Tracking for Smart Reveal
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, [lastScrollY]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { name: 'Home', href: '/#home', id: 'home' },
    { name: 'Start Training', href: '/start-training', id: 'start-training' },
    { name: 'Workouts', href: '/#workouts', id: 'workouts' },
    { name: 'Library', href: '/#library', id: 'library' },
    { name: 'Nutrition', href: '/#nutrition', id: 'nutrition' },
  ];

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  // Harden Navigation
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault();
      const id = href.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        const top = element.offsetTop - 80;
        window.scrollTo({ top, behavior: 'smooth' });
        window.history.replaceState(null, '', `/#${id}`);
        setActiveSection(id);
      }
    }
    setIsOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0 
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        isScrolled 
          ? 'py-4 bg-background/40 backdrop-blur-3xl border-b border-primary/10' 
          : 'py-8 bg-transparent'
      }`}
    >
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent origin-center z-50 opacity-50"
        style={{ scaleX }}
      />

      <nav className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          animate={{ scale: isScrolled ? 0.9 : 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-[60] transition-transform duration-500"
        >
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-12 h-12 flex items-center justify-center">
               <div className="absolute inset-0 bg-primary/20 rounded-xl blur-[15px] group-hover:bg-primary/40 transition-all animate-pulse" />
               <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-background font-black text-2xl skew-x-[-12deg] relative z-10 shadow-[0_0_20px_rgba(212,255,0,0.6)] transition-all duration-500 group-hover:rotate-6">
                  G
               </div>
            </div>
            <div className={`flex flex-col -space-y-1 transition-all duration-500 ${isScrolled ? 'opacity-0 w-0 -translate-x-4 pointer-events-none' : 'opacity-100 w-auto'}`}>
               <span className="text-[1.8rem] font-black tracking-[-0.05em] uppercase text-white drop-shadow-[0_0_15px_rgba(212,255,0,0.2)]">
                  GET<span className="text-primary italic">BULK</span>
               </span>
               <div className="w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-700 shadow-[0_0_10px_var(--primary)]" />
            </div>
          </Link>
        </motion.div>

        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex gap-12 list-none items-center p-0 m-0">
            {navLinks.map((link, i) => (
              <li key={link.id} className="relative">
                <Link 
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 py-2 ${
                    activeSection === link.id ? 'text-primary' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary shadow-[0_0_15px_rgba(212,255,0,0.4)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <a 
            href="mailto:Gauravgetbulk@gmail.com" 
            className="bg-primary text-black px-8 py-3 rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:scale-105 transition-all shadow-[0_10px_30px_rgba(212,255,0,0.2)] text-center flex items-center justify-center"
          >
            CONTACT US
          </a>
          <Link 
            href="/start-training" 
            className="border border-primary text-primary px-8 py-3 rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary/5 transition-all text-center flex items-center justify-center"
          >
            GET STARTED
          </Link>
          <div className="ml-4">
             <UserButton />
          </div>
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden relative z-[60] w-12 h-12 flex items-center justify-center text-white bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
        >
          <AnimatePresence mode="wait">
            {isOpen ? <X key="close" size={24} /> : <Menu key="open" size={24} />}
          </AnimatePresence>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: 'circle(0% at 90% 10%)' }}
              animate={{ opacity: 1, clipPath: 'circle(150% at 90% 10%)' }}
              exit={{ opacity: 0, clipPath: 'circle(0% at 90% 10%)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 bg-background/98 backdrop-blur-3xl lg:hidden flex flex-col pt-32 px-10"
            >
              <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full" />
              </div>

              <div className="flex flex-col gap-8 h-full relative z-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <Link 
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-5xl font-black uppercase tracking-tighter italic flex items-center justify-between group overflow-hidden"
                    >
                      <span className={`transition-colors duration-300 ${activeSection === link.id ? 'text-primary' : 'text-white/40 group-hover:text-white'}`}>
                        {link.name}
                      </span>
                      {activeSection === link.id && (
                        <motion.div 
                          layoutId="active-mobile"
                          className="w-12 h-[2px] bg-primary shadow-[0_0_20px_rgba(212,255,0,1)]"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}

                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-auto pb-16"
                >
                  <Link 
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="w-full h-24 bg-primary text-background rounded-[32px] flex items-center justify-center gap-4 text-2xl font-black uppercase tracking-tighter italic shadow-2xl shadow-primary/30 active:scale-95 transition-transform"
                  >
                    Launch Command Center
                    <ChevronRight size={28} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navbar;
