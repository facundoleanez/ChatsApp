import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import styled, {useTheme} from 'styled-components/native';
import MainButton from '../components/buttons/MainButton';

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
const ButtonSecondary = styled.Text`
  font-size: 20px;
  color: ${({theme}) => theme.colors.primary};
  margin: 10px;
`;

const LogIn = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <TextInput
          autoComplete="email"
          autoFocus={true}
          blurOnSubmit={false}
          style={{
            backgroundColor: theme.colors.primaryBackground,
          }}
          label="Email"
          value={email}
          onChangeText={setEmail}
          activeUnderlineColor={theme.colors.primary}
          underlineColor={theme.colors.secondary}
        />
        <TextInput
          autoComplete="off"
          blurOnSubmit={true}
          style={{backgroundColor: theme.colors.primaryBackground}}
          label="Password"
          value={password}
          onChangeText={setEmail}
          activeUnderlineColor={theme.colors.primary}
          underlineColor={theme.colors.secondary}

          //   onChangeText={text => setText(text)}
        />
      </InputContainer>
      <ButtonSecondary>Forgget your password?</ButtonSecondary>

      <MainButton title={'Login'} handlePress={handlePress} />
      <ViewContainer>
        <SubTitle>Do yoy have an account?</SubTitle>
        <TouchableOpacity>
          <ButtonSecondary>Sign In</ButtonSecondary>
        </TouchableOpacity>
      </ViewContainer>
    </Container>
  );
};

export default LogIn;
