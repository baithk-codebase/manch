import { useConnectionState, useRoomContext } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { Wifi, WifiOff } from "lucide-react";

const ConnectionStatusBadge = () => {
  const room = useRoomContext();
  const state = useConnectionState(room);

  const getStatusInfo = () => {
    switch (state) {
      case ConnectionState.Connected:
        return {
          color: "bg-green-500",
          icon: Wifi,
          text: "Connected",
          textColor: "text-green-600",
        };
      case ConnectionState.Connecting:
        return {
          color: "bg-yellow-500 animate-pulse",
          icon: Wifi,
          text: "Connecting",
          textColor: "text-yellow-600",
        };
      case ConnectionState.Reconnecting:
        return {
          color: "bg-orange-500 animate-pulse",
          icon: Wifi,
          text: "Reconnecting",
          textColor: "text-orange-600",
        };
      case ConnectionState.Disconnected:
      default:
        return {
          color: "bg-red-500",
          icon: WifiOff,
          text: "Disconnected",
          textColor: "text-red-600",
        };
    }
  };

  const status = getStatusInfo();
  const Icon = status.icon;

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className={`w-2 h-2 rounded-full ${status.color}`}></div>
      <Icon className="w-4 h-4 text-gray-500" />
      <span className={`font-medium ${status.textColor} hidden md:inline`}>
        {status.text}
      </span>
    </div>
  );
};

export default ConnectionStatusBadge;
