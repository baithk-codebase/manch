import { Palette } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { activeTheme, setTheme, themePresets } = useTheme();

  const themeKeys = Object.keys(themePresets) as Array<keyof typeof themePresets>;
  const currentIndex = themeKeys.indexOf(activeTheme);
  
  const handleToggle = () => {
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setTheme(themeKeys[nextIndex]);
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
        "bg-surface hover:bg-surface-hover border border-gray-700 hover:border-gray-600",
        "text-foreground hover:scale-105",
        className
      )}
      title={`Current theme: ${themePresets[activeTheme].name}. Click to cycle through themes.`}
    >
      <Palette className="w-4 h-4" />
      {showLabel && (
        <span className="text-sm font-medium">
          {themePresets[activeTheme].name}
        </span>
      )}
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: themePresets[activeTheme].primary }}
      />
    </button>
  );
}
