import Link from "next/link";

export default function AppointmentSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-light dark:bg-primary-dark">
      {/* Success Message Container */}
      <div className="bg-accent-light dark:bg-accent-dark p-8 rounded-lg shadow-lg text-center max-w-[600px] w-full">
        <h1 className="text-3xl font-bold text-primary-dark dark:text-primary-light mb-6">
          Appointment Booked Successfully!
        </h1>
        <p className="text-lg text-primary-dark/80 dark:text-primary-light/80 mb-6">
          Your appointment has been successfully scheduled.
        </p>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-block bg-yellow_bright text-dark hover:bg-yellow_bright/50 dark:text-dark font-semibold py-3 px-6 rounded-md transition duration-300 ease-in-out"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
