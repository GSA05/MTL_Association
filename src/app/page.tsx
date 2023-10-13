import CurrentC from "../components/CurrentC";
import Members from "../components/Members";
import DelegateTree from "../components/DelegateTree";
import NewC from "../components/NewC";
import Changes from "../components/Changes";

export default function Home() {
  return (
    <main>
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
