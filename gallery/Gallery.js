import {React, useEffect, useState} from "react"
import "firebase/firestore"
import ImgCard from "../imgCard/ImgCard"
import firebase from "firebase"
import ("./Gallery.css")

    var imgCards1 = []
    var imgCards2 = []
    var imgCards3 = []
    var imgCards4 = []

function Gallery(props) {
    

    const [load, setLoad] = useState(false)
    useEffect(() => loadImagesFromDB(props.status), [])
    function loadImagesFromDB() {
        imgCards1 = []
        imgCards2 = []
        imgCards3 = []
        imgCards4 = []
        if (props.state === "all") {
            firebase.firestore().collection("images").get().then((querySnapshot) => {
                let count = 0;
                querySnapshot.forEach((doc) => {
                    if (count === 0) {
                        imgCards1.push({
                            id: doc.id,
                            tags: doc.data().tags,
                            imgURL: doc.data().imgURL,
                            title: doc.data().title,
                            likes: doc.data().likes
                        })
                    }
                    if (count === 1) {
                        imgCards2.push({
                            id: doc.id,
                            tags: doc.data().tags,
                            imgURL: doc.data().imgURL,
                            title: doc.data().title,
                            likes: doc.data().likes
                        })
                    }
                    if (count === 2) {
                        imgCards3.push({
                            id: doc.id,
                            tags: doc.data().tags,
                            imgURL: doc.data().imgURL,
                            title: doc.data().title,
                            likes: doc.data().likes
                        })
                    }
                    if (count === 3) {
                        imgCards4.push({
                            id: doc.id,
                            tags: doc.data().tags,
                            imgURL: doc.data().imgURL,
                            title: doc.data().title,
                            likes: doc.data().likes
                        })
                    }
                    if (count === 3) {
                        count = 0
                    }else{
                        count++
                    }
                });
                
            }).then(() => setLoad(true));
        }
        if (props.state === "best") {
            firebase.firestore().collection("images").get().then((querySnapshot) => {
                let count = 0;
                querySnapshot.forEach((doc) => {
                    if (count === 0 && doc.data().likes > 2) {
                        imgCards1.push({
                            id: doc.id,
                            tags: doc.data().tags,
                            imgURL: doc.data().imgURL,
                            title: doc.data().title,
                            likes: doc.data().likes
                        })
                        count++
                        return
                    }
                    if (count === 1 && doc.data().likes > 2) {
                        imgCards2.push({
                            id: doc.id,
                            tags: doc.data().tags,
                            imgURL: doc.data().imgURL,
                            title: doc.data().title,
                            likes: doc.data().likes
                            
                        })
                        count++
                        if (count === 4) {
                            count = 0
                        }
                        return
                    }
                    if (count === 2 && doc.data().likes > 2) {
                        imgCards3.push({
                            id: doc.id,
                            tags: doc.data().tags,
                            imgURL: doc.data().imgURL,
                            title: doc.data().title,
                            likes: doc.data().likes
                        })
                        count++
                        if (count === 4) {
                            count = 0
                        }
                        return
                    }
                    if (count === 3 && doc.data().likes > 2) {
                        imgCards4.push({
                            id: doc.id,
                            tags: doc.data().tags,
                            imgURL: doc.data().imgURL,
                            title: doc.data().title,
                            likes: doc.data().likes
                        })
                        count++
                        if (count === 4) {
                            count = 0
                        }
                        return
                    }
                });
                
            }).then(() => setLoad(true));
        }
    }

    return(
        <div className="gallery">
            <div className="flexBox">
                {load && imgCards1.map(imgCard1 => {
                        return <ImgCard key={imgCard1.id} id={imgCard1.id} title={imgCard1.title} imgURL={imgCard1.imgURL} tags={imgCard1.tags} likes={imgCard1.likes} user={props.user} setUser={props.setUser}/>
                })}
            </div>
            <div className="flexBox">
                {load && imgCards2.map(imgCard2 => {
                        return <ImgCard key={imgCard2.id} id={imgCard2.id} title={imgCard2.title} imgURL={imgCard2.imgURL} tags={imgCard2.tags} likes={imgCard2.likes} user={props.user} setUser={props.setUser}/>
                })}
            </div>
            <div className="flexBox">
                {load && imgCards3.map(imgCard3 => {
                        return <ImgCard key={imgCard3.id} id={imgCard3.id} title={imgCard3.title} imgURL={imgCard3.imgURL} tags={imgCard3.tags} likes={imgCard3.likes} user={props.user} setUser={props.setUser}/>
                })}
            </div>
            <div className="flexBox">
                {load && imgCards4.map(imgCard4 => {
                        return <ImgCard key={imgCard4.id} id={imgCard4.id} title={imgCard4.title} imgURL={imgCard4.imgURL} tags={imgCard4.tags} likes={imgCard4.likes} user={props.user} setUser={props.setUser}/>
                })}
            </div>)

                
        </div>
    )
}

export default Gallery