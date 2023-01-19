import React from 'react';
import {TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import styled, {useTheme} from 'styled-components/native';

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
const H2 = styled.Text`
  font-size: 25px;
  color: ${({theme}) => theme.colors.primaryBackground};
  font-weight: 500;
`;
//Buttons
const ButtonSubmit = styled.TouchableOpacity`
  font-size: 20px;
  background-color: ${({theme}) => theme.colors.primary};
  border-radius: 20px;
  width: 100%;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 20px;
  padding: 5px;
`;

const LogIn = () => {
  const theme = useTheme();
  return (
    <Container>
      <Title>Login</Title>
      <SubTitle>Sign in your account to see your chat</SubTitle>
      <InputContainer>
        <TextInput
          style={{
            backgroundColor: theme.colors.primaryBackground,
          }}
          label="Email"
          value={'as'}
          //   onChangeText={text => setText(text)}
          activeUnderlineColor={theme.colors.primary}
          underlineColor={theme.colors.secondary}
        />
        <TextInput
          style={{backgroundColor: theme.colors.primaryBackground}}
          label="Password"
          value={'as'}
          //   outlineColor={theme.colors.primary}
          activeUnderlineColor={theme.colors.primary}
          underlineColor={theme.colors.secondary}

          //   onChangeText={text => setText(text)}
        />
      </InputContainer>
      <ButtonSecondary>Forgget your password?</ButtonSecondary>
      <ButtonSubmit style={{elevation: 10}}>
        <H2>LogIn</H2>
      </ButtonSubmit>
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
