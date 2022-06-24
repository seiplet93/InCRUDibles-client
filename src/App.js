import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Welcome from "./components/pages/Welcome";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Navbar from "./components/Navbar";
import jwt_decode from "jwt-decode";
import "./App.css";
import TasksPage from "./components/pages/TasksPage";
import ProfileSelection from "./components/pages/ProfileSelection";
import Details from "./components/pages/Details";
import axios from "axios";

function App() {
  // the currently logged in user will be stored in state
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentProfile, setCurrentProfile] = useState("");
  const [tasks, setTasks] = useState([]);

  // useEffect -- if the Account navigates away from the page, we will log them back in
  useEffect(() => {
    // check to see if token is in storage
    const token = localStorage.getItem("jwt");
    if (token) {
      // if so, we will decode it and set the Account in app state
      setCurrentAccount(jwt_decode(token));
    } else {
      setCurrentAccount(null);
    }

    // if so, we will decode it and set the Account in app state
  }, []);
  // event handler to log the Account out when needed
  const handleLogout = () => {
    // check to see if a token exists in local storage
    if (localStorage.getItem("jwt")) {
      // if so, delete
      localStorage.removeItem("jwt");
      // set the Account in app state to null
      setCurrentAccount(null);
    }
  };
  const handleSubmit = (e, form, setForm) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/bounties/${id}`)
      .then((response) => {
        console.log(response.data);
        setBounty(response.data); // addd updated bounty to state
        setShowForm(false); // hide form
      })
      .catch(console.warn);
  };
  return (
    <Router>
      <header>
        <Navbar currentAccount={currentAccount} handleLogout={handleLogout} />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Welcome
                currentAccount={currentAccount}
                setCurrentAccount={setCurrentAccount}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                currentAccount={currentAccount}
                setCurrentAccount={setCurrentAccount}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                currentAccount={currentAccount}
                setCurrentAccount={setCurrentAccount}
              />
            }
          />
          {/* TODO: conditionally render auth locked routes */}

          <Route
            path="/taskspage"
            element={
              <TasksPage
                currentAccount={currentAccount}
                setCurrentAccount={setCurrentAccount}
              />
            }
          />
          <Route
            path="/details"
            element={
              <Details
                initialForm={{ name: "", color: "" }}
                currentAccount={currentAccount}
                setCurrentAccount={setCurrentAccount}
              />
            }
          />
          <Route
            path="/profileselection"
            element={
              <ProfileSelection
                currentProfile={currentProfile}
                setCurrentProfile={setCurrentProfile}
                currentAccount={currentAccount}
                setCurrentAccount={setCurrentAccount}
              />
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
