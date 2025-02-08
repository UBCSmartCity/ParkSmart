import { useRootNavigationState, Redirect } from "expo-router";
import { AuthProvider, useAuth } from "./authContext";

function AppContent() {
  const rootNavigationState = useRootNavigationState();
  // get authentication state 
  const { isAuthenticated } = useAuth(); 

  if (!rootNavigationState?.key) return null;

  // Conditional redirect based on successful login/auth state
  return <Redirect href={isAuthenticated ? "/map" : "/register"} />;

}

export default function App() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  return (
    <AuthProvider>
    <AppContent />;
    </AuthProvider>
  )
}
