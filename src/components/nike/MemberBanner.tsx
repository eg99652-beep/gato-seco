import { Camera } from "lucide-react";

export default function MemberBanner() {
  return (
    <section id="contacto" className="bg-[#1a1a18] text-[#f7f5f0] py-20 px-6">
      <div className="max-w-lg mx-auto text-center">
        <Camera size={28} className="mx-auto mb-4 text-[#f7f5f0]/40" />
        <h2
          className="font-black text-3xl md:text-4xl leading-tight mb-4"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Seguinos en Instagram
        </h2>
        <p
          className="text-[#f7f5f0]/60 text-sm mb-2"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Publicamos piezas nuevas cada semana.
        </p>
        <p
          className="text-[#e8e4db] text-lg font-semibold mb-8"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          @gatoseco
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://instagram.com/gatoseco"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#f7f5f0] text-[#1a1a18] font-medium text-sm px-7 py-3 rounded-full hover:bg-[#e8e4db] transition-colors flex items-center gap-2"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            <Camera size={15} />
            Ver Instagram
          </a>
          <a
            href="https://wa.me/50370059191"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#f7f5f0]/30 text-[#f7f5f0] font-medium text-sm px-7 py-3 rounded-full hover:border-[#f7f5f0]/70 transition-colors"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
