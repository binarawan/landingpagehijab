
import React, { useState, useEffect } from 'react';
import { ICONS, DEFAULT_SITE_DATA } from './constants';
import Button from './components/Button';
import { supabase } from './supabase';
import { Settings, Plus, Trash2, X, Lock, Layout, CheckCircle, Quote, Package as PackageIcon, Zap, TrendingUp, Image as ImageIcon, Moon, Sparkles, Star, Upload, Loader2, AlertCircle } from 'lucide-react';

const SectionTitle = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <h2 className={`text-2xl md:text-5xl font-black text-center text-gray-800 mb-8 md:mb-12 px-2 leading-tight ${className}`}>
    {children}
  </h2>
);

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 51, s: 14 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex justify-center items-center gap-2 md:gap-3">
      {[ {v: timeLeft.h, l: 'Jam'}, {v: timeLeft.m, l: 'Menit'}, {v: timeLeft.s, l: 'Detik'} ].map((item, i) => (
        <React.Fragment key={i}>
          <div className="bg-gray-900 text-white px-3 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl text-center min-w-[60px] md:min-w-[70px] shadow-xl border border-white/10">
            <div className="text-xl md:text-2xl font-black leading-none">{item.v.toString().padStart(2, '0')}</div>
            <div className="text-[8px] md:text-[10px] font-bold uppercase opacity-60 mt-1">{item.l}</div>
          </div>
          {i < 2 && <div className="text-gray-800 font-black text-xl md:text-2xl animate-pulse">:</div>}
        </React.Fragment>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [siteData, setSiteData] = useState(DEFAULT_SITE_DATA);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPIN, setAdminPIN] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    fetchSiteData();
    const handleScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchSiteData = async () => {
    try {
      const { data, error } = await supabase.from('site_config').select('content').eq('id', 'landing_page').single();
      if (error && error.code !== 'PGRST116') throw error;
      if (data?.content) setSiteData({ ...DEFAULT_SITE_DATA, ...data.content });
    } catch (err) { 
      console.error("Gagal ambil data:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleSave = async (newData: any) => {
    setLoading(true);
    try {
      const { error } = await supabase.from('site_config').upsert({ id: 'landing_page', content: newData, updated_at: new Date() });
      if (error) throw error;
      setSiteData(newData);
      alert("Konten Berhasil Diupdate! 🌙");
      setIsAdmin(false);
    } catch (err: any) { 
      alert(`Gagal Simpan: ${err.message}`); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleWhatsApp = (pkg?: string) => {
    const text = pkg ? `${siteData.whatsapp_message} ${pkg}` : siteData.whatsapp_message;
    window.open(`https://wa.me/${siteData.whatsapp_number}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (loading && !isAdmin) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50">
      <div className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-pink-500 font-black text-sm tracking-widest animate-pulse uppercase">Memuat Keajaiban Ramadhan...</p>
    </div>
  );

  if (isAdmin) return <AdminPanel data={siteData} onSave={handleSave} onExit={() => setIsAdmin(false)} />;

  return (
    <div className="min-h-screen bg-white">
      {/* Admin Invisible Trigger */}
      <button onClick={() => setShowLogin(true)} className="fixed bottom-4 left-4 z-[60] opacity-0 hover:opacity-100 p-2 text-gray-300"><Settings size={14}/></button>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-24 px-4 md:px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-orange-50 -z-10"></div>
        <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12 -z-10"><Moon size={150}/></div>
        
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-1.5 md:px-6 md:py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-6 md:mb-8 border border-pink-200 shadow-sm">
            <Sparkles size={12} className="animate-pulse"/> ✨ SPECIAL RAMADHAN
          </div>
          
          <h1 className="text-3xl md:text-7xl font-black text-gray-900 mb-4 md:mb-5 leading-tight tracking-tight px-2">
            {siteData.hero_title}
          </h1>
          
          <p className="text-lg md:text-3xl font-bold text-orange-600 mb-8 md:mb-10 leading-snug px-4">
            {siteData.hero_subtitle}
          </p>

          <div className="bg-white/70 backdrop-blur-md p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-white shadow-2xl shadow-pink-100/50 mb-10 md:mb-12 max-w-2xl mx-auto transform hover:scale-[1.01] transition-transform duration-500 border-b-4 border-pink-100">
            <p className="text-gray-900 text-xl md:text-4xl font-black mb-4 md:mb-5 leading-tight">{siteData.hero_promo_text}</p>
            <div className="w-12 h-1 bg-pink-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-500 text-base md:text-xl font-medium leading-relaxed italic opacity-80">"{siteData.sub_headline_desc}"</p>
          </div>

          <Button isWhatsApp pulse onClick={() => handleWhatsApp()} className="w-full md:w-auto mx-auto px-10 py-5 md:px-16 md:py-7 text-lg md:text-xl shadow-xl shadow-green-200/50 mb-10 md:mb-12">
            AMANKAN STOK SEKARANG
          </Button>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-8 opacity-70">
            {["Modal Kecil", "Untung Melimpah", "Siap Jual Lagi"].map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2 font-black text-[9px] md:text-xs uppercase tracking-[0.1em] text-gray-600 bg-white/50 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-gray-100">
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Highlight */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <SectionTitle>{siteData.product_hook_title}</SectionTitle>
            <p className="text-gray-500 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed px-4">{siteData.product_hook_desc}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-20">
            {siteData.product_images.map((img, i) => (
              <div key={i} className="group relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl aspect-[4/5]">
                <img src={img.url} alt={img.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition-opacity"></div>
                <div className="absolute bottom-0 p-6 md:p-10">
                  <p className="text-white text-xl md:text-3xl font-black tracking-tight">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-20 border border-gray-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5 hidden md:block"><PackageIcon size={120}/></div>
             <div className="flex flex-col md:flex-row gap-10 md:gap-12 items-center">
                <div className="flex-1 w-full text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-8 flex items-center justify-center md:justify-start gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white rotate-3 shadow-lg">📦</div>
                    DETAIL PRODUK
                  </h3>
                  <ul className="space-y-4 md:space-y-6">
                    {siteData.package_details.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 md:gap-4 text-base md:text-xl font-bold text-gray-700">
                        <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-[10px] md:text-sm">✔</div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 w-full bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-xl border border-pink-100">
                  <p className="text-gray-600 text-base md:text-xl font-medium leading-relaxed mb-6 md:mb-8 italic">{siteData.product_warning}</p>
                  <Button isWhatsApp onClick={() => handleWhatsApp()} className="w-full py-4 md:py-6 text-base md:text-lg">KONSULTASI BAHAN</Button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="pricing" className="py-20 md:py-32 px-4 md:px-6 text-center bg-gray-50 border-t border-gray-100 relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-7xl font-black mb-4 md:mb-6 leading-none">{siteData.cta_title}</h2>
          <p className="text-xl md:text-4xl font-black text-pink-500 mb-10 md:mb-14">{siteData.cta_subtitle}</p>
          
          <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[4rem] shadow-xl border border-gray-100 mb-10 md:mb-16">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">HARGA PROMO NAIK DALAM:</p>
             <CountdownTimer />
          </div>

          <Button isWhatsApp pulse onClick={() => handleWhatsApp()} className="w-full md:w-auto mx-auto px-12 py-5 md:px-20 md:py-8 text-xl shadow-2xl shadow-green-200">
            PESAN SEKARANG
          </Button>
        </div>
      </section>

      {/* Sticky Mobile */}
      <div className={`fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-xl border-t z-50 transition-all duration-500 md:hidden ${showSticky ? 'translate-y-0' : 'translate-y-full'}`}>
        <Button isWhatsApp onClick={() => handleWhatsApp()} className="w-full py-4 text-base font-black tracking-wide rounded-xl">PESAN HIJAB SEKARANG!</Button>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl border border-pink-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black flex items-center gap-3 text-gray-800"><Lock size={18} className="text-pink-500" /> Admin Panel</h3>
              <button onClick={() => setShowLogin(false)} className="text-gray-400"><X size={24}/></button>
            </div>
            <input type="password" placeholder="PIN" autoFocus className="w-full p-4 border-2 border-pink-50 rounded-2xl mb-6 text-center text-3xl tracking-[0.4em] font-mono" value={adminPIN} onChange={(e) => setAdminPIN(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (adminPIN === "1234" ? (setIsAdmin(true), setShowLogin(false)) : alert("PIN Salah!"))} />
            <Button className="w-full py-4 text-lg" onClick={() => adminPIN === "1234" ? (setIsAdmin(true), setShowLogin(false)) : alert("PIN Salah! Default: 1234")}>BUKA PANEL</Button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- CMS PANEL ---

const AdminPanel = ({ data, onSave, onExit }: { data: any, onSave: (d: any) => void, onExit: () => void }) => {
  const [formData, setFormData] = useState(data);
  const [activeTab, setActiveTab] = useState('text');
  const [uploading, setUploading] = useState<number | null>(null);

  const updateField = (field: string, value: any) => setFormData((prev: any) => ({ ...prev, [field]: value }));

  const handleImageUpload = async (index: number) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 2 * 1024 * 1024) {
        alert("File maksimal 2MB!");
        return;
      }

      setUploading(index);
      try {
        const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        
        // 1. Upload ke Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, file, { upsert: true });

        if (uploadError) throw uploadError;

        // 2. Ambil URL Publik
        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(fileName);

        // 3. Update State Lokal (Preview Langsung)
        const newImages = [...formData.product_images];
        newImages[index].url = publicUrl;
        updateField('product_images', newImages);
        
        alert("Upload Berhasil! 🎉");
      } catch (err: any) {
        console.error("Upload Error:", err);
        alert(`Gagal Upload: ${err.message}. Pastikan bucket 'images' sudah diset PUBLIC di Supabase.`);
      } finally {
        setUploading(null);
      }
    };
    fileInput.click();
  };

  const TabBtn = ({ id, icon, label }: { id: string, icon: any, label: string }) => (
    <button onClick={() => setActiveTab(id)} className={`flex items-center gap-2 px-4 py-4 md:px-6 md:py-5 font-black text-[9px] md:text-[10px] border-b-4 transition-all uppercase tracking-widest whitespace-nowrap ${activeTab === id ? 'border-pink-500 text-pink-500 bg-pink-50' : 'border-transparent text-gray-400 hover:bg-gray-50'}`}>{icon} {label}</button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white border-b px-4 md:px-8 py-4 sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-pink-500 rounded-xl flex items-center justify-center text-white rotate-12"><Settings size={16} /></div>
          <h1 className="text-base md:text-xl font-black text-gray-800 leading-none">CMS EDITOR</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={onExit} className="px-3 py-2 text-gray-400 font-black text-[10px] uppercase tracking-widest">Batal</button>
          <button onClick={() => onSave(formData)} className="px-5 py-2 md:px-8 bg-pink-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">SIMPAN PERUBAHAN</button>
        </div>
      </header>

      <div className="flex bg-white border-b overflow-x-auto scrollbar-hide">
        <TabBtn id="text" icon={<Layout size={14}/>} label="Konten Teks" />
        <TabBtn id="images" icon={<ImageIcon size={14}/>} label="Galeri Foto" />
        <TabBtn id="prices" icon={<TrendingUp size={14}/>} label="Harga & Paket" />
        <TabBtn id="testi" icon={<Quote size={14}/>} label="Testimoni" />
      </div>

      <main className="max-w-4xl mx-auto w-full p-4 md:p-8 space-y-6 pb-32">
        {activeTab === 'text' && (
          <div className="space-y-6">
            <section className="bg-white p-6 md:p-10 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="text-lg font-black mb-6">Hero Section</h3>
              <div className="space-y-4">
                <input value={formData.hero_title} onChange={(e) => updateField('hero_title', e.target.value)} className="w-full p-4 bg-gray-50 border rounded-xl font-black text-xl" placeholder="Headline Utama" />
                <input value={formData.hero_subtitle} onChange={(e) => updateField('hero_subtitle', e.target.value)} className="w-full p-4 bg-gray-50 border rounded-xl font-bold" placeholder="Sub Headline" />
              </div>
            </section>
            
            <section className="bg-white p-6 md:p-10 rounded-[2rem] shadow-sm border border-gray-100">
               <h3 className="text-lg font-black mb-6">Kontak WhatsApp</h3>
               <div className="space-y-4">
                  <input value={formData.whatsapp_number} onChange={(e) => updateField('whatsapp_number', e.target.value)} className="w-full p-4 bg-gray-50 border rounded-xl font-mono" placeholder="Nomor WA (Contoh: 628123...)" />
                  <textarea rows={3} value={formData.whatsapp_message} onChange={(e) => updateField('whatsapp_message', e.target.value)} className="w-full p-4 bg-gray-50 border rounded-xl text-sm" placeholder="Pesan otomatis WA" />
               </div>
            </section>
          </div>
        )}

        {activeTab === 'images' && (
          <section className="bg-white p-6 md:p-10 rounded-[2rem] shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-lg font-black">Galeri Foto Produk</h3>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">Gunakan tombol biru untuk upload</p>
                </div>
                <button onClick={() => updateField('product_images', [...formData.product_images, { url: "", caption: "Hijab Baru" }])} className="p-3 bg-pink-500 text-white rounded-xl shadow-lg hover:bg-pink-600 transition-all"><Plus size={18}/></button>
             </div>

             <div className="space-y-6">
                {formData.product_images.map((img: any, i: number) => (
                   <div key={i} className="p-4 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-pink-100 transition-colors flex flex-col md:flex-row gap-6 items-center relative">
                      <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-2xl overflow-hidden flex-shrink-0 border-4 border-white shadow-md relative group">
                         {img.url ? (
                           <img src={img.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                         ) : (
                           <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2 bg-gray-50 italic">
                             <ImageIcon size={32}/>
                             <span className="text-[10px] font-black uppercase">Kosong</span>
                           </div>
                         )}
                         {uploading === i && (
                           <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px] flex items-center justify-center">
                             <Loader2 size={32} className="text-white animate-spin" />
                           </div>
                         )}
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all pointer-events-none"></div>
                      </div>
                      
                      <div className="flex-1 w-full space-y-4">
                         <div className="flex gap-2">
                           <input 
                            value={img.url} 
                            onChange={(e) => { const n = [...formData.product_images]; n[i].url = e.target.value; updateField('product_images', n); }} 
                            className="flex-1 p-3 text-[10px] border rounded-xl bg-white font-mono" 
                            placeholder="URL Gambar atau Upload ->" 
                           />
                           <button 
                            disabled={uploading !== null}
                            onClick={() => handleImageUpload(i)}
                            className="p-3 bg-indigo-500 text-white rounded-xl shadow-md hover:bg-indigo-600 disabled:opacity-50 transition-all flex items-center gap-2"
                           >
                            {uploading === i ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16}/>}
                            <span className="hidden md:inline text-xs font-black uppercase tracking-widest">UPLOAD</span>
                           </button>
                         </div>
                         <input 
                          value={img.caption} 
                          onChange={(e) => { const n = [...formData.product_images]; n[i].caption = e.target.value; updateField('product_images', n); }} 
                          className="w-full p-3 text-sm font-bold border rounded-xl bg-white" 
                          placeholder="Keterangan foto..." 
                         />
                      </div>
                      
                      <button onClick={() => updateField('product_images', formData.product_images.filter((_: any, idx: number) => idx !== i))} className="absolute top-2 right-2 p-2 text-red-300 hover:text-red-500 transition-all"><Trash2 size={20}/></button>
                   </div>
                ))}
             </div>

             <div className="mt-10 p-5 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4 items-start">
                <AlertCircle size={20} className="text-blue-500 flex-shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="text-xs text-blue-900 font-black uppercase tracking-widest">TIPS:</p>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Setelah klik <b>Upload</b> dan foto muncul di preview, Anda <b>WAJIB</b> klik tombol <b>SIMPAN PERUBAHAN</b> di kanan atas agar foto permanen tampil di landing page.
                  </p>
                </div>
             </div>
          </section>
        )}

        {/* Tab lainnya tetap sama, fokus perbaikan ada pada Image Handling */}
        {activeTab === 'prices' && (
           <section className="bg-white p-6 md:p-10 rounded-[2rem] shadow-sm border border-gray-100">
             <h3 className="text-lg font-black mb-6">Paket Penjualan</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {formData.pricing_tiers.map((tier: any, i: number) => (
                   <div key={i} className="p-5 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-pink-200 transition-all space-y-3">
                      <input value={tier.label} onChange={(e) => { const n = [...formData.pricing_tiers]; n[i].label = e.target.value; updateField('pricing_tiers', n); }} className="w-full p-2 border rounded-lg font-black text-center text-[10px] uppercase" />
                      <input value={tier.quantity} onChange={(e) => { const n = [...formData.pricing_tiers]; n[i].quantity = e.target.value; updateField('pricing_tiers', n); }} className="w-full p-2 border rounded-lg font-black text-center text-3xl" />
                      <input value={tier.price} onChange={(e) => { const n = [...formData.pricing_tiers]; n[i].price = e.target.value; updateField('pricing_tiers', n); }} className="w-full p-2 border rounded-lg font-black text-center text-pink-500" />
                   </div>
                ))}
             </div>
           </section>
        )}

        {activeTab === 'testi' && (
           <section className="bg-white p-6 md:p-10 rounded-[2rem] shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-black">Testimoni</h3>
                 <button onClick={() => updateField('testimonials', [...formData.testimonials, { name: "Nama", city: "Kota", comment: "Bagus!", stars: 5 }])} className="bg-pink-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">+ Baru</button>
              </div>
              <div className="space-y-4">
                 {formData.testimonials.map((testi: any, i: number) => (
                    <div key={i} className="p-5 bg-gray-50 rounded-2xl border relative space-y-3 group">
                       <input value={testi.name} onChange={(e) => { const n = [...formData.testimonials]; n[i].name = e.target.value; updateField('testimonials', n); }} className="p-3 border rounded-xl font-black text-sm w-full" placeholder="Nama..." />
                       <textarea rows={3} value={testi.comment} onChange={(e) => { const n = [...formData.testimonials]; n[i].comment = e.target.value; updateField('testimonials', n); }} className="w-full p-4 border rounded-xl text-sm italic" placeholder="Review..." />
                       <button onClick={() => updateField('testimonials', formData.testimonials.filter((_: any, idx: number) => idx !== i))} className="text-red-300 hover:text-red-500 absolute top-2 right-2 p-1"><Trash2 size={16}/></button>
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
