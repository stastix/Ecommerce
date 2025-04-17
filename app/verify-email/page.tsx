export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6 text-center">
        <h1 className="text-2xl font-bold">Check your email</h1>
        <p className="text-gray-600 dark:text-gray-300">
          We&apos;ve sent you an email with a link to verify your account.
          Please check your inbox and click the link to complete the signup
          process.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          If you don&apos;t see the email, check your spam folder or{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            try again
          </a>
          .
        </p>
      </div>
    </div>
  );
}
