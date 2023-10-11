"use client";
import { useGetCurrentC } from "@/hooks";
import { Link } from "./Link";

export function CurrentC() {
  const { currentC, error, mutate } = useGetCurrentC();
  return (
    <section>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Текущий состав Совета</h1>
        <button onClick={() => mutate()}>Обновить</button>
        <table cellSpacing="16px">
          <thead>
            <tr>
              <th>Аккаунт</th>
              <th>Вес голоса</th>
            </tr>
          </thead>
          <tbody>
            {currentC?.map((member) => (
              <tr key={member.id}>
                <td>{Link(member.id)}</td>
                <td>{member.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
