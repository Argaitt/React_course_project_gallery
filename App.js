import React, {useState} from "react"
import './App.css'
import firebase from "firebase"
import "firebase/firestore"
import "firebase/storage"
import AuthContext from "./authContext"
import Header from "./header/Header"
import Gallery from "./gallery/Gallery"

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAZsedzVz3X98BsHynprx7MbItptLQpEM4",
  authDomain: "course-project-react-js.firebaseapp.com",
  projectId: "course-project-react-js",
  storageBucket: "course-project-react-js.appspot.com",
  messagingSenderId: "535311260503",
  appId: "1:535311260503:web:c031b6a423007556407c12",
  measurementId: "G-97HB57J1H2"
});

function App(prop) {
  const [state, setStateGallery] = useState(true)
  const [user, setUser] = useState("")
  function onChangeState(toggle) {
      setStateGallery(toggle)
  }
  return (
    <AuthContext.Provider value={user}>
      <Header onChangeState={onChangeState} user={user} setUser={setUser}></Header>
      {state && <Gallery key="all" className="gallery" state={"all"} user={user} setUser={setUser}></Gallery>}
      {!state && <Gallery key="best" className="gallery" state={"best"} user={user} setUser={setUser}></Gallery>}
    </AuthContext.Provider>)
}

export default App;
