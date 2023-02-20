import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-paper';
import styled, {useTheme} from 'styled-components/native';
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
  //Form States
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  //Render States
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

  return (
    <ModalContainer>
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
      </FormSection>
      <MainButton
        title={'Send request'}
        handlePress={() => console.log('pressed')}
      />
    </ModalContainer>
  );
};

export default ModalAddContact;
