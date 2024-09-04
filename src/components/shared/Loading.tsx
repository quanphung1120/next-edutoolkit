import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-[85vh] w-full items-center justify-center align-middle">
      <Loader2Icon className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}
