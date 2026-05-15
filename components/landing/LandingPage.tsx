'use client';

import { useState, useEffect } from 'react';
import ShaderBackground from '@/components/ui/shader-background';

interface Product {
  name: string;
  price: string;
  priceOld?: string;
}

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modal, setModal] = useState<Product | null>(null);
  const [step, setStep] = useState<'order' | 'payment' | 'success'>('order');
  const [orderInfo, setOrderInfo] = useState({ name: '', phone: '', address: '', doorCode: '' });
  const [timer, setTimer] = useState(900);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    if (!modal || step !== 'payment') return;
    const id = setInterval(() => setTimer(t => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [modal, step]);

  const openModal = (p: Product) => { setModal(p); setStep('order'); setTimer(900); setOrderInfo({ name: '', phone: '', address: '', doorCode: '' }); };
  const closeModal = () => { setModal(null); };
  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const products = [
    {
      id: 'starter', name: 'Эхлэгч багц', strips: '7 Наалт',
      photo: '/photos/product-main.png',
      desc: 'Анхны хэрэглээнд зориулсан энгийн сонголт.',
      features: ['1 багц — 7 цайруулах наалт', '7 хоногийн цайруулалт', 'PAP+ томъёо', 'Үнэгүй хүргэлт'],
      price: '₮45,000', featured: false, badge: null,
    },
    {
      id: 'pro', name: 'Про багц', strips: '14 Наалт',
      photo: '/photos/product-pro.jpg',
      desc: 'Хамгийн өндөр үр дүн. 14 хоногийн мэргэжлийн түвшний цайруулга.',
      features: ['2 багц — 14 цайруулах наалт', '14 хоногийн цайруулалт', 'PAP+ Дэвшилтэт томъёо', 'Үнэгүй хүргэлт'],
      price: '₮85,000', featured: true, badge: 'Хамгийн их сонгогддог',
    },
    {
      id: 'ultimate', name: 'Тэргүүн багц', strips: '21 Наалт',
      photo: '/photos/product-triple.png',
      desc: 'Бүрэн туршлага. 3 багц. Урт эдэлгээтэй гялбаа.',
      features: ['3 багц — 21 цайруулах наалт', '21 хоногийн цайруулалт', 'PAP+ Про томъёо', 'Үнэгүй хүргэлт'],
      price: '₮120,000', featured: false, badge: 'Хамгийн ашигтай',
    },
  ];

  const steps = [
    { n: '01', title: 'Хальсыг хуулж шүдэндээ нааж хийнэ.', sub: 'Ердөө 30 секунд.' },
    { n: '02', title: '30 минут хүлээнэ.', sub: '30 минутын туршид хүссэн зүйлээ хийгээрэй.' },
    { n: '03', title: 'Хуулж аваад зайлна.', sub: 'Үр дүнгээ хараарай.' },
  ];

  const reviews = [
    {
      stars: '★★★★☆', initial: 'Б', color: '#B57EDC', featured: false,
      name: 'Баярцэцэг Д.', kit: 'Про багц · 14 хоног',
      text: '«Bi ehdnee ergelzeej baisancch 4 deh udrees naizuud maani yuu hiisniig asuuh bolson. Minii ineemseglel hezee ch ingej gerelteej baisangui.»',
    },
    {
      stars: '★★★★★', initial: 'С', color: '#FF6FB5', featured: true,
      name: 'Солонго А.', kit: 'Эхлэгч багц · Анхны хэрэглэгч',
      text: '«Огт өвдөлтгүй! Шүд маань маш мэдрэмтгий тул айж байсан ч бүрэн өвдөлтгүй байлаа. Хоёр дахь багцаа захиалчихлаа.»',
    },
    {
      stars: '★★★★☆', initial: 'Ц', color: '#5BD3B5', featured: false,
      name: 'Цэрэнпунцаг Н.', kit: 'Тэргүүн багц · Дахин захиалагч',
      text: '«Mungunud une tsenei. Shudnii emch deer iluu ih zartsulad baga ur dun garch baissan. Terguun bagts uneheer ashigtai.»',
    },
  ];

  const faqs = [
    { q: 'Шүдний паалангд хортой юу?', a: 'Үгүй. Манай PAP+ томъёо перекс агуулдаггүй тул паалангийг огт элэгдүүлдэггүй. Ихэнх цайруулах шүдний оо-ноос ч зөөлөн бөгөөд хамгийн мэдрэмтгий шүдэнд ч туршсан.' },
    { q: 'Хэзээ үр дүн гарах вэ?', a: 'Ихэнх хүмүүс 3 дахь өдрөөс ялгааг мэдэрдэг. Бүрэн үр дүн Эхлэгч багцаар 7 хоног, Про багцаар 14 хоногт гарна. Тэргүүн багц 21 хоногт 8 хүртэл зэрэг цайрна.' },
    { q: 'Үр дүн хэр удаан хадгалагдах вэ?', a: 'Ердийн амьдралын хэвшлийн дагуу 3–6 сар. Кофе, цай ихтэй уудаг хүн бол сард нэг 2–3 наалтаар дэмжинэ.' },
    { q: 'Хаана захиалж болох вэ?', a: 'Шууд энэ хуудаснаас "Авах" товчийг дарж захиалах боломжтой. Мөн өдөр нь хүргэнэ.' },
  ];

  const navLinks = [
    ['#products', 'Дэлгүүр'],
    ['#how-it-works', 'Хэрхэн ажилладаг'],
    ['#reviews', 'Сэтгэгдэл'],
    ['#faq', 'Асуулт'],
  ];

  return (
    <>
      <ShaderBackground />
      <div className="fixed inset-0 bg-black/55 pointer-events-none z-0" />

      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8A2BE2] to-[#3D2A8C] flex items-center justify-center shadow-[0_0_12px_rgba(138,43,226,.5)]">
                <span className="text-white text-[11px] font-black">PS</span>
              </div>
              <span className="text-white font-bold text-[15px] tracking-tight">
                Purple <span className="text-[#B57EDC]">Smile</span>
              </span>
            </a>

            <ul className="hidden md:flex items-center gap-7">
              {navLinks.map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-[13px] text-white/55 hover:text-white transition-colors duration-200">
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#products"
              className="hidden md:inline-flex items-center px-5 py-2 rounded-lg bg-[#8A2BE2] text-white text-[13px] font-semibold hover:bg-[#7320cc] transition-colors shadow-[0_4px_16px_rgba(138,43,226,.4)]"
            >
              Одоо авах
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Цэс нээх"
            >
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0a0010]/90 backdrop-blur-lg px-5 py-5 flex flex-col gap-4">
            {navLinks.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="text-white/70 text-sm hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
            <a
              href="#products"
              onClick={() => setMobileOpen(false)}
              className="text-center py-3 rounded-xl bg-[#8A2BE2] text-white text-sm font-bold"
            >
              Одоо авах
            </a>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full py-20">
          <div className="grid md:grid-cols-2 gap-14 items-center">

            {/* Copy */}
            <div className="flex flex-col gap-7">
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#B57EDC]">
                Мэргэжлийн цайруулга. Эмнэлэг хэрэггүй.
              </span>
              <h1 className="text-[clamp(2.4rem,6vw,4rem)] font-black text-white leading-[1.05] tracking-tight">
                Илүү цэвэр,<br />
                илүү итгэлтэй<br />
                <span className="text-[#B57EDC]">инээмсэглэл.</span>
              </h1>
              <p className="text-[15px] text-white/55 max-w-xs leading-relaxed">
                7 хоног. Мэдэгдэхүйц цайруулна. Өвдөлтгүй. Хоосон амлалтгүй.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#products"
                  className="px-8 py-3.5 rounded-xl bg-[#8A2BE2] text-white text-sm font-bold hover:bg-[#7320cc] transition-all hover:-translate-y-0.5 shadow-[0_6px_28px_rgba(138,43,226,.45)]"
                >
                  Багц сонгох
                </a>
                <a
                  href="#how-it-works"
                  className="px-8 py-3.5 rounded-xl border border-white/20 text-white/75 text-sm font-semibold hover:border-white/40 hover:text-white transition-all hover:-translate-y-0.5"
                >
                  Хэрхэн ажилладагийг үзэх
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-yellow-400 text-base">★★★★☆</span>
                <span className="text-white/45">376 үнэлгээ</span>
              </div>
            </div>

            {/* Main product photo — hero */}
            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="w-[300px] flex items-center justify-center">
                  <img
                    src="/photos/product-main.png"
                    alt="Purple Smile цайруулах судал"
                    className="w-full object-contain drop-shadow-[0_32px_64px_rgba(75,0,130,.7)]"
                  />
                </div>

                {/* Floating badge 1 */}
                <div className="absolute -left-12 top-1/4 flex items-center gap-2 bg-[#0e0e1a]/95 backdrop-blur border border-white/10 rounded-xl px-3 py-2 shadow-xl">
                  <div className="w-5 h-5 rounded-full bg-[#5BD3B5] flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-white text-[11px] font-semibold">Паалангийг хамгаалдаг</span>
                </div>

                {/* Floating badge 2 */}
                <div className="absolute -right-12 bottom-1/4 flex items-center gap-2 bg-[#0e0e1a]/95 backdrop-blur border border-white/10 rounded-xl px-3 py-2 shadow-xl">
                  <div className="w-5 h-5 rounded-full bg-[#FF6FB5] flex items-center justify-center text-white text-[10px]">⏱</div>
                  <span className="text-white text-[11px] font-semibold">7 хоногт үр дүн</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST STRIP ─── */}
      <div className="relative z-10 border-y border-white/10 bg-black/35 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4">
          <div className="flex flex-wrap justify-center gap-5 md:gap-10">
            {[
              '✓  7 хоногт үр дүн',
              '✓  Паалангийг хамгаалдаг томъёо',
              '✓  100,000+ инээмсэглэл',
              '✓  Өвдөлтгүй',
              '✓  30 хоногийн баталгаа',
            ].map(t => (
              <span key={t} className="text-[13px] text-white/50 font-medium">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── BOLD STATEMENT (inspired by "NOT HYPE. JUST RESULTS.") ─── */}
      <section className="relative z-10 py-20 overflow-hidden border-b border-white/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[clamp(2.8rem,8vw,5.5rem)] font-black text-white leading-[0.95] tracking-tight uppercase">
                Хоосон<br />
                амлалт биш.<br />
                <span className="text-[#8A2BE2]">Зөвхөн</span><br />
                үр дүн.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {/* Stat cards */}
              {[
                { label: '30 МИН', sub: 'Нэг удаагийн хэрэглээ' },
                { label: '1 ХЭРЭГЛЭЭ', sub: 'Анхны хэрэглээнд мэдэгдэхүйц өөрчлөлт гарна' },
                { label: '21 ХОНОГ', sub: 'Хамгийн сайн үр дүнд хүрэхийг зөвлөдөг' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-5 rounded-xl px-5 py-4 bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-2xl font-black text-white min-w-[80px]">{s.label}</div>
                  <div className="h-8 w-px bg-white/15" />
                  <p className="text-sm text-white/55">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SHOP ─── */}
      <section id="products" className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#B57EDC]">Багцаа сонго</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-4">Танд яг тохирохыг ол.</h2>
            <p className="text-white/50 max-w-sm mx-auto text-sm leading-relaxed">
              Бүх багц PAP+ томъёог ашигладаг. Перекс агуулдаггүй. Өвдөлтгүй. Зөвхөн үр дүн.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map(p => (
              <div
                key={p.id}
                className={`relative rounded-2xl flex flex-col transition-transform hover:-translate-y-1 duration-200 ${
                  p.featured
                    ? 'border-2 border-[#8A2BE2] shadow-[0_0_48px_rgba(138,43,226,.3)]'
                    : 'border border-white/12'
                }`}
                style={{
                  background: p.featured
                    ? 'linear-gradient(160deg, rgba(75,0,130,.7) 0%, rgba(30,10,70,.85) 100%)'
                    : 'rgba(255,255,255,0.04)',
                }}
              >
                {/* Badge */}
                {p.badge && (
                  <div className={`absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold px-3 py-1 rounded-full z-10 ${
                    p.featured
                      ? 'bg-[#8A2BE2] text-white shadow-[0_2px_12px_rgba(138,43,226,.5)]'
                      : 'bg-white/10 text-white/65 border border-white/15'
                  }`}>
                    {p.badge}
                  </div>
                )}

                {/* Product image */}
                <div className="w-full px-6 pt-10 pb-5 flex items-center justify-center" style={{ minHeight: '210px' }}>
                  <img
                    src={p.photo}
                    alt={p.name}
                    className="w-full max-h-48 object-contain drop-shadow-xl"
                  />
                </div>

                {/* Divider */}
                <div className="mx-6 h-px bg-white/10" />

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-base font-bold text-white">{p.name}</h3>
                  </div>
                  <p className="text-white/40 text-[12px] mb-4 leading-relaxed">{p.desc}</p>

                  <ul className="space-y-2 mb-6 flex-1">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-[13px] text-white/65">
                        <span className="text-[#5BD3B5] text-[10px] shrink-0 font-bold">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mb-4 pt-4 border-t border-white/10">
                    <span className="text-2xl font-black text-white">{p.price}</span>
                  </div>

                  <button
                    onClick={() => openModal({ name: p.name, price: p.price })}
                    className={`w-full py-3.5 rounded-xl font-bold text-[13px] transition-all hover:-translate-y-0.5 ${
                      p.featured
                        ? 'bg-[#8A2BE2] text-white shadow-[0_4px_20px_rgba(138,43,226,.5)] hover:bg-[#7320cc]'
                        : 'bg-white/8 text-white border border-white/15 hover:bg-white/12'
                    }`}
                  >
                    Авах
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PAP+ TECHNOLOGY (image 2 reference) ─── */}
      <section className="relative z-10 py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: visual */}
            <div className="flex justify-center">
              <div className="relative w-72 h-72">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full border-2 border-[#8A2BE2]/30 shadow-[0_0_60px_rgba(138,43,226,.3)]" />
                {/* PAP+ disc */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-b from-[#f0f0f0] to-[#d8d8d8] shadow-[0_8px_32px_rgba(0,0,0,.4)] flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-[#4B0082] text-2xl font-black tracking-tight">pap<span className="text-[#8A2BE2]">+</span></p>
                    <p className="text-[#4B0082]/60 text-[10px] font-bold tracking-widest uppercase mt-0.5">WHITENING</p>
                  </div>
                </div>
                {/* V34 bottom circle */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-2 border-[#8A2BE2]/50 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #4B0082, #7B5FE8)' }}>
                  <span className="text-white text-sm font-black">PAP+</span>
                </div>
                {/* PAP+ label */}
                <div className="absolute -left-16 top-1/3 flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-xl bg-[#4B0082] flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect x="2" y="2" width="14" height="14" rx="3" stroke="white" strokeWidth="1.5"/>
                      <path d="M5 9h8M9 5v8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="text-[9px] text-white/60 font-bold text-center leading-tight">PAP+<br/>WHITENING</p>
                </div>
                {/* Colour correct label */}
                <div className="absolute -right-16 bottom-1/3 flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="6" cy="6" r="4" stroke="white" strokeWidth="1.5"/>
                      <circle cx="10" cy="10" r="4" stroke="white" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <p className="text-[9px] text-white/60 font-bold text-center leading-tight">COLOUR<br/>CORRECTING</p>
                </div>
              </div>
            </div>

            {/* Right: text */}
            <div className="flex flex-col gap-6">
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#B57EDC]">Технологи</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                PAP+ томъёо.<br />
                <span className="text-[#B57EDC]">Хоёр давхар</span> үйлдэл.
              </h2>
              <p className="text-white/55 text-sm leading-relaxed max-w-sm">
                Бидний DUAL ACTIVE TECHNOLOGY нь PAP+ цайруулалтыг өнгийг засах технологитой нэгтгэж, хамгийн богино хугацаанд хамгийн илэрхий үр дүнг өгдөг.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🦷', title: 'PAP+ Цайруулалт', sub: 'Перекс агуулдаггүй, өвдөлтгүй' },
                  { icon: '✦', title: 'Өнгийг засах', sub: 'Шаргал өнгийг тэсгэнэ' },
                  { icon: '🛡', title: 'Паалангийг хамгаалдаг', sub: 'Hydroxyapatite агуулдаг' },
                  { icon: '⚡', title: '30 минут', sub: 'Хурдан, хялбар хэрэглээ' },
                ].map(f => (
                  <div key={f.title} className="rounded-xl p-4 bg-white/5 border border-white/10">
                    <p className="text-lg mb-2">{f.icon}</p>
                    <p className="text-white text-[13px] font-bold mb-0.5">{f.title}</p>
                    <p className="text-white/45 text-[11px]">{f.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BEFORE / AFTER ─── */}
      <section className="relative z-10 py-24 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#B57EDC]">Үр дүн</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
              Өмнө & дараа.
            </h2>
            <p className="text-white/45 text-sm mt-3">Жинхэнэ хэрэглэгчдийн үр дүн. 7 хоногийн эмчилгээний дараа.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Before */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/4 backdrop-blur-sm">
              <div className="relative h-72 overflow-hidden">
                <img
                  src="/photos/before.png"
                  alt="Эмчилгээний өмнө"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/15">
                  <span className="text-white text-[11px] font-bold uppercase tracking-wider">Өмнө</span>
                </div>
              </div>
              <div className="px-4 py-3 border-t border-white/10">
                <p className="text-white font-bold text-sm">Эмчилгээний өмнө</p>
                <p className="text-white/45 text-xs mt-0.5">Шаргалдсан, тунаргүй</p>
              </div>
            </div>

            {/* After */}
            <div className="rounded-2xl overflow-hidden border border-[#8A2BE2]/50 bg-white/4 backdrop-blur-sm shadow-[0_0_30px_rgba(138,43,226,.2)]">
              <div className="relative h-72 overflow-hidden">
                <img
                  src="/photos/after.png"
                  alt="Эмчилгээний дараа"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#8A2BE2]/80 backdrop-blur-sm border border-white/20">
                  <span className="text-white text-[11px] font-bold uppercase tracking-wider">Дараа</span>
                </div>
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#5BD3B5]/80 backdrop-blur-sm">
                  <span className="text-white text-[11px] font-bold">7 хоног</span>
                </div>
              </div>
              <div className="px-4 py-3 border-t border-white/10">
                <p className="text-white font-bold text-sm">Эмчилгээний дараа</p>
                <p className="text-[#5BD3B5] text-xs mt-0.5 font-medium">3–5 шат цайрсан ✓</p>
              </div>
            </div>
          </div>

          <p className="text-center text-white/30 text-xs mt-6">
            * Үр дүн хэрэглэгчээс хамааран харилцан адилгүй байж болно.
          </p>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="relative z-10 py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Эмнэлэг хэрэггүй.<br />
              Цаг захиалах хэрэггүй.<br />
              Адил үр дүнг гэрээсээ.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-7 left-[calc(33%+2rem)] right-[calc(33%+2rem)] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            {steps.map(s => (
              <div key={s.n} className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/12 flex items-center justify-center shadow-[0_0_24px_rgba(138,43,226,.2)]">
                  <span className="text-[#8A2BE2] font-black text-lg">{s.n}</span>
                </div>
                <h3 className="text-white font-bold text-[15px] max-w-[200px]">{s.title}</h3>
                <p className="text-white/45 text-sm">{s.sub}</p>
              </div>
            ))}
          </div>
          {/* Application detail strip */}
          <div className="mt-14 grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            {[['30 МИН', 'Нэг удаагийн хэрэглээ'], ['7-28 ХОНОГ', 'Бүрэн эмчилгээний хугацаа']].map(([val, label]) => (
              <div key={val} className="rounded-xl border border-white/15 bg-white/5 py-4 px-6 text-center">
                <p className="text-white font-black text-lg">{val}</p>
                <p className="text-white/45 text-xs mt-0.5 font-medium uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section id="reviews" className="relative z-10 py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#B57EDC]">
              Жинхэнэ инээмсэглэл. Жинхэнэ үр дүн.
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-3">376 үнэлгээ.</h2>
            <div className="flex items-center justify-center gap-2">
              <span className="text-yellow-400">★★★★☆</span>
              <span className="text-white/40 text-sm">4.2 / 5</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {reviews.map(r => (
              <div
                key={r.name}
                className={`rounded-2xl p-6 flex flex-col gap-4 backdrop-blur-sm ${
                  r.featured
                    ? 'bg-white/10 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,.04)]'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                <span className="text-yellow-400 text-sm">{r.stars}</span>
                <p className="text-white/70 text-sm leading-relaxed flex-1">{r.text}</p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ background: r.color }}
                  >
                    {r.initial}
                  </div>
                  <div>
                    <p className="text-white text-[13px] font-semibold">{r.name}</p>
                    <p className="text-white/35 text-xs">{r.kit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="relative z-10 py-24 border-t border-white/10">
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <div className="mb-12">
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#B57EDC]">Асуулт байна уу?</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">Хүмүүсийн асуудаг зүйлүүд.</h2>
          </div>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/4 backdrop-blur-sm overflow-hidden">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left text-white text-sm font-semibold hover:bg-white/5 transition-colors"
                >
                  <span>{f.q}</span>
                  <span className={`text-[#8A2BE2] text-2xl font-thin leading-none transition-transform duration-200 ${faqOpen === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {faqOpen === i && (
                  <div className="px-6 pb-5 border-t border-white/10">
                    <p className="text-white/55 text-sm leading-relaxed pt-4">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative z-10 py-28 border-t border-white/10 text-center">
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-black text-white leading-tight mb-5">
            Илүү цэвэр,<br />итгэлтэй инээмсэглэл.
          </h2>
          <p className="text-white/50 text-base mb-9">
            Инээмсэглэлээ нуухаа больсон хүмүүст нэгд.
          </p>
          <a
            href="#products"
            className="inline-flex px-12 py-4 rounded-xl bg-[#8A2BE2] text-white font-bold text-sm hover:bg-[#7320cc] transition-all hover:-translate-y-0.5 shadow-[0_8px_36px_rgba(138,43,226,.55)]"
          >
            Багц сонгох
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-white/10 bg-black/45 backdrop-blur-sm py-14">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8A2BE2] to-[#3D2A8C] flex items-center justify-center">
                  <span className="text-white text-[11px] font-black">PS</span>
                </div>
                <span className="text-white font-bold">Purple <span className="text-[#B57EDC]">Smile</span></span>
              </div>
              <p className="text-white/35 text-sm mb-5 leading-relaxed">
                Мэргэжлийн цайруулга,<br />таны хаалганд хүргэнэ.
              </p>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <span>Аюулгүй төлбөр:</span>
                <div className="flex items-center gap-1.5 bg-white/6 border border-white/12 rounded-lg px-3 py-1.5">
                  <div className="w-5 h-5 rounded bg-[#4B0082] flex items-center justify-center text-white text-[10px] font-black">Q</div>
                  <span className="text-white/55 text-xs font-bold">QPay</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Дэлгүүр</h4>
              <ul className="space-y-3">
                {['Эхлэгч багц', 'Про багц', 'Тэргүүн багц'].map(item => (
                  <li key={item}>
                    <a href="#products" className="text-white/35 text-sm hover:text-white/70 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Тусламж</h4>
              <ul className="space-y-3">
                {[['#faq', 'Асуулт & Хариулт'], ['#', 'Хүргэлтийн мэдээлэл'], ['#', 'Буцаалт'], ['#', 'Холбоо барих']].map(([href, label]) => (
                  <li key={label}>
                    <a href={href} className="text-white/35 text-sm hover:text-white/70 transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/25 text-xs">© 2026 Purple Smile. Бүх эрх хуулиар хамгаалагдсан.</p>
            <div className="flex gap-5">
              {['Нууцлал', 'Нөхцөл'].map(item => (
                <a key={item} href="#" className="text-white/25 text-xs hover:text-white/55 transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ─── PAYMENT MODAL ─── */}
      {modal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/75 backdrop-blur-sm"
          onClick={e => e.target === e.currentTarget && closeModal()}
        >
          <div className="w-full max-w-[360px] bg-[#0c0c18] border border-white/12 rounded-2xl overflow-hidden shadow-2xl">

            {/* ── STEP 1: Order form ── */}
            {step === 'order' && (
              <>
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                  <div>
                    <p className="text-white font-bold text-sm">Захиалгын мэдээлэл</p>
                    <p className="text-white/35 text-[11px]">{modal.name} · {modal.price}</p>
                  </div>
                  <button onClick={closeModal} className="text-white/35 hover:text-white transition-colors text-xl leading-none">✕</button>
                </div>

                <div className="px-6 py-5 flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/55 text-[11px] font-semibold uppercase tracking-wider">Нэр</label>
                    <input
                      type="text"
                      placeholder="Таны нэр"
                      value={orderInfo.name}
                      onChange={e => setOrderInfo(o => ({ ...o, name: e.target.value }))}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#8A2BE2] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/55 text-[11px] font-semibold uppercase tracking-wider">Утасны дугаар</label>
                    <input
                      type="tel"
                      placeholder="9999 9999"
                      value={orderInfo.phone}
                      onChange={e => setOrderInfo(o => ({ ...o, phone: e.target.value }))}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#8A2BE2] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/55 text-[11px] font-semibold uppercase tracking-wider">Хүргэлтийн хаяг</label>
                    <textarea
                      placeholder="Дүүрэг, хороо, байр, орц, тоот..."
                      value={orderInfo.address}
                      onChange={e => setOrderInfo(o => ({ ...o, address: e.target.value }))}
                      rows={3}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#8A2BE2] transition-colors resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/55 text-[11px] font-semibold uppercase tracking-wider">Орцны код <span className="text-white/25 normal-case font-normal">(заавал биш)</span></label>
                    <input
                      type="text"
                      placeholder="жш: 1234"
                      value={orderInfo.doorCode}
                      onChange={e => setOrderInfo(o => ({ ...o, doorCode: e.target.value }))}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#8A2BE2] transition-colors"
                    />
                  </div>

                  <button
                    onClick={() => {
                      if (!orderInfo.name.trim() || !orderInfo.phone.trim() || !orderInfo.address.trim()) return;
                      setStep('payment');
                    }}
                    disabled={!orderInfo.name.trim() || !orderInfo.phone.trim() || !orderInfo.address.trim()}
                    className="w-full py-3.5 rounded-xl bg-[#8A2BE2] text-white font-bold text-sm hover:bg-[#7320cc] transition-colors shadow-[0_4px_20px_rgba(138,43,226,.4)] disabled:opacity-40 disabled:cursor-not-allowed mt-1"
                  >
                    Төлбөр рүү үргэлжлэх →
                  </button>
                </div>
              </>
            )}

            {/* ── STEP 2: QPay ── */}
            {step === 'payment' && (
              <>
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#4B0082] flex items-center justify-center shadow-[0_0_16px_rgba(75,0,130,.5)]">
                      <span className="text-white font-black text-sm">Q</span>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">QPay</p>
                      <p className="text-white/35 text-[11px]">Аюулгүй төлбөр</p>
                    </div>
                  </div>
                  <button onClick={closeModal} className="text-white/35 hover:text-white transition-colors text-xl leading-none">✕</button>
                </div>

                <div className="flex items-center justify-between px-6 py-3.5 bg-white/4 border-b border-white/8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[10px] font-black"
                      style={{ background: 'linear-gradient(135deg, #7B5FE8, #3D2A8C)' }}>PS</div>
                    <div>
                      <p className="text-white text-sm font-semibold">{modal.name}</p>
                      <p className="text-white/35 text-xs">{orderInfo.name} · {orderInfo.phone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-black text-lg">{modal.price}</p>
                  </div>
                </div>

                <div className="px-6 py-6 flex flex-col items-center gap-4">
                  <div className="w-48 h-48 bg-white rounded-2xl p-3 shadow-[0_0_40px_rgba(138,43,226,.2)]">
                    <svg viewBox="0 0 210 210" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <rect x="10" y="10" width="56" height="56" rx="4" fill="#1A1A2E"/>
                      <rect x="18" y="18" width="40" height="40" rx="2" fill="white"/>
                      <rect x="26" y="26" width="24" height="24" rx="2" fill="#1A1A2E"/>
                      <rect x="144" y="10" width="56" height="56" rx="4" fill="#1A1A2E"/>
                      <rect x="152" y="18" width="40" height="40" rx="2" fill="white"/>
                      <rect x="160" y="26" width="24" height="24" rx="2" fill="#1A1A2E"/>
                      <rect x="10" y="144" width="56" height="56" rx="4" fill="#1A1A2E"/>
                      <rect x="18" y="152" width="40" height="40" rx="2" fill="white"/>
                      <rect x="26" y="160" width="24" height="24" rx="2" fill="#1A1A2E"/>
                      <rect x="87" y="87" width="36" height="36" rx="8" fill="white"/>
                      <rect x="91" y="91" width="28" height="28" rx="6" fill="#4B0082"/>
                      <text x="105" y="111" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="16" fontWeight="700" fill="white">Q</text>
                      <rect x="76" y="10" width="8" height="8" fill="#1A1A2E"/><rect x="92" y="10" width="8" height="8" fill="#1A1A2E"/>
                      <rect x="108" y="10" width="16" height="8" fill="#1A1A2E"/><rect x="132" y="10" width="8" height="8" fill="#1A1A2E"/>
                      <rect x="76" y="26" width="8" height="8" fill="#1A1A2E"/><rect x="100" y="26" width="16" height="8" fill="#1A1A2E"/>
                      <rect x="76" y="42" width="16" height="8" fill="#1A1A2E"/><rect x="100" y="42" width="8" height="8" fill="#1A1A2E"/>
                      <rect x="116" y="42" width="16" height="8" fill="#1A1A2E"/>
                      <rect x="10" y="76" width="8" height="8" fill="#1A1A2E"/><rect x="26" y="76" width="16" height="8" fill="#1A1A2E"/>
                      <rect x="50" y="76" width="8" height="8" fill="#1A1A2E"/>
                      <rect x="10" y="92" width="16" height="8" fill="#1A1A2E"/><rect x="42" y="92" width="8" height="8" fill="#1A1A2E"/>
                      <rect x="10" y="108" width="8" height="8" fill="#1A1A2E"/><rect x="26" y="108" width="8" height="8" fill="#1A1A2E"/>
                      <rect x="42" y="108" width="16" height="8" fill="#1A1A2E"/>
                      <rect x="10" y="124" width="16" height="8" fill="#1A1A2E"/><rect x="34" y="124" width="8" height="8" fill="#1A1A2E"/>
                      <rect x="144" y="76" width="8" height="8" fill="#1A1A2E"/><rect x="160" y="76" width="16" height="8" fill="#1A1A2E"/>
                      <rect x="184" y="76" width="16" height="8" fill="#1A1A2E"/>
                      <rect x="144" y="92" width="16" height="8" fill="#1A1A2E"/><rect x="168" y="92" width="8" height="8" fill="#1A1A2E"/>
                      <rect x="144" y="108" width="8" height="8" fill="#1A1A2E"/><rect x="160" y="108" width="8" height="8" fill="#1A1A2E"/>
                      <rect x="176" y="108" width="16" height="8" fill="#1A1A2E"/>
                      <rect x="76" y="144" width="8" height="8" fill="#1A1A2E"/><rect x="92" y="144" width="8" height="8" fill="#1A1A2E"/>
                      <rect x="108" y="144" width="16" height="8" fill="#1A1A2E"/>
                      <rect x="76" y="160" width="16" height="8" fill="#1A1A2E"/><rect x="100" y="160" width="8" height="8" fill="#1A1A2E"/>
                      <rect x="76" y="176" width="8" height="8" fill="#1A1A2E"/><rect x="92" y="176" width="16" height="8" fill="#1A1A2E"/>
                    </svg>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-white/45">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5" stroke="#8A2BE2" strokeWidth="1.5"/>
                      <path d="M6 3v3l1.5 1.5" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Хугацаа дуусна:
                    <span className="text-white font-mono font-semibold ml-0.5">{fmt(timer)}</span>
                  </div>

                  <p className="text-center text-white/35 text-[11px] leading-relaxed">
                    Бүх Монгол банкны апп-аар төлөх боломжтой<br />
                    (Хаан, Голомт, TDB, Хас болон бусад)
                  </p>
                </div>

                <div className="px-6 pb-6">
                  <button
                    onClick={async () => {
                      await fetch('/api/order', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ...orderInfo, product: modal.name, price: modal.price }),
                      }).catch(() => {});
                      setStep('success');
                    }}
                    className="w-full py-3.5 rounded-xl bg-[#8A2BE2] text-white font-bold text-sm hover:bg-[#7320cc] transition-colors shadow-[0_4px_20px_rgba(138,43,226,.4)]"
                  >
                    Төлбөр хийлээ
                  </button>
                </div>
              </>
            )}

            {/* ── STEP 3: Success ── */}
            {step === 'success' && (
              <div className="px-8 py-12 flex flex-col items-center text-center gap-5">
                <div className="w-20 h-20 rounded-full bg-[#5BD3B5]/12 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#5BD3B5] flex items-center justify-center shadow-[0_0_24px_rgba(91,211,181,.4)]">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M6 14l6 6 10-12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-black text-white">Төлбөр хүлээн авлаа.</h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  Таны <span className="text-white font-semibold">{modal.name}</span> замдаа явж байна.<br />
                  <span className="text-white/40">{orderInfo.address}</span> хаягт хүргэнэ.
                </p>
                <p className="text-[#B57EDC] text-sm font-semibold">Илүү зоригтой инээмсэглэ. 💜</p>
                <button
                  onClick={closeModal}
                  className="mt-2 w-full py-3.5 rounded-xl bg-[#8A2BE2] text-white font-bold text-sm hover:bg-[#7320cc] transition-colors"
                >
                  Боллоо
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
