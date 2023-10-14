"use client";
export function Loader() {
  return () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>Загрузка...</div>
    </div>
  );
}
