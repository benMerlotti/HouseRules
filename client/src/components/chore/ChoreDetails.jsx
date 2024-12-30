import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input, Table } from "reactstrap";
import {
  assignChore,
  getChoreById,
  unassignChore,
} from "../../managers/choreManager";
import { getUsers } from "../../managers/userManager";

export const ChoreDetails = () => {
  const { id } = useParams();
  const [chore, setChore] = useState({});
  const [userProfiles, setUserProfiles] = useState([]);

  console.log(chore);

  useEffect(() => {
    getChoreById(parseInt(id)).then(setChore);
  }, [id]);

  useEffect(() => {
    getUsers().then(setUserProfiles);
  }, []);

  const handleCheckboxChange = (userId, isChecked) => {
    if (isChecked) {
      // Assign the chore to the user
      assignChore(userId, id).then(() =>
        getChoreById(parseInt(id)).then(setChore)
      );
    } else {
      // Unassign the chore from the user
      unassignChore(userId, id).then(() =>
        getChoreById(parseInt(id)).then(setChore)
      );
    }
  };

  return (
    <>
      <h2>{chore.name}</h2>
      <h3>Assignees</h3>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Assign</th>
          </tr>
        </thead>
        <tbody>
          {userProfiles.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>
                <Input
                  type="checkbox"
                  checked={
                    chore.userProfiles?.some((u) => u.id === user.id) || false
                  }
                  onChange={(e) =>
                    handleCheckboxChange(user.id, e.target.checked)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Most Recent Completion</h3>
      <Table>
        <thead>
          <tr>
            <th>Date Completed</th>
          </tr>
        </thead>
        <tbody>
          {chore.choreCompletions?.map((c) => (
            <tr key={`chore-${c.id}`}>
              <th scope="row">
                {new Date(c.completedOn).toLocaleDateString()}
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
