import React from 'react';
import styled, {useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

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

const InputSendMessage = () => {
  const theme = useTheme();
  return (
    <InputContainer>
      <InputPill placeholder="Hola" />
      <ButtomSend>
        <Icon name="send" size={20} color={theme.colors.seccoindaryText} />
      </ButtomSend>
    </InputContainer>
  );
};

export default InputSendMessage;
