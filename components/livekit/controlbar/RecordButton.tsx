import IconAnimation from "@/components/ui/IconAnimation";
import { motion } from "framer-motion";
import { Circle, Square } from "lucide-react";
import { memo, useState } from "react";

function RecordButtonIcon() {
  return (
    <IconAnimation>
      <Circle className="w-4 h-4 fill-red-500" />
    </IconAnimation>
  );
}

function RecordButtonIconStop() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: 180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <Square className="w-4 h-4 fill-current" />
    </motion.div>
  );
}

const MemoRecordButtonIcon = memo(RecordButtonIcon);
const MemoRecordButtonIconStop = memo(RecordButtonIconStop);

function RecordButton() {
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordClick = () => {
    setIsRecording(!isRecording);
  };

  return (
    <motion.button
      onClick={handleRecordClick}
      className={`flex items-center justify-center md:aspect-auto aspect-square h-full gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        isRecording ? "semi-primary-danger" : "semi-primary"
      }`}
      title={isRecording ? "Stop Recording" : "Start Recording"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {isRecording ? <MemoRecordButtonIconStop /> : <MemoRecordButtonIcon />}
      <motion.span
        className="text-sm font-medium md:block hidden"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {isRecording ? <>&nbsp;Stop&nbsp;&nbsp;</> : "Record"}
      </motion.span>
    </motion.button>
  );
}

export default RecordButton;
