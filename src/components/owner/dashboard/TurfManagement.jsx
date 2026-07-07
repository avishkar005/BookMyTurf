import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  MapPin,
  Star,
  Pencil,
  Trash2,
  ExternalLink,
  X,
  ChevronDown,
  ImageIcon,
  Clock,
  IndianRupee,
  CheckCircle2,
  AlertCircle,
  Upload,
} from "lucide-react";
import { uploadToCloudinary } from "../../../lib/cloudinary";
import { getSession } from "../../../lib/auth";
import {
  addTurf,
  updateTurf,
  deleteTurf,
  listenOwnerTurfs,
  listenOwnerBookings,
} from "../../../services/firestore";

const CITIES = [
  "All Cities",
  "Pune",
  "Mumbai",
  "Nagpur",
  "Nashik",
  "Kolhapur",
  "Aurangabad",
  "Solapur",
  "Thane",
  "Navi Mumbai",
  "Pimpri-Chinchwad",
];

const SPORT_SUGGESTIONS = [
  "Football",
  "Snooker",
  "Cricket",
  "Basketball",
  "Badminton",
  "Tennis",
  "Volleyball",
  "Kabaddi",
  "Box Cricket",
];

const DEFAULT_TURF = {
  name: "",
  city: "",
  address: "",
  ownerName: "",
  ownerPhone: "",
  description: "",
  rating: "",
  images: [],
};

const DEFAULT_SPORT = {
  name: "",
  price: "",
  capacity: "",
  slots: [],
  image: "",
};

const SLOT_OPTIONS = [
  "06:00 AM – 07:00 AM",
  "07:00 AM – 08:00 AM",
  "08:00 AM – 09:00 AM",
  "09:00 AM – 10:00 AM",
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "12:00 PM – 01:00 PM",
  "01:00 PM – 02:00 PM",
  "02:00 PM – 03:00 PM",
  "03:00 PM – 04:00 PM",
  "04:00 PM – 05:00 PM",
  "05:00 PM – 06:00 PM",
  "06:00 PM – 07:00 PM",
  "07:00 PM – 08:00 PM",
  "08:00 PM – 09:00 PM",
  "09:00 PM – 10:00 PM",
];

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-2xl px-5 py-4 shadow-xl text-white text-sm font-semibold transition-all ${
        type === "success" ? "bg-emerald-600" : "bg-red-500"
      }`}
    >
      {type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
        <X size={15} />
      </button>
    </div>
  );
}

function SportForm({ sport, onChange, onSave, onCancel }) {
  const [sportImageFile, setSportImageFile] = useState(null);
  const [sportImagePreview, setSportImagePreview] = useState(sport.image || "");

  function handleSportImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSportImageFile(file);
    setSportImagePreview(URL.createObjectURL(file));
    onChange({ ...sport, _imageFile: file, image: sport.image || "" });
  }

  function toggleSlot(slot) {
    const current = sport.slots || [];
    onChange({
      ...sport,
      slots: current.includes(slot)
        ? current.filter((s) => s !== slot)
        : [...current, slot],
    });
  }

  return (
    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Sport Name
          </label>
          <input
            list="sport-suggestions"
            value={sport.name}
            onChange={(e) => onChange({ ...sport, name: e.target.value })}
            placeholder="e.g. Football"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          />
          <datalist id="sport-suggestions">
            {SPORT_SUGGESTIONS.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Price per Slot (₹)
          </label>
          <input
            type="number"
            value={sport.price}
            onChange={(e) => onChange({ ...sport, price: e.target.value })}
            placeholder="e.g. 800"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Capacity (players)
          </label>
          <input
            type="number"
            value={sport.capacity}
            onChange={(e) => onChange({ ...sport, capacity: e.target.value })}
            placeholder="e.g. 14"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-xs font-semibold uppercase text-slate-500">
            Sport Image
          </label>
          {sportImagePreview && (
            <img
              src={sportImagePreview}
              alt="Sport preview"
              className="mb-3 h-36 w-full rounded-xl object-cover"
            />
          )}
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 hover:border-emerald-300 hover:bg-emerald-50/50 transition">
            <Upload size={15} />
            {sportImageFile ? sportImageFile.name : "Choose sport image"}
            <input type="file" accept="image/*" className="hidden" onChange={handleSportImage} />
          </label>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Available Slots
        </label>
        <div className="flex flex-wrap gap-2">
          {SLOT_OPTIONS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => toggleSlot(slot)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition ${
                sport.slots?.includes(slot)
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "bg-white border-slate-200 text-slate-600 hover:border-emerald-300 hover:bg-emerald-50"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onSave}
          className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 transition"
        >
          Save Sport
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function TurfModal({ mode, initial, onClose, onSave, loading }) {
  const [form, setForm] = useState(initial || DEFAULT_TURF);
  const [sportsList, setSportsList] = useState(initial?.sports || []);
  const [newSport, setNewSport] = useState(DEFAULT_SPORT);
  const [showSportForm, setShowSportForm] = useState(false);
  const [editingSportIdx, setEditingSportIdx] = useState(null);
  const [turfImageFile, setTurfImageFile] = useState(null);
  const [turfImagePreview, setTurfImagePreview] = useState(initial?.images?.[0] || "");

  function handleSaveSport() {
    if (!newSport.name || !newSport.price) {
      alert("Sport name and price are required.");
      return;
    }
    const sport = {
      ...newSport,
      id: newSport.id || `sport_${Date.now()}`,
      price: Number(newSport.price),
      capacity: Number(newSport.capacity) || 0,
    };
    if (editingSportIdx !== null) {
      setSportsList((prev) => prev.map((s, i) => (i === editingSportIdx ? sport : s)));
      setEditingSportIdx(null);
    } else {
      setSportsList((prev) => [...prev, sport]);
    }
    setNewSport(DEFAULT_SPORT);
    setShowSportForm(false);
  }

  function handleEditSport(idx) {
    setNewSport(sportsList[idx]);
    setEditingSportIdx(idx);
    setShowSportForm(true);
  }

  function handleRemoveSport(idx) {
    setSportsList((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setTurfImageFile(file);
    setTurfImagePreview(URL.createObjectURL(file));
    setForm((prev) => ({ ...prev, images: [] }));
  }

  function handleSubmit() {
    if (!form.name || !form.city || !form.address) {
      alert("Turf name, city, and address are required.");
      return;
    }
    onSave({
      ...form,
      rating: Number(form.rating) || 0,
      sports: sportsList,
      _turfImageFile: turfImageFile,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4 py-10 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-7 py-5">
          <h2 className="text-xl font-bold text-slate-800">
            {mode === "add" ? "Add New Turf" : "Edit Turf"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 px-7 py-6">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-600">
              Basic Info
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Turf Name", key: "name", placeholder: "e.g. Green Arena" },
                { label: "City", key: "city", type: "select" },
                { label: "Address", key: "address", placeholder: "Full address" },
                { label: "Owner Name", key: "ownerName", placeholder: "Your name" },
                { label: "Phone", key: "ownerPhone", placeholder: "+91 9876543210" },
                { label: "Rating (0–5)", key: "rating", placeholder: "e.g. 4.5", type: "number" },
              ].map(({ label, key, placeholder, type }) => (
                <div key={key} className={key === "address" ? "sm:col-span-2" : ""}>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    {label}
                  </label>
                  {type === "select" ? (
                    <div className="relative">
                      <select
                        value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                      >
                        <option value="">Select city</option>
                        {CITIES.filter((c) => c !== "All Cities").map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                  ) : (
                    <input
                      type={type || "text"}
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    />
                  )}
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brief description of your turf..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 resize-none"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-600">
              Turf Image
            </p>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 py-8 text-slate-400 hover:border-emerald-300 hover:bg-emerald-50/50 transition">
              {turfImagePreview ? (
                <img
                  src={turfImagePreview}
                  alt="Turf preview"
                  className="h-32 w-full rounded-xl object-cover"
                />
              ) : (
                <>
                  <ImageIcon size={28} />
                  <span className="text-sm font-medium">Click to choose image</span>
                  <span className="text-xs">JPG, PNG up to 5MB — uploaded to Cloudinary</span>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
            {turfImageFile && (
              <p className="mt-2 text-xs text-slate-400">Selected: {turfImageFile.name}</p>
            )}
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Sports ({sportsList.length})
              </p>
              {!showSportForm && (
                <button
                  type="button"
                  onClick={() => {
                    setNewSport(DEFAULT_SPORT);
                    setEditingSportIdx(null);
                    setShowSportForm(true);
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition"
                >
                  <Plus size={13} /> Add Sport
                </button>
              )}
            </div>

            <div className="space-y-3">
              {sportsList.map((s, idx) => (
                <div
                  key={s.id || idx}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    {s.image && (
                      <img src={s.image} alt={s.name} className="h-10 w-10 rounded-lg object-cover" />
                    )}
                    <div>
                      <p className="font-semibold text-slate-800">{s.name}</p>
                      <p className="text-xs text-slate-500">
                        ₹{s.price} · {s.capacity} players · {s.slots?.length || 0} slots
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditSport(idx)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-emerald-600 transition"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveSport(idx)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-red-500 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {showSportForm && (
                <SportForm
                  sport={newSport}
                  onChange={setNewSport}
                  onSave={handleSaveSport}
                  onCancel={() => {
                    setShowSportForm(false);
                    setEditingSportIdx(null);
                    setNewSport(DEFAULT_SPORT);
                  }}
                />
              )}

              {sportsList.length === 0 && !showSportForm && (
                <div className="rounded-2xl border border-dashed border-slate-200 py-6 text-center text-sm text-slate-400">
                  No sports added yet. Click <strong>Add Sport</strong> to begin.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3 border-t border-slate-100 px-7 py-5">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 rounded-2xl bg-emerald-600 py-3.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-60 transition"
          >
            {loading ? "Saving…" : mode === "add" ? "Save Turf" : "Update Turf"}
          </button>
          <button
            onClick={onClose}
            className="rounded-2xl border border-slate-200 px-6 py-3.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ turf, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
          <Trash2 size={24} className="text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Delete Turf?</h3>
        <p className="mt-2 text-sm text-slate-500">
          <strong>{turf.name}</strong> will be permanently removed. This cannot be undone.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-2xl bg-red-500 py-3 text-sm font-bold text-white hover:bg-red-600 disabled:opacity-60 transition"
          >
            {loading ? "Deleting…" : "Yes, Delete"}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 rounded-2xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function TurfCard({ turf, bookings, onEdit, onDelete, onView }) {
  const turfBookings = bookings.filter((b) => b.turfId === turf.id);
  const pendingCount = turfBookings.filter((b) => b.status === "Pending").length;
  const confirmedCount = turfBookings.filter((b) => b.status === "Confirmed").length;
  const cancelledCount = turfBookings.filter((b) => b.status === "Cancelled").length;
  const revenue = turfBookings
    .filter((b) => b.status === "Confirmed")
    .reduce((sum, b) => sum + Number(b.price || 0), 0);

  return (
    <div className="group rounded-3xl bg-white shadow-sm border border-slate-100 overflow-hidden flex flex-col transition hover:shadow-md">
      <div className="relative h-44 bg-slate-100">
        {turf.images?.[0] ? (
          <img src={turf.images[0]} alt={turf.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <ImageIcon size={40} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {turf.rating > 0 && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-xl bg-white/90 px-2.5 py-1 text-xs font-bold text-amber-500 backdrop-blur-sm">
            <Star size={12} fill="currentColor" />
            {turf.rating}
          </div>
        )}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-xl bg-white/90 px-2.5 py-1 text-xs font-bold text-slate-600 backdrop-blur-sm">
          <MapPin size={11} />
          {turf.city}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold text-slate-800 leading-tight">{turf.name}</h3>
        <p className="mt-1 text-xs text-slate-400 leading-snug line-clamp-1">{turf.address}</p>

        {turf.sports?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {turf.sports.map((s) => (
              <span key={s.id} className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                {s.name}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-amber-50 p-3 text-center">
            <p className="text-xs text-slate-400">Pending</p>
            <p className="mt-0.5 text-lg font-bold text-amber-600">{pendingCount}</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-3 text-center">
            <p className="text-xs text-slate-400">Confirmed</p>
            <p className="mt-0.5 text-lg font-bold text-emerald-600">{confirmedCount}</p>
          </div>
          <div className="rounded-2xl bg-red-50 p-3 text-center">
            <p className="text-xs text-slate-400">Cancelled</p>
            <p className="mt-0.5 text-lg font-bold text-red-500">{cancelledCount}</p>
          </div>
        </div>

        <div className="mt-2 rounded-2xl bg-slate-50 p-3 flex items-center justify-between">
          <p className="text-xs text-slate-400">Revenue</p>
          <p className="text-base font-bold text-emerald-600">₹{revenue}</p>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onEdit(turf)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
          >
            <Pencil size={13} /> Edit
          </button>
          <button
            onClick={() => onView(turf.id)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 py-2.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition"
          >
            <ExternalLink size={13} /> View
          </button>
          <button
            onClick={() => onDelete(turf)}
            className="flex items-center justify-center rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-xs font-bold text-red-500 hover:bg-red-100 transition"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TurfManagement() {
  const navigate = useNavigate();
  const session = getSession();

  const [turfs, setTurfs] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loadingTurfs, setLoadingTurfs] = useState(false);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [toast, setToast] = useState(null);

  function showToast(message, type = "success") {
    setToast({ message, type });
  }

  useEffect(() => {
    if (!session?.uid) return;

    const unsubTurfs = listenOwnerTurfs(session.uid, (data) => {
      setTurfs(data);
      setLoadingTurfs(false);
    });

    const unsubBookings = listenOwnerBookings(session.uid, (data) => {
      setBookings(data);
    });

    return () => {
      unsubTurfs();
      unsubBookings();
    };
  }, [session?.uid]);

  const filteredTurfs = useMemo(() => {
    const q = search.toLowerCase();
    return turfs.filter((t) => {
      const matchesSearch =
        !q ||
        t.name?.toLowerCase().includes(q) ||
        t.city?.toLowerCase().includes(q) ||
        t.sports?.some((s) => s.name?.toLowerCase().includes(q));
      const matchesCity = selectedCity === "All Cities" || t.city === selectedCity;
      return matchesSearch && matchesCity;
    });
  }, [turfs, search, selectedCity]);

  const stats = useMemo(() => {
    const totalSports = turfs.reduce((sum, t) => sum + (t.sports?.length || 0), 0);
    const totalRevenue = bookings
      .filter((b) => b.status === "Confirmed")
      .reduce((sum, b) => sum + Number(b.price || 0), 0);
    return [
      { label: "Total Turfs", value: turfs.length, icon: MapPin },
      { label: "Sports Listed", value: totalSports, icon: Star },
      { label: "Total Bookings", value: bookings.length, icon: Clock },
      { label: "Revenue", value: `₹${totalRevenue}`, icon: IndianRupee },
    ];
  }, [turfs, bookings]);

  async function resolveImages(turfImageFile, sportsList) {
    let turfImageUrl = "";

    if (turfImageFile) {
      turfImageUrl = await uploadToCloudinary(
        turfImageFile,
        "bookmyturf/turfs"
      );
    }

    const resolvedSports = await Promise.all(
      sportsList.map(async (sport) => {
        const { _imageFile, ...rest } = sport;

        if (_imageFile) {
          const url = await uploadToCloudinary(
            _imageFile,
            "bookmyturf/sports"
          );

          return {
            ...rest,
            image: url,
          };
        }

        return {
          ...rest,
          image: rest.image || "",
        };
      })
    );

    return {
      turfImageUrl,
      resolvedSports,
    };
  }

  async function handleAddTurf(form) {
    setLoading(true);
    try {
      const { _turfImageFile, sports, images, ...rest } = form;

      const { turfImageUrl, resolvedSports } = await resolveImages(
        _turfImageFile,
        sports
      );

      const turfData = {
        ...rest,
        ownerId: session.uid,
        images: turfImageUrl ? [turfImageUrl] : [],
        sports: resolvedSports.map((s) => ({
          ...s,
          image: s.image || "",
        })),
        isActive: true,
        totalBookings: 0,
        totalRevenue: 0,
      };

      console.log("Saving turf:", turfData);
      console.log("Payload size (chars):", JSON.stringify(turfData).length);

      const id = await addTurf(turfData);

      setTurfs((prev) => [
        {
          id,
          ...turfData,
        },
        ...prev,
      ]);

      setShowAddModal(false);
      showToast("Turf added successfully!");
    } catch (error) {
      console.error("ADD TURF ERROR:", error);
      alert(error.message);
      showToast(error.message, "error");
    }
    setLoading(false);
  }

  async function handleEditTurf(form) {
    setLoading(true);
    try {
      const { _turfImageFile, sports, images, ...rest } = form;

      const { turfImageUrl, resolvedSports } = await resolveImages(
        _turfImageFile,
        sports
      );

      const turfData = {
        ...rest,
        images: turfImageUrl ? [turfImageUrl] : (selectedTurf.images || []),
        sports: resolvedSports.map((s) => ({
          ...s,
          image: s.image || "",
        })),
        rating: Number(form.rating) || 0,
      };

      console.log("Updating turf:", turfData);
      console.log("Payload size (chars):", JSON.stringify(turfData).length);

      await updateTurf(selectedTurf.id, turfData);

      setShowEditModal(false);
      setSelectedTurf(null);
      showToast("Turf updated successfully!");
    } catch (error) {
      console.error("EDIT TURF ERROR:", error);
      alert(error.message);
      showToast(error.message, "error");
    }
    setLoading(false);
  }

  async function handleDeleteTurf() {
    if (!deleteTarget) return;
    setLoading(true);
    try {
      await deleteTurf(deleteTarget.id);
      setDeleteTarget(null);
      showToast("Turf deleted.");
    } catch (error) {
      console.error("DELETE TURF ERROR:", error);
      alert(error.message);
      showToast(error.message, "error");
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-3xl bg-white p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{label}</p>
              <div className="rounded-xl bg-emerald-50 p-2 text-emerald-500">
                <Icon size={16} />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-emerald-600">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <Search size={16} className="shrink-0 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search turfs by name, sport, or city…"
              className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </label>

          <div className="relative">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="appearance-none rounded-2xl border border-slate-200 bg-white py-3 pl-4 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700 transition"
        >
          <Plus size={16} /> Add New Turf
        </button>
      </div>

      {loadingTurfs ? (
        <div className="flex items-center justify-center py-24 text-slate-400 text-sm">
          Loading turfs…
        </div>
      ) : filteredTurfs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 py-24 text-center">
          <div className="mb-4 rounded-2xl bg-emerald-50 p-5 text-emerald-400">
            <MapPin size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-700">No Turfs Added Yet</h3>
          <p className="mt-2 text-sm text-slate-400">
            {search || selectedCity !== "All Cities"
              ? "No turfs match your search. Try adjusting the filters."
              : "Get started by adding your first turf."}
          </p>
          {!search && selectedCity === "All Cities" && (
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-6 flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700 transition"
            >
              <Plus size={16} /> Add Turf
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTurfs.map((turf) => (
            <TurfCard
              key={turf.id}
              turf={turf}
              bookings={bookings}
              onEdit={(t) => { setSelectedTurf(t); setShowEditModal(true); }}
              onDelete={(t) => setDeleteTarget(t)}
              onView={(id) => navigate(`/user/turf/${id}`)}
            />
          ))}
        </div>
      )}

      {showAddModal && (
        <TurfModal
          mode="add"
          onClose={() => setShowAddModal(false)}
          onSave={handleAddTurf}
          loading={loading}
        />
      )}

      {showEditModal && selectedTurf && (
        <TurfModal
          mode="edit"
          initial={selectedTurf}
          onClose={() => { setShowEditModal(false); setSelectedTurf(null); }}
          onSave={handleEditTurf}
          loading={loading}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          turf={deleteTarget}
          onConfirm={handleDeleteTurf}
          onCancel={() => setDeleteTarget(null)}
          loading={loading}
        />
      )}

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}