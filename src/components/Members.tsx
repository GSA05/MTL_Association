"use client";
import { useGetMembers } from "@/hooks";
import { Link } from "./Link";
import dynamic from "next/dynamic";
import { IMember } from "@/interfaces";
import { Loader } from "./Loader";
import { useRouter } from "next/navigation";

function Members() {
  const { members, isLoading, isValidating, mutate } = useGetMembers();
  const router = useRouter();
  router.replace("https://voleum-org.github.io/MTL_Association");

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
              <th></th>
              <th>Аккаунт</th>
              <th>MTLAP</th>
              <th>Делегат в Собрании</th>
              <th>Делегат в Совете</th>
            </tr>
          </thead>
          <tbody>
            {members
              .filter((member: IMember) => !member.removed)
              ?.sort((a, b) => b.count - a.count || a.id.localeCompare(b.id))
              ?.map((member, index) => (
                <tr key={member.id}>
                  <td style={{ textAlign: "right", paddingRight: "16px" }}>
                    {index + 1}
                  </td>
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

export default dynamic(() => Promise.resolve(Members), {
  ssr: false,
  loading: Loader(),
});
