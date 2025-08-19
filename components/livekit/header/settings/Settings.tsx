import Modal, { ModalBody } from "@/components/ui/Modal";
import { NavigationProvider } from "@/contexts/naviagtion";
import { SettingsIcon } from "lucide-react";
import Navigation from "./Navigation";
import SettingsContent from "./SettingsContent";

function Settings({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Settings"
      icon={
        <SettingsIcon className="w-5 h-5" style={{ color: "var(--primary)" }} />
      }
      size="2xl"
      className="mx-2 sm:mx-4 max-h-[90vh] overflow-hidden"
    >
      <ModalBody>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 min-h-[300px] lg:min-h-[400px] max-h-[60vh] lg:max-h-[70vh]">
          <NavigationProvider>
            <Navigation />
            <div className="flex-1 overflow-y-auto">
              <SettingsContent />
            </div>
          </NavigationProvider>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default Settings;
