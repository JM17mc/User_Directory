import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();

        setUsers(data);

      } catch (error) {

        setError(error);

      } finally {

        setLoading(false);

      }
    };

    fetchUsers();

  }, []);

  if (loading) {
    return <p className="status">Loading users...</p>;
  }

  if (error) {
    return <p className="status error">Failed to fetch users: {error.message}</p>;
  }

  return (
    <div className="container">

      <h1 className="title">Simple User Directory</h1>
      <h2 className="subtitle">USERS</h2>

      <div className="users">

        {users.slice(0, 5).map((user) => (

          <div className="details" key={user.id}>

            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Company: {user.company.name}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;
