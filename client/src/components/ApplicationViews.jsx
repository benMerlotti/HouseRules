import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Home } from "./Home";
import { UserProfileList } from "./UserProfile/UserProfileList";
import { UserProfileDetails } from "./UserProfile/UserProfileDetails";
import { ChoreList } from "./chore/ChoreList";
import { ChoreDetails } from "./chore/ChoreDetails";
import { CreateChore } from "./chore/CreateChore";

// eslint-disable-next-line react/prop-types
export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home />
            </AuthorizedRoute>
          }
        />
        <Route
          path="users"
          element={
            <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
              <UserProfileList />
            </AuthorizedRoute>
          }
        />
        <Route
          path="users/:id"
          element={
            <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
              <UserProfileDetails />
            </AuthorizedRoute>
          }
        />
        <Route
          path="chores"
          element={
            <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
              <ChoreList loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route
          path="chores/:id"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <ChoreDetails />
            </AuthorizedRoute>
          }
        />
        <Route
          path="chores/create-chore"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <CreateChore />
            </AuthorizedRoute>
          }
        />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
