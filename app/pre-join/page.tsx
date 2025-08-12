"use client";

import { usePersistentUserChoices } from "@/hooks/devices/usePresistentUserChoices";
import { usePreviewTracks } from "@livekit/components-react";
import { LocalVideoTrack, Track } from "livekit-client";
import {
  AlertTriangle,
  ChevronDown,
  Mic,
  MicOff,
  Video,
  VideoOff,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function PreJoinLayout() {
  const {
    userChoices: initialUserChoices,
    saveAudioInputDeviceId,
    saveAudioInputEnabled,
    saveVideoInputDeviceId,
    saveVideoInputEnabled,
    saveAudioOutputDeviceId,
    saveUsername,
  } = usePersistentUserChoices({});

  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [videoEnabled, setVideoEnabled] = useState<boolean>(true);
  const [audioDeviceId, setAudioDeviceId] = useState<string>("");
  const [videoDeviceId, setVideoDeviceId] = useState<string>("");
  const [audioOutputDeviceId, setAudioOutputDeviceId] = useState<string>("");
  const [username, setUsername] = useState("Tushar Banga");
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioOutputDevices, setAudioOutputDevices] = useState<
    MediaDeviceInfo[]
  >([]);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setAudioEnabled(initialUserChoices.audioEnabled || false);
    setVideoEnabled(initialUserChoices.videoEnabled || false);
    setAudioDeviceId(initialUserChoices.audioDeviceId || "");
    setVideoDeviceId(initialUserChoices.videoDeviceId || "");
    setAudioOutputDeviceId(initialUserChoices.audioOutputDeviceId || "");
    setUsername(initialUserChoices.username || "Tushar Banga");
  }, [initialUserChoices]);

  useEffect(() => {
    if (!isClient) return;
    saveAudioInputEnabled(audioEnabled);
  }, [audioEnabled, saveAudioInputEnabled, isClient]);
  useEffect(() => {
    if (!isClient) return;
    saveVideoInputEnabled(videoEnabled);
  }, [videoEnabled, saveVideoInputEnabled, isClient]);
  useEffect(() => {
    if (!isClient) return;
    saveAudioInputDeviceId(audioDeviceId);
  }, [audioDeviceId, saveAudioInputDeviceId, isClient]);
  useEffect(() => {
    if (!isClient) return;
    saveVideoInputDeviceId(videoDeviceId);
  }, [videoDeviceId, saveVideoInputDeviceId, isClient]);
  useEffect(() => {
    if (!isClient) return;
    saveAudioOutputDeviceId(audioOutputDeviceId);
  }, [audioOutputDeviceId, saveAudioOutputDeviceId, isClient]);
  useEffect(() => {
    if (!isClient) return;
    saveUsername(username);
  }, [username, saveUsername, isClient]);



  const handleError = useCallback((error: Error) => {
    console.error("Error creating tracks:", error);
    setShowPermissionModal(true);
  }, []);

  const tracks = usePreviewTracks(
    {
      audio: audioEnabled
        ? { deviceId: initialUserChoices.audioDeviceId }
        : false,
      video: videoEnabled
        ? { deviceId: initialUserChoices.videoDeviceId }
        : false,
    },
    handleError
  );

  useEffect(() => {
    if (!isClient) return;

    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        setAudioDevices(
          devices.filter((device) => device.kind === "audioinput")
        );
        setVideoDevices(
          devices.filter((device) => device.kind === "videoinput")
        );
        setAudioOutputDevices(
          devices.filter((device) => device.kind === "audiooutput")
        );
      } catch (error) {
        console.error("Error getting devices:", error);
      }
    };
    getDevices();
  }, [isClient, videoEnabled, audioEnabled,tracks]);

  const videoEl = useRef<HTMLVideoElement>(null);

  const videoTrack = useMemo(
    () =>
      tracks?.filter(
        (track) => track.kind === Track.Kind.Video
      )[0] as LocalVideoTrack,
    [tracks]
  );

  useEffect(() => {
    if (!isClient) return;
    if (videoEl.current && videoTrack) {
      videoTrack.unmute();
      videoTrack.attach(videoEl.current);
    }

    return () => {
      videoTrack?.detach();
    };
  }, [videoTrack, isClient]);

  const handleJoinStudio = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--background)" }}
    >
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-muted text-sm">
              You&apos;re about to join Tushar Banga&apos;s Studio
            </p>
            <h1
              className="text-3xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Let&apos;s check your cam and mic
            </h1>
          </div>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
            placeholder="Enter your name"
          />

          <button
            onClick={handleJoinStudio}
            className="w-full primary font-semibold py-4 rounded-xl"
          >
            Join baithk
          </button>
        </div>

        <div className="space-y-6">
          <div
            className="aspect-video surface rounded-xl overflow-hidden border relative"
            style={{ borderColor: "var(--card-border)" }}
          >
            {videoEnabled ? (
              <video
                ref={videoEl}
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--card)" }}
                >
                  <VideoOff className="w-8 h-8 text-muted" />
                </div>
              </div>
            )}

            {/* Camera Controls */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`icon ${audioEnabled ? "success" : "danger"}`}
              >
                {audioEnabled ? (
                  <Mic className="w-4 h-4" />
                ) : (
                  <MicOff className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setVideoEnabled(!videoEnabled)}
                className={`icon ${videoEnabled ? "success" : "danger"}`}
              >
                {videoEnabled ? (
                  <Video className="w-4 h-4" />
                ) : (
                  <VideoOff className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Device Selection */}
          <div className="space-y-3">
            {/* Camera Selection */}
            <div className="relative">
              <select
                value={videoDeviceId}
                onChange={(e) => setVideoDeviceId(e.target.value)}
                className="w-full appearance-none pr-10"
              >
                <option value="">
                  {videoEnabled ? "Select Camera" : "Camera Blocked"}
                </option>
                {videoDevices.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || `Camera ${device.deviceId.slice(0, 8)}`}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
            </div>

            {/* Microphone Selection */}
            <div className="relative">
              <select
                value={audioDeviceId}
                onChange={(e) => setAudioDeviceId(e.target.value)}
                className="w-full appearance-none pr-10"
              >
                <option value="">Select Microphone</option>
                {audioDevices.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label ||
                      `Microphone ${device.deviceId.slice(0, 8)}`}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
            </div>

            {/* Speaker Selection */}
            <div className="relative">
              <select
                value={audioOutputDeviceId}
                onChange={(e) => setAudioOutputDeviceId(e.target.value)}
                className="w-full appearance-none pr-10"
              >
                <option value="">Select Speaker</option>
                {audioOutputDevices.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || `Speaker ${device.deviceId.slice(0, 8)}`}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
      {showPermissionModal && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ backgroundColor: "var(--overlay-background)" }}
        >
          <div className="modal p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--danger)20" }}
                >
                  <AlertTriangle
                    className="w-5 h-5"
                    style={{ color: "var(--danger)" }}
                  />
                </div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  Permission Required
                </h3>
              </div>
              <button
                onClick={() => setShowPermissionModal(false)}
                className="text-muted hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="card">
                <h4
                  className="font-medium mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  How to enable permissions:
                </h4>
                <ul className="text-sm text-secondary space-y-1">
                  <li>
                    • Click the camera/microphone icon in your browser&apos;s
                    address bar
                  </li>
                  <li>
                    • Select &quot;Allow&quot; for both camera and microphone
                  </li>
                  <li>• Refresh the page if needed</li>
                </ul>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {}}
                  className="flex-1 primary font-semibold py-3 rounded-lg"
                >
                  Request Permission
                </button>
                <button
                  onClick={() => setShowPermissionModal(false)}
                  className="flex-1 secondary font-semibold py-3 rounded-lg"
                >
                  Cancel
                </button>
              </div>

              <p className="text-xs text-muted text-center">
                You can join without camera/mic, but functionality will be
                limited.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PreJoinLayout;
