"use client";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";

export default function AuthPage() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn redirectUrl={"/dashboard"} />;
  }
}
