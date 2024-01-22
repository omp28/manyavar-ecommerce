import { useRouter } from "next/router";

export default function post() {
  const router = useRouter();
  return <p>the slug is {router.query}</p>;
}
