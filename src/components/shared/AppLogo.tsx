import Link from "next/link";

function AppLogo() {
  const className =
    "flex items-center justify-between w-fit font-bold text-2xl";
  return (
    <Link href="/" className={className}>
      EduToolkit
    </Link>
  );
}

export default AppLogo;
