import Modal, { ModalBody } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";
import { useRoomContext } from "@livekit/components-react";
import { Check, Volume2 } from "lucide-react";
import { memo, useEffect, useState } from "react";

const Volume2Memo = memo(
  ({
    className,
    style,
  }: {
    className: string;
    style?: React.CSSProperties;
  }) => {
    return <Volume2 className={className} style={style} />;
  }
);

const CheckMemo = memo(
  ({
    className,
    style,
  }: {
    className: string;
    style?: React.CSSProperties;
  }) => {
    return <Check className={className} style={style} />;
  }
);

function ChangeAudioOutput({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const room = useRoomContext();

  useEffect(() => {
    if (isOpen) {
      getAudioOutputDevices();
    }
  }, [isOpen]);

  const getAudioOutputDevices = async () => {
    setIsLoading(true);
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioOutputDevices = devices.filter(
        (device) => device.kind === "audiooutput"
      );
      setAudioDevices(audioOutputDevices);
      setSelectedDeviceId(room.getActiveDevice("audiooutput") || "default");
    } catch (error) {
      console.error("Error getting audio output devices:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeviceSelect = async (deviceId: string) => {
    try {
      const response = await room.switchActiveDevice("audiooutput", deviceId);
      const audio = new Audio();
      audio.src =
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMdBiyA0fPTgSoFLYPL7+ONOQ0PU6DX9LNiGAU5ltDuya5AFg9Km+PFpEELAjmBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMdBiyA0fPTgSoFLYPL7+ONOQ0PU6DX9LNiGAU5ltDuya5AFg9Km+PFpEELAjmBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMdBiyA0fPTgSoFLYPL7+ONOQ0PU6DX9LNiGAU5ltDuya5AFg9Km+PFpEELAjmBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMdBiyA0fPTgSoFLYPL7+ONOQ0PU6DX9LNiGAU5ltDuya5AFg9Km+PFpEELAjmBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMdBiyA0fPTgSoFLYPL7+ONOQ0PU6DX9LNiGAU5ltDuya5AFg9Km+PFpEELAjmBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMdBiyA0fPTgSoFLYPL7+ONOQ0PU6DX9LNiGAU5ltDuya5AFg9Km+PFpEELAjmBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMdBiyA0fPTgSoFLYPL7+ONOQ0PU6DX9LNiGAU5ltDuya5AFg9Km+PFpEELAjmBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMdBiyA0fPTgSoFLYPL7+ONOQ0PU6DX9LNiGAU5ltDuya5AFg9Km+PFpEELAjm";

      if (audio.setSinkId) {
        audio
          .setSinkId(deviceId)
          .then(() => {
            audio.play().catch((error) => {
              console.error("Error playing audio:", error);
            });
          })
          .catch((error) => {
            console.error("Error setting audio output device:", error);
          });
      }

      if (response) {
        setSelectedDeviceId(deviceId);
      }
    } catch (error) {
      console.error("Error applying audio output device:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Audio Output Device"
      icon={
        <Volume2Memo className="w-5 h-5" style={{ color: "var(--primary)" }} />
      }
      size="md"
    >
      <ModalBody>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted mb-4">
              Select the audio output device for this session:
            </p>

            {audioDevices.map((device) => (
              <div
                key={device.deviceId}
                className={cn(`
                      p-3 rounded-lg border cursor-pointer w-full
                      ${
                        selectedDeviceId === device.deviceId
                          ? "border-primary bg-primary/10"
                          : "border-gray-700 hover:border-gray-600 hover:bg-gray-800/50"
                      }
                    `)}
                onClick={() => handleDeviceSelect(device.deviceId)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium">
                      {device.label || `Speaker ${device.deviceId.slice(0, 8)}`}
                    </p>
                    {device.deviceId === "default" && (
                      <p className="text-xs text-muted">System Default</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {selectedDeviceId === device.deviceId && (
                      <CheckMemo className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {audioDevices.length === 0 && "No audio output devices found"}
          </div>
        )}
      </ModalBody>
    </Modal>
  );
}

export default ChangeAudioOutput;
