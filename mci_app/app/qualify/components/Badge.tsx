interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

const variantClass: Record<string, string> = {
  default: "q-badge-gray",
  success: "q-badge-green",
  warning: "q-badge-amber",
  danger: "q-badge-red",
  info: "q-badge-purple",
};

export default function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span className={`q-badge ${variantClass[variant]}`}>
      {children}
    </span>
  );
}
