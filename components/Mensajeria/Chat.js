import React from 'react';
import {Chat, ChatInfo, ChatIcons} from '../ui/Forchat';
import Messages from './Messages';
import Input from './Input';

const chat = () => {
  return (
    <Chat>
      <ChatInfo>
        <span>Aleja</span>
        <ChatIcons>
          <img src='https://cdn-icons-png.flaticon.com/512/1160/1160194.png' alt='Más'/>
        </ChatIcons>
      </ChatInfo>
      <Messages/>
      <Input/>
    </Chat>
  )
}

export default chat