import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Message, MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';
import axios from './axios';

function Chat({ messages }) {

    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');

    // get random avatar
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    // submit msg process
    const sendMessage = async (e) => {
        e.preventDefault();
        //console.log(input);
        
        await axios.post('/messages/new', {
            message: input,
            name:'demo',
            timestamp:'just now',
            received:false,
        })
        
        setInput('');
    };

    return (
        <div className='chat'>
            
            <div className='chat__header'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
           
            <div className='chat__headerInfo'>
                <h3>Room Name</h3>
                <p>Last seen at...</p>
            </div>

            <div className='chat__headerRight'>
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>
            </div>            

            <div className='chat__body'>
                {messages.map( (message) => (
                   <p className={`chat__message ${message.received && 'chat__receiver'}`}>
                   <span className='chat__name'>
                       {message.name}
                   </span>
                   {message.message}
                   <span className='chat__timestamp'>{message.timestamp}</span>
                    </p>     
                ))}                
            </div>

            <div className='chat__footer'>
                <InsertEmoticon />
                <form>
                    <input
                    value={input} onChange={(e) => setInput(e.target.value)} 
                    placeholder='Type a message'
                    type='text' />
                    <button onClick={sendMessage} type='submit'>Send a message</button>
                </form>
                <MicIcon />
            </div>            

        </div>
    )
}

export default Chat
