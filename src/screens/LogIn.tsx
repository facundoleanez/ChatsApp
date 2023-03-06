import React, {useState, useRef, FC} from 'react';
// import {View} from 'react-native';
import {TouchableOpacity, TextInput} from 'react-native';
import {TextInput as TextInputPaper} from 'react-native-paper';
import styled, {useTheme} from 'styled-components/native';
import MainButton from '../components/buttons/MainButton';
import Icons from 'react-native-vector-icons/Feather';
import TextButton from '../components/buttons/TextButton';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Loading from './Loading';
import {getDeviceTokenLog} from '../controllers/actions';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface LogInProps {
  navigation: NavigationProp<ParamListBase>;
}
//Views
const Container = styled.View`
  background-color: ${({theme}) => theme.colors.primaryBackground};
  flex: 1;
  justify-content: space-around;
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
// const Divider = styled.View`
//   border: solid 1px ${({theme}) => theme.colors.secondary};
//   width: 100%;
//   margin: 20px;
// `;
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
//Buttons
export const SocialSigninButton = styled.TouchableOpacity`
  font-size: 20px;
  background-color: ${({theme}) => theme.colors.secondary};
  border-radius: 20px;
  width: 100%;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 5px;
  flex-direction: row;
  justify-content: space-evenly;
`;

const LogIn: FC<LogInProps> = ({navigation}) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [prossesing, setProssesing] = useState(false);

  const inputPasswordRef = useRef<TextInput>(null);

  const handlePress = () => {
    setProssesing(true);
    console.log(email, password);
    setEmail('');
    setPassword('');
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log('User account created & signed in!');
        getDeviceTokenLog(userCredential.user.uid);
        setProssesing(false);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          setProssesing(false);
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setProssesing(false);
        }

        console.error(error);
        setProssesing(false);
      });
  };
  const handleFocus = () => {
    inputPasswordRef.current?.focus();
  };

  return (
    <Container>
      {prossesing && <Loading />}
      <Title>Welcome Back</Title>
      <SubTitle>Sign in your account to see your chat</SubTitle>
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
          maxLength={6}
          secureTextEntry={secureText}
          textContentType="password"
          returnKeyType="send"
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
      {/* <TextButton
        text={'Forget your password?'}
        handlePress={() => console.log('clecked')}
      /> */}

      <MainButton title={'Login'} handlePress={handlePress} />

      {/* <Divider /> */}

      {/* <View>
        <SocialSigninButton>
          <Icon name="facebook" size={25} />
          <SubTitle>Login with facebook</SubTitle>
        </SocialSigninButton>
        <SocialSigninButton>
          <Icon name="gmail" size={25} />
          <SubTitle>Login with gmail</SubTitle>
        </SocialSigninButton>
      </View> */}

      <ViewContainer>
        <SubTitle>Do yoy have an account?</SubTitle>
        <TextButton
          text={'Sign Up'}
          handlePress={() => navigation.navigate('Signup')}
        />
      </ViewContainer>
    </Container>
  );
};

export default LogIn;
