import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>404 - Product Not Found</h1>
      <p>Could not find the requested product.</p>
      <Link href="/earphones">
        Return to Earphones
      </Link>
    </div>
  );
}