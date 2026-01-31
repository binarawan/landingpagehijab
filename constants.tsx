
import React from 'react';
import { CheckCircle, Gift, Flame, Star, ShoppingBag, Package, Heart, Users, MessageCircle } from 'lucide-react';

export const DEFAULT_SITE_DATA = {
  whatsapp_number: "6281234567890",
  whatsapp_message: "Halo Admin, saya mau pesan Paket Hijab Prelove Premium ✨\n\nMau paket: ",
  hero_title: "🌸 HIJAB PRELOVE PREMIUM SALE 🌸",
  hero_subtitle: "Modal Kecil • Untung Melimpah • Siap Jual Lagi!",
  hero_promo_text: "Lagi cari hijab cantik harga super miring buat usaha atau dipakai sendiri? Ini jawabannya 💖",
  price_text: "HANYA 35 RIBU",
  package_detail: "DAPAT 6 PCS HIJAB + FREE POUCH",
  benefits: [
    "Hijab PRELOVE PREMIUM (bukan kaleng-kaleng)",
    "Kondisi layak pakai & cantik-cantik",
    "Sudah lolos seleksi sebelum dikirim",
    "Cocok untuk jual ulang & dipakai sendiri"
  ],
  package_contents: [
    "6 pcs hijab pilihan",
    "FREE pouch hijab cantik"
  ],
  package_types: [
    "Pasmina",
    "Hijab instan bergo hujan syar’i",
    "Segi empat",
    "Segi empat polos",
    "Segi empat motif"
  ],
  testimonials: [
    {
      name: "Rina",
      city: "Bogor",
      comment: "MasyaAllah kak, hijabnya bagus-bagus semua 😍 Padahal random tapi gak ada yang zonk. Langsung aku jual lagi, sehari laku 4 pcs. Next order lagi ya kak 🙏",
      stars: 5
    },
    {
      name: "Siti",
      city: "Bekasi",
      comment: "Awalnya ragu karena random, ternyata datangnya premium semua 😭✨ Warnanya aman, modelnya kepake banget. Free pouchnya juga lucu!",
      stars: 5
    }
  ]
};

export const ICONS = {
  Check: <CheckCircle className="text-pink-500 w-5 h-5" />,
  Gift: <Gift className="text-pink-500 w-5 h-5" />,
  Fire: <Flame className="text-orange-500 w-5 h-5" />,
  Star: <Star className="text-yellow-400 fill-current w-5 h-5" />,
  Bag: <ShoppingBag className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  WhatsApp: <MessageCircle className="w-6 h-6" />
};
