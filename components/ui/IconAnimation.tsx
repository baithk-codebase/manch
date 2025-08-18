import { motion } from "framer-motion";

function IcondAnimation({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}

export default IcondAnimation;
