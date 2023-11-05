import { AuthProvider } from "./AuthProvider";
import { SearchProvider } from "./SearchProvider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <AuthProvider>
      <SearchProvider>{children}</SearchProvider>
    </AuthProvider>
  );
}
