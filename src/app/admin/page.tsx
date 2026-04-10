"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      const data = await res.json();
      setError(data.error ?? "Error al iniciar sesión");
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#1a1a18" }}
    >
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <p
            className="text-[#f7f5f0]/40 text-xs uppercase tracking-widest mb-2"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Panel de administración
          </p>
          <h1
            className="text-[#f7f5f0] text-4xl font-black"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Gato Seco
          </h1>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#f7f5f0] rounded-2xl p-6 shadow-2xl"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-[#2d4a2d] rounded-full mx-auto mb-6">
            <Lock size={20} className="text-[#f7f5f0]" />
          </div>

          <label
            className="block text-xs font-semibold uppercase tracking-widest text-[#8a8680] mb-2"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Contraseña
          </label>
          <div className="relative mb-4">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              autoComplete="current-password"
              className="w-full bg-[#e8e4db] text-[#1a1a18] rounded-xl px-4 py-3.5 pr-12 text-base outline-none focus:ring-2 focus:ring-[#2d4a2d] transition-shadow"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a8680]"
              tabIndex={-1}
            >
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <p
              className="text-[#c0392b] text-sm mb-4"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[#2d4a2d] text-[#f7f5f0] font-semibold py-3.5 rounded-xl hover:bg-[#3d6b3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <p
          className="text-center text-[#f7f5f0]/30 text-xs mt-6"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Solo para uso del equipo Gato Seco
        </p>
      </div>
    </div>
  );
}
