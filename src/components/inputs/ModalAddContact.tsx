import React, {useEffect, useState, FC} from 'react';
import {TextInput} from 'react-native-paper';
import styled, {useTheme} from 'styled-components/native';
import {addContact} from '../../controllers/actions';
import Loading from '../../screens/Loading';
import {ContactType} from '../../utils/types';
import MainButton from '../buttons/MainButton';
import Alert from '../text/Alert';
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

interface ModalAddContactProps {
  setContacts: React.Dispatch<React.SetStateAction<ContactType[]>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalAddContact: FC<ModalAddContactProps> = ({
  setContacts,
  setShowModal,
}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
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
    try {
      const newContactAdded = await addContact(email);
      if (newContactAdded) {
        setContacts(prev => [...prev, newContactAdded]);
        setLoading(false);
        setShowModal(false);
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.log(
        'Location: components/inputs/ModalAddContacts handlePressSend()',
        error,
      );
    } finally {
      setEmail('');
      setUsername('');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showAlert) {
      let time = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => {
        clearTimeout(time);
      };
    }
  }, [showAlert]);

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
      </FormSection>
      {showAlert && (
        <Alert text={'Email or username not found'} type={'danger'} />
      )}
      <MainButton title={'Send request'} handlePress={handlePressSend} />
    </ModalContainer>
  );
};

export default ModalAddContact;
