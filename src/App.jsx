import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Compass, Flame, Waves, Coffee, ArrowRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingModal, setBookingModal] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from('.hero-anim', {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 1.4,
        ease: 'power3.out',
      });

      // Navbar glass scroll effect
      ScrollTrigger.create({
        start: 'top -80',
        onUpdate: (self) => setScrolled(self.progress > 0),
      });

      // Section reveals
      gsap.utils.toArray('.reveal-section').forEach((section) => {
        gsap.from(section, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const rooms = [
    {
      id: 1,
      name: 'The Sound Room',
      tagline: 'Panoramic views across the Scalpay sound to Harris',
      price: '£220 / night',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
      features: ['Super king Hebridean wool bed', 'Original Victorian granite hearth', 'Deep clawfoot soaking tub', 'Bespoke Bamford toiletries']
    },
    {
      id: 2,
      name: 'The Lighthouse Suite',
      tagline: 'Direct Atlantic horizon and morning mist',
      price: '£265 / night',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
      features: ['Corner windows framing the Atlantic', 'Roaring peater fire', 'Rainfall shower & heated floors', 'Handcrafted Scottish cashmere throws']
    },
    {
      id: 3,
      name: 'The Croft Room',
      tagline: 'Sheltered garden views and quiet sanctuary',
      price: '£185 / night',
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200&q=80',
      features: ['Cozy queen timber bed', 'Writing desk overlooking heather hills', 'En-suite slate walk-in shower', 'Fresh artisan tea & shortbread']
    }
  ];

  return (
    <div className="bg-[#0A0A0F] text-[#FAF8F5] min-h-screen font-sans selection:bg-[#C9A84C]/30 selection:text-[#FAF8F5] relative overflow-x-hidden">
      {/* Cinematic Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* NAVBAR */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 w-[92%] max-w-6xl rounded-2xl px-6 py-4 flex items-center justify-between border ${scrolled ? 'bg-[#0A0A0F]/85 backdrop-blur-2xl border-white/10 shadow-2xl shadow-black/60' : 'bg-transparent border-transparent'}`}>
        <div className="flex items-center gap-3">
          <span className="font-serif italic text-2xl text-[#C9A84C] tracking-wide">Two Harbours</span>
          <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest text-white/40 uppercase pl-3 border-l border-white/10">Isle of Scalpay</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-white/80">
          <a href="#rooms" className="hover:text-[#C9A84C] transition-colors">Rooms & Suites</a>
          <a href="#breakfast" className="hover:text-[#C9A84C] transition-colors">The Pantry</a>
          <a href="#sanctuary" className="hover:text-[#C9A84C] transition-colors">Sanctuary</a>
          <a href="#protocol" className="hover:text-[#C9A84C] transition-colors">The Stay</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setBookingModal(true)}
            className="bg-[#C9A84C] text-[#0A0A0F] px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#d4b457] transition-all transform hover:scale-105 shadow-lg shadow-[#C9A84C]/20"
          >
            Book Direct
          </button>
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0A0A0F]/98 backdrop-blur-3xl pt-32 px-8 flex flex-col gap-6 text-2xl font-serif italic md:hidden">
          <a href="#rooms" onClick={() => setMenuOpen(false)} className="hover:text-[#C9A84C]">Rooms & Suites</a>
          <a href="#breakfast" onClick={() => setMenuOpen(false)} className="hover:text-[#C9A84C]">The Pantry</a>
          <a href="#sanctuary" onClick={() => setMenuOpen(false)} className="hover:text-[#C9A84C]">Sanctuary</a>
          <a href="#protocol" onClick={() => setMenuOpen(false)} className="hover:text-[#C9A84C]">The Stay</a>
          <button onClick={() => { setMenuOpen(false); setBookingModal(true); }} className="mt-8 bg-[#C9A84C] text-[#0A0A0F] py-4 rounded-xl font-sans text-sm font-semibold not-italic tracking-wider uppercase">
            Reserve Your Stay
          </button>
        </div>
      )}

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-[100dvh] flex items-end pb-24 px-6 md:px-16 overflow-hidden">
        {/* Immersive Background Image with Cinematic Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2200&q=85"
            alt="Isle of Scalpay Landscape"
            className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/60 to-[#0A0A0F]/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-transparent via-[#0A0A0F]/80 to-[#0A0A0F]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div className="hero-anim inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-ping" />
            <span className="font-mono text-xs tracking-widest text-[#C9A84C] uppercase">Scalpay Tide: High · 11°C Atlantic Air</span>
          </div>

          <h1 className="hero-anim text-5xl sm:text-7xl lg:text-8xl font-sans font-extrabold tracking-tight leading-[1.05] text-[#FAF8F5]">
            Victorian stone meets
          </h1>
          <h1 className="hero-anim text-6xl sm:text-7xl lg:text-9xl font-serif italic text-[#C9A84C] leading-none mt-1">
            the Atlantic.
          </h1>

          <p className="hero-anim mt-8 text-lg sm:text-xl text-[#FAF8F5]/80 max-w-xl font-light leading-relaxed">
            A secluded Victorian bed and breakfast on the Isle of Scalpay, Outer Hebrides. Original granite hearths, salt-worn windows, and an uncompromising silence.
          </p>

          <div className="hero-anim mt-10 flex flex-wrap items-center gap-5">
            <button 
              onClick={() => setBookingModal(true)}
              className="bg-[#C9A84C] text-[#0A0A0F] px-8 py-4 rounded-full font-medium tracking-wide text-sm flex items-center gap-3 hover:bg-[#d4b457] transition-all transform hover:scale-105 shadow-xl shadow-[#C9A84C]/25"
            >
              Secure Your Stay <ArrowRight size={18} />
            </button>
            <a 
              href="#rooms" 
              className="px-8 py-4 rounded-full font-medium tracking-wide text-sm text-[#FAF8F5] bg-white/5 border border-white/15 hover:bg-white/10 transition-all backdrop-blur-md"
            >
              Explore Chambers
            </a>
          </div>
        </div>
      </section>

      {/* AMBIENT MANIFESTO TICKER */}
      <div className="py-8 border-y border-white/10 bg-[#12121A]/60 backdrop-blur-md overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-6 text-xs font-mono tracking-widest text-[#FAF8F5]/60 uppercase">
          <div className="flex items-center gap-2"><Compass size={14} className="text-[#C9A84C]" /> 57.8687° N, 6.6912° W</div>
          <div className="flex items-center gap-2"><Flame size={14} className="text-[#C9A84C]" /> Peat Fires Burn Daily</div>
          <div className="flex items-center gap-2"><Waves size={14} className="text-[#C9A84C]" /> Uninterrupted Sound Views</div>
          <div className="flex items-center gap-2"><Coffee size={14} className="text-[#C9A84C]" /> Artisan Hebridean Breakfast</div>
        </div>
      </div>

      {/* ROOMS & SUITES */}
      <section id="rooms" className="py-32 px-6 md:px-16 reveal-section max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-mono text-xs tracking-widest text-[#C9A84C] uppercase">Accommodations</span>
          <h2 className="text-4xl sm:text-6xl font-serif italic mt-3 mb-4">Chambers of Stone & Silence</h2>
          <p className="text-[#FAF8F5]/70 text-base font-light">Each room preserves its 1890s architectural character while offering uncompromising modern comfort.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div key={room.id} className="group bg-[#151520] border border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-[#C9A84C]/50 transition-all duration-500 shadow-2xl">
              <div>
                <div className="relative h-72 overflow-hidden">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151520] via-transparent to-transparent" />
                  <span className="absolute top-4 right-4 bg-[#0A0A0F]/80 backdrop-blur-md px-4 py-1.5 rounded-full font-mono text-xs text-[#C9A84C] border border-white/10">
                    {room.price}
                  </span>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-serif italic mb-2 text-[#FAF8F5]">{room.name}</h3>
                  <p className="text-sm text-[#FAF8F5]/60 mb-6 font-light">{room.tagline}</p>
                  <ul className="space-y-3 mb-8">
                    {room.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs text-[#FAF8F5]/80 font-mono">
                        <Check size={14} className="text-[#C9A84C]" /> {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-8 pt-0">
                <button 
                  onClick={() => { setSelectedRoom(room); setBookingModal(true); }}
                  className="w-full py-3.5 rounded-2xl bg-white/5 border border-white/10 font-medium text-xs tracking-wider uppercase hover:bg-[#C9A84C] hover:text-[#0A0A0F] transition-all duration-300"
                >
                  Reserve {room.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE PANTRY / BREAKFAST */}
      <section id="breakfast" className="py-32 px-6 md:px-16 reveal-section bg-[#12121A]/50 border-y border-white/10 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#C9A84C] uppercase">Morning Ritual</span>
            <h2 className="text-4xl sm:text-5xl font-serif italic mt-3 mb-6">The Hebridean Pantry</h2>
            <p className="text-[#FAF8F5]/80 font-light leading-relaxed mb-6">
              Breakfast is not an amenity; it is a ceremony. We source ingredients from the crofts directly across the lane and the fishermen of Harris.
            </p>
            <ul className="space-y-4 text-sm font-mono text-[#FAF8F5]/90">
              <li className="flex items-start gap-3 p-4 rounded-2xl bg-[#0A0A0F] border border-white/10">
                <span className="text-[#C9A84C]">01</span>
                <span>Traditional black pudding from Harris, pan-seared in salted butter</span>
              </li>
              <li className="flex items-start gap-3 p-4 rounded-2xl bg-[#0A0A0F] border border-white/10">
                <span className="text-[#C9A84C]">02</span>
                <span>Free-range eggs from Scalpay crofters gathered at dawn</span>
              </li>
              <li className="flex items-start gap-3 p-4 rounded-2xl bg-[#0A0A0F] border border-white/10">
                <span className="text-[#C9A84C]">03</span>
                <span>Oatcakes baked daily in our Victorian kitchen, served with Scottish honey</span>
              </li>
            </ul>
          </div>
          <div className="relative h-[450px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1200&q=80" alt="Hebridean Breakfast" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* SANCTUARY & GARDEN */}
      <section id="sanctuary" className="py-32 px-6 md:px-16 reveal-section max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80" alt="Isle of Scalpay Landscape" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent" />
          </div>
          <div>
            <span className="font-mono text-xs tracking-widest text-[#C9A84C] uppercase">The Garden & Sound</span>
            <h2 className="text-4xl sm:text-5xl font-serif italic mt-3 mb-6">Uninterrupted Solitude</h2>
            <p className="text-[#FAF8F5]/80 font-light leading-relaxed mb-8">
              Step from our stone garden straight onto the heather-clad shores of Scalpay. Watch gray seals bask in the cove and golden eagles drift above the ridge. There are no schedules here—only tides.
            </p>
            <div className="grid grid-cols-2 gap-6 font-mono text-xs">
              <div className="p-6 rounded-2xl bg-[#151520] border border-white/10">
                <p className="text-[#C9A84C] text-lg font-serif italic mb-1">100 Acres</p>
                <p className="text-[#FAF8F5]/60">Of wild coastal moorland & private shoreline</p>
              </div>
              <div className="p-6 rounded-2xl bg-[#151520] border border-white/10">
                <p className="text-[#C9A84C] text-lg font-serif italic mb-1">Zero Light Pollution</p>
                <p className="text-[#FAF8F5]/60">Unmatched Milky Way & Northern Lights viewing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROTOCOL */}
      <section id="protocol" className="py-32 px-6 md:px-16 reveal-section bg-[#12121A]/50 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="font-mono text-xs tracking-widest text-[#C9A84C] uppercase">The Experience</span>
            <h2 className="text-4xl sm:text-6xl font-serif italic mt-3">The Hebridean Protocol</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Arrive', desc: 'Down the single-track road across the bridge. The key is waiting. The peat fire is already laid in your hearth.' },
              { num: '02', title: 'Stay', desc: 'Wander the rocky coves, read by the window as Atlantic gales blow, and enjoy fireside whisky in the evening.' },
              { num: '03', title: 'Leave', desc: 'Depart in peace when the tide allows. You will leave lighter than you arrived.' },
            ].map((step, i) => (
              <div key={i} className="p-10 rounded-3xl bg-[#151520] border border-white/10 hover:border-[#C9A84C]/50 transition-all duration-300">
                <span className="font-mono text-[#C9A84C] text-sm tracking-widest block mb-4">{step.num}</span>
                <h3 className="text-3xl font-serif italic mb-4">{step.title}</h3>
                <p className="text-sm text-[#FAF8F5]/70 font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK DIRECT CTA */}
      <section className="py-32 px-6 text-center relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#C9A84C_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="font-mono text-xs tracking-widest text-[#C9A84C] uppercase mb-4 block">Reservations</span>
          <h2 className="text-5xl sm:text-7xl font-serif italic mb-6">Gag on the beauty.</h2>
          <p className="text-[#FAF8F5]/70 text-lg mb-10 font-light">Book direct for guaranteed best rates, complimentary drams upon arrival, and personal concierge coordination.</p>
          <button 
            onClick={() => setBookingModal(true)}
            className="bg-[#C9A84C] text-[#0A0A0F] px-10 py-5 rounded-full font-medium text-base tracking-wide uppercase hover:bg-[#d4b457] transition-all transform hover:scale-105 shadow-2xl shadow-[#C9A84C]/30"
          >
            Reserve Your Dates Direct
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0A0A0F] border-t border-white/10 pt-20 pb-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <h4 className="font-serif italic text-2xl text-[#C9A84C] mb-4">Two Harbours</h4>
            <p className="text-sm text-[#FAF8F5]/60 font-light leading-relaxed">
              Victorian bed and breakfast<br />
              Isle of Scalpay, Outer Hebrides<br />
              Scotland, HS4 3XU
            </p>
          </div>
          <div>
            <h5 className="font-mono text-xs tracking-widest mb-4 text-[#C9A84C]">CHAMBERS</h5>
            <ul className="space-y-2 text-sm text-[#FAF8F5]/70 font-light">
              <li><a href="#rooms" className="hover:text-[#C9A84C]">The Sound Room</a></li>
              <li><a href="#rooms" className="hover:text-[#C9A84C]">The Lighthouse Suite</a></li>
              <li><a href="#rooms" className="hover:text-[#C9A84C]">The Croft Room</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-mono text-xs tracking-widest mb-4 text-[#C9A84C]">CONTACT</h5>
            <ul className="space-y-2 text-sm text-[#FAF8F5]/70 font-light">
              <li>stay@twoharbours.scot</li>
              <li>+44 1859 520 000</li>
            </ul>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-3 text-xs font-mono text-[#FAF8F5]/80 bg-[#151520] p-4 rounded-2xl border border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>System Operational · Tides Normal</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#FAF8F5]/40">
          <p>© 2026 Two Harbours Guest House. All rights reserved.</p>
          <p>Designed with Flowy Studio Standards.</p>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      {bookingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#151520] border border-white/15 rounded-3xl p-8 max-w-lg w-full relative shadow-2xl">
            <button onClick={() => setBookingModal(false)} className="absolute top-6 right-6 text-white/60 hover:text-white">
              <X size={20} />
            </button>
            <h3 className="text-3xl font-serif italic mb-2">Reserve Your Stay</h3>
            <p className="text-xs font-mono text-[#C9A84C] mb-6">Direct Booking Concierge</p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Reservation enquiry submitted successfully! We will email you within 2 hours.'); setBookingModal(false); }} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#FAF8F5]/70 mb-1">Your Full Name</label>
                <input required type="text" placeholder="Lord / Lady..." className="w-full bg-[#0A0A0F] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A84C]" />
              </div>
              <div>
                <label className="block text-xs font-mono text-[#FAF8F5]/70 mb-1">Email Address</label>
                <input required type="email" placeholder="you@domain.com" className="w-full bg-[#0A0A0F] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A84C]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#FAF8F5]/70 mb-1">Check-in</label>
                  <input required type="date" className="w-full bg-[#0A0A0F] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A84C]" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#FAF8F5]/70 mb-1">Check-out</label>
                  <input required type="date" className="w-full bg-[#0A0A0F] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A84C]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-[#FAF8F5]/70 mb-1">Selected Chamber</label>
                <select className="w-full bg-[#0A0A0F] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A84C]">
                  {rooms.map(r => <option key={r.id} value={r.name}>{r.name} ({r.price})</option>)}
                </select>
              </div>
              <button type="submit" className="w-full py-4 mt-4 bg-[#C9A84C] text-[#0A0A0F] rounded-xl font-semibold text-xs tracking-wider uppercase hover:bg-[#d4b457] transition-all">
                Send Reservation Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
