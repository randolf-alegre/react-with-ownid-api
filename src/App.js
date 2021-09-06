import { useState, useEffect } from "react";
import firebaseApp from "./firebaseApp";
import Login from "./components/Login";
import Headers from "./components/Headers";
import "./App.css";

function App() {
  const [user, setUser] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const authListener = () => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  const handleLogout = () => {
    await firebaseApp.auth().signOut();
    setUser("");
  };

  return (
    <div className="App">
      {user ? (
        <Headers handleLogout={handleLogout} />
      ) : (
        <Login
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          setUser={setUser}
        />
      )}
    </div>
  );
}

export default App;
