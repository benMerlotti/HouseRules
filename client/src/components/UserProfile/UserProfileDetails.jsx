import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { getUsers } from "../../managers/userManager";

export const UserProfileDetails = () => {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    getUsers().then(setUserProfiles);
  }, []);

  const { id } = useParams();
  const userObj = userProfiles.find((up) => up.id === parseInt(id));

  if (!userObj) {
    // Render a loading state or a fallback UI until userObj is available
    return <p>Loading user details...</p>;
  }

  return (
    <>
      <h2>
        {userObj.firstName} {userObj.lastName}
      </h2>
      <h3>Chores</h3>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Difficulty</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>
          {userObj.chores.map((c) => (
            <tr key={`chore-${c.id}`}>
              <th scope="row">{c.id}</th>
              <td>{c.name}</td>
              <td>{c.difficulty}</td>
              <td>{c.choreFrequencyDays}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Completed Chores</h3>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Difficulty</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>
          {userObj.choreCompletions.map((c) => (
            <tr key={`chore-${c.id}`}>
              <th scope="row">{c.id}</th>
              <td>{c.name}</td>
              <td>{c.difficulty}</td>
              <td>{c.choreFrequencyDays}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
