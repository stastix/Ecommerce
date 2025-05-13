"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft } from "lucide-react";
import { Suspense } from "react";

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6 text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
            <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>

          <h1 className="text-2xl font-bold">Check your email</h1>

          <p className="text-gray-600 dark:text-gray-300">
            We&apos;ve sent a verification link to <strong>your email</strong>.
            Please check your inbox and click the link to complete the signup
            process.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md text-sm text-blue-700 dark:text-blue-300">
            <p>
              If you don&apos;t see the email, check your spam folder or try
              again in a few minutes.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <Button asChild variant="outline" className="w-full">
              <Link href="/login" className="flex items-center justify-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
