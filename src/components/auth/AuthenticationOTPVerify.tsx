"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useEffect, useState, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { toast } from "@/components/ui/use-toast";
import { Loader2Icon } from "lucide-react";
import { verifyUserOTP } from "@/server-actions/auth-actions";

interface VerifyOTPProps {
  email: string;
}

export default function VerifyOTP({ email }: VerifyOTPProps) {
  const [token, setToken] = useState("");
  const bindedVerifyUserOTP = verifyUserOTP.bind(null, email);
  const [state, actionState] = useActionState(bindedVerifyUserOTP, {
    message: "",
    completed: false,
  });

  useEffect(() => {
    if (state && state.message) {
      toast({
        title: state.completed ? "Success" : "Error",
        description: state.message,
      });
    }
  }, [state]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <form
          className="flex flex-col items-center justify-start gap-6 align-middle"
          action={actionState}
        >
          <div className="flex flex-col items-center justify-start gap-2 align-middle">
            <h1 className="font-semibold">Verify to continue</h1>
            <h2 className="w-[300px] text-center text-foreground/60">
              Please check your mailbox to get the 6-digits code to verify your
              request!
            </h2>
          </div>

          <InputOTP
            id="token"
            name="token"
            value={token}
            onChange={(value) => setToken(value)}
            pattern={REGEXP_ONLY_DIGITS}
            maxLength={6}
            className="w-full"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <SubmitButton captchaToken={token} />
        </form>
      </div>
    </div>
  );
}

interface SubmitButtonProps {
  captchaToken: string;
}

export function SubmitButton({ captchaToken }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="flex w-full items-center justify-center align-middle"
      disabled={captchaToken.length == 0 || pending}
    >
      Click to verify
      <Loader2Icon className={pending ? "ml-3 animate-spin" : "hidden"} />
    </Button>
  );
}
