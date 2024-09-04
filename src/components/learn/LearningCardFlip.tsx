"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { motion } from "framer-motion";

interface CardFlipProps {
  question: string;
  answer: string;
}

export default function CardFlip({ question, answer }: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleFlip() {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  }

  return (
    <div className="flip-card h-full w-full p-2" onClick={handleFlip}>
      <motion.div
        className="flip-card-inner h-[100%] w-[100%]"
        initial={false}
        animate={{ rotateX: isFlipped ? 180 : 360 }}
        transition={{ duration: 0.2, animationDirection: "normal" }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        <Card className="flip-card-front h-full w-full">
          <CardContent className="relative flex h-full items-center justify-center p-6">
            <span className="whitespace-pre-line text-xl">{question}</span>
          </CardContent>
        </Card>

        <Card className="flip-card-back h-full w-full">
          <CardContent className="relative flex h-full items-center justify-center p-6">
            <span className="whitespace-pre-line text-xl">{answer}</span>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
