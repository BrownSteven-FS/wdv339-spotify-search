import { AuthProvider } from "./AuthProvider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <AuthProvider>{children}</AuthProvider>;
}
