"use server";

type FormState = {
  errors?: Record<string, string>;
  success?: boolean;
  enteredData?: Record<string, string>;
};

export async function submitCheckout(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const errors: Record<string, string> = {};

  const user = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    address: formData.get("address") as string,
    zip: formData.get("zip") as string,
    city: formData.get("city") as string,
    country: formData.get("country") as string,
    payment: formData.get("payment") as string,
    eNumber: formData.get("eNum") as string,
    ePin: formData.get("ePin") as string,
  };

  // VALIDATION


  if (!user.name || user.name.trim().length < 3) {
    errors.name = "Please enter a valid name";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!user.email || !emailRegex.test(user.email)) {
    errors.email = "Invalid email address";
  }

  const phoneRegex = /^[0-9+\-()\s]{7,}$/;
  if (!user.phone || !phoneRegex.test(user.phone)) {
    errors.phone = "Invalid phone number";
  }

  if (!user.address || user.address.trim().length < 7) errors.address = "Please enter a valid address";
  if (!user.zip) errors.zip = "ZIP code required";
  if (!user.city || user.city.trim().length < 3) errors.city = "Please enter a valid city";
  if (!user.country || user.country.trim().length < 4) errors.country = "Please enter a valid country";

  if (user.payment === "e-money" || user.payment === "cash") {
    if (!user.eNumber) errors.eNumber = "Enter e-Money number";
    if (!user.ePin) errors.ePin = "Enter PIN";
  }

  // RETURN ERRORS
  if (Object.keys(errors).length > 0) {
    return { errors, enteredData: user };
  }

  // SUCCESS (later: save order, clear cart, etc.)
  return { success: true };
}

