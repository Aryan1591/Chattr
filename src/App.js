import React, { useEffect, useState } from 'react'
import {FormControl, Input , Typography, Box} from '@mui/material'
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import FlipMove from 'react-flip-move'
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';

function App() {
  const [input,setInput]= useState('');
  const [messages,setMessages]= useState([]);
  const [username,setUsername]= useState('');
  const [latitudeVal,setLatitudeVal]= useState(null);
  const [longitudeVal,setLongitudeVal]= useState(null);

 console.log(latitudeVal)
 console.log(longitudeVal)

  useEffect(()=>{
  
     db.collection('messages')
     .orderBy('timestamp','desc')
     .onSnapshot(snapshot =>{
       setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
     })
  },[])

  useEffect(() => {
    // Get the user's current position when the component mounts
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLatitudeVal(position.coords.latitude);
        setLongitudeVal(position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(()=>{
   
    setUsername(prompt('Please Enter your name'))

    
  },[])
   const sendMessage = (event) =>{
    event.preventDefault();

     db.collection('messages').add({
       message: input,
       username : username,
       timestamp : firebase.firestore.FieldValue.serverTimestamp(),
       latitude: latitudeVal,
       longitude: longitudeVal,
     })
    //  setMessages([...messages,{username:username, text:input}]);
     setInput("");
   

   }


  return (
    <div className="App">
       <Box>
      <Typography variant='h4' color='primary'>Welcome {username}</Typography>
      </Box>
      <form className='app__form'>
        <FormControl className='app__formControl'>
           {/* <InputLabel>Enter a message</InputLabel> */}
           <Input className='app__input' placeholder='Enter a message...'value={input} onChange={e => setInput(e.target.value)}/>

           <IconButton className='app__iconButton' type='submit' disabled={!input} variant='contained' color='primary' onClick={sendMessage}>
                  <SendIcon/>
           </IconButton>


           {/* <Button type='submit' disabled={!input} variant='contained' color='primary' onClick={sendMessage}>Send Message</Button> */}
     
        </FormControl>
     
      </form>
      <FlipMove>
      {
         messages.map(({id,message})=>(
           <Message key={id} username={username} message={message}/>
          
         ))
      }
      </FlipMove>
    
    </div>
  );
}

export default App;
