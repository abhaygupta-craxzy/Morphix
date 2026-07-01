import type { Metadata } from "next";
import LoginPage from "@/components/login/page";

export const metadata: Metadata = {
  title: "Log In — Morphix",
  description:
    "Sign in to your Morphix workspace and continue building AI-powered websites.",
};

export default function Login() {
  return <LoginPage />;
}
