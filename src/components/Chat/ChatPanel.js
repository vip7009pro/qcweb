import React from 'react'
import '../Chat/ChatPanel.css'
export default function ChatPanel() {
    return (
        <div id="chat_panel">
            <fieldset>
                <legend>
                    <h3>Chat tổng toàn bộ phận QC</h3>
                </legend>
                <b>
                    <p id="chat_name">
                        NGUYỄN VĂN HÙNG33
                    </p>
                </b>               
                <div id="chat_content"></div>
                <input id="chat_message" placeholder="Viết tin nhắn vào đây."></input>
                <button className ="btn-success" id="chat_sendMessage">SEND</button>
            </fieldset>
        </div>
    )
}
