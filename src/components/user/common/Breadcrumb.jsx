import { Link } from "react-router-dom";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm">
      {items.map((item, index) => {
        const last = index === items.length - 1;

        return (
          <div
            key={`${item.label}-${index}`}
            className="flex items-center gap-2"
          >
            {item.path && !last ? (
              <Link
                to={item.path}
                className="font-medium text-slate-500 transition hover:text-emerald-600"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  last
                    ? "font-semibold text-slate-800"
                    : "font-medium text-slate-500"
                }
              >
                {item.label}
              </span>
            )}

            {!last && (
              <span className="text-slate-400">
                /
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}