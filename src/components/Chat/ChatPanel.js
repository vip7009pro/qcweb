import React, { useContext, useEffect, useState } from 'react'
import { SocketContext, UserContext } from '../../Context'
import { socketJQ } from '../../jq';
import '../Chat/ChatPanel.css'

export default function ChatPanel() { 
    const SocketRefContext = useContext(SocketContext);
    const [userdata, setUserData] = useContext(UserContext);
    const [message,setMessage] = useState([{chattime:"", username:"", messagect:""}]);   
    const [chatP,setChatP]   = useState('Welcome'); 
    const [inputmess,setInputMess] = useState('');
    //console.log("render lai chat panel");  
    const handleSendMessage = ()=>{
        console.log("Send clicked !" + inputmess);
        SocketRefContext.current.emit('send',  {   
            chattime: new Date().toLocaleString(),
            username: userdata.MIDLAST_NAME + ' ' + userdata.FIRST_NAME,
            message: inputmess
          }); 
          setInputMess('');

    }   
    const handleKeyDown = (e) => {
        if (e.key == 'Enter') {
            console.log("Send clicked !" + inputmess);
            SocketRefContext.current.emit('send', {
                chattime: new Date().toLocaleString(),
                username: userdata.MIDLAST_NAME + ' ' + userdata.FIRST_NAME,
                message: inputmess
            });
            setInputMess('');
        }       
    }


    const renderChat = (ms,userdata1) =>{ 
        let message_p ="";
        for(var ii = 1;ii< ms.length;ii++)
        {// message_p += (ms[ii].chattime + ":" + ms[ii].username + ":" + ms[ii].message);
            console.log(ms[ii]);
            console.log(userdata1.MIDLAST_NAME + ' ' + userdata1.FIRST_NAME);
            if(ms[ii].username!=(userdata1.MIDLAST_NAME + ' ' + userdata1.FIRST_NAME))
            {
                message_p += "<p class='message'>" + "<b style='color: blue'>" + ms[ii].chattime + ' </b> : ' + "<b style='color: red'>" + ms[ii].username + " </b>: " + ms[ii].message + "</p>";
            }
            else
            {
                message_p += "<p class='message'>" + "<b style='color: blue'>" + ms[ii].chattime + ' </b> : ' + "<b style='color: green'>" + ms[ii].username + " </b>: " + ms[ii].message + "</p>";
    
            }
        }
        return message_p;
    }


    useEffect(()=>{
        console.log("vao useEffect chat");
        SocketRefContext.current.on('send', data => {            
            setMessage(message.push(data));
            console.log(userdata);
            setChatP(renderChat(message,userdata));
            //console.log("renderchat ="  + renderChat(message));
            socketJQ();
          }); 
          return ()=>{
              SocketRefContext.current.disconnect();
          }
    },[]);    

    return (
        <div id="chat_panel">
            <fieldset>
                <legend>
                    <h3>Chat tổng toàn bộ phận QC</h3>
                </legend>
                <b>
                    <p id="chat_name">
                        {userdata.MIDLAST_NAME} {userdata.FIRST_NAME}
                    </p>
                </b>                         
                <div id="chat_content">  <span dangerouslySetInnerHTML={{ __html: chatP }}></span></div>
                <input id="chat_message" placeholder="Viết tin nhắn vào đây." value = {inputmess}  onKeyDown={(e)=> {handleKeyDown(e)}} onChange={(e) => {setInputMess(e.target.value) }}></input>
                <button className ="btn-success" id="chat_sendMessage" onClick={handleSendMessage}>SEND</button>
            </fieldset>
        </div>
    )
}
