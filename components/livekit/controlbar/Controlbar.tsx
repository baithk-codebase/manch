import CameraButton from "@/components/livekit/controlbar/CameraButton";
import ChangeAudioOutputButton from "@/components/livekit/controlbar/ChangeAudioOutputButton";
import HandRaisedIcon from "@/components/livekit/controlbar/HandRaisedIcon";
import MicButton from "@/components/livekit/controlbar/MicButton";
import ScreenShareButton from "@/components/livekit/controlbar/ScreenShareButton";
import { useEffect, useState } from "react";
import ExitButton from "./ExitButton";
import RecordButton from "./RecordButton";

function Controlbar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <div className="flex items-center justify-center gap-2 my-4">
        <RecordButton />
        <MicButton />
        <CameraButton />
        <ScreenShareButton />
        <ChangeAudioOutputButton />
        <HandRaisedIcon />
        <ExitButton />
      </div>
    </>
  );
}

export default Controlbar;
