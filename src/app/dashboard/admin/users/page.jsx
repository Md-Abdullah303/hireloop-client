import { getUsersList } from "@/lib/api/users";
import React from "react";

const AdminUsersPage = async () => {
  const data = await getUsersList();
  const users = data.users;
  console.log("users :", users);
  return (
    <div>
      <h1>Users : {users.length}</h1>
      {/* make a table and make a function for admin,
      admin can change the user role ...
        I know it's sound deficalt but use better auth power go better auth plagins/admin and you will show a user role method... 
        use it and make the change the user role.
      */}
    </div>
  );
};

export default AdminUsersPage;
