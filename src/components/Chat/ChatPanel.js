import React, { useContext, useEffect, useRef, useState } from "react";
import swal from "sweetalert";
import { getchat, insertchat } from "../../Api/Api";
import { SocketContext, UserContext } from "../../Api/Context";
import { hidechat, socketJQ, toggleChatPannel } from "../../jq";
import "../Chat/ChatPanel.css";
export default function ChatPanel() {
  const SocketRefContext = useContext(SocketContext);
  const [userdata, setUserData] = useContext(UserContext);
  const [message, setMessage] = useState([
    { chattime: "", username: "", message: "", empl_no: "" },
  ]);
  const [chatP, setChatP] = useState("Welcome");
  const [inputmess, setInputMess] = useState("");
  const userDataRef = useRef();
  const messRef = useRef();
  userDataRef.current = userdata;

  const handleSendMessage = () => {
    if(inputmess!="")
    {
      SocketRefContext.current.emit("send", {
        chattime: new Date().toLocaleString(),
        username: userdata.MIDLAST_NAME + " " + userdata.FIRST_NAME,
        message: inputmess,
        empl_no: userdata.EMPL_NO,
      });
      insertchat(userdata.EMPL_NO, inputmess)
        .then((response) => {
          let result = response.data;
          if (result.tk_status == "NG") {
            console.log(result.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setInputMess("");

    }
    else
    {
      swal("Thông báo","Không để trống tin nhắn","error");

    }
    
  };
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      handleSendMessage();
    }
    else if(e.keyCode == 27)
    {
      hidechat();
    }
  };
  const renderChat = (ms) => {
    //console.log(ms);
    let message_p = "";
    for (var ii = 1; ii < ms.length; ii++) {
      if (ms[ii].empl_no != userDataRef.current.EMPL_NO) {
        message_p +=
          "<p class='message'>" +
          "<b style='color: blue'>" +
          ms[ii].chattime.slice(0, 10) +
          " " +
          ms[ii].chattime.slice(11, 19) +
          " </b> : " +
          "<b style='color: red'>" +
          ms[ii].username +
          " </b>: " +
          ms[ii].message +
          "</p>";
      } else {
        message_p +=
          "<p class='message'>" +
          "<b style='color: blue'>" +
          ms[ii].chattime.slice(0, 10) +
          " " +
          ms[ii].chattime.slice(11, 19) +
          " </b> : " +
          "<b style='color: green'>" +
          ms[ii].username +
          " </b>: " +
          ms[ii].message +
          "</p>";
      }
    }
    return message_p;
  };
  const getChat = () => {
    let serverChatArray = [];
    getchat()
      .then((response) => {
        let result = response.data;
        if (result.tk_status == "NG") {
          console.log("No chat");
          messRef.current = message;
        } else {
          let serverChatData = JSON.parse(result.data);
          for (var i = 0; i < serverChatData.length; i++) {
            serverChatArray = [
              ...serverChatArray,
              {
                chattime: serverChatData[i].CHATTIME,
                username:
                  serverChatData[i].MIDLAST_NAME +
                  " " +
                  serverChatData[i].FIRST_NAME,
                message: serverChatData[i].MESSAGE,
                empl_no: serverChatData[i].EMPL_NO,
              },
            ];
          }
          messRef.current = serverChatArray;
          console.log("Server Array");
          console.log(serverChatArray);
          setChatP(renderChat(serverChatArray));
          setMessage(serverChatArray);
          socketJQ();
          return serverChatArray;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getChat();
    SocketRefContext.current.on("send", (data) => {
      setMessage(messRef.current.push(data));
      setChatP(renderChat(messRef.current));
      console.log("messref");
      console.log(messRef.current);
      socketJQ();
    });
    return () => {
      SocketRefContext.current.disconnect();
    };
  }, []);
  return (
    <div id="chat_panel">
      <fieldset>
        <legend>
          <h3>Chat tổng toàn bộ phận QC</h3>
        </legend>
        <b>
          <p id="chat_name">
            {userDataRef.current.MIDLAST_NAME} {userDataRef.current.FIRST_NAME}
          </p>
        </b>
        <div id="chat_content">         
          <span dangerouslySetInnerHTML={{ __html: chatP }}></span>
        </div>
        <input
          id="chat_message"
          placeholder="Viết tin nhắn vào đây."
          value={inputmess}
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
          onChange={(e) => {
            setInputMess(e.target.value);
          }}
        ></input>
        <button
          className="btn-success"
          id="chat_sendMessage"
          onClick={handleSendMessage}
        >
          SEND
        </button>
      </fieldset>
    </div>
  );
}
