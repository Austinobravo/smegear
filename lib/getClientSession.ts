"use client";

import { useEffect } from "react";
import { useUserStore } from "@/hooks/useUserStore";


type Props = {
  user: any;
};

export default function HydrateUser({ user }: Props) {
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
  
    setUser(user);
  }, [setUser, user]);

  return null;
}
