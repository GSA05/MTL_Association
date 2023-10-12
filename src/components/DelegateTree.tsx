"use client";
import { IMember } from "@/interfaces";
import { Tree } from "./Tree";
import { useGetTree } from "@/hooks";

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
          {tree?.map((member) =>
            member.count > 0
              ? Tree(member as IMember & { children?: IMember[] })
              : null
          )}
        </ul>
        {error && <div style={{ color: "red" }}>{error()}</div>}
      </div>
    </section>
  );
}