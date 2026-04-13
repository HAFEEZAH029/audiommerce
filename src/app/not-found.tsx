import Link from "next/link";

export default function NotFound() {
 const style = {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.5rem",
    height: "100vh",
    textAlign: "center",
  } as const

  return (
    <div style={style}>
      <h1 style={{fontSize: "2.5rem"}}>OOPS!, something went wrong</h1>
      <p style={{fontSize: "1.5rem"}}>Could not find the requested page.</p>
      <Link href="/" style={{cursor: "pointer", fontSize: "1.25rem", color: "#0070f3"}}>
        Return to homepage
      </Link>
    </div>
  );
}