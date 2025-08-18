"use client";

import Modal, { ModalBody } from "@/components/ui/Modal";
import { useRoomContext } from "@livekit/components-react";
import { AlertTriangle, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function ExitButton() {
  const room = useRoomContext();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleExitClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmExit = async () => {
    setIsExiting(true);
    try {
      await room.disconnect();
      router.push("/dashboard");
    } catch (error) {
      console.error("Error exiting room:", error);
      setIsExiting(false);
    }
  };

  const handleCancelExit = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="semi-primary-danger"
        onClick={handleExitClick}
        title="Leave Room"
      >
        <LogOut className="aspect-square h-full p-0.5" />
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancelExit}
        title="Leave Room"
        icon={
          <LogOut className="w-5 h-5" style={{ color: "var(--primary)" }} />
        }
        size="md"
      >
        <ModalBody>
          {/* Content */}
          <div className="space-y-4 mb-6">
            <p className="text-base">
              Are you sure you want to leave this room?
            </p>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-200 mb-1">
                    Before you leave:
                  </p>
                  <ul className="text-amber-300 space-y-1">
                    <li>
                      You will have to stay on baithk.in so that recordings get
                      uploaded to the cloud storage.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              onClick={handleCancelExit}
              className="semi-primary !px-4 !py-2"
              disabled={isExiting}
            >
              Stay in Room
            </button>
            <button
              onClick={handleConfirmExit}
              className="semi-primary-danger !px-4 !py-2 flex items-center space-x-2"
              disabled={isExiting}
            >
              {isExiting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Leaving...</span>
                </>
              ) : (
                <>
                  <LogOut className="w-4 h-4" />
                  <span>Leave Room</span>
                </>
              )}
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ExitButton;
