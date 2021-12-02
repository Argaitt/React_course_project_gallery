import React, { useState } from "react"
import "./ImgCard.css"
import firebase from "firebase"
import "firebase/firestore"
import "firebase/storage"


export default function ImgCard(props){
    const [show, setShow] = useState(false)
    const [likes, setlikes] = useState(props.likes)
    // function decLikes(likes) {
    //     firebase.firestore().collection("users").doc(props.user).get().then(doc => {
    //         if (doc.exist) {
    //            console.log(doc.data()) 
    //         }
    //     })
    //     let tmpLikes = likes
    //     setlikes(--tmpLikes)
    // }
    async function incLikes(likes) {
        try {
            let checkAuth = firebase.auth().currentUser.uid 
            let returnAll = false
            if (props.user === "") {
                alert("please log in before like!")
                return
            }
            await firebase.firestore().collection("users").doc(props.user).get().then(doc => {
                if (doc.exists) {
                    let data = doc.data()
                    if (data.likes.length === 0) {
                        data.likes.push(props.id)
                        firebase.firestore().collection("users").doc(props.user).update({
                            likes: data.likes
                        })
                        let tmpLikes = likes
                        setlikes(++tmpLikes)
                        return
                    }
                    data.likes.forEach(element => {
                        if (element === props.id) {
                            alert("you cant like this")
                            returnAll =true
                            return
                        }
                    });
                    if (returnAll) {
                        return
                    }
                    data.likes.push(props.id)
                    firebase.firestore().collection("users").doc(props.user).update({
                        likes: data.likes
                    })
                }else {
                    console.log("No such document!");
                    return
                }
                let tmpLikes = likes
                setlikes(++tmpLikes)
            })
        } catch (error) {
            alert("You are not authtorizated")
        }
        
        
    }
    function setToDbLikes() {
        firebase.firestore().collection("images").doc(props.id).update({
            likes: likes
         })
    }
    return(
        <React.Fragment>
            {show && <div className="bigImage">
                        <p className="title">{props.title}</p>
                        <img  src={props.imgURL} alt="" onClick={() => {setShow(false); setToDbLikes()}}/>
                        <div className="likesWrapper">
                            {/* <button className="btnMinus" onClick={() => decLikes(likes)}>-</button> */}
                            <div><p className="likes">{likes.toString()}</p></div>
                            <button className="btnPlus" onClick={() => incLikes(likes)}>+</button>
                        </div> 
                </div>}
            <img className="image" src={props.imgURL} alt="" onClick={() => setShow(true)}/>
        </React.Fragment>
    )
    
}