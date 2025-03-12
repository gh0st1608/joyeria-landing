import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layouts/Sidebar";
import { getUsers } from "../servicios/dashboard/userService";
import UserTable from "../sections/dashboard/UserTable";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error cargando usuarios:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h2> Gestión de Usuarios</h2>
        <UserTable users={users} />
      </div>
    </div>
  );
};

export default Users;
