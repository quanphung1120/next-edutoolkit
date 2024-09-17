"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface CollectionBoxProps {
  id: string;
  name: string;
  cardsAmount: number;
  description: string | null;
  authorName: string | null;
  profilePicture: string | undefined;
}

export default function CollectionBox({
  id,
  name,
  cardsAmount,
  description,
  authorName,
  profilePicture,
}: CollectionBoxProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="m-1 h-min w-min"
    >
      <Link href={"/learn/" + id} className="h-max w-max">
        <Card className="w-[90vw] cursor-pointer overflow-hidden md:w-[480px]">
          <CardHeader>
            <CardTitle className="text-sm">{name}</CardTitle>
            <CardDescription>
              {description ? description : "Do not has description"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Badge>{cardsAmount} Cards</Badge>
          </CardContent>

          <CardFooter>
            <div className="flex items-center justify-start gap-3 align-middle text-sm font-semibold">
              <Avatar className="h-6 w-6">
                <AvatarImage src={profilePicture} alt={"@" + authorName} />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              {authorName ? authorName : "Anonymous User"}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
