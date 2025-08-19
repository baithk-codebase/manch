import { cn } from "@/lib/utils";
import { Check, Palette, RefreshCw } from "lucide-react";
import { useTheme, type ThemeKey, type BackgroundKey } from "@/hooks/useTheme";

function Theme() {
  const {
    activeTheme,
    activeBackground,
    themePresets,
    backgroundPresets,
    setTheme,
    setBackground,
    resetToDefault,
  } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Appearance
          </h3>
          <button
            onClick={resetToDefault}
            className="flex items-center gap-2 px-3 py-1 text-xs rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Reset
          </button>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-3">Color Schemes</h4>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(themePresets).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => setTheme(key as ThemeKey)}
                className="rounded-lg transition-all duration-200"
                style={{ 
                    backgroundColor: theme.primary,
                    border: activeTheme === key ? "2px solid var(--text-secondary)" : "none"
                }}
              >
                  <span className="text-sm font-medium">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-3">Background Themes</h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(backgroundPresets).map(([key, background]) => (
              <button
                key={key}
                onClick={() => setBackground(key as BackgroundKey)}
                className="rounded-lg transition-all duration-200"
                style={{ 
                    backgroundColor: background.background,
                    border: activeBackground === key ? "2px solid var(--text-secondary)" : "none"
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div
                      className="w-4 h-6 rounded-sm"
                      style={{ backgroundColor: background.background }}
                    />
                    <div
                      className="w-4 h-6 rounded-sm"
                      style={{ backgroundColor: background.surface }}
                    />
                    <div
                      className="w-4 h-6 rounded-sm"
                      style={{ backgroundColor: background.card }}
                    />
                  </div>
                  <span className="text-sm font-medium flex-1 text-left">
                    {background.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Live Preview */}
        <div className="mt-6">
          <h4 className="font-medium mb-3">Preview</h4>
          <div
            className="p-4 rounded-lg border space-y-4"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--card-border)",
            }}
          >
            {/* Background layers preview */}
            <div className="space-y-2">
              <div className="text-xs text-muted">Background Layers</div>
              <div className="flex gap-2">
                <div
                  className="w-16 h-8 rounded text-xs flex items-center justify-center text-white"
                  style={{ backgroundColor: "var(--background)" }}
                >
                  BG
                </div>
                <div
                  className="w-16 h-8 rounded text-xs flex items-center justify-center text-white"
                  style={{ backgroundColor: "var(--surface)" }}
                >
                  Surface
                </div>
                <div
                  className="w-16 h-8 rounded text-xs flex items-center justify-center text-white"
                  style={{ backgroundColor: "var(--card)" }}
                >
                  Card
                </div>
              </div>
            </div>

            {/* Button preview */}
            <div className="space-y-2">
              <div className="text-xs text-muted">Buttons</div>
              <div className="flex gap-2 flex-wrap">
                <button className="primary px-4 py-2 text-sm">Primary</button>
                <button className="secondary px-4 py-2 text-sm">
                  Secondary
                </button>
                <button className="success px-4 py-2 text-sm">Success</button>
              </div>
            </div>

            {/* Status indicators */}
            <div className="space-y-2">
              <div className="text-xs text-muted">Status Colors</div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-xs">Success</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-danger"></div>
                  <span className="text-xs">Danger</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <span className="text-xs">Warning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Theme;
