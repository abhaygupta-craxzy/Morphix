export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Bypass the root layout's flex wrapper so the login page gets true 100vh
  return <>{children}</>;
}
