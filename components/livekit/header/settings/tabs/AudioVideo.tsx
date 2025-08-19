import { cn } from "@/lib/utils";
import { useRoomContext } from "@livekit/components-react";
import { useMediaDeviceSelect } from "@livekit/components-react/hooks";
import { RoomEvent } from "livekit-client";
import { Camera, Check, Loader2, LucideIcon, Mic } from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";

interface DeviceSectionProps {
  title: string;
  icon: LucideIcon;
  deviceKind: "audioinput" | "videoinput";
  deviceTypeLabel: string;
  onError: (error: Error) => void;
}

interface DeviceItemProps {
  device: MediaDeviceInfo;
  isActive: boolean;
  isDefault: boolean;
  isLoading: boolean;
  onSelect: (deviceId: string) => Promise<void>;
  deviceTypeLabel: string;
}

const isDefaultDevice = (
  devices: MediaDeviceInfo[],
  deviceId: string
): boolean => {
  return (
    devices.find((info) => info.label.toLowerCase().startsWith("default"))
      ?.deviceId === deviceId
  );
};

const isActiveDevice = (
  devices: MediaDeviceInfo[],
  deviceId: string,
  activeDeviceId: string
): boolean => {
  return (
    deviceId === activeDeviceId ||
    (!isDefaultDevice(devices, activeDeviceId) && activeDeviceId === "default")
  );
};

const DeviceItem = memo<DeviceItemProps>(
  ({ device, isActive, isDefault, isLoading, onSelect, deviceTypeLabel }) => {
    const handleClick = useCallback(() => {
      if (!isLoading) {
        onSelect(device.deviceId);
      }
    }, [device.deviceId, isLoading, onSelect]);

    const deviceLabel =
      device.label || `${deviceTypeLabel} ${device.deviceId.slice(0, 8)}`;

    return (
      <div
        className={cn(
          "p-3 rounded-lg border transition-colors",
          isActive
            ? "border-primary bg-primary/10"
            : "border-gray-700 hover:border-gray-600 hover:bg-gray-800/50",
          isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        )}
        onClick={handleClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="font-medium">{deviceLabel}</p>
            {isDefault && <p className="text-xs text-muted">System Default</p>}
          </div>
          {isActive && <Check className="w-5 h-5 text-primary" />}
        </div>
      </div>
    );
  }
);

DeviceItem.displayName = "DeviceItem";

const DeviceSection = memo<DeviceSectionProps>(
  ({ title, icon: Icon, deviceKind, deviceTypeLabel, onError }) => {
    const [isLoading, setIsLoading] = useState(false);

    const devices = useMediaDeviceSelect({
      kind: deviceKind,
      onError,
    });

    const handleDeviceChange = useCallback(
      async (deviceId: string) => {
        try {
          setIsLoading(true);
          await devices.setActiveMediaDevice(deviceId);
        } catch (error) {
          console.error(`Failed to change ${deviceKind} device:`, error);
        } finally {
          setIsLoading(false);
        }
      },
      [devices.setActiveMediaDevice, deviceKind]
    );

    const deviceItems = useMemo(
      () =>
        devices.devices.map((device) => ({
          device,
          isActive: isActiveDevice(
            devices.devices,
            device.deviceId,
            devices.activeDeviceId
          ),
          isDefault: isDefaultDevice(devices.devices, device.deviceId),
        })),
      [devices.devices, devices.activeDeviceId]
    );

    return (
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Icon className="w-5 h-5" />
          {title}
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        </h3>
        <div className="space-y-2">
          {deviceItems.map(({ device, isActive, isDefault }) => (
            <DeviceItem
              key={device.deviceId}
              device={device}
              isActive={isActive}
              isDefault={isDefault}
              isLoading={isLoading}
              onSelect={handleDeviceChange}
              deviceTypeLabel={deviceTypeLabel}
            />
          ))}
        </div>
      </div>
    );
  }
);

DeviceSection.displayName = "DeviceSection";

function AudioVideo() {
  const room = useRoomContext();

  const handleError = useCallback(
    (e: Error) => {
      room?.emit(RoomEvent.MediaDevicesError, e);
    },
    [room]
  );

  return (
    <div className="space-y-6 w-full">
      <DeviceSection
        title="Microphone"
        icon={Mic}
        deviceKind="audioinput"
        deviceTypeLabel="Microphone"
        onError={handleError}
      />

      <DeviceSection
        title="Camera"
        icon={Camera}
        deviceKind="videoinput"
        deviceTypeLabel="Camera"
        onError={handleError}
      />
    </div>
  );
}

export default AudioVideo;
