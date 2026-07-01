import type { Metadata } from "next";
import SignupPage from "@/components/signup/page";

export const metadata: Metadata = {
  title: "Sign Up — Morphix",
  description:
    "Create your free Morphix account and start building AI-powered websites in minutes.",
};

export default function Signup() {
  return <SignupPage />;
}
