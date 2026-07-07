import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Discover Turfs",
    description: "Browse available sports venues",
    path: "/user/discover",
    accent: "from-emerald-500 to-green-400",
  },
  {
    title: "My Bookings",
    description: "View your upcoming bookings",
    path: "/user/bookings",
    accent: "from-blue-500 to-cyan-400",
  },
  {
    title: "Nearby Turfs",
    description: "Find venues near your location",
    path: "/user/nearby",
    accent: "from-orange-500 to-amber-400",
  },
  {
    title: "My Profile",
    description: "Manage your account",
    path: "/user/profile",
    accent: "from-slate-700 to-slate-500",
  },
];

export default function Hero({ session }) {
  const navigate = useNavigate();

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-emerald-500 via-emerald-400 to-green-300 p-10 shadow-[0_25px_60px_rgba(16,185,129,.18)]">

        {/* Background */}

        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

        <div className="absolute bottom-0 left-1/2 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

          {/* Left */}

          <div className="max-w-2xl">
            <span className="inline-flex rounded-full bg-white/20 px-4 py-1 text-sm font-semibold tracking-[0.18em] text-white backdrop-blur">
              WELCOME BACK
            </span>

            <h1 className="mt-5 text-5xl font-extrabold leading-tight text-white">
              Hello,
              <br />
              {session?.name || "Player"}
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-emerald-50">
              Book football, cricket, badminton and other sports turfs across
              Maharashtra with a fast and seamless booking experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/user/discover")}
                className="rounded-2xl bg-white px-7 py-4 font-semibold text-emerald-600 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Discover Turfs
              </button>

              <button
                onClick={() => navigate("/user/bookings")}
                className="rounded-2xl border border-white/40 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition duration-300 hover:bg-white/20"
              >
                My Bookings
              </button>
            </div>
          </div>

          {/* Right */}

          <div className="grid w-full max-w-md grid-cols-2 gap-5">

            <div className="rounded-3xl bg-white/15 p-6 text-white backdrop-blur-md">
              <p className="text-sm text-emerald-100">
                Available Turfs
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                250+
              </h2>
            </div>

            <div className="rounded-3xl bg-white/15 p-6 text-white backdrop-blur-md">
              <p className="text-sm text-emerald-100">
                Cities
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                17
              </h2>
            </div>

            <div className="rounded-3xl bg-white/15 p-6 text-white backdrop-blur-md">
              <p className="text-sm text-emerald-100">
                Sports
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                8+
              </h2>
            </div>

            <div className="rounded-3xl bg-white/15 p-6 text-white backdrop-blur-md">
              <p className="text-sm text-emerald-100">
                Booking
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                24×7
              </h2>
            </div>

          </div>

        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((item) => (
          <button
            key={item.title}
            onClick={() => navigate(item.path)}
            className="group overflow-hidden rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(16,185,129,.12)]"
          >
            <div
              className={`h-3 w-20 rounded-full bg-gradient-to-r ${item.accent}`}
            />

            <h3 className="mt-6 text-xl font-bold text-slate-800 transition group-hover:text-emerald-600">
              {item.title}
            </h3>

            <p className="mt-3 text-[15px] leading-7 text-slate-500">
              {item.description}
            </p>

            <div className="mt-6 flex items-center text-sm font-semibold text-emerald-600">
              Open →
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}