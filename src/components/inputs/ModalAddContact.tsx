import React, {useEffect, useState, useContext, useMemo} from 'react';
import {TextInput} from 'react-native-paper';
import styled, {useTheme} from 'styled-components/native';
import {GlobalContext} from '../../App';
import {addContact} from '../../controllers/actions';
import Loading from '../../screens/Loading';
import TestingStorage from '../../utils/TestingStorage';
import MainButton from '../buttons/MainButton';
import SubTitle from '../text/SubTitle';

const ModalContainer = styled.View`
  padding: 20px;
  background-color: ${({theme}) => theme.colors.primaryBackground};
  padding-bottom: 40px;
`;
const Title = styled.Text`
  font-size: 40px;
  color: ${({theme}) => theme.colors.primary};
  font-weight: 500;
  align-self: center;
  margin: 25px;
`;
const FormSection = styled.View`
  margin: 40px;
`;

const ModalAddContact = () => {
  //Context
  const context = useContext(GlobalContext);
  const uid = useMemo(() => context?.context.uid, [context]);
  //Form States
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  //Render States
  const [loading, setLoading] = useState(false);
  const [isDisabledEmail, setIsDisabledEmail] = useState(false);
  const [isDisableUsername, setIsDisableUsername] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    if (email) {
      setIsDisableUsername(true);
    } else {
      setIsDisableUsername(false);
    }
    if (username) {
      setIsDisabledEmail(true);
    } else {
      setIsDisabledEmail(false);
    }
  }, [email, username]);

  const handlePressSend = async () => {
    setLoading(true);
    if (uid) {
      await addContact(uid, email);
      setEmail('');
      setUsername('');
      setLoading(false);
    }
  };

  return (
    <ModalContainer>
      {loading && <Loading />}
      <Title>Add a contact</Title>
      <FormSection>
        <TextInput
          disabled={isDisabledEmail}
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
        />
        <SubTitle text="Or" />
        <TextInput
          disabled={isDisableUsername}
          autoComplete="email"
          blurOnSubmit={false}
          keyboardType="email-address"
          maxLength={256}
          textContentType="emailAddress"
          returnKeyType="next"
          returnKeyLabel="Next"
          style={{
            backgroundColor: theme.colors.primaryBackground,
          }}
          label="Username"
          value={username}
          onChangeText={setUsername}
          activeUnderlineColor={theme.colors.primary}
          underlineColor={theme.colors.secondary}
          // onSubmitEditing={handleFocus}
        />
        <TestingStorage />
      </FormSection>
      <MainButton title={'Send request'} handlePress={handlePressSend} />
    </ModalContainer>
  );
};

export default ModalAddContact;
