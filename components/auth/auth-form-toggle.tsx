"use client";

import Link from "next/link";

interface AuthFormToggleProps {
  mode: "login" | "signup" | "forgot-password";
  onChange: (mode: "login" | "signup" | "forgot-password") => void;
}

export default function AuthFormToggle({
  mode,
  onChange,
}: AuthFormToggleProps) {
  return (
    <>
      <div className="text-center text-sm">
        {mode === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => onChange("signup")}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Sign up
            </button>
          </>
        ) : mode === "signup" ? (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => onChange("login")}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Sign in
            </button>
          </>
        ) : (
          <>
            Remember your password?{" "}
            <button
              type="button"
              onClick={() => onChange("login")}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Sign in
            </button>
          </>
        )}
      </div>

      <div className="text-center text-xs text-gray-500 dark:text-gray-400">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>
        .
      </div>
    </>
  );
}
