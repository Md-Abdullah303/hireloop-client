import Link from "next/link";

const NotFound = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#0F172A] via-[#111827] to-black px-6">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* 404 */}
        <h1 className="bg-gradient-to-r from-white via-primary to-violet-400 bg-clip-text text-8xl font-extrabold text-transparent md:text-[10rem]">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
          {`The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track and continue your job search journey.`}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-primary px-8 py-3 font-medium text-white transition-all duration-300 hover:scale-105"
          >
            Back To Home
          </Link>

          <Link
            href="/jobs"
            className="rounded-xl border border-white/10 bg-white/5 px-8 py-3 font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10"
          >
            Browse Jobs
          </Link>
        </div>

        {/* Small Text */}
        <p className="mt-8 text-sm text-zinc-500">
          Need help? Contact our support team anytime.
        </p>
      </div>
    </section>
  );
};

export default NotFound;
