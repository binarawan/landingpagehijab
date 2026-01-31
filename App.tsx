
import React, { useState, useEffect } from 'react';
import { ICONS, DEFAULT_SITE_DATA } from './constants';
import Button from './components/Button';
import { supabase } from './supabase';
import { Settings, LogOut, Save, Plus, Trash2, X, Lock, Phone, Layout, CheckCircle, Quote, Package as PackageIcon, Flame } from 'lucide-react';

const SectionTitle = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <h2 className={`text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 px-4 ${className}`}>
    {children}
  </h2>
);

const App: React.FC = () => {
  const [siteData, setSiteData] = useState(DEFAULT_SITE_DATA);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPIN, setAdminPIN] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    fetchSiteData();
    const handleScroll = () => setShowSticky(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchSiteData = async () => {
    try {
      const { data, error } = await supabase
        .from('site_config')
        .select('content')
        .eq('id', 'landing_page')
        .single();

      if (data && data.content) {
        setSiteData({ ...DEFAULT_SITE_DATA, ...data.content });
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (newData: any) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('site_config')
        .upsert({ id: 'landing_page', content: newData, updated_at: new Date() });

      if (error) throw error;
      setSiteData(newData);
      alert("Pengaturan berhasil disimpan ke Cloud! ✨");
      setIsAdmin(false);
    } catch (err) {
      alert("Gagal menyimpan. Pastikan tabel 'site_config' sudah dibuat di Supabase.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(siteData.whatsapp_message);
    window.open(`https://wa.me/${siteData.whatsapp_number}?text=${msg}`, '_blank');
  };

  if (loading && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-pink-500 font-bold">Memuat Dashboard Cantik...</p>
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return <AdminPanel data={siteData} onSave={handleSave} onExit={() => setIsAdmin(false)} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Tombol Akses Admin - Pojok Kiri Bawah (Samar) */}
      <button 
        onClick={() => setShowLogin(true)}
        className="fixed bottom-4 left-4 z-[60] p-2 text-gray-300 hover:text-pink-400 opacity-20 hover:opacity-100 transition-all bg-white/50 backdrop-blur-sm rounded-lg border border-gray-100 shadow-sm"
        title="Buka Panel Admin"
      >
        <Settings size={18} />
      </button>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl border border-pink-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Lock size={24} className="text-pink-500" /> Admin Access
              </h3>
              <button onClick={() => setShowLogin(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={28}/>
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-6">Masukkan PIN keamanan untuk mengelola landing page Anda.</p>
            <input 
              type="password" 
              placeholder="••••"
              autoFocus
              className="w-full p-5 border-2 border-pink-50 rounded-2xl mb-6 text-center text-3xl tracking-[1em] focus:border-pink-300 transition-all font-mono"
              value={adminPIN}
              onChange={(e) => setAdminPIN(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (adminPIN === "1234" ? (setIsAdmin(true), setShowLogin(false)) : alert("PIN Salah!"))}
            />
            <Button className="w-full py-5 text-lg" onClick={() => {
              if (adminPIN === "1234") {
                setIsAdmin(true);
                setShowLogin(false);
              } else {
                alert("PIN Salah! Gunakan 1234");
              }
            }}>MASUK KE PANEL EDIT</Button>
            <p className="mt-4 text-center text-xs text-gray-400 italic">Default PIN: 1234</p>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-24 right-6 z-40 md:bottom-10">
        <button 
          onClick={handleWhatsApp}
          className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-90 animate-bounce"
        >
          <ICONS.WhatsApp.type {...ICONS.WhatsApp.props} className="w-8 h-8" />
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#FDF2F2] -z-10 skew-y-3 origin-top-left"></div>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block bg-white/80 px-4 py-1 rounded-full text-pink-500 text-sm font-bold tracking-widest uppercase mb-6 shadow-sm">
            ✨ Premium Prelove Collection
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            {siteData.hero_title}
          </h1>
          <p className="text-lg md:text-xl font-medium text-gray-600 mb-10 max-w-2xl mx-auto">
            {siteData.hero_subtitle}
          </p>
          
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-pink-100 max-w-md mx-auto mb-10 transform -rotate-1">
            <p className="text-gray-500 mb-4 italic leading-relaxed">{siteData.hero_promo_text}</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 justify-center text-2xl font-bold text-orange-600">
                {ICONS.Fire} <span>{siteData.price_text}</span>
              </div>
              <div className="flex items-center gap-3 justify-center text-lg font-semibold text-gray-800">
                {ICONS.Gift} <span>{siteData.package_detail}</span>
              </div>
            </div>
          </div>

          <Button isWhatsApp pulse onClick={handleWhatsApp} className="w-full md:w-auto mx-auto px-12 text-lg">
            CHAT WHATSAPP SEKARANG
          </Button>
        </div>
      </section>

      {/* Benefit Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionTitle>✨ Kenapa wajib ambil paket ini?</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {siteData.benefits.map((text, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-pink-50/50 rounded-2xl border border-pink-100 hover:bg-pink-50 transition-colors">
                <div className="mt-1">{ICONS.Check}</div>
                <span className="font-semibold text-gray-700 leading-snug">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Isi Paket */}
      <section className="py-20 px-6 bg-[#FDF2F2]">
        <div className="max-w-4xl mx-auto">
          <SectionTitle>📦 Isi Paket (Bisa Pilih Jenis)</SectionTitle>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-pink-200/50 border border-white">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                  <span className="w-8 h-8 bg-pink-500 text-white rounded-xl flex items-center justify-center text-sm">1</span>
                  Isi Paket:
                </h3>
                <ul className="space-y-4">
                  {siteData.package_contents?.map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-gray-700 font-semibold">
                      <div className="w-6 h-6 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center text-xs">✔</div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                  <span className="w-8 h-8 bg-pink-500 text-white rounded-xl flex items-center justify-center text-sm">2</span>
                  Pilihan Jenis:
                </h3>
                <div className="space-y-3">
                  {siteData.package_types?.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-600 bg-gray-50/50 p-3 rounded-xl border border-transparent hover:border-pink-100 hover:bg-white transition-all">
                      <span className="text-pink-400 font-bold">✨</span> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-100 text-center">
              <button onClick={handleWhatsApp} className="text-pink-500 font-extrabold text-lg hover:text-pink-600 transition-colors flex items-center gap-3 mx-auto">
                Pilih jenis sekarang → WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimoni Section */}
      <section className="py-20 px-6 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <SectionTitle>💬 Testimoni Pembeli (Real Feel)</SectionTitle>
          <div className="space-y-8">
            {siteData.testimonials.map((testi, i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[90%] md:max-w-[70%] p-6 rounded-3xl shadow-sm relative ${i % 2 === 0 ? 'bg-[#DCF8C6] rounded-tl-none ml-2' : 'bg-pink-50 border border-pink-100 rounded-tr-none mr-2'}`}>
                  <div className="flex gap-1 mb-3">
                    {[...Array(testi.stars)].map((_, s) => <span key={s}>{ICONS.Star}</span>)}
                  </div>
                  <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-4 font-medium italic italic">
                    "{testi.comment}"
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500 font-bold uppercase tracking-widest border-t border-black/5 pt-3">
                    <span>— {testi.name}, {testi.city}</span>
                    <span className="flex items-center gap-1 text-blue-500">Verified Buyer</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 text-center bg-[#FDF2F2] border-t border-pink-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">✨ Sudah banyak yang buktiin sendiri!</h2>
          <p className="text-xl md:text-2xl text-pink-500 font-bold mb-12">Gak perlu mikir dua kali, stok selalu berebut! 💖</p>
          <Button isWhatsApp pulse onClick={handleWhatsApp} className="w-full md:w-auto px-16 text-xl py-6 shadow-2xl">
            AMANKAN STOK VIA WHATSAPP
          </Button>
          <p className="mt-8 text-orange-600 font-black text-lg animate-pulse uppercase tracking-wider">
            🔥 Menjelang Ramadhan & Lebaran – Sisa sedikit lagi!
          </p>
        </div>
      </section>

      {/* Sticky Bottom CTA for Mobile */}
      <div className={`fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg shadow-[0_-10px_30px_rgba(0,0,0,0.05)] transition-all duration-500 z-50 md:hidden ${showSticky ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <Button isWhatsApp onClick={handleWhatsApp} className="w-full py-4 text-base font-black tracking-wide">
          ORDER {siteData.price_text} SEKARANG
        </Button>
      </div>
    </div>
  );
};

// --- COMPREHENSIVE ADMIN PANEL ---

const AdminPanel = ({ data, onSave, onExit }: { data: any, onSave: (d: any) => void, onExit: () => void }) => {
  const [formData, setFormData] = useState(data);
  const [activeTab, setActiveTab] = useState('general');

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const updateListItem = (field: string, index: number, value: string) => {
    const list = [...formData[field]];
    list[index] = value;
    updateField(field, list);
  };

  const addItem = (field: string, defaultValue: string = "") => {
    updateField(field, [...formData[field], defaultValue]);
  };

  const removeItem = (field: string, index: number) => {
    updateField(field, formData[field].filter((_: any, i: number) => i !== index));
  };

  const TabButton = ({ id, icon, label }: { id: string, icon: any, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-6 py-4 font-bold border-b-2 transition-all ${activeTab === id ? 'border-pink-500 text-pink-500 bg-pink-50' : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
    >
      {icon} {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white border-b px-6 py-4 sticky top-0 z-50 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-pink-200">
            <Settings size={20} />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-800 leading-none">CMS Dashboard</h1>
            <span className="text-xs text-pink-400 font-bold uppercase tracking-widest">Hijab Prelove Premium</span>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button onClick={onExit} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 text-gray-500 hover:bg-gray-100 rounded-2xl font-bold transition-all">
            <X size={18}/> Batal
          </button>
          <button onClick={() => onSave(formData)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-pink-500 text-white rounded-2xl font-bold hover:bg-pink-600 shadow-xl shadow-pink-200 transition-all active:scale-95">
            <Save size={18}/> Simpan & Publikasi
          </button>
        </div>
      </header>

      <div className="flex overflow-x-auto bg-white border-b scrollbar-hide">
        <TabButton id="general" icon={<Phone size={18}/>} label="Kontak & Harga" />
        <TabButton id="hero" icon={<Layout size={18}/>} label="Tampilan Hero" />
        <TabButton id="package" icon={<PackageIcon size={18}/>} label="Isi Paket" />
        <TabButton id="testi" icon={<Quote size={18}/>} label="Testimoni" />
      </div>

      <main className="max-w-4xl mx-auto w-full p-6 space-y-8 pb-32">
        {activeTab === 'general' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-gray-800">
                <div className="w-8 h-8 bg-green-100 text-green-500 rounded-lg flex items-center justify-center"><Phone size={16}/></div>
                WhatsApp Settings
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Nomor Tujuan (Ex: 628...)</label>
                  <input 
                    type="text" 
                    value={formData.whatsapp_number} 
                    onChange={(e) => updateField('whatsapp_number', e.target.value)}
                    className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-pink-200 focus:bg-white transition-all font-bold text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Pesan Otomatis WhatsApp</label>
                  <textarea 
                    rows={4}
                    value={formData.whatsapp_message} 
                    onChange={(e) => updateField('whatsapp_message', e.target.value)}
                    className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-pink-200 focus:bg-white transition-all font-medium text-gray-600"
                  />
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-gray-800">
                <div className="w-8 h-8 bg-orange-100 text-orange-500 rounded-lg flex items-center justify-center"><Flame size={16}/></div>
                Promo & Harga
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Teks Harga</label>
                  <input 
                    type="text" 
                    value={formData.price_text} 
                    onChange={(e) => updateField('price_text', e.target.value)}
                    className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-pink-200 text-orange-600 font-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Teks Detail Paket</label>
                  <input 
                    type="text" 
                    value={formData.package_detail} 
                    onChange={(e) => updateField('package_detail', e.target.value)}
                    className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-pink-200 font-bold"
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'hero' && (
          <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-gray-800">
              <div className="w-8 h-8 bg-pink-100 text-pink-500 rounded-lg flex items-center justify-center"><Layout size={16}/></div>
              Konten Header Utama
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Judul Headline</label>
                <input 
                  type="text" 
                  value={formData.hero_title} 
                  onChange={(e) => updateField('hero_title', e.target.value)}
                  className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-pink-200 font-black text-xl text-gray-800"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Sub-headline</label>
                <input 
                  type="text" 
                  value={formData.hero_subtitle} 
                  onChange={(e) => updateField('hero_subtitle', e.target.value)}
                  className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-pink-200 font-bold text-gray-600"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Teks Paragraf Promo</label>
                <textarea 
                  rows={3}
                  value={formData.hero_promo_text} 
                  onChange={(e) => updateField('hero_promo_text', e.target.value)}
                  className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-pink-200 italic font-medium"
                />
              </div>
            </div>
          </section>
        )}

        {activeTab === 'package' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold flex items-center gap-3 text-gray-800">
                  <div className="w-8 h-8 bg-blue-100 text-blue-500 rounded-lg flex items-center justify-center"><CheckCircle size={16}/></div>
                  Benefit
                </h2>
                <button onClick={() => addItem('benefits')} className="p-2 text-pink-500 bg-pink-50 rounded-lg hover:bg-pink-100"><Plus size={20}/></button>
              </div>
              <div className="space-y-3">
                {formData.benefits.map((benefit: string, i: number) => (
                  <div key={i} className="flex gap-3 group">
                    <input 
                      type="text" 
                      value={benefit} 
                      onChange={(e) => updateListItem('benefits', i, e.target.value)}
                      className="flex-1 p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-pink-200 font-semibold text-gray-700"
                    />
                    <button onClick={() => removeItem('benefits', i)} className="text-red-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={20}/></button>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold flex items-center gap-3 text-gray-800">
                  <div className="w-8 h-8 bg-purple-100 text-purple-500 rounded-lg flex items-center justify-center"><PackageIcon size={16}/></div>
                  Pilihan Jenis Hijab
                </h2>
                <button onClick={() => addItem('package_types')} className="p-2 text-pink-500 bg-pink-50 rounded-lg hover:bg-pink-100"><Plus size={20}/></button>
              </div>
              <div className="space-y-3">
                {formData.package_types.map((type: string, i: number) => (
                  <div key={i} className="flex gap-3 group">
                    <input 
                      type="text" 
                      value={type} 
                      onChange={(e) => updateListItem('package_types', i, e.target.value)}
                      className="flex-1 p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-pink-200 font-bold text-gray-600"
                    />
                    <button onClick={() => removeItem('package_types', i)} className="text-red-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={20}/></button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'testi' && (
          <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-bold flex items-center gap-3 text-gray-800">
                <div className="w-8 h-8 bg-green-100 text-green-500 rounded-lg flex items-center justify-center"><Quote size={16}/></div>
                Testimoni
              </h2>
              <button 
                onClick={() => updateField('testimonials', [...formData.testimonials, { name: "Nama", city: "Kota", comment: "Isi testimoni...", stars: 5 }])}
                className="flex items-center gap-2 px-5 py-2.5 bg-pink-500 text-white rounded-xl font-black text-sm"
              >
                <Plus size={18}/> Tambah Baru
              </button>
            </div>
            <div className="space-y-8">
              {formData.testimonials.map((testi: any, i: number) => (
                <div key={i} className="p-8 bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-100 relative group hover:border-pink-100 hover:bg-white transition-all">
                  <button 
                    onClick={() => updateField('testimonials', formData.testimonials.filter((_: any, idx: number) => idx !== i))}
                    className="absolute -top-3 -right-3 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={18}/>
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <input value={testi.name} onChange={(e) => {
                      const newTesti = [...formData.testimonials];
                      newTesti[i].name = e.target.value;
                      updateField('testimonials', newTesti);
                    }} className="w-full p-4 border rounded-xl font-bold" />
                    <input value={testi.city} onChange={(e) => {
                      const newTesti = [...formData.testimonials];
                      newTesti[i].city = e.target.value;
                      updateField('testimonials', newTesti);
                    }} className="w-full p-4 border rounded-xl font-bold" />
                  </div>
                  <textarea 
                    rows={3}
                    value={testi.comment}
                    onChange={(e) => {
                      const newTesti = [...formData.testimonials];
                      newTesti[i].comment = e.target.value;
                      updateField('testimonials', newTesti);
                    }}
                    className="w-full p-4 border rounded-xl mb-4 italic font-medium"
                  />
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-gray-400 uppercase">Rating:</span>
                    <select 
                      value={testi.stars} 
                      onChange={(e) => {
                        const newTesti = [...formData.testimonials];
                        newTesti[i].stars = parseInt(e.target.value);
                        updateField('testimonials', newTesti);
                      }}
                      className="bg-white border rounded-lg px-3 py-1 font-bold text-yellow-500"
                    >
                      {[5, 4, 3, 2, 1].map(v => <option key={v} value={v}>{v} Bintang</option>)}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default App;
