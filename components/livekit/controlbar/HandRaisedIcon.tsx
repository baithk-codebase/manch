import useToggleHandRaise from "@/hooks/participants/useToggleHandRaise";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { HandIcon } from "lucide-react";
import { memo } from "react";

export const AnimatedHandIcon = ({
  className,
  loop = Infinity,
}: {
  className: string;
  loop: number;
}) => {
  return (
    <motion.div
      className={cn("p-1.5 rounded-full text-white", className)}
      initial={{
        scale: 0,
        rotate: -45,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        rotate: 0,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        rotate: 45,
        opacity: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3,
      }}
    >
      <motion.div
        animate={{
          rotate: [0, -10, 10, -5, 5, 0],
          y: [0, -2, 2, -1, 1, 0],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: loop,
        }}
      >
        <HandIcon className="w-5 h-5 text-white" />
      </motion.div>
    </motion.div>
  );
};

const HandIconMemo = memo(({ className }: { className: string }) => {
  return <HandIcon className={className} />;
});

function HandRaisedIcon() {
  const { ToggleHandRaised, isHandRaised, loading } = useToggleHandRaise();

  return (
    <button
      className="semi-primary relative overflow-hidden"
      onClick={ToggleHandRaised}
      disabled={loading}
    >
      <AnimatePresence>
        {isHandRaised && (
          <motion.div
            className="absolute inset-0 bg-yellow-600 rounded-lg"
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              duration: 0.4,
            }}
          />
        )}
      </AnimatePresence>

      {/* Icon with relative positioning to stay on top */}
      <div className="relative z-10">
        {isHandRaised ? (
          <AnimatedHandIcon className="aspect-square h-full p-0.5" loop={0} />
        ) : (
          <HandIconMemo className="aspect-square h-full p-0.5" />
        )}
      </div>
    </button>
  );
}

export default HandRaisedIcon;
