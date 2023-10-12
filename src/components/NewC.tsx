"use client";
import { IMember } from "@/interfaces";
import { Link } from "./Link";
import { useGetNewC, useGetTree } from "@/hooks";
import { sumCount } from "@/utils";

export function NewC() {
  const { newC, isLoading, isValidating, mutate } = useGetNewC();
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
            {newC?.map((member: Pick<IMember, "id" | "count" | "weight">) => (
              <tr key={member.id}>
                <td>{Link(member.id)}</td>
                <td>{member.count}</td>
                <td>{member.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
