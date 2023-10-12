"use client";
import { useGetChanges } from "@/hooks";
import { IMember } from "@/interfaces";
import { Link } from "./Link";

export function Changes() {
  const { changes, isLoading, isValidating, mutate } = useGetChanges();
  return (
    <section>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Разница расчетного и текущего:</h1>
        {isLoading || isValidating ? (
          "Загрузка..."
        ) : (
          <button onClick={() => mutate()}>Обновить</button>
        )}
        {changes?.length > 0 ? (
          <table cellSpacing="16px">
            <thead>
              <tr>
                <th>Аккаунт</th>
                <th>Вес голоса</th>
                <th>Изменения</th>
              </tr>
            </thead>
            <tbody>
              {changes?.map(
                (member: Pick<IMember, "id" | "weight"> & { diff: string }) => (
                  <tr key={member.id}>
                    <td>{Link(member.id)}</td>
                    <td>{member.weight}</td>
                    <td>{member.diff}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : (
          "Нет изменений"
        )}
      </div>
    </section>
  );
}
