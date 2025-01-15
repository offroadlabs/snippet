import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ControlButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  title?: string;
  variant?: "default" | "danger";
}

export function ControlButton({
  icon: Icon,
  title,
  variant = "default",
  className,
  ...props
}: ControlButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-6 w-6 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg",
        variant === "default"
          ? "bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 border-border/80 hover:border-border"
          : "bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border-red-500/50 hover:border-red-500/80",
        className
      )}
      title={title}
      {...props}
    >
      <Icon
        className={cn(
          "h-3.5 w-3.5",
          variant === "default" ? "text-foreground" : "text-red-500"
        )}
      />
    </Button>
  );
}
