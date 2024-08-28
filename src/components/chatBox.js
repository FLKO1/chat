import React, { useEffect, useState } from "react";
import Mensaje from "./Mensaje";

function ChatBox(){
const [mensaje, setMensaje]= useState([]);
const [input, setInput]= useState('');
const[isUserTurn, setIsUserTurn]=useState(true);

//Carga mensajes desde el localStorage
useEffect(()=>{
    const savedMessages = JSON.parse(localStorage.getItem('mensaje')) || [];
    setMensaje(savedMessages)
}, []);

//Guarda mensajes en el localStorage
const handleSend =()=>{
    if(input.trim()) {
       const newMessage= {
        sender:isUserTurn ? 'Tu' : 'Asitente',
        text: input
       } 

       const updateMessage = [...mensaje, newMessage]
       setMensaje(updateMessage)
       setInput('')
       setIsUserTurn(!isUserTurn)

       localStorage.setItem('mensaje',JSON.stringify(updateMessage))
    }
}

 
return(
<div className="ChatBox">
    <div className="mensaje">
        {mensaje.map((msg,index)=>(
            <div key ={index}>
                <strong>{msg.sender === 'user' ? 'Bot' : 'Tu'}</strong>   
                <Mensaje text={msg.text}/>      
            </div>
     
            ))}
    </div>
    <div className="inputbox">
            <input
            type="text"
            value={input}
            onChange={(e)=>setInput(e.target.value)} 
            placeholder="Habla conmigo!"></input>
            <button onClick={handleSend}>Enviar</button>
    </div>
</div>
);
}

export default ChatBox;