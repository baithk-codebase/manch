"use client";

import { LiveKitRoom } from "@livekit/components-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

export default function CharchaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams();
  const searchParams = useSearchParams();

  const accessToken = searchParams.get("accessToken");
  const sfuUrl = searchParams.get("sfuUrl");

  const [isConnected, setIsConnected] = useState(false);

  console.log(accessToken, sfuUrl, id);

  const handleConnect = useCallback(() => {
    setIsConnected(true);
  }, []);

  const handleDisconnect = useCallback(() => {
    console.log("disconnected");
  }, []);

  const handleMediaDeviceFailure = useCallback(() => {
    console.log("media device failure");
  }, []);

  const RoomOptions = useMemo(() => {
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
      audio={false}
      video={false}
      screen={false}
      options={RoomOptions}
    >
      {children}
    </LiveKitRoom>
  );
}
