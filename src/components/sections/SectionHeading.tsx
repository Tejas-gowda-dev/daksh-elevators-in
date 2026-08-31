import AnimatedSection from "./AnimatedSection";

interface Props {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeading({ label, title, subtitle, align = "center", className = "" }: Props) {
  const alignClass = align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";

  return (
    <AnimatedSection className={`${alignClass} mb-12 ${className}`}>
      {label && (
        <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-bold uppercase tracking-wider mb-4">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
}
