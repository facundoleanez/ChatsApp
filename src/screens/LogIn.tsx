import React, {useState, useRef} from 'react';
import {TouchableOpacity, TextInput} from 'react-native';
import {TextInput as TextInputPaper} from 'react-native-paper';
import styled, {useTheme} from 'styled-components/native';
import MainButton from '../components/buttons/MainButton';
import Icons from 'react-native-vector-icons/Feather';
import TextButton from '../components/buttons/TextButton';

//Views
const Container = styled.View`
  background-color: ${({theme}) => theme.colors.primaryBackground};
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;
const InputContainer = styled.View`
  width: 100%;
  margin-top: 50px;
  margin-bottom: 10px;
`;
const ViewContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
//Texts
const Title = styled.Text`
  font-size: 40px;
  color: ${({theme}) => theme.colors.primary};
  font-weight: 500;
`;
const SubTitle = styled.Text`
  font-size: 15px;
  color: ${({theme}) => theme.colors.seccoindaryText};
`;

const LogIn = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const inputPasswordRef = useRef<TextInput>(null);

  const handlePress = () => {
    console.log(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <Container>
      <Title>Login</Title>
      <SubTitle>Sign in your account to see your chat</SubTitle>
      <InputContainer>
        <TextInputPaper
          autoComplete="email"
          autoFocus={true}
          blurOnSubmit={false}
          keyboardType="email-address"
          maxLength={256}
          textContentType="emailAddress"
          style={{
            backgroundColor: theme.colors.primaryBackground,
          }}
          label="Email"
          value={email}
          onChangeText={setEmail}
          activeUnderlineColor={theme.colors.primary}
          underlineColor={theme.colors.secondary}
        />
        <TextInputPaper
          autoComplete="off"
          blurOnSubmit={true}
          keyboardType="default"
          maxLength={6}
          secureTextEntry={secureText}
          textContentType="password"
          style={{backgroundColor: theme.colors.primaryBackground}}
          label="Password"
          value={password}
          onChangeText={setPassword}
          activeUnderlineColor={theme.colors.primary}
          underlineColor={theme.colors.secondary}
          right={
            <TouchableOpacity onPress={() => setSecureText(prev => !prev)}>
              <Icons name="eye" size={10} />
            </TouchableOpacity>
          }
          ref={inputPasswordRef}
        />
      </InputContainer>
      <TextButton
        text={'Forget your password?'}
        handlePress={() => console.log('clecked')}
      />
      <Icons name="eye" size={10} />
      <MainButton title={'Login'} handlePress={handlePress} />
      <ViewContainer>
        <SubTitle>Do yoy have an account?</SubTitle>
        <TextButton
          text={'Sign In'}
          handlePress={() => console.log('clecked')}
        />
      </ViewContainer>
    </Container>
  );
};

export default LogIn;
