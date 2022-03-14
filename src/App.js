import logo from './logo.svg';
import './App.css';
import{useEffect, useState} from "react"
const { io } = require("socket.io-client");

//const socket = io();
const socket = io("http://localhost:4000",{ transports : ['websocket'] });
socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", () => {
  console.log(socket.id); // undefined
});

function App() {
  const[messages,setMessage]=useState("");
  const[liveData,setLiveData]=useState("");
  const[arr,setArr]=useState([])
  socket.on('chat message', (msg)=> {
    console.log(msg);
    setLiveData(msg)
      
  })
  console.log(messages);
  useEffect(()=>{
    if(liveData!="")
  {
    let array=[...arr];
    array.push(liveData)
    setArr(array)

  }
 

  },[liveData])
  
  console.log(arr);
  return (
    <>
    <ul id="messages">
      {
        arr.map((e)=>{
          return(
            <li>{e}</li>

          )
        })
      }
     
    </ul>
    
      <input id="input" autocomplete="off" onKeyUp={(e)=>{
        setMessage(e.currentTarget.value)
      }} /><button onClick={()=>{
        socket.emit('chat message', messages);
      }}>Send</button>
    
    </>
  );
}

export default App;
