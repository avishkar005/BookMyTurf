import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import turfs from "../../../data/turfs";

export default function TurfSearch() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];

    const value = query.toLowerCase();

    return turfs
      .filter((turf) => {
        return (
          turf.name.toLowerCase().includes(value) ||
          turf.city.toLowerCase().includes(value) ||
          turf.sports.some((sport) =>
            sport.name.toLowerCase().includes(value)
          )
        );
      })
      .slice(0, 8);
  }, [query]);

  function handleSelect(turf) {
    setQuery(turf.name);
    setOpen(false);

    navigate(`/user/turf/${turf.id}`);
  }

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
    >
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
      />

      <input
        type="text"
        value={query}
        placeholder="Search turf or sport..."
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        className="h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald-600"
      />

      {open && (
        <div className="absolute left-0 right-0 top-14 z-50 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          {!query && (
            <div className="p-4 text-sm text-slate-500">
              Start typing to search turfs.
            </div>
          )}

          {query && suggestions.length === 0 && (
            <div className="p-4 text-sm text-slate-500">
              No turfs found.
            </div>
          )}

          {suggestions.map((turf) => (
            <button
              key={turf.id}
              onClick={() => handleSelect(turf)}
              className="flex w-full items-center gap-4 border-b border-slate-100 px-4 py-3 text-left transition hover:bg-emerald-50"
            >
              <img
                src={turf.image}
                alt={turf.name}
                className="h-12 w-12 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="font-medium text-slate-800">
                  {turf.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {turf.city} • {turf.address}
                </p>
              </div>

              <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                {turf.rating}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}