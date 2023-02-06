import React, {useContext, useEffect, useMemo, useState} from 'react';
import MessagePill from '../components/data-display/MessagePill';
import styled from 'styled-components/native';
import CardChatProfile from '../components/cards/CardChatProfile';
import InputSendMessage from '../components/inputs/InputSendMessage';
import {GlobalContext} from '../App';
import {getData} from '../controllers/localStorage';
import {ConversationType} from '../utils/types';

const ChatContainer = styled.View`
  width: 100%;
  flex: 1;
`;
const MessageList = styled.ScrollView`
  flex: 1;
`;

const Chat = () => {
  const context = useContext(GlobalContext);
  const chatId = useMemo(() => context?.context.chat, [context]);
  const [chat, setChat] = useState<ConversationType>();

  const getChat = async (id: string) => {
    const chatConv = await getData(id);
    setChat(chatConv);
  };

  useEffect(() => {
    if (chatId) {
      getChat(chatId);
    }
  }, [chatId]);

  return (
    <ChatContainer>
      <CardChatProfile />
      <MessageList>
        {chat &&
          chat.messages.map(message => (
            <MessagePill message={message} key={message.id} uid={'000001'} />
          ))}
      </MessageList>
      <InputSendMessage />
    </ChatContainer>
  );
};

export default Chat;
