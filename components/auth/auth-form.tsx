"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LoginForm from "../auth/login-form";
import SignUpForm from "./signup-form";
import ForgotPasswordForm from "./forgot-password-form";
import AuthFormToggle from "./auth-form-toggle";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type AuthMode = "login" | "signup" | "forgot-password";

export const dynamic = "force-dynamic";

export default function AuthForm() {
  const supabase = createClientComponentClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const returnUrl = searchParams.get("returnUrl");

  const [mode, setMode] = useState<AuthMode>("login");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAuthMode() {
      const urlMode = searchParams.get("mode");
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push(returnUrl || "/");
        return;
      }
      if (urlMode === "signup" || urlMode === "forgot-password") {
        setMode(urlMode);
      } else {
        setMode("login");
      }
    }
    fetchAuthMode();
  }, [returnUrl, router, searchParams, supabase.auth]);

  const handleModeChange = (newMode: AuthMode) => {
    setError(null);
    if (newMode === "login") {
      router.push("/login");
    } else {
      router.push(`/login?mode=${newMode}`);
    }
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          {mode === "login"
            ? "Welcome Back"
            : mode === "signup"
            ? "Create Account"
            : "Reset Password"}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          {mode === "login"
            ? "Sign in to your account"
            : mode === "signup"
            ? "Sign up to get started"
            : "Enter your email to reset your password"}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {mode === "login" && <LoginForm onError={setError} />}
      {mode === "signup" && <SignUpForm onError={setError} />}
      {mode === "forgot-password" && (
        <ForgotPasswordForm
          onError={setError}
          onSuccess={() => handleModeChange("login")}
        />
      )}

      <AuthFormToggle mode={mode} onChange={handleModeChange} />
    </>
  );
}
