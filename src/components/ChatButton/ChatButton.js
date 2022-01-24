import React, { useState } from 'react'
import { hideChat,  toggleChatPannel } from '../../jq'
import '../ChatButton/ChatButton.css'

export default function ChatButton() {

  hideChat();    
  
  toggleChatPannel();    
    return (
        <button id="hide_show_button2">
            <img src="messenger.png" width="50px" height="50px"></img>
        </button>
    )
}
