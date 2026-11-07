import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from('.hero-text', {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1.2,
        ease: 'power3.out',
      });

      // Navbar scroll
      ScrollTrigger.create({
        start: 'top -100',
        onUpdate: (self) => setScrolled(self.progress > 0),
      });

      // Philosophy reveal
      gsap.from('.philosophy-text', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.philosophy',
          start: 'top 70%',
        },
      });

      // Protocol stacking
      const cards = gsap.utils.toArray('.protocol-card');
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
          onUpdate: (self) => {
            const prev = cards[i - 1];
            if (prev) {
              gsap.to(prev, {
                scale: 0.9,
                filter: 'blur(20px)',
                opacity: 0.5,
                duration: 0.3,
              });
            }
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-obsidian text-ivory min-h-screen font-sans">
      <div className="noise" />

      {/* NAVBAR */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full transition-all duration-500 ${scrolled ? 'bg-obsidian/60 backdrop-blur-xl border border-white/10' : 'bg-transparent'}`}>
        <div className="flex items-center gap-8">
          <span className="font-serif italic text-xl text-champagne">Two Harbours</span>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#rooms" className="hover:translate-y-[-1px] transition-transform">Rooms</a>
            <a href="#breakfast" className="hover:translate-y-[-1px] transition-transform">Breakfast</a>
            <a href="#garden" className="hover:translate-y-[-1px] transition-transform">Garden</a>
          </div>
          <a href="#book" className="bg-champagne text-obsidian px-5 py-2 rounded-full text-sm font-medium magnetic hover:scale-105 transition-transform">
            Gag on the beauty — Book
          </a>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="h-[100dvh] relative flex items-end pb-24 px-8 md:px-16 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&q=80"
          alt="Hebridean stone and Atlantic light"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="max-w-3xl">
          <p className="hero-text text-sm tracking-widest text-champagne mb-4 font-mono">ISLE OF SCALPAY · OUTER HEBRIDES</p>
          <h1 className="hero-text text-5xl md:text-7xl font-sans font-bold leading-tight">
            Victorian stone meets
          </h1>
          <h1 className="hero-text text-6xl md:text-8xl font-serif italic text-champagne leading-none -mt-2">
            the Atlantic.
          </h1>
          <p className="hero-text mt-6 text-lg md:text-xl max-w-xl text-ivory/80">
            A Victorian bed and breakfast on the Isle of Scalpay. The fires are original. The views have not changed in a hundred years.
          </p>
          <a href="#book" className="hero-text inline-block mt-8 bg-champagne text-obsidian px-8 py-4 rounded-full font-medium magnetic">
            Gag on the beauty — Book
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section ref={featuresRef} className="py-32 px-8 md:px-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Shuffler */}
          <div className="bg-slate/40 border border-white/10 rounded-[2rem] p-8 h-96 relative overflow-hidden">
            <h3 className="font-sans font-semibold text-xl mb-2">Historic Charm</h3>
            <p className="text-sm text-ivory/60 mb-6">Modern comforts, original stone.</p>
            <div className="space-y-3">
              {['Original fireplaces', 'En-suite baths', 'Wi-Fi that works'].map((label, i) => (
                <div key={i} className="bg-obsidian/60 rounded-2xl p-4 text-sm border border-white/5">
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Typewriter */}
          <div className="bg-slate/40 border border-white/10 rounded-[2rem] p-8 h-96">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-champagne rounded-full animate-pulse" />
              <span className="font-mono text-xs tracking-widest">LIVE FEED</span>
            </div>
            <h3 className="font-sans font-semibold text-xl mb-4">Breakfast</h3>
            <p className="font-mono text-sm text-ivory/80 leading-relaxed">
              Black pudding from Harris<br />
              Eggs from the croft across the lane<br />
              Oatcakes still warm<br />
              <span className="inline-block w-2 h-4 bg-champagne animate-pulse ml-1" />
            </p>
          </div>

          {/* Scheduler */}
          <div className="bg-slate/40 border border-white/10 rounded-[2rem] p-8 h-96">
            <h3 className="font-sans font-semibold text-xl mb-2">The Garden</h3>
            <p className="text-sm text-ivory/60 mb-6">Uninterrupted views to the sound.</p>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono">
              {['S','M','T','W','T','F','S'].map((d) => <div key={d} className="opacity-40">{d}</div>)}
              {Array.from({length: 28}).map((_, i) => (
                <div key={i} className={`aspect-square flex items-center justify-center rounded ${i === 14 ? 'bg-champagne text-obsidian' : 'hover:bg-white/5'}`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="philosophy py-32 px-8 md:px-16 bg-slate relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="philosophy-text text-ivory/60 text-lg mb-6">Most bed and breakfasts focus on: the brochure.</p>
          <h2 className="philosophy-text text-4xl md:text-6xl font-serif italic">
            We focus on: <span className="text-champagne">the stone and the sound.</span>
          </h2>
        </div>
      </section>

      {/* PROTOCOL */}
      <section className="relative">
        {[
          { num: '01', title: 'Arrive', desc: 'Down the single-track road. The key is under the pot. The fire is already laid.' },
          { num: '02', title: 'Stay', desc: 'The garden faces the sound. The bath is deep. Breakfast is served until half past ten.' },
          { num: '03', title: 'Leave', desc: 'Late checkout when the tide allows. The views do not require a photograph.' },
        ].map((step, i) => (
          <div key={i} className="protocol-card h-screen flex items-center justify-center bg-obsidian border-t border-white/5">
            <div className="text-center max-w-xl px-8">
              <p className="font-mono text-champagne text-sm mb-4">{step.num}</p>
              <h3 className="text-5xl font-serif italic mb-6">{step.title}</h3>
              <p className="text-ivory/70 text-lg">{step.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* GET STARTED / BOOK */}
      <section id="book" className="py-32 px-8 text-center">
        <h2 className="text-4xl md:text-6xl font-serif italic mb-6">Gag on the beauty.</h2>
        <p className="text-ivory/70 mb-10 max-w-md mx-auto">Book direct. Best rate. Breakfast included. A real person answers.</p>
        <a href="mailto:stay@twoharbours.scot" className="inline-block bg-champagne text-obsidian px-10 py-5 rounded-full text-lg font-medium magnetic">
          Book Direct
        </a>
      </section>

      {/* FOOTER */}
      <footer className="bg-obsidian rounded-t-[4rem] pt-20 pb-12 px-8 md:px-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <h4 className="font-serif italic text-2xl text-champagne mb-4">Two Harbours</h4>
            <p className="text-sm text-ivory/60">Victorian bed and breakfast<br />Isle of Scalpay<br />Outer Hebrides</p>
          </div>
          <div>
            <h5 className="font-mono text-xs tracking-widest mb-4">STAY</h5>
            <ul className="space-y-2 text-sm text-ivory/70">
              <li>Rooms</li>
              <li>Breakfast</li>
              <li>Garden</li>
            </ul>
          </div>
          <div>
            <h5 className="font-mono text-xs tracking-widest mb-4">CONTACT</h5>
            <ul className="space-y-2 text-sm text-ivory/70">
              <li>stay@twoharbours.scot</li>
              <li>+44 1859 000 000</li>
            </ul>
          </div>
          <div className="flex items-end">
            <div className="flex items-center gap-2 text-sm font-mono">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              System Operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
