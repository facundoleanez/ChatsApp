import React, {useState, useRef, FC} from 'react';
import {TouchableOpacity, TextInput} from 'react-native';
import {TextInput as TextInputPaper} from 'react-native-paper';
import styled, {useTheme} from 'styled-components/native';
import MainButton from '../components/buttons/MainButton';
import Icons from 'react-native-vector-icons/Feather';
import TextButton from '../components/buttons/TextButton';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import Loading from './Loading';
import {createAuthUser} from '../controllers/firebaseAuth';

interface SignUpProps {
  navigation: NavigationProp<ParamListBase>;
}

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
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [prossesing, setProssesing] = useState(false);

  const inputPasswordRef = useRef<TextInput>(null);
  const inputPassword2Ref = useRef<TextInput>(null);

  const handlePress = async () => {
    setProssesing(true);
    try {
      if (email && password) {
        const res = await createAuthUser(email, password);
        console.log(res);
        setEmail('');
        setPassword('');
        setPassword2('');
        setProssesing(false);
      }
    } catch (error) {
      setProssesing(false);
      console.error(error);
    }
  };

  const handleFocus = () => {
    inputPasswordRef.current?.focus();
  };

  return (
    <Container>
      {prossesing && <Loading />}

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

      {/* TODO: Implement sign in with sotial */}

      {/* <Divider /> */}

      {/* <View>
        <SocialSigninButton>
          <Icon name="facebook" size={25} />
          <SubTitle>Signup with facebook</SubTitle>
        </SocialSigninButton>
        <SocialSigninButton>
          <Icon name="gmail" size={25} />
          <SubTitle>Signup with gmail</SubTitle>
        </SocialSigninButton>
      </View> */}
      <ViewContainer>
        <SubTitle>Already have an account?</SubTitle>
        <TextButton text={'Login'} handlePress={() => navigation.goBack()} />
      </ViewContainer>
    </Container>
  );
};

export default SignUp;
