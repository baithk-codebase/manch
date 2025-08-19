import SettingsModal from "@/components/livekit/header/settings/Settings";
import ConnectionStatusBadge from "@/components/livekit/Indicators/ConnectionStatusBadge";
import MobileDropdown from "@/components/livekit/header/MobileDropdown";
import { ChevronLeft, Ellipsis, Settings, Share } from "lucide-react";
import { useState } from "react";

const BaithkLogo = ({ className }: { className?: string }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className={className}
        data-src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQyLjI3MjEgMEg1LjcyNzkyQzIuNTU4NDcgMCAwIDIuNTU4NDcgMCA1LjcyNzkyVjQyLjI3MjFDMCA0NS40NDE1IDIuNTU4NDcgNDggNS43Mjc5MiA0OEg0Mi4yNzIxQzQ1LjQ0MTUgNDggNDggNDUuNDQxNSA0OCA0Mi4yNzIxVjUuNzI3OTJDNDggMi41NTg0NyA0NS40NDE1IDAgNDIuMjcyMSAwWk0zNi4yNzY5IDI0LjQyQzM1Ljg5NSAyNS41Mjc0IDM1LjI0NTggMjcuMTY5NSAzNC4yOTEyIDI4LjcxNkMzMy4yNzkyIDMwLjM3NzEgMzIuMTUyNyAzMS41MjI3IDMwLjk2OSAzMi4wOTU1QzMwLjM1OCAzMi40MDEgMjkuNzI3OSAzMi41NTM3IDI5LjA5NzkgMzIuNTUzN0MyOC44NDk2IDMyLjU1MzcgMjguNjAxNCAzMi41MzQ2IDI4LjM3MjMgMzIuNDc3M0MyNy40OTQgMzIuMzA1NSAyNi42NTM5IDMxLjg2NjMgMjUuODkwMiAzMS4xMjE3QzI0LjU1MzcgMjkuODIzNCAyMy40MDgxIDI3LjYyNzcgMjIuMzU4IDI0LjM4MTlDMjEuMzA3OSAyMS4xMTY5IDIwLjM1MzIgMTkuNzQyMiAxOS43NDIyIDE5LjE1MDRDMTkuNDM2OCAxOC44NjQgMTkuMjQ1OCAxOC43ODc2IDE5LjE1MDQgMTguNzY4NUMxOS4wOTMxIDE4Ljc2ODUgMTguOTk3NiAxOC43Njg1IDE4LjgwNjcgMTguODQ0OUMxOC4yNzIxIDE5LjA5MzEgMTcuNjAzOCAxOS44MTg2IDE2Ljk1NDcgMjAuODQ5NkMxNi4zMjQ2IDIxLjg0MjUgMTUuNzEzNiAyMy4xMDI2IDE1LjIzNjMgMjQuNDM5MUMxNC44OTI2IDI1LjM5MzggMTMuODQyNSAyNS44OTAyIDEyLjg2ODcgMjUuNTQ2NUMxMi4zOTE0IDI1LjM3NDcgMTIuMDA5NSAyNS4wNTAxIDExLjc5OTUgMjQuNTkxOUMxMS41ODk1IDI0LjE1MjcgMTEuNTcwNCAyMy42NTYzIDExLjcyMzIgMjMuMTk4MUMxMi4xMjQxIDIyLjA5MDcgMTIuODExNSAyMC40NDg3IDEzLjc4NTIgMTguOTAyMUMxNC44MzUzIDE3LjI0MTEgMTUuOTgwOSAxNi4xMTQ2IDE3LjE4MzggMTUuNTQxOEMxOC4wNDMgMTUuMTQwOCAxOC45MjEyIDE1LjAwNzIgMTkuNzk5NSAxNS4xNTk5QzIwLjY5NjkgMTUuMzEyNiAyMS41MzcgMTUuNzcwOSAyMi4zMDA3IDE2LjQ5NjRDMjMuNjU2MyAxNy43OTQ4IDI0LjgyMSAyMC4wMDk1IDI1Ljg3MTEgMjMuMjU1NEMyNi45MjEyIDI2LjUyMDMgMjcuODU2OCAyNy45MTQxIDI4LjQ2NzggMjguNDg2OUMyOC43NzMzIDI4Ljc5MjQgMjguOTY0MiAyOC44NDk2IDI5LjAyMTUgMjguODQ5NkMyOS4wNTk3IDI4Ljg0OTYgMjkuMTM2IDI4Ljg2ODcgMjkuMzA3OSAyOC43NzMzQzI5LjgyMzQgMjguNTI1MSAzMC40NzI2IDI3Ljc5OTUgMzEuMDgzNSAyNi43ODc2QzMxLjY5NDUgMjUuNzk0OCAzMi4yNjczIDI0LjUxNTUgMzIuNzI1NSAyMy4xOTgxQzMzLjA1MDEgMjIuMjQzNCAzNC4xMDAyIDIxLjcyNzkgMzUuMDc0IDIyLjA1MjVDMzUuNTUxMyAyMi4yMDUzIDM1LjkzMzIgMjIuNTQ4OSAzNi4xNjIzIDIyLjk4ODFDMzYuMzcyMyAyMy40MjcyIDM2LjQxMDUgMjMuOTIzNiAzNi4yNTc4IDI0LjM4MTlMMzYuMjc2OSAyNC40MloiIGZpbGw9IiNGQUZBRkEiLz4KPC9zdmc+Cg=="
      >
        <path
          d="M42.2721 0H5.72792C2.55847 0 0 2.55847 0 5.72792V42.2721C0 45.4415 2.55847 48 5.72792 48H42.2721C45.4415 48 48 45.4415 48 42.2721V5.72792C48 2.55847 45.4415 0 42.2721 0ZM36.2769 24.42C35.895 25.5274 35.2458 27.1695 34.2912 28.716C33.2792 30.3771 32.1527 31.5227 30.969 32.0955C30.358 32.401 29.7279 32.5537 29.0979 32.5537C28.8496 32.5537 28.6014 32.5346 28.3723 32.4773C27.494 32.3055 26.6539 31.8663 25.8902 31.1217C24.5537 29.8234 23.4081 27.6277 22.358 24.3819C21.3079 21.1169 20.3532 19.7422 19.7422 19.1504C19.4368 18.864 19.2458 18.7876 19.1504 18.7685C19.0931 18.7685 18.9976 18.7685 18.8067 18.8449C18.2721 19.0931 17.6038 19.8186 16.9547 20.8496C16.3246 21.8425 15.7136 23.1026 15.2363 24.4391C14.8926 25.3938 13.8425 25.8902 12.8687 25.5465C12.3914 25.3747 12.0095 25.0501 11.7995 24.5919C11.5895 24.1527 11.5704 23.6563 11.7232 23.1981C12.1241 22.0907 12.8115 20.4487 13.7852 18.9021C14.8353 17.2411 15.9809 16.1146 17.1838 15.5418C18.043 15.1408 18.9212 15.0072 19.7995 15.1599C20.6969 15.3126 21.537 15.7709 22.3007 16.4964C23.6563 17.7948 24.821 20.0095 25.8711 23.2554C26.9212 26.5203 27.8568 27.9141 28.4678 28.4869C28.7733 28.7924 28.9642 28.8496 29.0215 28.8496C29.0597 28.8496 29.136 28.8687 29.3079 28.7733C29.8234 28.5251 30.4726 27.7995 31.0835 26.7876C31.6945 25.7948 32.2673 24.5155 32.7255 23.1981C33.0501 22.2434 34.1002 21.7279 35.074 22.0525C35.5513 22.2053 35.9332 22.5489 36.1623 22.9881C36.3723 23.4272 36.4105 23.9236 36.2578 24.3819L36.2769 24.42Z"
          fill="#FAFAFA"
        ></path>
      </svg>
    );
  };

function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const handleShareInvite = () => {
    // Dummy function for share/invite
    alert("Share & Invite functionality coming soon!");
  };

  return (
    <div className="grid grid-cols-[1fr_1fr]">
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      
      <div className="flex items-center gap-3 justify-start">
        <button className="p-2 aspect-square">
          <ChevronLeft className="aspect-square h-full p-0.5" />
        </button>
        <BaithkLogo className="w-5 h-5" />
        <h1 className="text-lg font-mono font-bold md:block hidden">BAITHK</h1>
        <div className="h-5  border-l-[1px] opacity-50"></div>
        <span className="text-sm font-mono font-bold text-gray-500 truncate-text">
          Tushar&apos;s Baithak
        </span>
        <div className="h-5 border-l-[1px] opacity-50 hidden md:block"></div>
        <ConnectionStatusBadge />
      </div>
      
      <div className="flex items-center justify-end gap-2 flex-1 relative">
        <button 
          onClick={() => setIsSettingsOpen(true)} 
          className="semi-primary h-10 !aspect-square md:block hidden"
        >
          <Settings className="aspect-square h-full p-0.5" />
        </button>
        <button 
          onClick={handleShareInvite}
          className="semi-primary items-center gap-2 md:flex hidden"
        >
          <Share className="aspect-square h-full p-0.5" />
          Invite
        </button>
        
        <div className="relative md:hidden">
          <button 
            onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
            className="semi-primary flex items-center gap-2"
          >
            <Ellipsis className="aspect-square h-full p-0.5" />
          </button>
          
          <MobileDropdown
            isOpen={isMobileDropdownOpen}
            onClose={() => setIsMobileDropdownOpen(false)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onShareInvite={handleShareInvite}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
