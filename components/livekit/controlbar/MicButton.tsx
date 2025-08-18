import IconAnimation from "@/components/ui/IconAnimation";
import { usePersistentUserChoices } from "@/hooks/devices/usePresistentUserChoices";
import { useTrackToggle } from "@livekit/components-react/hooks";
import { motion } from "framer-motion";
import { Track } from "livekit-client";
import { Mic, MicOff } from "lucide-react";
import { memo } from "react";

function MicButtonIcon() {
  return (
    <IconAnimation>
      <Mic className="aspect-square h-full p-0.5" />
    </IconAnimation>
  );
}

function MicButtonIconOff() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <MicOff className="aspect-square h-full p-0.5" />
    </motion.div>
  );
}

const MemoMicButtonIconOff = memo(MicButtonIconOff);
const MemoMicButtonIcon = memo(MicButtonIcon);

function MicButton() {
  const { userChoices } = usePersistentUserChoices();
  const {
    buttonProps: { onClick },
    enabled,
    pending,
  } = useTrackToggle({
    captureOptions: {
      deviceId: userChoices.audioDeviceId,
    },
    source: Track.Source.Microphone,
  });

  return (
    <button
      onClick={onClick}
      disabled={pending}
      className="semi-primary disabled:opacity-50"
    >
      {enabled ? <MemoMicButtonIcon /> : <MemoMicButtonIconOff />}
    </button>
  );
}

export default MicButton;
