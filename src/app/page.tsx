import CurrentC from "../components/CurrentC";
import Members from "../components/Members";
import DelegateTree from "../components/DelegateTree";
import NewC from "../components/NewC";
import Changes from "../components/Changes";
import Refresh from "@/components/Refresh";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  router.replace("https://voleum-org.github.io/MTL_Association");
  return (
    <main>
      <Refresh />
      <Members />
      <hr />
      <CurrentC />
      <hr />
      <DelegateTree />
      <hr />
      <NewC />
      <hr />
      <Changes />
    </main>
  );
}
