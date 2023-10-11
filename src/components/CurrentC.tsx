"use client";
import { useGetCurrentC } from "@/hooks";
import { Link } from "./Link";

export function CurrentC() {
  const { currentC, error } = useGetCurrentC();
  return (
    <section>
      <h1>Текущий состав Совета</h1>
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
    </section>
  );
}
