import { createContext, useContext, useState } from "react";

export enum NavigationSection {
  AUDIO_VIDEO = "audio-video",
  RECORDING = "recording",
  THEME = "theme",
}

export type NavigationContextType = {
  activeSection: NavigationSection;
  setActiveSection: (section: NavigationSection) => void;
};

export const NavigationContext = createContext<NavigationContextType>({
  activeSection: NavigationSection.AUDIO_VIDEO,
  setActiveSection: () => {},
});

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeSection, setActiveSection] = useState<NavigationSection>(
    NavigationSection.AUDIO_VIDEO
  );

  return (
    <NavigationContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
