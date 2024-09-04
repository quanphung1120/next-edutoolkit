import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MailIcon } from "lucide-react";

function MailBox() {
  return (
    <Popover>
      <PopoverTrigger>
        <MailIcon
          className="h-max w-max rounded-full border p-2 text-foreground/60"
          size={15}
          strokeWidth={2}
        />
      </PopoverTrigger>
      <PopoverContent className="mr-5">
        No mail or notification yet!
      </PopoverContent>
    </Popover>
  );
}

export default MailBox;
