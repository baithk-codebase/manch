import { useConnectionState, useRoomContext } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";

const ConnectionStatusBadge = () => {
  const room = useRoomContext();
  const state = useConnectionState(room);

  const getStatusInfo = () => {
    switch (state) {
      case ConnectionState.Connected:
        return {
          color: "bg-green-500",
          text: "Connected",
          textColor: "text-green-600",
        };
      case ConnectionState.Connecting:
        return {
          color: "bg-yellow-500 animate-pulse",
          text: "Connecting",
          textColor: "text-yellow-600",
        };
      case ConnectionState.Reconnecting:
        return {
          color: "bg-orange-500 animate-pulse",
          text: "Reconnecting",
          textColor: "text-orange-600",
        };
      case ConnectionState.Disconnected:
      default:
        return {
          color: "bg-red-500",
          text: "Disconnected",
          textColor: "text-red-600",
        };
    }
  };

  const status = getStatusInfo();

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className={`w-2 h-2 rounded-full ${status.color}`}></div>
      <span className={`font-medium ${status.textColor} hidden md:inline`}>
        {status.text}
      </span>
    </div>
  );
};

export default ConnectionStatusBadge;
