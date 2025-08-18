"use client";

import { usePersistentUserChoices } from "@/hooks/devices/usePresistentUserChoices";
import { LiveKitRoom } from "@livekit/components-react";
import { RoomOptions } from "livekit-client";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

export default function CharchaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  
  const { userChoices } = usePersistentUserChoices();

  const accessToken = searchParams.get("accessToken");
  const sfuUrl = searchParams.get("sfuUrl");

  const [isConnected, setIsConnected] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [isMediaDeviceFailure, setIsMediaDeviceFailure] = useState(false);

  const handleConnect = useCallback(() => {
    setIsConnected(true);
  }, []);

  const handleDisconnect = useCallback(() => {
    setIsDisconnected(true);
  }, []);

  const handleMediaDeviceFailure = useCallback(() => {
    setIsMediaDeviceFailure(true);
  }, []);

  const RoomOptions: RoomOptions = useMemo(() => {
    return {
      adaptiveStream: true,
    };
  }, []);

  return (
    <LiveKitRoom
      token={accessToken as string}
      serverUrl={sfuUrl as string}
      connect={true}
      onConnected={handleConnect}
      onDisconnected={handleDisconnect}
      onMediaDeviceFailure={handleMediaDeviceFailure}
      audio={userChoices.audioEnabled}
      video={userChoices.videoEnabled}
      options={RoomOptions}
    >
      {children}
    </LiveKitRoom>
  );
}
