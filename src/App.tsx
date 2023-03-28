import { AuthProvider } from "./contexts/auth";
import { RoutesApp } from "./Routes/Routes";

export function App() {
  return (
    <AuthProvider>
      <RoutesApp />
    </AuthProvider>
  );
}
