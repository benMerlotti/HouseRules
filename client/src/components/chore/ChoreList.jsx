import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import {
  completeChore,
  deleteChore,
  getChores,
} from "../../managers/choreManager";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const ChoreList = ({ loggedInUser }) => {
  const [chores, setChores] = useState([]);

  const currentUser = loggedInUser;
  const userId = currentUser.id;

  useEffect(() => {
    getChores().then(setChores);
  }, []);

  const handleDelete = (id) => {
    deleteChore(id).then(() => {
      getChores().then(setChores);
    });
  };

  useEffect(() => {
    getChores().then(setChores);
  }, []);

  const handleComplete = (id, userId) => {
    completeChore(id, userId).then(() => {
      getChores().then(setChores);
    });
  };

  return (
    <>
      <h2>Chores</h2>
      <Link to={"create-chore"}>Add Chore</Link>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Difficulty</th>
            <th>Frequency</th>
            <th></th>
            <th></th>
            <th></th>
            <th>Completions</th>
          </tr>
        </thead>
        <tbody>
          {chores.map((c) => (
            <tr key={c.id}>
              <th scope="row">{`${c.name}`}</th>
              <td>{c.difficulty}</td>
              <td>{c.choreFrequencyDays}</td>
              <td>
                {currentUser.roles.includes("Admin") && (
                  <Link to={`${c.id}`}>Details</Link>
                )}
              </td>
              <td>
                <Button color="danger" onClick={() => handleDelete(c.id)}>
                  Delete
                </Button>
              </td>
              <td>
                <Button
                  color="success"
                  onClick={() => handleComplete(c.id, userId)}
                >
                  Complete
                </Button>
              </td>
              <td>{c.choreCompletions.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
