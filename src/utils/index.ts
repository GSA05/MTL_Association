import { IMember } from "@/interfaces";

export const sumCount = (
  member: IMember & { children?: IMember[] }
): number => {
  return (
    member.count +
    +(member.children?.length
      ? member.children?.map(sumCount).reduce((prev, cur) => prev + cur, 0)
      : 0)
  );
};
