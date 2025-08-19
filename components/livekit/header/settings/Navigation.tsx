import { NavigationSection, useNavigation } from "@/contexts/naviagtion";
import { cn } from "@/lib/utils";
import { Circle, Palette, Video } from "lucide-react";

const sideMenuItems = [
  {
    id: NavigationSection.AUDIO_VIDEO,
    label: "Audio & Video",
    icon: Video,
  },
  {
    id: NavigationSection.RECORDING,
    label: "Recording",
    icon: Circle,
  },
  {
    id: NavigationSection.THEME,
    label: "Theme",
    icon: Palette,
  },
];

function Navigation() {
  const naviagtion = useNavigation();
  return (
    <div className="w-full lg:w-48 lg:flex-shrink-0">
      <nav className="flex lg:flex-col lg:space-y-1 space-x-1 lg:space-x-0 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
        {sideMenuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => naviagtion.setActiveSection(item.id)}
              className={cn(
                "flex-shrink-0 lg:w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 whitespace-nowrap",
                naviagtion.activeSection === item.id
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "hover:bg-gray-800/50 text-gray-300 hover:text-white"
              )}
            >
              <IconComponent className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium lg:inline hidden sm:inline">
                {item.label}
              </span>
              <span className="font-medium sm:hidden lg:hidden text-xs">
                {item.label.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default Navigation;
