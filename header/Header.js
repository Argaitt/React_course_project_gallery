import React, { useContext } from "react"
import ".//Header.css"
import DownloadModalWindow from "../downloadModalWindow/DownloadModalWindow"
import Auth from "../auth/Auth"

export default function Header(props) {
    return(<div className="header">
        <button className="best_btn" onClick={() => props.onChangeState(true)}>All images</button>
        {props.user && <DownloadModalWindow user={props.user} setUser={props.setUser} />}
        <Auth user={props.user} setUser={props.setUser}></Auth>
        <button className="best_btn" onClick={() => props.onChangeState(false)}>Best images</button>
    </div>)
}