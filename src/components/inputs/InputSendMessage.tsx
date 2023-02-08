import React, {FC, useContext, useEffect, useMemo, useState} from 'react';
import styled, {useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalContext} from '../../App';
import {MessageType} from '../../utils/types';

const InputContainer = styled.View`
  background-color: ${({theme}) => theme.colors.primaryBackground};
  display: flex;
  flex-direction: row;
  padding: 15px;
  align-items: center;
  justify-content: space-around;
  border: solid 0px ${({theme}) => theme.colors.seccoindaryText};
  border-top-width: 1px;
`;

const InputPill = styled.TextInput`
  border: 2px solid ${({theme}) => theme.colors.seccoindaryText};
  border-radius: 30px;
  width: 70%;
  height: 40px;
  padding-left: 20px;
`;

const ButtomSend = styled.TouchableOpacity`
  border: 2px solid ${({theme}) => theme.colors.seccoindaryText};
  border-radius: 30px;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

interface InputSendMessageProps {
  setChat: React.Dispatch<React.SetStateAction<MessageType[]>>;
}

const InputSendMessage: FC<InputSendMessageProps> = ({setChat}) => {
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const context = useContext(GlobalContext);
  const uid = useMemo(() => context?.context.uid, [context]);
  const chatId = useMemo(() => context?.context.chatId, [context]);

  const handlePressSend = () => {
    if (uid && chatId && message) {
      const newMessage: MessageType = {
        date: new Date(),
        senderId: uid,
        recipentId: chatId,
        message: message,
      };
      setChat(prev => [...prev, newMessage]);
      setMessage('');
    }
  };

  return (
    <InputContainer>
      <InputPill
        placeholder="Write your message"
        value={message}
        onChangeText={setMessage}
        autoFocus={true}
      />
      <ButtomSend onPress={handlePressSend}>
        <Icon name="send" size={20} color={theme.colors.seccoindaryText} />
      </ButtomSend>
    </InputContainer>
  );
};

export default InputSendMessage;
