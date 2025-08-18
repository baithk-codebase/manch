import { ParticipantAttribute } from "@/types/livekit/particpantAtrribute";
import {
  useLocalParticipant,
  useParticipantAttribute
} from "@livekit/components-react/hooks";
import { useState } from "react";

function useToggleHandRaise() {
  const localParticipant = useLocalParticipant();
  const isHandRaised = useParticipantAttribute(ParticipantAttribute.IS_HAND_RAISED, {
    participant: localParticipant.localParticipant,
  });
  const [loading, setLoading] = useState(false);

  const ToggleHandRaised = async () => {
    setLoading(true);
    try {
      const date = new Date().toISOString();
      if (!isHandRaised) {
        await localParticipant.localParticipant.setAttributes({
          [ParticipantAttribute.IS_HAND_RAISED]: date,
        });
      } else {
        await localParticipant.localParticipant.setAttributes({
          [ParticipantAttribute.IS_HAND_RAISED]: "",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { ToggleHandRaised, isHandRaised: !!isHandRaised, loading };
}

export default useToggleHandRaise;
