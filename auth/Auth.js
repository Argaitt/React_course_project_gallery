import React, {useState} from "react"
import firebase from "firebase"
import "firebase/firestore"
import "firebase/storage"
import "firebase/auth"
import AuthContext from "../authContext"
import ("./Auth.css")



const styles = {
    activeSwitch: {
        color: "#0d0d0d",
        borderBottom: "2px solid #000000",
        cursor: "pointer"
    },
    inactiveSwitch: {
        color: "#cccccc",
        cursor: "pointer"
    }
}

function Auth(props) {
    async function register(login, password) {
        await firebase.auth().createUserWithEmailAndPassword(login, password)
        .then((userCredential) => {
            props.setUser( props.setUser(firebase.auth().currentUser.uid));
            console.log( props.setUser(firebase.auth().currentUser.uid))
            firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({likes: []})
          })
          .catch((error) => {
            alert("error: something worng...")
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode)
            alert(errorMessage)
          });
        
    }

    async function logIn(login, password) {
        await firebase.auth().signInWithEmailAndPassword(login, password)
                .then((userCredential) => {
                    props.setUser(firebase.auth().currentUser.uid);
                    console.log(firebase.auth().currentUser.uid)
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage)
                    console.log(errorCode)
                });
    }
    const [login, setLogin] = useState("")
    const [password ,setPassword] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [isLogOrReg, setIsLogOrReg] = useState("log")
    return (
        <React.Fragment>
            {props.user ===  "" ? <button className="btn" onClick={() => setIsOpen(true)}>Login/Register</button> : <button className="btn" onClick={() => { props.setUser("") }}>Log out</button>}
                {isOpen && <div className="authWrapper">
                                <div className="authWindow">
                                    <div className="switch">
                                        <h2 className="signInSwitch" style={ isLogOrReg === "log" ? styles.activeSwitch : styles.inactiveSwitch} onClick={() => setIsLogOrReg("log")}> Sign In </h2>
                                        <h2 className="signUpSwitch" style={ isLogOrReg === "reg" ? styles.activeSwitch : styles.inactiveSwitch} onClick={() => setIsLogOrReg("reg")}>Sign Up </h2>
                                    </div>
                                    <div className="form">
                                        <input type="text" id="login" className="fadeInSecond" name="login" placeholder="login" onChange={event => setLogin(event.target.value)}></input>
                                        <input type="text" id="password" className="fadeInThird" name="login" placeholder="password" onChange={event => setPassword(event.target.value)}></input>
                                        {isLogOrReg === "log" ? <button className="fadeInFourth" onClick={() => {logIn(login, password); setIsOpen(false)}}>Sign In</button> :
                                                            <button className="fadeInFourth" onClick={() => {register(login, password); setIsOpen(false)}}>Sign Up</button> }
                                        <button className="cancel" onClick={() => setIsOpen(false)}>Cancel</button>
                                    </div>
                                </div>
                            </div>}
        </React.Fragment>
            
    )
}

export default Auth