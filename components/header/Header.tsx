"use client";

import { UserAuth } from "@/provider/AuthProvider";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const { logOutHandler, user } = UserAuth();
  const [isLogin, setIsLogin] = useState<Boolean>(false);

  useEffect(() => {
    setIsLogin(user !== null);
  }, [user]);

  const handleLogout = async () => {
    try {
      await logOutHandler();
    } catch (error) {}
  };

  return (
    <>
      <header className="ease-in">
        <div className="container">
          <nav className="py-4 flex items-center justify-between">

            <ul className="flex items-center justify-start gap-4">
              <li>
                <Link href="/" className="hover:text-violet-500">
                  Home
                </Link>
              </li>
              {isLogin ? (
                <>
                  <li>
                    <Link href="/dashboard" className="hover:text-violet-500">
                      dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/settings"
                      className="hover:text-violet-500"
                    >
                      setting
                    </Link>
                  </li>
                </>
              ) : null}
            </ul>

            <ul className="flex items-center justify-start gap-4">
              {isLogin ? (
                <li
                  onClick={handleLogout}
                  className="hover:text-violet-500 cursor-pointer"
                >
                  logout
                </li>
              ) : (
                <>
                  <li>
                    <Link href="/login" className="hover:text-violet-500">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/signup" className="hover:text-violet-500">
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <hr />
    </>
  );
};

export default Header;
