import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Mail } from "lucide-react";
import { email } from "better-auth";
import { createSubscriptions } from "@/lib/actions/subscriptions";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail },
    metadata,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    // update the user table about the new plan
    const subsInfo = {
      email: customerEmail,
      planId: metadata.planId,
    };

    const res = await createSubscriptions(subsInfo);

    return (
      <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex items-center justify-center p-4">
        <section
          className="max-w-md w-full bg-[#111827] border border-slate-800 rounded-2xl p-8 text-center shadow-[0_0_50px_rgba(16,185,129,0.1)] relative overflow-hidden"
          id="success"
        >
          {/* Decorative Top Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full ring-8 ring-emerald-500/5 animate-pulse">
              <CheckCircle2 className="h-12 w-12" />
            </div>
          </div>

          {/* Typography */}
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3">
            Payment Successful!
          </h1>
          <p className="text-sm text-slate-400 mb-6 font-medium">
            Thank you for your purchase. Your account has been upgraded.
          </p>

          {/* Information Block */}
          <div className="bg-[#161D30] border border-slate-800/60 rounded-xl p-5 mb-8 text-left space-y-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              We appreciate your business! A confirmation email has been sent to{" "}
              <span className="text-emerald-400 font-semibold break-all">
                {customerEmail}
              </span>
              .
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-850 text-xs text-slate-400">
              <Mail className="h-4 w-4 text-slate-500 shrink-0" />
              <span>
                Need help? Contact us at{" "}
                <a
                  href="mailto:orders@example.com"
                  className="text-blue-400 hover:underline"
                >
                  orders@example.com
                </a>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="w-full inline-flex justify-center items-center gap-2 py-3 px-4 rounded-xl font-medium tracking-wide bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-colors"
            >
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/"
              className="w-full inline-block py-3 px-4 rounded-xl font-medium tracking-wide bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    );
  }
}
