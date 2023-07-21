"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/services/auth.services";
import MainLoader from "@/components/Loader/Loader";

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const { user } = await getUser();

      if (user) {
        push("/");
        return;
      }

      // if the error did not happen, if everything is alright
      setIsSuccess(true);
    })();
  }, [push]);

  if (!isSuccess) {
    return (
      <>
        <MainLoader />
      </>
    );
  }

  return (
    <>
      {children}
    </>
  );
}
