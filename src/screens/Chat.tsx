import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import MessagePill from '../components/data-display/MessagePill';
import styled from 'styled-components/native';
import CardChatProfile from '../components/cards/CardChatProfile';
import InputSendMessage from '../components/inputs/InputSendMessage';
import {GlobalContext} from '../App';
import {getData, storeData} from '../controllers/localStorage';
import {MessageType} from '../utils/types';

const ChatContainer = styled.View`
  width: 100%;
  flex: 1;
`;
const MessageList = styled.ScrollView`
  flex: 1;
`;

const Chat = () => {
  const context = useContext(GlobalContext);
  const chatId = useMemo(() => context?.context.chatId, [context]);

  const [chat, setChat] = useState<MessageType[]>([]);

  const getChat = useCallback(async () => {
    if (chatId) {
      const chatConv = await getData(chatId);
      setChat(chatConv);
    }
  }, [chatId]);

  useEffect(() => {
    getChat();
  }, [getChat]);

  useEffect(() => {
    if (chatId) {
      storeData(chatId, chat);
    }
  }, [chat, chatId]);

  return (
    <ChatContainer>
      <CardChatProfile />
      <MessageList>
        {chat &&
          chat.map(message => (
            <MessagePill message={message} key={JSON.stringify(message.date)} />
          ))}
      </MessageList>
      <InputSendMessage setChat={setChat} />
    </ChatContainer>
  );
};

export default Chat;
