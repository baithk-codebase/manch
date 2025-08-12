"use client";

import {
    Mic,
    MicOff,
    MoreVertical,
    VideoOff,
    Volume2,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// Optional: Import LiveKit components for enhanced video handling
// import { VideoTrack, AudioTrack, ParticipantTile } from "@livekit/components-react";

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

interface Participant {
  id: string;
  name: string;
  isHost?: boolean;
  isMuted?: boolean;
  isVideoOff?: boolean;
  isSpeaking?: boolean;
  isHandRaised?: boolean;
  connectionQuality?: "excellent" | "good" | "poor";
}

interface VideoGridProps {
  participants: Participant[];
  localParticipant: Participant;
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
  participant,
  position,
  isLocalUser = false,
  style,
}: {
  participant: Participant;
  position: GridPosition;
  isLocalUser?: boolean;
  style?: React.CSSProperties;
}) => {
  const avatarColor = generateAvatarColor(participant.name);
  const initials = getInitials(participant.name);

  const getConnectionIndicator = () => {
    const quality = participant.connectionQuality || "poor";
    const heights = ["4px", "8px", "12px"];
    
    return (
      <div className="video-tile-connection">
        {heights.map((height, i) => (
          <div
            key={i}
            className={`connection-bar ${quality}`}
            style={{ height }}
          />
        ))}
      </div>
    );
  };

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
        "video-tile",
        participant.isSpeaking && "speaking"
      )}
    >
      <div className="absolute top-3 left-3 z-10">
        {getConnectionIndicator()}
      </div>
      <div className="w-full h-full flex items-center justify-center relative">
        {participant.isVideoOff ? (
          <div className="flex flex-col items-center justify-center space-y-2">
            <div
              className={cn(
                "video-tile-avatar",
                position.width > 200
                  ? "w-16 h-16 text-xl"
                  : "w-12 h-12 text-sm",
                avatarColor
              )}
            >
              {initials}
            </div>
            <VideoOff className="w-4 h-4 text-muted" />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-4xl">📹</div>
            {participant.isSpeaking && (
              <div className="absolute inset-0 animate-pulse" style={{ backgroundColor: "var(--success)20" }} />
            )}
          </div>
        )}
      </div>
      <div className="video-tile-overlay">
        <div className="absolute top-2 right-2 flex space-x-1">
          <button className="video-tile-button">
            <MoreVertical className="w-3 h-3" />
          </button>
        </div>
        <div className="absolute bottom-2 left-2 right-2">
          <div className="flex items-center justify-between">
            <div className="video-tile-name truncate-text">
              {participant.name}
              {participant.isHost && " (Host)"}
              {isLocalUser && " (You)"}
            </div>

            <div className="flex items-center space-x-1">
              <div className={cn("video-tile-mic", participant.isMuted ? "muted" : "unmuted")}>
                {participant.isMuted ? (
                  <MicOff className="w-2.5 h-2.5 text-white" />
                ) : (
                  <Mic className="w-2.5 h-2.5 text-white" />
                )}
              </div>

              {!isLocalUser && (
                <button className="video-tile-button p-1">
                  <Volume2 className="w-2.5 h-2.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const VideoGrid = ({
  participants,
  localParticipant,
}: VideoGridProps) => {
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
  }, []);

  const allParticipants = [localParticipant, ...participants];

  const { positions } = useVideoGrid(dimensions, allParticipants.length, 16);

  return (
    <div ref={gridRef} className={"relative w-full h-full overflow-hidden"}>
      {allParticipants.map((participant, index) => (
        <VideoTile
          key={participant.id}
          participant={participant}
          position={
            positions[index] || { left: 0, top: 0, width: 200, height: 112 }
          }
          isLocalUser={participant.id === localParticipant.id}
          style={{
            animationDelay: `${index * 100}ms`,
          }}
        />
      ))}
    </div>
  );
};
