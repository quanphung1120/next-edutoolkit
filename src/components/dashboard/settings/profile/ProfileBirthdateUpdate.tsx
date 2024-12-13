"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import React, { FormEvent, useEffect, useState, useActionState } from "react";
import { format, isSameDay } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { useFormStatus } from "react-dom";
import { updateBirthdate } from "@/server-actions/profile-action";

interface BirthdateProps {
  birthdate: Date | undefined;
}

export default function Birthdate({ birthdate }: BirthdateProps) {
  const [date, setDate] = useState<Date | undefined>(birthdate || new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const bindedUpdateUserAction = updateBirthdate.bind(null, date);
  const [state, actionState] = useActionState(bindedUpdateUserAction, {
    message: "",
    updated: false,
  });

  useEffect(() => {
    if (state && state.message) {
      toast({
        title: state.updated ? "Success" : "Error",
        description: state.message,
      });
    }

    if (state.updated) birthdate = date;
  }, [state]);

  return (
    <form action={actionState}>
      <Card>
        <CardHeader>
          <CardTitle>Birthdate</CardTitle>
          <CardDescription>
            Your birthdate will not be displayed publicly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-4" align="start">
              <Calendar
                mode="single"
                captionLayout="dropdown-buttons"
                selected={date}
                onSelect={(e) => {
                  setDate(e);
                  setIsCalendarOpen(false);
                }}
                fromYear={1940}
                toYear={new Date().getFullYear() - 13} // 13 years old minimum
              />
            </PopoverContent>
          </Popover>
        </CardContent>
        <CardFooter className="border-t p-6">
          <SaveButton oldBirthdate={birthdate} newBirthdate={date} />
        </CardFooter>
      </Card>
    </form>
  );
}

interface SaveButtonProps {
  oldBirthdate: Date | undefined;
  newBirthdate: Date | undefined;
}

function SaveButton({ newBirthdate, oldBirthdate }: SaveButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="sm"
      disabled={
        pending ||
        (oldBirthdate && newBirthdate && isSameDay(newBirthdate, oldBirthdate))
      }
    >
      Save changes
    </Button>
  );
}
