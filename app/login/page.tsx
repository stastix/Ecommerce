import type { Metadata } from "next";
import AuthForm from "@/components/auth/auth-form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Login or create an account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        <Suspense>
          <AuthForm />
        </Suspense>
      </div>
    </div>
  );
}
