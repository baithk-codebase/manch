import IconAnimation from "@/components/ui/IconAnimation";
import { useTrackToggle } from "@livekit/components-react/hooks";
import { Track } from "livekit-client";
import { ScreenShare, ScreenShareOff } from "lucide-react";
import { memo } from "react";

function ScreenShareButtonIcon() {
  return (
    <IconAnimation>
      <ScreenShare className="aspect-square h-full p-0.5" />
    </IconAnimation>
  );
}

function ScreenShareButtonIconOff() {
  return (
    <IconAnimation>
      <ScreenShareOff className="aspect-square h-full p-0.5" />
    </IconAnimation>
  );
}

const MemoScreenShareButtonIconOff = memo(ScreenShareButtonIconOff);
const MemoScreenShareButtonIcon = memo(ScreenShareButtonIcon);

function ScreenShareButton() {
  const {
    buttonProps: { onClick },
    enabled,
    pending,
  } = useTrackToggle({
    captureOptions: {
      audio: true,
      video: true,
    },
    source: Track.Source.ScreenShare,
  });

  return (
    <button
      disabled={pending}
      className="semi-primary disabled:opacity-50"
      onClick={onClick}
    >
      {enabled ? <MemoScreenShareButtonIconOff /> : <MemoScreenShareButtonIcon />}
    </button>
  );
}

export default ScreenShareButton;
