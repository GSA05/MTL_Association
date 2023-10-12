"use client";
import { IMember } from "@/interfaces";
import { Tree } from "./Tree";
import { useGetTree } from "@/hooks";
import { sumCount } from "@/utils";

export function DelegateTree() {
  const { tree, isLoading, isValidating, mutate, error } = useGetTree();
  return (
    <section>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Проверка делегаций для Совета:</h1>
        {(isLoading || isValidating) && <div>Загрузка...</div>}
        <ul key="tree">
          {tree
            ?.map((member) => ({
              ...(member as IMember),
              delegations: sumCount(
                member as IMember & { children?: IMember[] }
              ),
            }))
            ?.sort(
              (a, b) =>
                b.delegations - a.delegations || a.id.localeCompare(b.id)
            )
            ?.map((member, index) => (
              <>
                {member.count > 0
                  ? Tree(member as IMember & { children?: IMember[] })
                  : null}
                {index === 19 && <hr />}
              </>
            ))}
        </ul>
        {error && <div style={{ color: "red" }}>{error()}</div>}
      </div>
    </section>
  );
}
