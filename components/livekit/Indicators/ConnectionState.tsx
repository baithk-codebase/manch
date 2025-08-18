import { useConnectionState, useRoomContext } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { Loader2, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

const Spinner = () => <Loader2 className="w-6 h-6 animate-spin" />;

function ConnectionStateIndicator() {
  const room = useRoomContext();
  const state = useConnectionState(room);
  const [notification, setNotification] = useState<
    React.ReactElement | undefined
  >(undefined);

  useEffect(() => {
    switch (state) {
      case ConnectionState.Reconnecting:
        setNotification(
          <>
            <Spinner />
            <p className="text-lg font-semibold">Reconnecting...</p>
            <p className="text-sm text-gray-300">
              Attempting to restore connection
            </p>
          </>
        );
        break;
      case ConnectionState.Connecting:
        setNotification(
          <>
            <Spinner />
            <p className="text-lg font-semibold">Connecting...</p>
            <p className="text-sm text-gray-300">Joining the room</p>
          </>
        );
        break;
      case ConnectionState.Disconnected:
        setNotification(
          <>
            <WifiOff className="w-8 h-8 text-red-400" />
            <p className="text-lg font-semibold">Disconnected</p>
            <p className="text-sm text-gray-300">Connection lost</p>
          </>
        );
        break;
      default:
        setNotification(undefined);
        break;
    }
  }, [state]);

  return (
    <>
      {notification && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div
            className="surface rounded-xl shadow-lg p-8 flex flex-col items-center gap-4 max-w-sm mx-4"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--card-border)",
              color: "var(--foreground)",
            }}
          >
            {notification}
          </div>
        </div>
      )}
    </>
  );
}

export default ConnectionStateIndicator;
