import React from "react"
import "./DownloaModalWindow.css"
import "../context"
import firebase from "firebase"
import "firebase/firestore"
import "firebase/storage"
import uuid from "react-uuid"
import Loader from "../Loader/Loader"

// Initialize Firebase


export default class DownloadModalWindow extends React.Component{
    constructor(props){
        super(props)
    }

    state ={
        isOpen: false,
        isUrl: "",
        isTitle: "",
        isTags: "",
        isLoading: false
    }

    uuid = ""

    checkData(){
        try {
            let checkAuth = firebase.auth().currentUser.uid 
            if (this.state.isUrl === "" || this.state.title === "" || checkAuth === "") {
                alert("Invalid data(maybe u didnt pick image or title field is empty)")
                this.deleteImgIfCancel()
                return false
            }
            return true
        } catch (error) {
            alert("you are not authtorized")
            this.deleteImgIfCancel()
        }
        console.log(test)
        
    }

    upload(defaultFile = ''){
        let metadata = {
            contentType: 'image/jpeg',
          };
        //console.log(defaultFile)
        let uploadTask = firebase.storage().ref().child(this.uuid = uuid()).put(defaultFile, metadata)
        uploadTask.on('state_changed', 
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                if (progress >= 0) {
                    this.setState({isLoading: true})
                }
            }, 
            (error) => {
                console.log(error)
            }, 
            () => {
                this.setState({isLoading:false})
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                this.setState({isUrl: downloadURL})
                console.log('File available at', downloadURL);
                });
            }
        );
    }

    uploadToDB(title, tags, url){
        let tagsArray = tags.trim().split(", ")
         firebase.firestore().collection("images").doc(uuid()).set({
            title: title,
            tags: tagsArray,
            imgURL: url,
            likes: "1"
         })

        console.log("title ", title, "tags ", tags, "url ", url)

    }

    closeAndClearModalWindow(){
        this.setState({
            isOpen: false,
            isUrl: "",
            isTitle: "",
            isTags: "",
        })
    }

    deleteImgIfCancel(){
        firebase.storage().ref().child(this.uuid).delete().then(() => console.log("operation is canceled. Image preload is abolition"))
    }

    render() {
        return(
            <React.Fragment>
                { this.state.isOpen && <div className="modal">
                    <div className="modal-body">
                    {this.state.isLoading && <Loader className="loader"></Loader>}
                    {this.state.isUrl && <img src={this.state.isUrl} className="img" alt=''></img>}  
                        <div className="inputFlexbox">
                            <form className="flexForm">
                                <input onChange={event => this.setState({isTitle: event.target.value})} type="text" placeholder="title"></input>
                                <input  onChange={event => this.setState({isTags: event.target.value})} type="text" placeholder="tags"></input>
                                <input className="inputfile" type="file" name="imgFile" onChange={event => this.upload(event.target.files[0])}></input>
                            </form>
                            <div className="buttons">
                                <button className="btn" onClick={() => {this.setState({isOpen: false}); this.closeAndClearModalWindow(); this.deleteImgIfCancel()}}>Cancel</button>
                                <button className="btn" onClick={() => {this.checkData() &&  this.uploadToDB(
                                    this.state.isTitle,
                                    this.state.isTags,
                                    this.state.isUrl
                                ); this.closeAndClearModalWindow()}}>Upload</button>
                            </div>   
                        </div>
                    </div>  
                </div>}
                <button className="btn" onClick={() => this.setState({isOpen: true})}>Upload Image</button>
            </React.Fragment>
        )
    }
}