
import React from 'react';
import { MessageCircle } from 'lucide-react';

export const ICONS = {
  WhatsApp: <MessageCircle size={20} />,
};

export const DEFAULT_SITE_DATA = {
  whatsapp_number: "6281234567890",
  whatsapp_message: "Halo Admin, saya mau pesan HIJAB 5 RIBUAN - DEAL RAMADHAN ✨",
  
  // 🔥 HOOK UTAMA (Headline)
  hero_title: "Hijab 5 Ribuan!",
  hero_subtitle: "Modal kecil, untung maksimal jelang Ramadhan 💸",
  hero_promo_text: "👉 50 Ribu Dapet 10 Pcs Hijab Premium!",
  
  // ✨ Sub Headline
  sub_headline_desc: "Hijab random warna cantik, bahan premium, cocok buat jual lagi, hampers, atau stok dagangan Ramadhan",
  
  // 🧕 HIJAB RANDOM PREMIUM – DEAL RAMADHAN
  product_hook_title: "🧕 HIJAB RANDOM PREMIUM – DEAL RAMADHAN",
  product_hook_desc: "Lagi cari produk cepat laku, modal ringan, dan margin gede buat Ramadhan? Ini jawabannya 👇 Kami hadirkan Hijab Random Premium. Harga super hemat, kualitas tetap juara.",
  
  product_images: [
    { url: "https://images.unsplash.com/photo-1583391262775-9a288f70152d?q=80&w=800&auto=format&fit=crop", caption: "Bahan Bella Square Premium" },
    { url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop", caption: "Warna-warna Soft & Marketable" }
  ],

  // 📦 DETAIL PRODUK
  package_details: [
    "Jenis: Hijab / Kerudung Random",
    "Bahan: Bella Square Premium",
    "Ukuran: 115 x 115 cm",
    "Warna: Random (tidak bisa pilih warna)",
    "Isi Paket: Campur warna-warna cantik",
    "Kondisi: Baru & layak jual",
    "Target: Reseller, dropship, jualan online/offline"
  ],
  product_warning: "⚠️ Karena harga promo, warna dikirim random. Tapi tenang, semua warna soft & marketable.",

  // 💰 KENAPA INI CUAN BANGET?
  profit_title: "💰 KENAPA INI CUAN BANGET?",
  profit_points: [
    "🔥 Modal kecil",
    "🔥 Harga jual pasaran 10–15 ribu / pcs",
    "🔥 Bisa dijual satuan, bundling, atau paket Ramadhan",
    "🔥 Produk fast moving jelang puasa & lebaran"
  ],
  profit_calc_modal: "5.000",
  profit_calc_jual: "12.000",

  // 🌙 RAMADHAN = MOMEN EMAS JUALAN HIJAB
  ramadhan_title: "🌙 RAMADHAN = MOMEN EMAS JUALAN HIJAB",
  ramadhan_points: [
    "✨ Orang cari hijab baru",
    "✨ Persiapan lebaran",
    "✨ Bikin hampers",
    "✨ Jualan dadakan tapi laku keras"
  ],
  ramadhan_footer_note: "👉 Hijab selalu dicari, dipakai, dan dibeli ulang",

  // 📦 PILIHAN PAKET
  pricing_title: "📦 PILIHAN PAKET",
  pricing_tiers: [
    { label: "PAKET HEMAT", quantity: "10 pcs", price: "Rp 50.000" },
    { label: "PAKET RESELLER", quantity: "20 pcs", price: "Rp 95.000" },
    { label: "PAKET GROSIR", quantity: "50 pcs", price: "Rp 200.000" }
  ],

  // 🚀 COCOK UNTUK:
  target_audience_title: "🚀 COCOK UNTUK:",
  target_audience: [
    "✔ Reseller pemula",
    "✔ Ibu rumah tangga",
    "✔ Jualan live",
    "✔ Jualan online (WA, Shopee, IG)",
    "✔ Persiapan stok Ramadhan & Lebaran"
  ],

  // ⚡ CTA (Ajakan)
  cta_title: "🔥 Stok terbatas!",
  cta_subtitle: "Amankan stok hijab 5 ribuan kamu sekarang!",
  cta_warning: "🔥 Harga bisa naik mendekati Ramadhan",
  
  testimonials: [
    { 
      name: "Rina", 
      city: "Reseller Hijab", 
      comment: "MasyaAllah, kualitasnya bagus banget! Awalnya ragu karena murah, ternyata bahannya halus, jahitan rapi. Warna random tapi cantik-cantik semua. Fix repeat order 😍", 
      stars: 5 
    },
    { 
      name: "Siti", 
      city: "Online Seller", 
      comment: "Harga segini tapi premium! Serius ini hijab 5 ribuan rasanya gak masuk akal. Dijual lagi cepat banget laku. Cocok buat stok Ramadhan.", 
      stars: 5 
    },
    { 
      name: "Maya", 
      city: "Host Live", 
      comment: "Laku keras di live! Saya jual di live 12–15 ribu, langsung habis. Pembeli gak komplain sama sekali. Warna-warnanya aman buat semua umur.", 
      stars: 5 
    },
    { 
      name: "Novi", 
      city: "Pemula Reseller", 
      comment: "Cocok buat pemula jualan. Modal kecil tapi hasilnya nyata. Saya baru mulai jualan dan ini produk pertama yang bikin balik modal cepat.", 
      stars: 5 
    },
    { 
      name: "Aisyah", 
      city: "Seller Offline", 
      comment: "Beneran random tapi cakep. Takut dapet warna aneh, ternyata semua soft & marketable. Bisa langsung jual tanpa sortir.", 
      stars: 5 
    }
  ]
};
