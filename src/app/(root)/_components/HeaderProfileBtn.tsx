"use client";

import { SignedOut, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";

const HeaderProfileBtn = () => {
  return (
    <>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            labelIcon={<User className="size-4" />}
            href="/profile"
          />
        </UserButton.MenuItems>
      </UserButton>
      <SignedOut>Login</SignedOut>
    </>
  );
};

export default HeaderProfileBtn;
