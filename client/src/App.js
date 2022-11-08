import "./App.css";
import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setusername] = useState("");
  const [roomID, setRoomID] = useState("");
  const [showchat, setshowchat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && roomID !== "") {
      socket.emit("join_room", roomID);
      setshowchat(true);
    }
  };

  return (
    <div className="App">
      {!showchat ? (
        <div className="joinChatContainer">
          <h3> Join A Chat</h3>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(e) => {
              setRoomID(e.target.value);
            }}
          />
          <button onClick={joinRoom}>Join a Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} roomID={roomID} />
      )}
    </div>
  );
}

export default App;
