import { IMember } from "@/interfaces";
import { Link } from "./Link";
import { sumCount } from "@/utils";

export const Tree = (member: IMember & { children?: IMember[] }) => {
  const sum = sumCount(member);
  return (
    <>
      <li key={member.id}>
        <div style={{ display: "flex", gap: "16px" }}>
          {Link(member.id)}{" "}
          {sum - member.count > 0
            ? sum + " = " + member.count + " + " + (sum - member.count)
            : sum}
        </div>
      </li>
      {!!member.children?.length && (
        <ul key={`${member.id}_children`}>
          {member.children.map((nestedMember) => Tree(nestedMember))}
        </ul>
      )}
    </>
  );
};
