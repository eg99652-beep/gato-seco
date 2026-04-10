"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-[#2d4a2d] text-[#f7f5f0] text-xs py-2.5 px-4 flex items-center justify-center relative">
      <p className="font-medium tracking-wide text-center">
        Envíos a todo El Salvador · Correos y mensajeros&nbsp;
        <a
          href="https://wa.me/50370059191"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
        >
          Escribinos
        </a>
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-60 transition-opacity"
        aria-label="Cerrar"
      >
        <X size={13} />
      </button>
    </div>
  );
}
