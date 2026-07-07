import {
  CalendarDays,
  Compass,
  Home,
  LogOut,
  MapPin,
  Trophy,
  User,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  {
    label: "Home",
    icon: Home,
    path: "/user-dashboard",
  },
  {
    label: "Discover",
    icon: Compass,
    path: "/user/discover",
  },
  {
    label: "Bookings",
    icon: CalendarDays,
    path: "/user/bookings",
  },
  {
    label: "Nearby",
    icon: MapPin,
    path: "/user/nearby",
  },
  {
    label: "Activity",
    icon: Trophy,
    path: "/user/activity",
  },
  {
    label: "Profile",
    icon: User,
    path: "/user/profile",
  },
];

export default function Sidebar({
  session,
  onLogout,
  isOpen,
  onClose,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  function openPage(path) {
    navigate(path);
    onClose();
  }

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-80 flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="border-b border-slate-200 px-7 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-emerald-600">
                BookMyTurf
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Sports Booking Platform
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-2 transition hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* User */}

        <div className="border-b border-slate-200 px-7 py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-400 text-2xl font-bold text-white">
              {(session?.name || "P").charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="truncate text-xl font-bold text-slate-800">
                {session?.name}
              </h2>

              <p className="truncate text-sm text-slate-500">
                {session?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Menu */}

        <nav className="flex-1 overflow-y-auto px-5 py-5">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const active =
                location.pathname === item.path ||
                location.pathname.startsWith(item.path + "/");

              return (
                <button
                  key={item.path}
                  onClick={() => openPage(item.path)}
                  className={`flex w-full items-center gap-4 rounded-2xl px-5 py-3.5 transition ${
                    active
                      ? "bg-emerald-500 text-white shadow-md"
                      : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-600"
                  }`}
                >
                  <Icon size={21} />

                  <span className="text-lg font-semibold">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Logout */}

        <div className="border-t border-slate-200 p-5">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-red-500 px-5 text-base font-semibold text-white transition hover:bg-red-600"
          >
            <LogOut size={20} />

            Logout
          </button>
        </div>
      </aside>
    </>
  );
}