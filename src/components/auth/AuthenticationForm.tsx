"use client";

import { Input } from "@/components/ui/input";
import { Turnstile } from "@marsidev/react-turnstile";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { signInWithEmail } from "@/server-actions/auth-actions";
import VerifyOTP from "./AuthenticationOTPVerify";

export default function AuthenticationForm() {
  const [email, setEmail] = useState<string>("");
  const [successEmailSent, setSuccessEmailSent] = useState<boolean>(false);

  const { toast } = useToast();

  const [captchaToken, setCaptchaToken] = useState<string>("");
  const bindedSignInWithEmail = signInWithEmail.bind(null, captchaToken);
  const [turnstileFailed, setTurnstileFailed] = useState<boolean>(false);

  const [state, formAction] = useActionState(bindedSignInWithEmail, {
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

    if (state.completed) {
      setSuccessEmailSent(true);
      return;
    }

    //Reset email if not success
    setEmail("");
  }, [state, toast]);

  if (successEmailSent) {
    return <VerifyOTP email={email} />;
  }

  return (
    <div className="mt-3 flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 align-middle sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[380px] space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h1>
          <p className="mt-2 text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>

        <form className="flex w-full flex-col gap-4" action={formAction}>
          <div>
            <Input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>
          <SubmitButton captchaToken={captchaToken} />
        </form>
        <div className="pt-4">
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_ID!}
            className="mx-auto"
            onSuccess={(token) => {
              setCaptchaToken(token);
              setTurnstileFailed(false); // If it was fail before, reset it
            }}
            onError={() => {
              setTurnstileFailed(true);
            }}
          />
        </div>
        {turnstileFailed && (
          <div className="pt-3 text-center text-sm text-red-500">
            Verify failed, if this situation keep continue, please close the
            browser to try again.
          </div>
        )}
      </div>
    </div>
  );
}

interface SubmitButtonProps {
  captchaToken: string;
}

function SubmitButton({ captchaToken }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="flex w-full items-center justify-center align-middle"
      disabled={pending || !captchaToken || captchaToken == ""}
    >
      <div>Continue with Email</div>
      <Loader2Icon className={pending ? "ml-3 animate-spin" : "hidden"} />
    </Button>
  );
}
