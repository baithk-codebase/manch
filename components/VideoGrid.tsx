"use client";

import { ParticipantAttribute } from "@/types/livekit/particpantAtrribute";
import {
  TrackReferenceOrPlaceholder,
  useEnsureTrackRef,
  useRoomContext,
  useTracks,
  useVisualStableUpdate,
  VideoTrack,
} from "@livekit/components-react";
import { AnimatePresence } from "framer-motion";
import {
  LocalParticipant,
  RemoteParticipant,
  RoomEvent,
  Track,
} from "livekit-client";
import { Mic, MicOff, MoreVertical, VideoOff, Volume2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatedHandIcon } from "./livekit/controlbar/HandRaisedIcon";

// Custom debounce hook for audio levels
function useDebounceAudioLevel(
  audioLevel: number | undefined,
  delay: number = 150
) {
  const [debouncedValue, setDebouncedValue] = useState(audioLevel);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(audioLevel);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [audioLevel, delay]);

  return debouncedValue;
}

// Utility functions
function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return inputs.filter(Boolean).join(" ");
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function generateAvatarColor(name: string): string {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];

  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

interface VideoGridProps {
  participants: RemoteParticipant[];
  localParticipant: LocalParticipant;
}

interface GridDimensions {
  width: number;
  height: number;
}

interface GridPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

function useVideoGrid(
  dimensions: GridDimensions,
  count: number,
  gap: number = 16
) {
  const calculateGrid = useCallback(() => {
    if (!dimensions.width || !dimensions.height || count === 0) {
      return { positions: [], itemWidth: 0, itemHeight: 0 };
    }

    const aspectRatio = 16 / 9;
    const containerWidth = dimensions.width - gap * 2;
    const containerHeight = dimensions.height - gap * 2;
    const isMobile = dimensions.width < 768; // Mobile breakpoint
    const isLandscape = dimensions.width > dimensions.height;
    const isMobileLandscape = isMobile && isLandscape;

    let bestLayout = {
      cols: 1,
      rows: 1,
      itemWidth: 0,
      itemHeight: 0,
      totalWidth: 0,
      totalHeight: 0,
    };
    let bestScore = 0;

    // Mobile layouts
    if (isMobileLandscape) {
      // Mobile landscape: Use horizontal layout (1 row, multiple columns)
      const itemHeight = containerHeight;
      let itemWidth = itemHeight * aspectRatio;
      const maxTotalWidth = containerWidth;
      const minWidthNeeded = count * itemWidth + (count - 1) * gap;

      // If content doesn't fit, scale down the width
      if (minWidthNeeded > maxTotalWidth) {
        itemWidth = (maxTotalWidth - (count - 1) * gap) / count;
      }

      const totalWidth = count * itemWidth + (count - 1) * gap;

      bestLayout = {
        cols: count,
        rows: 1,
        itemWidth,
        itemHeight,
        totalWidth,
        totalHeight: itemHeight,
      };
      bestScore = itemWidth * itemHeight;
    } else if (isMobile) {
      // Mobile portrait: Use vertical stack (1 column)
      const itemWidth = containerWidth;
      let itemHeight = itemWidth / aspectRatio;
      const maxTotalHeight = containerHeight;
      const minHeightNeeded = count * itemHeight + (count - 1) * gap;

      // If content doesn't fit, scale down the height
      if (minHeightNeeded > maxTotalHeight) {
        itemHeight = (maxTotalHeight - (count - 1) * gap) / count;
      }

      const totalHeight = count * itemHeight + (count - 1) * gap;

      bestLayout = {
        cols: 1,
        rows: count,
        itemWidth,
        itemHeight,
        totalWidth: itemWidth,
        totalHeight,
      };
      bestScore = itemWidth * itemHeight;
    }
    // Desktop layouts
    else if (count === 1) {
      bestLayout = {
        cols: 1,
        rows: 1,
        itemWidth: Math.min(containerWidth, containerHeight * aspectRatio),
        itemHeight: Math.min(containerHeight, containerWidth / aspectRatio),
        totalWidth: Math.min(containerWidth, containerHeight * aspectRatio),
        totalHeight: Math.min(containerHeight, containerWidth / aspectRatio),
      };
      bestScore = bestLayout.itemWidth * bestLayout.itemHeight;
    } else if (count === 2) {
      let itemWidth = (containerWidth - gap) / 2;
      let itemHeight = itemWidth / aspectRatio;

      // If height doesn't fit, scale based on available height
      if (itemHeight > containerHeight) {
        itemHeight = containerHeight;
        itemWidth = itemHeight * aspectRatio;
      }

      const totalWidth = 2 * itemWidth + gap;

      bestLayout = {
        cols: 2,
        rows: 1,
        itemWidth,
        itemHeight,
        totalWidth,
        totalHeight: itemHeight,
      };
      bestScore = itemWidth * itemHeight;
    } else if (count === 3) {
      // Try 2x2 layout with 3 items
      let itemWidth = (containerWidth - gap) / 2;
      let itemHeight = itemWidth / aspectRatio;
      let totalHeight = 2 * itemHeight + gap;

      // If doesn't fit, scale down
      if (totalHeight > containerHeight) {
        itemHeight = (containerHeight - gap) / 2;
        itemWidth = itemHeight * aspectRatio;
        totalHeight = 2 * itemHeight + gap;
      }

      const totalWidth = 2 * itemWidth + gap;

      bestLayout = {
        cols: 2,
        rows: 2,
        itemWidth,
        itemHeight,
        totalWidth,
        totalHeight,
      };
      bestScore = itemWidth * itemHeight;
    } else if (count === 4) {
      // Force 2x2 layout for exactly 4 participants
      let itemWidth = (containerWidth - gap) / 2;
      let itemHeight = itemWidth / aspectRatio;
      let totalHeight = 2 * itemHeight + gap;

      // If doesn't fit, scale down
      if (totalHeight > containerHeight) {
        itemHeight = (containerHeight - gap) / 2;
        itemWidth = itemHeight * aspectRatio;
        totalHeight = 2 * itemHeight + gap;
      }

      const totalWidth = 2 * itemWidth + gap;

      bestLayout = {
        cols: 2,
        rows: 2,
        itemWidth,
        itemHeight,
        totalWidth,
        totalHeight,
      };
      bestScore = itemWidth * itemHeight;
    } else {
      // For 5+ participants, use dynamic calculation
      for (let cols = 1; cols <= count; cols++) {
        const rows = Math.ceil(count / cols);

        const itemWidth = (containerWidth - (cols - 1) * gap) / cols;
        const itemHeight = itemWidth / aspectRatio;

        const totalWidth = cols * itemWidth + (cols - 1) * gap;
        const totalHeight = rows * itemHeight + (rows - 1) * gap;

        if (totalWidth <= containerWidth && totalHeight <= containerHeight) {
          const score = itemWidth * itemHeight;
          if (score > bestScore) {
            bestScore = score;
            bestLayout = {
              cols,
              rows,
              itemWidth,
              itemHeight,
              totalWidth,
              totalHeight,
            };
          }
        }
      }
    }

    if (bestScore === 0) {
      const cols = Math.ceil(Math.sqrt(count));
      const rows = Math.ceil(count / cols);
      const itemWidth = (containerWidth - (cols - 1) * gap) / cols;
      const itemHeight = (containerHeight - (rows - 1) * gap) / rows;

      const finalItemHeight = Math.min(itemHeight, itemWidth / aspectRatio);
      const finalItemWidth = finalItemHeight * aspectRatio;

      bestLayout = {
        cols,
        rows,
        itemWidth: finalItemWidth,
        itemHeight: finalItemHeight,
        totalWidth: cols * finalItemWidth + (cols - 1) * gap,
        totalHeight: rows * finalItemHeight + (rows - 1) * gap,
      };
    }

    const positions: GridPosition[] = [];
    const startX = (containerWidth - bestLayout.totalWidth) / 2 + gap;
    const startY = (containerHeight - bestLayout.totalHeight) / 2 + gap;

    for (let i = 0; i < count; i++) {
      let col = i % bestLayout.cols;
      const row = Math.floor(i / bestLayout.cols);

      // Special positioning for 3 participants on desktop (center the third one)
      if (count === 3 && i === 2 && !isMobile && !isMobileLandscape) {
        col = 0.5; // Center position between columns
      }

      positions.push({
        left: startX + col * (bestLayout.itemWidth + gap),
        top: startY + row * (bestLayout.itemHeight + gap),
        width: bestLayout.itemWidth,
        height: bestLayout.itemHeight,
      });
    }

    return {
      positions,
      itemWidth: bestLayout.itemWidth,
      itemHeight: bestLayout.itemHeight,
    };
  }, [dimensions, count, gap]);

  return calculateGrid();
}

// Video tile component
const VideoTile = ({
  track,
  position,
  isLocalUser = false,
  style,
}: {
  track: TrackReferenceOrPlaceholder;
  position: GridPosition;
  isLocalUser?: boolean;
  style?: React.CSSProperties;
}) => {
  const trackReference = useEnsureTrackRef(track);
  const participant = trackReference.participant;

  const debouncedAudioLevel = useDebounceAudioLevel(
    participant.audioLevel,
    100
  );

  const avatarColor = generateAvatarColor(
    participant.name || participant.identity || ""
  );
  const initials = getInitials(
    participant.name || participant.identity || "Unknown"
  );

  const hasVideo =
    trackReference.publication &&
    trackReference.publication.kind === "video" &&
    trackReference.publication.isSubscribed &&
    !trackReference.publication.isMuted;

  const audioPublication = participant.getTrackPublication(
    Track.Source.Microphone
  );
  const isAudioMuted = !audioPublication || audioPublication.isMuted;

  const getConnectionIndicator = () => {
    const quality = participant.connectionQuality || "unknown";

    const getQualityColor = () => {
      switch (quality) {
        case "excellent":
          return { color: "bg-green-500", height: 4 };
        case "good":
          return { color: "bg-yellow-500", height: 3 };
        case "poor":
          return { color: "bg-red-500", height: 2 };
        default:
          return { color: "bg-gray-500", height: 1 };
      }
    };

    const { color, height } = getQualityColor();

    return (
      <div className="flex items-end gap-0.5">
        {Array.from({ length: height }).map((_, i) => {
          return (
            <div
              key={i}
              className={`w-1 rounded-sm ${color}`}
              style={{ height: (i + 1) * 4 + "px" }}
            />
          );
        })}
      </div>
    );
  };

  const getAudioRing = (isHandRaised: boolean) => {
    if (isHandRaised) {
      return "ring-2 ring-yellow-400";
    }

    if (!participant.isSpeaking || debouncedAudioLevel === undefined) {
      return "";
    }

    const audioLevel = debouncedAudioLevel;

    if (audioLevel >= 0.75) {
      return "ring-8 ring-green-400";
    } else if (audioLevel >= 0.5) {
      return "ring-6 ring-green-400";
    } else if (audioLevel >= 0.25) {
      return "ring-4 ring-green-500";
    } else if (audioLevel > 0) {
      return "ring-2 ring-green-600";
    }

    return "";
  };

  const isHandRaised =
    participant.attributes[ParticipantAttribute.IS_HAND_RAISED];

  return (
    <div
      style={{
        position: "absolute",
        left: position.left,
        top: position.top,
        width: position.width,
        height: position.height,
        ...style,
      }}
      className={cn(
        "relative rounded-lg overflow-hidden bg-gray-900 border transition-all duration-300 ease-out border-gray-700",
        getAudioRing(!!isHandRaised)
      )}
    >
      <div className="absolute top-3 left-3 z-10">
        {getConnectionIndicator()}
      </div>

      <div className="w-full h-full relative">
        {hasVideo ? (
          <VideoTrack
            trackRef={trackReference}
            className="w-full !object-contain"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              backgroundColor: "var(--card)",
            }}
          >
            <div className="flex flex-col items-center space-y-2">
              <div
                className={cn(
                  "rounded-full flex items-center justify-center text-white font-semibold",
                  position.width > 200
                    ? "w-16 h-16 text-xl"
                    : "w-12 h-12 text-sm",
                  avatarColor
                )}
              >
                {initials}
              </div>
              <VideoOff className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none">
        <div className="absolute inset-0 pointer-events-auto">
          <div className="absolute top-2 right-2 flex items-center gap-2">
            <AnimatePresence>
              {isHandRaised && (
                <AnimatedHandIcon
                  className="w-6 h-6 text-white bg-yellow-600 rounded-full p-1 shadow-md flex items-center justify-center"
                  loop={Infinity}
                />
              )}
            </AnimatePresence>
            <button className="p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
              <MoreVertical className="w-3 h-3" />
            </button>
          </div>

          <div className="absolute bottom-2 left-2 right-2">
            <div className="flex items-center justify-between">
              <div className="text-white text-sm font-medium truncate flex items-center gap-2 flex-1 mr-2">
                {participant.name || participant.identity}
                {isLocalUser && " (You)"}
              </div>

              <div className="flex items-center space-x-1 flex-shrink-0">
                <div
                  className={cn(
                    "p-1 rounded-full flex items-center justify-center",
                    isAudioMuted ? "bg-red-500/80" : "bg-green-500/80"
                  )}
                >
                  {isAudioMuted ? (
                    <MicOff className="w-2.5 h-2.5 text-white" />
                  ) : (
                    <Mic className="w-2.5 h-2.5 text-white" />
                  )}
                </div>
                {!isLocalUser && (
                  <button className="p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
                    <Volume2 className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const VideoGrid = () => {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
      { source: Track.Source.Unknown, withPlaceholder: false },
    ],
    {
      updateOnlyOn: [
        RoomEvent.ParticipantActive,
        RoomEvent.ParticipantDisconnected,
        RoomEvent.ActiveSpeakersChanged,
        RoomEvent.TrackMuted,
        RoomEvent.TrackUnmuted,
        RoomEvent.ParticipantAttributesChanged,
      ],
    }
  );

  const tracksStable = useVisualStableUpdate(tracks, 4);

  const room = useRoomContext();

  const gridRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<GridDimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [room.state]);

  const { positions } = useVideoGrid(dimensions, tracks.length, 16);

  return (
    <div ref={gridRef} className={"relative w-full h-full overflow-hidden"}>
      {tracksStable.map((track, index) => (
        <VideoTile
          key={track.publication?.trackSid ?? index}
          track={track}
          position={
            positions[index] || { left: 0, top: 0, width: 200, height: 112 }
          }
          isLocalUser={track.publication?.isLocal}
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        />
      ))}
    </div>
  );
};
