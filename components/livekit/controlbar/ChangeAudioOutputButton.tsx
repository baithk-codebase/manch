import { memo, useState } from "react";
import ChangeAudioOutput from "./ChangeAudioOutput";
import { SpeakerIcon } from "lucide-react";

const SpeakerIconMemo = memo(({ className }: { className: string }) => {
  return <SpeakerIcon className={className} />;
});

SpeakerIconMemo.displayName = "SpeakerIconMemo";

function ChangeAudioOutputButton() {
  const [isSpeakerModalOpen, setIsSpeakerModalOpen] = useState(false);
  return (
    <>
      <ChangeAudioOutput
        isOpen={isSpeakerModalOpen}
        onClose={() => setIsSpeakerModalOpen(false)}
      />
      <button
        className="semi-primary"
        onClick={() => setIsSpeakerModalOpen(true)}
        title="Audio Output Settings"
      >
        <SpeakerIconMemo className="aspect-square h-full p-0.5" />
      </button>
    </>
  );
}

export default ChangeAudioOutputButton;
