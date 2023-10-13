import { IMember } from "@/interfaces";
import { Link } from "./Link";
import { sumCount } from "@/utils";
import { FC } from "react";

export const Tree: FC<{ member: IMember & { children?: IMember[] } }> = ({
  member,
}) => {
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
          {member.children.map((nestedMember) => (
            <Tree key={`${nestedMember.id}_children`} member={nestedMember} />
          ))}
        </ul>
      )}
    </>
  );
};
