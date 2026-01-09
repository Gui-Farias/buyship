import { Link } from "react-router-dom";

type BreadcrumbFromUrlProps = {
  sectionLabel: string;
  sectionTo: string;
  currentLabel: string;
};

export default function BreadcrumbFromUrl({ sectionLabel, sectionTo, currentLabel }: BreadcrumbFromUrlProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="text-sm text-white/70">
        <Link to="/" className="hover:text-white cursor-pointer">
          Home
        </Link>

        <span className="mx-2 text-white/30">/</span>
        <Link to={sectionTo} className="hover:text-white cursor-pointer">
          {sectionLabel}
        </Link>

        <span className="mx-2 text-white/30">/</span>
        <span className="text-white/80">{currentLabel}</span>
      </div>
    </div>
  );
}