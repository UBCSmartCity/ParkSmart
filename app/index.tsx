import { useRootNavigationState, Redirect } from "expo-router";

export default function App() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  return <Redirect href={"/home"} />;
}
