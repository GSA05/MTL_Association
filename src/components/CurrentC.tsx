"use client";
import { useGetCurrentC } from "@/hooks";
import { Link } from "./Link";
import dynamic from "next/dynamic";
import { Loader } from "./Loader";

function CurrentC() {
  const { currentC, error, mutate, isLoading, isValidating } = useGetCurrentC();
  return (
    <section>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Актуальный состав Совета</h1>
        {(isLoading || isValidating) && <div>Загрузка...</div>}
        <table cellSpacing="16px">
          <thead>
            <tr>
              <th>Аккаунт</th>
              <th>Голоса</th>
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

export default dynamic(() => Promise.resolve(CurrentC), {
  ssr: false,
  loading: Loader(),
});
