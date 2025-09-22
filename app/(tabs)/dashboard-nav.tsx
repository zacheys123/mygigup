import { useEffect } from "react";
import { Redirect } from "expo-router";

export default function DummyTab() {
  return <Redirect href="/(dashboard)/home" />;
}
