"use client";
import { IMember } from "@/interfaces";
import { Tree } from "./Tree";
import { useGetTree } from "@/hooks";

export function DelegateTree() {
  const { tree, isLoading, isValidating, mutate } = useGetTree();
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
        {isLoading || isValidating ? (
          "Загрузка..."
        ) : (
          <button onClick={() => mutate()}>Обновить</button>
        )}
        <ul key="tree">
          {tree?.map((member) =>
            Tree(member as IMember & { children?: IMember[] })
          )}
        </ul>
      </div>
    </section>
  );
}
