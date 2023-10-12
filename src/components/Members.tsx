"use client";
import { useGetMembers } from "@/hooks";
import { Link } from "./Link";

export function Members() {
  const { members, isLoading, isValidating, mutate } = useGetMembers();

  return (
    <section>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Индивидуальные участники Ассоциации</h1>
        {(isLoading || isValidating) && <div>Загрузка...</div>}
        <table cellSpacing="16px">
          <thead>
            <tr>
              <th>Аккаунт</th>
              <th>MTLAP</th>
              <th>Делегат в Собрании</th>
              <th>Делегат в Совете</th>
            </tr>
          </thead>
          <tbody>
            {members
              ?.sort((a, b) => b.count - a.count || a.id.localeCompare(b.id))
              ?.map((member) => (
                <tr key={member.id}>
                  <td>{Link(member.id)}</td>
                  <td>{member.count}</td>
                  <td>{Link(member.delegateA)}</td>
                  <td>{Link(member.delegateC)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
