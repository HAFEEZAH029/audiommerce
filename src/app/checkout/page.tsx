import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/getUser";
import CheckoutClient from "@/components/Checkout/CheckoutClient";

export default async function CheckoutPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth?mode=login");
  }

  return <CheckoutClient user={user} />;
}
