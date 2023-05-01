import useUsers from "../../hooks/useUsers";
import { User } from "../../types/user";
import Table from "../Table";
import { TableContent } from "../Table/types";

const UsersTable = () => {
  const { usersLoading, users } = useUsers();

  const content: TableContent<User> = {
    data: users!,
    columns: [
      { header: "Name", render: (u) => u.name },
      { header: "Last name", render: (u) => u.last_name },
      { header: "Email", render: (u) => u.email },
      { header: "Role", render: (u) => u.role },
    ],
  };

  if (usersLoading) return <></>;
  return <Table TableProps={{ sx: { width: "50%" } }} content={content} />;
};
export default UsersTable;
