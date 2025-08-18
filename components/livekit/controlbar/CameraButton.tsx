import IconAnimation from "@/components/ui/IconAnimation";
import { usePersistentUserChoices } from "@/hooks/devices/usePresistentUserChoices";
import { useTrackToggle } from "@livekit/components-react/hooks";
import { Track } from "livekit-client";
import { Video, VideoOff } from "lucide-react";
import { memo } from "react";

function CameraButtonIcon() {
  return (
    <IconAnimation>
      <Video className="aspect-square h-full p-0.5" />
    </IconAnimation>
  );
}

function CameraButtonIconOff() {
  return (
    <IconAnimation>
      <VideoOff className="aspect-square h-full p-0.5" />
    </IconAnimation>
  );
}

const MemoCameraButtonIconOff = memo(CameraButtonIconOff);
const MemoCameraButtonIcon = memo(CameraButtonIcon);

function CameraButton() {
  const { userChoices } = usePersistentUserChoices();

  const {
    buttonProps: { onClick },
    enabled,
    pending,
  } = useTrackToggle({
    captureOptions: {
      deviceId: userChoices.videoDeviceId,
    },
    source: Track.Source.Camera,
  });

  return (
    <button onClick={onClick} className="semi-primary disabled:opacity-50" disabled={pending}>
      {enabled ? <MemoCameraButtonIcon /> : <MemoCameraButtonIconOff />}
    </button>
  );
}

export default CameraButton;
