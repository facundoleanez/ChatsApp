import React, {FC, useContext, useMemo, useState} from 'react';
import styled from 'styled-components/native';
import {GlobalContext} from '../../App';
import {MessageType} from '../../utils/types';

interface ChatPillProps {
  isSender?: boolean;
}
const ChatPill = styled.TouchableOpacity<ChatPillProps>`
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  border-bottom-right-radius: ${({isSender}) => (isSender ? '5px' : '32px')};
  border-bottom-left-radius: ${({isSender}) => (isSender ? '32px' : '5px')};
  max-width: 85%;
  background-color: ${({theme, isSender}) =>
    isSender ? theme.colors.secondary : theme.colors.primaryBackground};
`;
const MessageText = styled.Text`
  color: ${({theme}) => theme.colors.primaryText};
  margin: 0 10px;
`;
const Container = styled.View<ChatPillProps>`
  width: 100%;
  flex-direction: ${({isSender}) => (isSender ? 'row-reverse' : 'row')};
`;
const ToggleButtonHour = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const TextHour = styled.Text`
  font-size: 11px;
`;
interface MessagePillProps {
  message: MessageType;
}
const MessagePill: FC<MessagePillProps> = ({message}) => {
  //TODO: poner el usememo para que no calcule dos veces
  const [showHour, setShowHour] = useState(false);
  const context = useContext(GlobalContext);
  const uid = useMemo(() => context?.context.uid, [context]);
  return (
    <>
      {showHour && (
        <ToggleButtonHour>
          <TextHour>
            {message.date.getHours() + ':' + message.date.getMinutes()}
          </TextHour>
        </ToggleButtonHour>
      )}
      <Container isSender={message.senderId === uid}>
        <ChatPill
          style={{elevation: 3}}
          isSender={message.senderId === uid}
          onPress={() => setShowHour(prev => !prev)}>
          <MessageText>{message.message}</MessageText>
        </ChatPill>
      </Container>
    </>
  );
};

export default MessagePill;
