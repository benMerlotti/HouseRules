import { useEffect, useState } from "react";
import { getUsers } from "../../managers/userManager";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";

export const UserProfileList = () => {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    getUsers().then(setUserProfiles);
  }, []);

  return (
    <>
      <h2>User Profiles</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Username</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {userProfiles.map((up) => (
            <tr key={up.id}>
              <th scope="row">{`${up.firstName} ${up.lastName}`}</th>
              <td>{up.address}</td>
              <td>{up.email}</td>
              <td>{up.userName}</td>
              <td>
                <Link to={`${up.id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
