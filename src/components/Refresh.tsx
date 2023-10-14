"use client";

import { useGetChanges } from "@/hooks";
import dynamic from "next/dynamic";

function Refresh() {
  const { changes, isLoading, isValidating, mutate, date } = useGetChanges();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isLoading || isValidating ? (
        <div>Загрузка...</div>
      ) : (
        <>
          Данные на {date && new Date(date).toLocaleString()}
          <button
            onClick={() => {
              localStorage.clear();
              mutate();
            }}
            style={{ width: "320px", height: "32px", margin: "16px" }}
          >
            Обновить
          </button>
        </>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(Refresh), {
  ssr: false,
});
