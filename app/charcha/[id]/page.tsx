"use client";

import Controlbar from "@/components/livekit/controlbar/Controlbar";
import Header from "@/components/livekit/header/Header";
import ConnectionStateIndicator from "@/components/livekit/Indicators/ConnectionState";
import { VideoGrid } from "@/components/VideoGrid";
import {
  RoomAudioRenderer
} from "@livekit/components-react";



export default function Home() {
  return (
    <div className="h-[100dvh] overflow-hidden flex flex-col md:pt-[16px] md:px-[16px] md:pb-[8px] p-2">
      <Header />
      <VideoGrid />
      <Controlbar />
      <ConnectionStateIndicator />
      <RoomAudioRenderer />
    </div>
  );
}
