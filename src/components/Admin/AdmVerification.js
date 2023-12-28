import { useSession } from "next-auth/react";
import React from "react";

const AdmVerification = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user.isAdmin;
  console.log(isAdmin);
  if (!isAdmin) {
    return (
      <div>
        <h1>Not admin</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Admin</h1>
      </div>
    );
  }
};

export default AdmVerification;
