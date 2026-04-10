"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, LogOut, X, Upload, Package, Pencil } from "lucide-react";
import Image from "next/image";
import type { ProductoRow } from "@/lib/supabase";

const TAGS = ["Nuevo", "Disponible", "Oferta", "Vintage"] as const;
const CONDICIONES = ["Como nuevo", "Muy bueno", "Bueno", "Aceptable"];

const TAG_COLORS: Record<string, string> = {
  Nuevo: "bg-[#2d4a2d] text-[#f7f5f0]",
  Oferta: "bg-[#8a4a2d] text-[#f7f5f0]",
  Vintage: "bg-[#4a3a2d] text-[#f7f5f0]",
  Disponible: "bg-[#1a1a18] text-[#f7f5f0]",
};

const GRADIENTS = [
  "linear-gradient(135deg, #c8d8c0 0%, #8fa882 100%)",
  "linear-gradient(135deg, #b8c4d4 0%, #7a93b5 100%)",
  "linear-gradient(135deg, #d4b896 0%, #b8956a 100%)",
  "linear-gradient(135deg, #2d4a2d 0%, #4a6b4a 100%)",
  "linear-gradient(135deg, #d4c8b8 0%, #b8a890 100%)",
  "linear-gradient(135deg, #c4b8d4 0%, #9a90b5 100%)",
];

type FormData = {
  marca: string;
  nombre: string;
  precio: string;
  talla: string;
  condicion: string;
  tag: string;
  foto_url: string;
};

const emptyForm: FormData = {
  marca: "",
  nombre: "",
  precio: "",
  talla: "",
  condicion: "Como nuevo",
  tag: "Disponible",
  foto_url: "",
};

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      aria-checked={checked}
      role="switch"
      className={`relative inline-flex h-7 w-12 flex-shrink-0 rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-50
        ${checked ? "bg-[#2d4a2d]" : "bg-[#d4cfc6]"}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 mt-1
          ${checked ? "translate-x-6" : "translate-x-1"}`}
      />
    </button>
  );
}

export default function DashboardClient({
  initialProductos,
}: {
  initialProductos: ProductoRow[];
}) {
  const router = useRouter();
  const [productos, setProductos] = useState<ProductoRow[]>(initialProductos);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductoRow | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const disponibles = productos.filter((p) => p.disponible).length;

  // ── Logout ────────────────────────────────────────────────────────────────
  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  // ── Toggle disponible ──────────────────────────────────────────────────────
  async function toggleDisponible(p: ProductoRow) {
    setTogglingId(p.id);
    const res = await fetch(`/api/admin/productos/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ disponible: !p.disponible }),
    });
    if (res.ok) {
      const updated: ProductoRow = await res.json();
      setProductos((prev) => prev.map((x) => (x.id === p.id ? updated : x)));
    }
    setTogglingId(null);
  }

  // ── Delete ─────────────────────────────────────────────────────────────────
  async function handleDelete(id: number) {
    if (!confirm("¿Eliminar este producto?")) return;
    setDeletingId(id);
    const res = await fetch(`/api/admin/productos/${id}`, { method: "DELETE" });
    if (res.ok) setProductos((prev) => prev.filter((p) => p.id !== id));
    setDeletingId(null);
  }

  // ── Upload foto ───────────────────────────────────────────────────────────
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (res.ok) {
      const { url } = await res.json();
      setForm((f) => ({ ...f, foto_url: url }));
    }
    setUploading(false);
  }

  // ── Open edit modal ───────────────────────────────────────────────────────
  function openEdit(p: ProductoRow) {
    setEditingProduct(p);
    setForm({
      marca: p.marca,
      nombre: p.nombre,
      precio: String(p.precio),
      talla: p.talla,
      condicion: p.condicion,
      tag: p.tag,
      foto_url: p.foto_url ?? "",
    });
    setPreviewUrl(p.foto_url ?? "");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingProduct(null);
    setForm(emptyForm);
    setPreviewUrl("");
  }

  // ── Add / Edit product ────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    if (editingProduct) {
      // Edit
      const res = await fetch(`/api/admin/productos/${editingProduct.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          precio: Number(form.precio),
          foto_url: form.foto_url || null,
        }),
      });
      if (res.ok) {
        const updated: ProductoRow = await res.json();
        setProductos((prev) =>
          prev.map((x) => (x.id === editingProduct.id ? updated : x))
        );
        closeForm();
      }
    } else {
      // Add
      const res = await fetch("/api/admin/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const nuevo: ProductoRow = await res.json();
        setProductos((prev) => [nuevo, ...prev]);
        closeForm();
      }
    }

    setSaving(false);
  }

  const randomGradient = () =>
    GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];

  return (
    <div className="min-h-screen bg-[#f7f5f0]" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
      {/* Header */}
      <header className="bg-[#1a1a18] text-[#f7f5f0] px-4 py-4 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1
              className="text-xl font-black leading-none"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Gato Seco
            </h1>
            <p className="text-[#f7f5f0]/40 text-[10px] uppercase tracking-widest mt-0.5">
              Panel de catálogo
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-[#f7f5f0]/60 hover:text-[#f7f5f0] text-sm transition-colors"
          >
            <LogOut size={16} />
            Salir
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Stats + Add button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-xl px-4 py-2.5 shadow-sm border border-[#e8e4db]">
              <p className="text-[10px] uppercase tracking-widest text-[#8a8680]">Total</p>
              <p className="text-2xl font-black text-[#1a1a18] leading-none">{productos.length}</p>
            </div>
            <div className="bg-white rounded-xl px-4 py-2.5 shadow-sm border border-[#e8e4db]">
              <p className="text-[10px] uppercase tracking-widest text-[#8a8680]">Disponibles</p>
              <p className="text-2xl font-black text-[#2d4a2d] leading-none">{disponibles}</p>
            </div>
          </div>
          <button
            onClick={() => { setEditingProduct(null); setForm(emptyForm); setPreviewUrl(""); setShowForm(true); }}
            className="flex items-center gap-2 bg-[#2d4a2d] text-[#f7f5f0] font-semibold px-4 py-3 rounded-xl hover:bg-[#3d6b3d] transition-colors shadow-sm"
          >
            <Plus size={18} />
            Agregar
          </button>
        </div>

        {/* Product list */}
        {productos.length === 0 ? (
          <div className="text-center py-16">
            <Package size={40} className="mx-auto text-[#d4cfc6] mb-3" />
            <p className="text-[#8a8680]">No hay productos aún.</p>
            <button
              onClick={() => { setEditingProduct(null); setForm(emptyForm); setPreviewUrl(""); setShowForm(true); }}
              className="mt-4 text-[#2d4a2d] underline text-sm"
            >
              Agregar el primero
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {productos.map((p) => (
              <div
                key={p.id}
                className={`bg-white rounded-2xl p-4 shadow-sm border border-[#e8e4db] flex gap-4 transition-opacity ${
                  !p.disponible ? "opacity-60" : ""
                }`}
              >
                {/* Thumbnail */}
                <div className="flex-shrink-0 w-20 h-28 rounded-xl overflow-hidden relative">
                  {p.foto_url ? (
                    <Image
                      src={p.foto_url}
                      alt={p.nombre}
                      width={120}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{ background: randomGradient() }}
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8a8680]">
                        {p.marca}
                      </p>
                      <p className="text-sm font-semibold text-[#1a1a18] leading-snug">
                        {p.nombre}
                      </p>
                    </div>
                    <span
                      className={`flex-shrink-0 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${TAG_COLORS[p.tag] ?? TAG_COLORS.Disponible}`}
                    >
                      {p.tag}
                    </span>
                  </div>

                  <p className="text-xs text-[#8a8680] mb-2">
                    T{p.talla} · {p.condicion} · <span className="font-semibold text-[#1a1a18]">${p.precio}</span>
                  </p>

                  {/* Actions row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Toggle
                        checked={p.disponible}
                        onChange={() => toggleDisponible(p)}
                        disabled={togglingId === p.id}
                      />
                      <span className="text-xs text-[#8a8680]">
                        {p.disponible ? "Disponible" : "Agotado"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-2 text-[#8a8680] hover:bg-[#e8e4db] rounded-lg transition-colors"
                        aria-label="Editar"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        disabled={deletingId === p.id}
                        className="p-2 text-[#c0392b] hover:bg-[#fce8e6] rounded-lg transition-colors disabled:opacity-40"
                        aria-label="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── Add Product Modal ──────────────────────────────────────────────── */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeForm}
          />

          {/* Sheet */}
          <div className="relative z-10 bg-[#f7f5f0] rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md max-h-[92vh] overflow-y-auto shadow-2xl">
            {/* Handle */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <h2
                className="text-xl font-black text-[#1a1a18]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {editingProduct ? "Editar producto" : "Nuevo producto"}
              </h2>
              <button
                onClick={closeForm}
                className="p-2 rounded-full hover:bg-[#e8e4db] text-[#8a8680]"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-5 pb-8 space-y-4">
              {/* Photo upload */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#8a8680] mb-2">
                  Foto
                </label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="relative w-full h-40 rounded-xl overflow-hidden border-2 border-dashed border-[#d4cfc6] hover:border-[#2d4a2d] cursor-pointer transition-colors flex items-center justify-center bg-[#e8e4db]"
                >
                  {previewUrl ? (
                    <Image src={previewUrl} alt="preview" fill className="object-cover" />
                  ) : (
                    <div className="text-center">
                      <Upload size={24} className="mx-auto text-[#8a8680] mb-1" />
                      <p className="text-sm text-[#8a8680]">
                        {uploading ? "Subiendo…" : "Toca para subir foto"}
                      </p>
                    </div>
                  )}
                  {uploading && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                      <p className="text-sm font-medium text-[#2d4a2d]">Subiendo…</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Marca */}
              <Field
                label="Marca"
                value={form.marca}
                onChange={(v) => setForm((f) => ({ ...f, marca: v }))}
                placeholder="ej. Levi's"
                required
              />

              {/* Nombre */}
              <Field
                label="Nombre / descripción"
                value={form.nombre}
                onChange={(v) => setForm((f) => ({ ...f, nombre: v }))}
                placeholder="ej. Chaqueta de mezclilla · Azul"
                required
              />

              {/* Precio + Talla */}
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Precio ($)"
                  value={form.precio}
                  onChange={(v) => setForm((f) => ({ ...f, precio: v }))}
                  placeholder="35"
                  type="number"
                  required
                />
                <Field
                  label="Talla"
                  value={form.talla}
                  onChange={(v) => setForm((f) => ({ ...f, talla: v }))}
                  placeholder="M"
                  required
                />
              </div>

              {/* Condición */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#8a8680] mb-2">
                  Condición
                </label>
                <select
                  value={form.condicion}
                  onChange={(e) => setForm((f) => ({ ...f, condicion: e.target.value }))}
                  className="w-full bg-white border border-[#d4cfc6] text-[#1a1a18] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2d4a2d]"
                >
                  {CONDICIONES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Tag */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-[#8a8680] mb-2">
                  Etiqueta
                </label>
                <div className="flex gap-2 flex-wrap">
                  {TAGS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, tag: t }))}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                        form.tag === t
                          ? "bg-[#2d4a2d] text-[#f7f5f0] border-[#2d4a2d]"
                          : "bg-white text-[#8a8680] border-[#d4cfc6] hover:border-[#2d4a2d]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={saving || uploading || !form.marca || !form.nombre || !form.precio || !form.talla}
                className="w-full bg-[#2d4a2d] text-[#f7f5f0] font-semibold py-4 rounded-xl hover:bg-[#3d6b3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base mt-2"
              >
                {saving ? "Guardando…" : editingProduct ? "Guardar cambios" : "Publicar producto"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Small helper ──────────────────────────────────────────────────────────────
function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-[#8a8680] mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-white border border-[#d4cfc6] text-[#1a1a18] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2d4a2d] placeholder:text-[#c4bfb5] transition-shadow"
      />
    </div>
  );
}
