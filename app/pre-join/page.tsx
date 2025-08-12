"use client";

import { LiveKitRoom, PreJoin } from "@livekit/components-react";

function PreJoinPage() {
  return (
    <main data-lk-theme="default" style={{ height: '100%' }}>
      <PreJoin
        joinLabel="Join Room"
        camLabel="Camera:"
        micLabel="Microphone:"
        userLabel="Your Name:"
        defaults={{ videoEnabled: true, audioEnabled: true }}
        persistUserChoices={true}
        onError={(err) => console.error("Device error:", err)}
        onSubmit={(choices) => {
          console.log(choices);
        }}
      />
    </main>
  );
}

export default PreJoinPage;
