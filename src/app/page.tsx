import { arrayToTree } from "performant-array-to-tree";
import { data } from "../fixture/dev";
import { IMember } from "@/interfaces";
import { CurrentC } from "../components/CurrentC";
import { Link } from "../components/Link";

const tree = arrayToTree(
  data?.members?.filter((member) => member.count > 0),
  {
    parentId: "delegateC",
    dataField: null,
  }
);

const renderTree = (member: IMember & { children?: IMember[] }) => {
  return (
    <>
      <li key={member.id}>
        <div style={{ display: "flex", gap: "16px" }}>
          {Link(member.id)} {sumCount(member)}
        </div>
      </li>
      {!!member.children?.length && (
        <ul key={`${member.id}_children`}>
          {member.children.map((nestedMember) => renderTree(nestedMember))}
        </ul>
      )}
    </>
  );
};

const sumCount = (member: IMember & { children?: IMember[] }): number => {
  return (
    member.count +
    +(member.children?.length ? member.children?.map(sumCount) : 0)
  );
};

const newC = tree
  .map((member) => ({
    ...(member as IMember),
    count: sumCount(member as IMember & { children?: IMember[] }),
  }))
  .sort((a, b) => b.count - a.count);

export default function Home() {
  return (
    <main>
      <section>
        <h1>Открывшие линии доверия к MTLAP</h1>
        <table cellSpacing="16px">
          <thead>
            <tr>
              <th>Аккаунт</th>
              <th>Количество токенов MTLAP</th>
              <th>Делегация в Собрании</th>
              <th>Делегация в Совете</th>
            </tr>
          </thead>
          <tbody>
            {data?.members?.map((member) => (
              <tr key={member.id}>
                <td>{Link(member.id)}</td>
                <td>{member.count}</td>
                <td>{Link(member.delegateA)}</td>
                <td>{Link(member.delegateC)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <hr />
      <section>
        <h1>Проверка делегаций для Совета:</h1>
        <ul key="tree">
          {tree?.map((member) =>
            renderTree(member as IMember & { children?: IMember[] })
          )}
        </ul>
      </section>
      <hr />
      <section>
        <h1>Ожидаемый состав Совета</h1>
        <table cellSpacing="16px">
          <thead>
            <tr>
              <th>Аккаунт</th>
              <th>Количество токенов MTLAP (с учетом делегаций)</th>
              <th>Вес голоса</th>
            </tr>
          </thead>
          <tbody>
            {newC?.map((member: Pick<IMember, "id" | "count">) => (
              <tr key={member.id}>
                <td>{Link(member.id)}</td>
                <td>{member.count}</td>
                <td>{Math.ceil(Math.log10(member.count))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <hr />
      <CurrentC />
    </main>
  );
}
