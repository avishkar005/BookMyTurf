import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const cities = [
  "Pune",
  "Mumbai",
  "Navi Mumbai",
  "Thane",
  "Kalyan",
  "Nagpur",
  "Nashik",
  "Kolhapur",
  "Satara",
  "Sangli",
  "Solapur",
  "Aurangabad",
  "Ahmednagar",
  "Ratnagiri",
  "Latur",
  "Amravati",
  "Jalgaon",
];

export default function LocationSearch() {
  const navigate = useNavigate();

  const wrapperRef = useRef(null);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleOutside(e) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutside
      );
  }, []);

  const filteredCities = useMemo(() => {
    if (!query.trim()) return cities;

    return cities.filter((city) =>
      city.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  function selectCity(city) {
    setQuery(city);
    setOpen(false);

    navigate(`/user/discover/${encodeURIComponent(city)}`);
  }

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
    >
      <div
        onClick={() => setOpen(true)}
        className="group flex h-14 cursor-text items-center rounded-2xl border border-emerald-100 bg-white px-4 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-lg"
      >
        <MapPin
          size={20}
          className="text-emerald-600"
        />

        <input
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          placeholder="Choose Location"
          className="ml-3 flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
        />

        <ChevronDown
          size={18}
          className={`text-slate-400 transition duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-16 z-50 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-2xl">

          <div className="border-b border-slate-100 bg-emerald-50 px-5 py-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
              Maharashtra Locations
            </p>
          </div>

          <div className="max-h-80 overflow-y-auto py-2">

            {filteredCities.length === 0 ? (
              <div className="px-5 py-6 text-center text-sm text-slate-500">
                No location found
              </div>
            ) : (
              filteredCities.map((city) => (
                <button
                  key={city}
                  onClick={() => selectCity(city)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition-all duration-200 hover:bg-emerald-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                    <MapPin
                      size={18}
                      className="text-emerald-600"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">
                      {city}
                    </h3>

                    <p className="text-sm text-slate-500">
                      Maharashtra
                    </p>
                  </div>
                </button>
              ))
            )}

          </div>
        </div>
      )}
    </div>
  );
}