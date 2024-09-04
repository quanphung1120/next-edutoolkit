"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { motion } from "framer-motion";

interface ExpertiseQuestioningBoxProps {
  isAnswered: boolean;
  category: string;
  question: string;
}

export default function ExpertiseQuestioningBox({
  category,
  question,
  isAnswered,
}: ExpertiseQuestioningBoxProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="m-1 h-min w-min"
    >
      <Card className="w-[350px] cursor-pointer">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">{category}</CardTitle>
          <CardDescription
            className={isAnswered ? "text-blue-900" : "text-orange-900"}
          >
            {isAnswered ? "Have answers" : "Did not has any answer"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="h-[70px] overflow-hidden text-sm text-muted-foreground">
            {question}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
