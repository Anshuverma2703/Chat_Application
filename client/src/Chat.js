import React, { useEffect, useState } from 'react'
import ScrolToBottom from 'react-scroll-to-bottom'
// import { Socket } from 'socket.io-client';

function Chat(props) {
  // console.log(props);
  const [currentMessage , setcurrentMessage] = useState(""); 
  const [Messagelist , setmessagelist] = useState([]); 


  const sendMessage = async ()=>{
    if(currentMessage !== ""){
      const messageData = {
        key:new Date(Date.now()).getHours()+":" +new Date(Date.now()).getMinutes(),
        room : props.roomID,
        author:props.username,
        message:currentMessage,
        time:new Date(Date.now()).getHours()+":" +new Date(Date.now()).getMinutes(),
      };
      await props.socket.emit("send_Message" , messageData);
      setmessagelist((list)=>[...list , messageData])
      console.log( "this is in the list send message",Messagelist);
      setcurrentMessage("");
    }
  }

  useEffect(()=>{
    props.socket.on("receive_message" , (data)=>{
      setmessagelist((list)=>[...list , data])
      console.log("this is recieve data" ,data);
      console.log(props.socket)
    })
    console.log("useeffect")
  },[props.socket]);


  return (
    <>
    <div  className='chat-window'>
      <div className='chat-header' >
        <p>Live chat</p>
      </div>
      <div className='chat-body' >
        <ScrolToBottom className='message-container'>

        {
          Messagelist.map((messageContent,i)=>{
            return(
              <>
                <div className='message' key={i} id={props.username === messageContent.author ? "you" : "other"}>
                  <div >
                    <div className='message-content'>
                      <p>{messageContent.message}</p>
                    </div>
                    <div className='message-meta'>
                      <p id='time' >{messageContent.time}</p>
                      <p id='author' >{messageContent.author}</p>
                    </div>


                  </div>

                </div>
              </>
            )
          })
        }
        </ScrolToBottom>

      </div>
      <div className='chat-footer' >
        <input type="text" value={currentMessage} placeholder="hey .." onChange={(e)=>{setcurrentMessage(e.target.value)}} onKeyDown ={(event)=>{
          event.key === "Enter" && sendMessage();
        }} />
        <button onClick={sendMessage} >&#9658;</button>
      </div>
    </div>
    </>
  )
}

export default Chat;