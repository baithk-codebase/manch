"use client";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return <SignInButton fallbackRedirectUrl="/auth" />;
  }
  return (
    <div>
      <SignOutButton redirectUrl="/auth" />
      <div>
        Signed in as {user?.firstName}: {user.emailAddresses[0].emailAddress}
      </div>
    </div>
  );
}
