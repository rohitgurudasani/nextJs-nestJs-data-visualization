"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUserAuth } from "./AuthProvider";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useUserAuth();

  const router = useRouter();

  useEffect(() => {
    if (!auth?.user?.token) {
      router.replace("/login");
    }
  }, [auth?.user]);

  return <div>{children}</div>;
}
