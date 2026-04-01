type Step = 1 | 2 | 3 | 4;

const STEPS: { n: Step; label: string }[] = [
  { n: 1, label: "Contacto" },
  { n: 2, label: "Ubicación" },
  { n: 3, label: "Envío" },
  { n: 4, label: "Resumen" },
];

type Props = {
  current: Step;
  completedUpTo: Step;
  onNavigate: (step: Step) => void;
};

export default function CheckoutBreadcrumbs({ current, completedUpTo, onNavigate }: Props) {
  return (
    <nav className="flex items-center gap-1 text-sm select-none">
      {STEPS.map(({ n, label }, i) => {
        const done    = n < current;
        const active  = n === current;
        const clickable = done; // can only go back to completed steps

        return (
          <div key={n} className="flex items-center gap-1">
            {i > 0 && <span className="text-gray-300 mx-1">›</span>}
            <button
              onClick={() => clickable && onNavigate(n)}
              disabled={!clickable}
              className={[
                "flex items-center gap-1.5 transition-colors",
                active   ? "font-semibold text-black cursor-default" : "",
                done     ? "text-gray-500 hover:text-black cursor-pointer" : "",
                !done && !active ? "text-gray-300 cursor-default" : "",
              ].join(" ")}
            >
              <span
                className={[
                  "w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0",
                  active ? "bg-black text-white" : "",
                  done   ? "bg-gray-200 text-gray-600" : "",
                  !done && !active ? "bg-gray-100 text-gray-300" : "",
                ].join(" ")}
              >
                {n}
              </span>
              {label}
            </button>
          </div>
        );
      })}
    </nav>
  );
}
