"use client";
import { IMember } from "@/interfaces";
import { Link } from "./Link";
import { useGetTree } from "@/hooks";
import { sumCount } from "@/utils";

export function NewC() {
  const { tree, isLoading, isValidating, mutate } = useGetTree();
  const newC = tree
    .map((member) => ({
      ...(member as IMember),
      count: sumCount(member as IMember & { children?: IMember[] }),
    }))
    .splice(0, 20)
    .sort((a, b) => b.count - a.count);
  return (
    <section>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Ожидаемый состав Совета</h1>
        {isLoading || isValidating ? (
          "Загрузка..."
        ) : (
          <button onClick={() => mutate()}>Обновить</button>
        )}
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
                <td>
                  {Math.floor(Math.log10(Math.max(member.count, 2) - 1) + 1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
