import React, {useState, useRef, FC, useContext} from 'react';
import {TouchableOpacity, TextInput} from 'react-native';
import {TextInput as TextInputPaper} from 'react-native-paper';
import styled, {useTheme} from 'styled-components/native';
import MainButton from '../components/buttons/MainButton';
import Icons from 'react-native-vector-icons/Feather';
import TextButton from '../components/buttons/TextButton';
// import {RootTabParamList} from '../navegation';
// import {useNavigation} from '@react-navigation/core';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {GlobalContext} from '../App';

interface SignUpProps {
  navigation: NavigationProp<ParamListBase>;
}
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

const SignUp: FC<SignUpProps> = ({navigation}) => {
  const context = useContext(GlobalContext);
  const setContext = context?.setContext;
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [secureText, setSecureText] = useState(true);

  const inputPasswordRef = useRef<TextInput>(null);
  const inputPassword2Ref = useRef<TextInput>(null);

  // const navigation = useNavigation<RootTabParamList>();

  const handlePress = () => {
    console.log(email, password);
    setEmail('');
    setPassword('');
    setPassword2('');
    if (setContext) {
      setContext(prev => ({...prev, uid: 'algo'}));
    }
  };
  const handleFocus = () => {
    inputPasswordRef.current?.focus();
  };

  return (
    <Container>
      <Title>Sign Up</Title>
      <SubTitle>Create your new account</SubTitle>
      <InputContainer>
        <TextInputPaper
          autoComplete="email"
          autoFocus={true}
          blurOnSubmit={false}
          keyboardType="email-address"
          maxLength={256}
          textContentType="emailAddress"
          returnKeyType="next"
          returnKeyLabel="Next"
          style={{
            backgroundColor: theme.colors.primaryBackground,
          }}
          label="Email"
          value={email}
          onChangeText={setEmail}
          activeUnderlineColor={theme.colors.primary}
          underlineColor={theme.colors.secondary}
          onSubmitEditing={handleFocus}
        />
        <TextInputPaper
          autoComplete="off"
          blurOnSubmit={true}
          keyboardType="default"
          maxLength={100}
          secureTextEntry={secureText}
          textContentType="password"
          returnKeyType="send"
          style={{backgroundColor: theme.colors.primaryBackground}}
          label="Password"
          value={password}
          onChangeText={setPassword}
          activeUnderlineColor={theme.colors.primary}
          underlineColor={theme.colors.secondary}
          ref={inputPasswordRef}
          onSubmitEditing={() => {
            inputPassword2Ref.current?.focus();
          }}
        />
        <TextInputPaper
          autoComplete="off"
          blurOnSubmit={true}
          keyboardType="default"
          maxLength={100}
          secureTextEntry={secureText}
          textContentType="password"
          returnKeyType="send"
          style={{backgroundColor: theme.colors.primaryBackground}}
          label="Confirm password"
          value={password2}
          onChangeText={setPassword2}
          activeUnderlineColor={theme.colors.primary}
          underlineColor={theme.colors.secondary}
          ref={inputPassword2Ref}
          onSubmitEditing={handlePress}
        />
      </InputContainer>
      {secureText ? (
        <TouchableOpacity onPress={() => setSecureText(prev => !prev)}>
          <Icons name="eye" size={15} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setSecureText(prev => !prev)}>
          <Icons name="eye-off" size={15} />
        </TouchableOpacity>
      )}

      <MainButton title={'Register'} handlePress={handlePress} />
      <ViewContainer>
        <SubTitle>Already have an account?</SubTitle>
        <TextButton text={'Login'} handlePress={() => navigation.goBack()} />
      </ViewContainer>
    </Container>
  );
};

export default SignUp;
