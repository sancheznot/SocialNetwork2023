"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const WrapperMotion = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div
      key="modal"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ ease: "easeIn", duration: 0.35 }}
        className="w-full h-full">
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
