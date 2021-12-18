import React, { useState } from 'react'
import { toggleChatPannel } from '../../jq'
import '../ChatButton/ChatButton.css'

export default function ChatButton() {
  toggleChatPannel();    
    return (
        <button id="hide_show_button2">
            <img src="messenger.png" width="50px" height="50px"></img>
        </button>
    )
}
