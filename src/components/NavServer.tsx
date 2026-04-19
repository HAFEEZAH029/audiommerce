import { getCurrentUser } from "@/lib/getUser";
import Navigation from "./Navigation";

export default async function NavbarServer() {
  const user = await getCurrentUser();

  return <Navigation user={user} />;
}