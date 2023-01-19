import React from 'react';
import MessagePill from '../components/data-display/MessagePill';
import {ConversationList} from '../utils/constants';
import styled from 'styled-components/native';
import CardChatProfile from '../components/cards/CardChatProfile';
import InputSendMessage from '../components/inputs/InputSendMessage';

const ChatContainer = styled.View`
  width: 100%;
  flex: 1;
`;
const MessageList = styled.ScrollView`
  flex: 1;
`;

const Chat = () => {
  return (
    <ChatContainer>
      <CardChatProfile />
      <MessageList>
        {ConversationList[0].messages.map(message => (
          <MessagePill message={message} key={message.id} uid={'000001'} />
        ))}
      </MessageList>
      <InputSendMessage />
    </ChatContainer>
  );
};

export default Chat;
