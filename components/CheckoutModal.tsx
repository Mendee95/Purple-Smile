'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface Package {
  id: string;
  name: string;
  price: string;
  amount: number;
  strips: string;
  featured: boolean;
  badge?: string;
}

const PACKAGES: Package[] = [
  { id: 'starter', name: 'Эхлэгч багц', price: '₮45,000', amount: 45000, strips: '7 наалт', featured: false },
  { id: 'pro', name: 'Про багц', price: '₮85,000', amount: 85000, strips: '14 наалт', featured: true, badge: 'Хамгийн их сонгогддог' },
  { id: 'ultimate', name: 'Тэргүүн багц', price: '₮125,000', amount: 125000, strips: '21 наалт', featured: false, badge: 'Хамгийн ашигтай' },
];

interface CheckoutModalProps {
  initialPackageId?: string;
  onClose: () => void;
}

type Step = 'select' | 'info' | 'payment' | 'success';

interface OrderInfo {
  name: string;
  phone: string;
  address: string;
  city: string;
  doorCode: string;
}

interface InvoiceData {
  invoice_id: string;
  qr_image: string;
  qr_text: string;
  urls: Array<{ name: string; description: string; logo: string; link: string }>;
}

const fmt = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export default function CheckoutModal({ initialPackageId, onClose }: CheckoutModalProps) {
  const initialPkg = PACKAGES.find(p => p.id === initialPackageId) ?? PACKAGES[1];
  const [step, setStep] = useState<Step>(initialPackageId ? 'info' : 'select');
  const [selectedPkg, setSelectedPkg] = useState<Package>(initialPkg);
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({ name: '', phone: '', address: '', city: '', doorCode: '' });
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(900);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAll = useCallback(() => {
    if (pollRef.current) clearInterval(pollRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => () => stopAll(), [stopAll]);

  const startPayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const orderId = `PS-${Date.now()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;

      const res = await fetch('/api/qpay/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: selectedPkg.amount,
          orderId,
          customerName: orderInfo.name,
          customerPhone: orderInfo.phone,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Нэхэмжлэл үүсгэж чадсангүй');
      }

      const data: InvoiceData = await res.json();
      setInvoice(data);
      setTimer(900);
      setStep('payment');

      timerRef.current = setInterval(() => {
        setTimer(t => {
          if (t <= 1) { stopAll(); return 0; }
          return t - 1;
        });
      }, 1000);

      pollRef.current = setInterval(async () => {
        try {
          const checkRes = await fetch('/api/qpay/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ invoice_id: data.invoice_id }),
          });
          const checkData = await checkRes.json();
          if (checkData.paid) {
            stopAll();
            // Log order to Google Sheets
            fetch('/api/order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...orderInfo, product: selectedPkg.name, price: selectedPkg.price }),
            }).catch(() => {});
            setStep('success');
          }
        } catch {
          // Keep polling silently
        }
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  const infoValid =
    orderInfo.name.trim() &&
    orderInfo.phone.trim() &&
    orderInfo.address.trim() &&
    orderInfo.city.trim();

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-[420px] max-h-[90vh] overflow-y-auto bg-[#0c0c18] border border-white/12 rounded-2xl shadow-2xl">

        {/* ── SELECT ── */}
        {step === 'select' && (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 sticky top-0 bg-[#0c0c18] z-10">
              <div>
                <p className="text-white font-bold text-sm">Багц сонгох</p>
                <p className="text-white/35 text-[11px]">Захиалгаа эхлүүлэх</p>
              </div>
              <button onClick={onClose} className="text-white/35 hover:text-white transition-colors text-xl leading-none">✕</button>
            </div>

            <div className="p-5 flex flex-col gap-3">
              {PACKAGES.map(pkg => (
                <button
                  key={pkg.id}
                  onClick={() => { setSelectedPkg(pkg); setStep('info'); }}
                  className={`relative w-full text-left rounded-xl border p-4 transition-all hover:-translate-y-0.5 ${
                    pkg.featured
                      ? 'border-[#8A2BE2] bg-[#8A2BE2]/10 shadow-[0_0_24px_rgba(138,43,226,.2)]'
                      : 'border-white/12 bg-white/4 hover:border-white/25'
                  }`}
                >
                  {pkg.badge && (
                    <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      pkg.featured ? 'bg-[#8A2BE2] text-white' : 'bg-white/10 text-white/55 border border-white/15'
                    }`}>
                      {pkg.badge}
                    </span>
                  )}
                  <p className="text-white font-bold text-sm">{pkg.name}</p>
                  <p className="text-white/40 text-xs mt-0.5">{pkg.strips}</p>
                  <p className={`text-xl font-black mt-2 ${pkg.featured ? 'text-[#B57EDC]' : 'text-white'}`}>
                    {pkg.price}
                  </p>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ── INFO ── */}
        {step === 'info' && (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 sticky top-0 bg-[#0c0c18] z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStep('select')}
                  className="text-white/35 hover:text-white transition-colors"
                >
                  ←
                </button>
                <div>
                  <p className="text-white font-bold text-sm">Захиалгын мэдээлэл</p>
                  <p className="text-white/35 text-[11px]">{selectedPkg.name} · {selectedPkg.price}</p>
                </div>
              </div>
              <button onClick={onClose} className="text-white/35 hover:text-white transition-colors text-xl leading-none">✕</button>
            </div>

            <div className="px-6 py-5 flex flex-col gap-4">
              {([
                { key: 'name',  label: 'Нэр',           placeholder: 'Таны нэр',       type: 'text' },
                { key: 'phone', label: 'Утасны дугаар',  placeholder: '9999 9999',      type: 'tel'  },
                { key: 'city',  label: 'Хот / Аймаг',   placeholder: 'Улаанбаатар',    type: 'text' },
              ] as const).map(f => (
                <div key={f.key} className="flex flex-col gap-1.5">
                  <label className="text-white/55 text-[11px] font-semibold uppercase tracking-wider">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={orderInfo[f.key]}
                    onChange={e => setOrderInfo(o => ({ ...o, [f.key]: e.target.value }))}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#8A2BE2] transition-colors"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1.5">
                <label className="text-white/55 text-[11px] font-semibold uppercase tracking-wider">Хүргэлтийн хаяг</label>
                <textarea
                  placeholder="Дүүрэг, хороо, байр, орц, тоот..."
                  value={orderInfo.address}
                  onChange={e => setOrderInfo(o => ({ ...o, address: e.target.value }))}
                  rows={2}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#8A2BE2] transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-white/55 text-[11px] font-semibold uppercase tracking-wider">
                  Орцны код <span className="text-white/25 normal-case font-normal">(заавал биш)</span>
                </label>
                <input
                  type="text"
                  placeholder="жш: 1234"
                  value={orderInfo.doorCode}
                  onChange={e => setOrderInfo(o => ({ ...o, doorCode: e.target.value }))}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#8A2BE2] transition-colors"
                />
              </div>

              {error && <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">{error}</p>}

              <button
                onClick={startPayment}
                disabled={!infoValid || loading}
                className="w-full py-3.5 rounded-xl bg-[#8A2BE2] text-white font-bold text-sm hover:bg-[#7320cc] transition-colors shadow-[0_4px_20px_rgba(138,43,226,.4)] disabled:opacity-40 disabled:cursor-not-allowed mt-1"
              >
                {loading ? 'Түр хүлээнэ үү...' : `${selectedPkg.price} · Төлбөр хийх →`}
              </button>
            </div>
          </>
        )}

        {/* ── PAYMENT ── */}
        {step === 'payment' && invoice && (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 sticky top-0 bg-[#0c0c18] z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#4B0082] flex items-center justify-center shadow-[0_0_16px_rgba(75,0,130,.5)]">
                  <span className="text-white font-black text-sm">Q</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">QPay</p>
                  <p className="text-white/35 text-[11px]">Аюулгүй төлбөр</p>
                </div>
              </div>
              <button onClick={() => { stopAll(); onClose(); }} className="text-white/35 hover:text-white transition-colors text-xl leading-none">✕</button>
            </div>

            <div className="flex items-center justify-between px-6 py-3 bg-white/4 border-b border-white/8">
              <div>
                <p className="text-white text-sm font-semibold">{selectedPkg.name}</p>
                <p className="text-white/35 text-xs">{orderInfo.name} · {orderInfo.phone}</p>
              </div>
              <p className="text-white font-black text-base">{selectedPkg.price}</p>
            </div>

            <div className="px-6 py-6 flex flex-col items-center gap-4">
              {/* Real QPay QR */}
              <div className="w-52 h-52 bg-white rounded-2xl p-2 shadow-[0_0_40px_rgba(138,43,226,.25)]">
                <img
                  src={`data:image/png;base64,${invoice.qr_image}`}
                  alt="QPay QR"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Timer */}
              {timer > 0 ? (
                <div className="flex items-center gap-1.5 text-xs text-white/45">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5" stroke="#8A2BE2" strokeWidth="1.5"/>
                    <path d="M6 3v3l1.5 1.5" stroke="#8A2BE2" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Хугацаа дуусна:
                  <span className="text-white font-mono font-semibold ml-0.5">{fmt(timer)}</span>
                </div>
              ) : (
                <p className="text-red-400 text-xs text-center">
                  Хугацаа дууссан.{' '}
                  <button onClick={() => { setStep('info'); setInvoice(null); }} className="underline">
                    Дахин оролдох
                  </button>
                </p>
              )}

              <div className="flex items-center gap-2 text-xs text-white/35">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5BD3B5] animate-pulse" />
                Төлбөр хүлээж байна...
              </div>

              <p className="text-center text-white/30 text-[11px] leading-relaxed">
                Бүх Монгол банкны апп-аар төлөх боломжтой<br />
                (Хаан, Голомт, TDB, Хас болон бусад)
              </p>

              {/* Bank app deep-links */}
              {invoice.urls.length > 0 && (
                <div className="w-full">
                  <p className="text-white/30 text-[11px] text-center mb-2">Эсвэл апп-аар нэвтрэх</p>
                  <div className="grid grid-cols-3 gap-2">
                    {invoice.urls.slice(0, 6).map(url => (
                      <a
                        key={url.name}
                        href={url.link}
                        className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10 transition-colors"
                      >
                        {url.logo ? (
                          <img src={url.logo} alt={url.name} className="w-8 h-8 rounded-lg object-contain" />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white text-[10px] font-bold">
                            {url.name.slice(0, 2)}
                          </div>
                        )}
                        <span className="text-white/40 text-[9px] text-center leading-tight">{url.description || url.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── SUCCESS ── */}
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
              Таны <span className="text-white font-semibold">{selectedPkg.name}</span> замдаа явж байна.<br />
              <span className="text-white/40">{orderInfo.city}, {orderInfo.address}</span> хаягт хүргэнэ.
            </p>
            <p className="text-[#B57EDC] text-sm font-semibold">Илүү зоригтой инээмсэглэ. 💜</p>
            <button
              onClick={onClose}
              className="mt-2 w-full py-3.5 rounded-xl bg-[#8A2BE2] text-white font-bold text-sm hover:bg-[#7320cc] transition-colors"
            >
              Боллоо
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
