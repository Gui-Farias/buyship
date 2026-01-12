import { Link } from "react-router-dom";

type CTAVariant = "primary" | "outline";

type CTAProps = {
  to: string;
  variant?: CTAVariant;
  classes?: string;
  label: string;
};

export default function CTA({
  to,
  variant = "primary",
  label,
}: CTAProps) {
  const baseClasses = "inline-flex items-center justify-center  px-6 py-3 font-semibold transition hover:scale-105";

  const variants: Record<CTAVariant, string> = {
    primary: "bg-(--primary-active) text-white hover:opacity-90",
    outline: "border border-(--primary-active) text-(--primary-active) hover:bg-(--primary-active)/10",
  };

  let classes = "";

  return (
    <Link to={to} className={`${baseClasses} ${variants[variant]} ${classes}`}>
      {label}
    </Link>
  );
}