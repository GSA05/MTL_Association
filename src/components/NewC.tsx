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
        {(isLoading || isValidating) && <div>Загрузка...</div>}
        <table cellSpacing="16px">
          <thead>
            <tr>
              <th>Аккаунт</th>
              <th>Делегирования</th>
              <th>Голоса</th>
            </tr>
          </thead>
          <tbody>
            {newC?.map((member: Pick<IMember, "id" | "count" | "weight" | "delegations">) => (
              <tr key={member.id}>
                <td>{Link(member.id)}</td>
                <td>{member.delegations}</td>
                <td>{member.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
