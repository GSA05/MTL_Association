import { CurrentC } from "../components/CurrentC";
import { Members } from "../components/Members";
import { DelegateTree } from "../components/DelegateTree";
import { NewC } from "../components/NewC";

export default function Home() {
  return (
    <main>
      <Members />
      <hr />
      <DelegateTree />
      <hr />
      <NewC />
      <hr />
      <CurrentC />
    </main>
  );
}