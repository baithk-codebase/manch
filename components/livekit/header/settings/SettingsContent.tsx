import AudioVideo from "@/components/livekit/header/settings/tabs/AudioVideo";
import Theme from "@/components/livekit/header/settings/tabs/Theme";
import { NavigationSection, useNavigation } from "@/contexts/naviagtion";

function SettingsContent() {
  const { activeSection } = useNavigation();

  switch (activeSection) {
    case NavigationSection.AUDIO_VIDEO:
      return <AudioVideo />;
    case NavigationSection.THEME:
      return <Theme />;
    default:
      return null;
  }
}

export default SettingsContent;
