import { Bell, Menu } from "lucide-react";

import LocationSearch from "../search/LocationSearch";
import TurfSearch from "../search/TurfSearch";

export default function Header({
  session,
  onMenuClick,
}) {
  return (
    <header className="mb-8">
      <div className="rounded-3xl border border-emerald-100 bg-white px-7 py-5 shadow-lg">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

          {/* Left */}

          <div className="flex items-center gap-5">
            <button
              onClick={onMenuClick}
              className="group flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 transition-all duration-300 hover:bg-emerald-100"
            >
              <Menu
                size={22}
                className="text-emerald-700 transition group-hover:scale-110"
              />
            </button>

            <div>
              <span className="rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
                Dashboard
              </span>

              <h1 className="mt-3 text-4xl font-extrabold leading-tight text-slate-800">
                Welcome back,
              </h1>

              <p className="mt-2 text-lg font-medium text-slate-500">
                {session?.name || "Player"}
              </p>
            </div>
          </div>

          {/* Right */}

          <div className="flex flex-1 flex-col gap-4 xl:ml-12 xl:flex-row xl:items-center xl:justify-end">

            <div className="w-full xl:w-72">
              <LocationSearch />
            </div>

            <div className="w-full xl:w-80">
              <TurfSearch />
            </div>

            <button className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 transition-all duration-300 hover:bg-emerald-100">
              <Bell
                size={22}
                className="text-slate-700"
              />

              <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}