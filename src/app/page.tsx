import CurrentC from "../components/CurrentC";
import Members from "../components/Members";
import DelegateTree from "../components/DelegateTree";
import NewC from "../components/NewC";
import Changes from "../components/Changes";
import Refresh from "@/components/Refresh";

export default function Home() {
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
