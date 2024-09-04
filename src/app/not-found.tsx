import ErrorPage from "@/components/shared/ErrorPage";

export default function NotFound() {
  return <ErrorPage errorCode="404" message="Page not found!" />;
}
