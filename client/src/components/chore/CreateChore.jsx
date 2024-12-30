import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { createChore } from "../../managers/choreManager";

export const CreateChore = () => {
  const navigate = useNavigate();
  const [newChore, setNewChore] = useState({
    name: "",
    difficulty: null,
    choreFrequencyDays: null,
  });
  const difficulty = [1, 2, 3, 4, 5];
  const numberOfDays = [1, 2, 3, 4, 5, 6, 7];
  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    createChore(newChore).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        navigate("/chores");
      }
    });
  };
  return (
    <>
      <h2>Open a Work Order</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            value={newChore.name}
            onChange={(e) => {
              const choreCopy = { ...newChore };
              choreCopy.name = e.target.value;
              setNewChore(choreCopy);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Difficulty</Label>
          <Input
            type="select"
            value={newChore.difficulty}
            onChange={(e) => {
              const choreCopy = { ...newChore };
              choreCopy.difficulty = parseInt(e.target.value);
              setNewChore(choreCopy);
            }}
          >
            <option value={0}>Choose a Difficulty</option>
            {difficulty.map((d) => (
              <option key={d} value={d}>{`${d}`}</option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Days</Label>
          <Input
            type="select"
            value={newChore.choreFrequencyDays}
            onChange={(e) => {
              const choreCopy = { ...newChore };
              choreCopy.choreFrequencyDays = parseInt(e.target.value);
              setNewChore(choreCopy);
            }}
          >
            <option value={0}>Choose how many days of the week</option>
            {numberOfDays.map((n) => (
              <option key={n} value={n}>{`${n}`}</option>
            ))}
          </Input>
        </FormGroup>
        <Button type="submit" color="primary">
          Submit
        </Button>
        <div style={{ color: "red" }}>
          {Object.keys(errors).map((key) => (
            <p key={key}>
              {key}: {errors[key].join(",")}
            </p>
          ))}
        </div>
      </form>
    </>
  );
};
