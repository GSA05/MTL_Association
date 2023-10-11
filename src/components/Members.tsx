"use client";
import { useGetMembers } from "@/hooks";
import { Link } from "./Link";
import { useEffect } from "react";

export function Members() {
  const { members, size, setSize, data, isLoading, isValidating, mutate } =
    useGetMembers();
  useEffect(() => {
    if (data && data?.[size - 1]?.records?.length > 0) {
      setSize(size + 1);
    }
  }, [data, size]);

  return (
    <section>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Открывшие линии доверия к MTLAP</h1>
        {isLoading || isValidating ? (
          "Загрузка..."
        ) : (
          <button onClick={() => mutate()}>Обновить</button>
        )}
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
            {members?.map((member) => (
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
