import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import {ScrollView} from 'react-native';

import MessagePill from '../components/data-display/MessagePill';
import styled from 'styled-components/native';
import CardChatProfile from '../components/cards/CardChatProfile';
import InputSendMessage from '../components/inputs/InputSendMessage';
import {GlobalContext} from '../App';
import {getData, storeData} from '../controllers/localStorage';
import {MessageType} from '../utils/types';
import SubTitle from '../components/text/SubTitle';
import {StyleSheet} from 'react-native';

const ChatContainer = styled.View`
  width: 100%;
  flex: 1;
`;
const MessageList = styled.ScrollView`
  flex: 1;
`;
const TopMargin = styled.View`
  background-color: ${({theme}) => theme.colors.primaryBackground};
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
  border: 0px solid ${({theme}) => theme.colors.seccoindaryText};
  border-bottom-width: 1px;
  height: 32px;
  border-left-width: 1px;
  border-right-width: 1px;
`;
const styles = StyleSheet.create({
  borderShadow: {
    elevation: 20,
  },
});
const Chat = () => {
  const [chat, setChat] = useState<MessageType[]>([]);
  const context = useContext(GlobalContext);
  const chatId = useMemo(() => context?.context.chatId, [context]);
  const scrollViewRef = useRef<ScrollView>(null);
  const getChat = useCallback(async () => {
    if (chatId) {
      const chatConv: MessageType[] = await getData(chatId);
      const chats = chatConv.map(cha => ({...cha, date: new Date(cha.date)}));
      setChat(chats);
    }
  }, [chatId]);
  useEffect(() => {
    getChat();
  }, [getChat]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
    if (chatId) {
      storeData(chatId, chat);
      console.log('Changed Chat Id to ' + chatId);
    }
  }, [chat, chatId]);

  return (
    <ChatContainer>
      {chat[0] ? (
        <>
          <CardChatProfile />
          <MessageList ref={scrollViewRef}>
            {chat[0] &&
              chat.map(message => (
                <MessagePill
                  message={message}
                  key={JSON.stringify(message.date)}
                />
              ))}
          </MessageList>
          <InputSendMessage setChat={setChat} />
        </>
      ) : (
        <>
          <TopMargin style={styles.borderShadow} />
          <SubTitle text={'No chat selected'} />
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;
