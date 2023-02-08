import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import Avatar from '../data-display/Avatar';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {GlobalContext} from '../../App';
import {getData} from '../../controllers/localStorage';
import {ContactType} from '../../utils/types';

const CardContainer = styled.View`
  background-color: ${({theme}) => theme.colors.primaryBackground};
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
  border: 0px solid ${({theme}) => theme.colors.seccoindaryText};
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 15px;
  margin-bottom: 20px;
`;

const ProfileName = styled.Text`
  color: ${({theme}) => theme.colors.primaryText};
  font-size: 17px;
`;
const Status = styled.Text`
  color: ${({theme}) => theme.colors.seccoindaryText};
  font-size: 12px;
`;
const Button = styled.TouchableOpacity`
  color: ${({theme}) => theme.colors.seccoindaryText};
  margin: 10px;
`;

const CardChatProfile = () => {
  const initialStateContact = {uid: '', name: ''};
  const [contact, setContact] = useState<ContactType>(initialStateContact);
  const context = useContext(GlobalContext);
  const chatId = useMemo(() => context?.context.chatId, [context]);

  const getLocalContacts = useCallback(async () => {
    const contactsLocal: ContactType[] = await getData('contacts');
    const currentContact = contactsLocal.filter(cont => cont.uid === chatId)[0];
    setContact(currentContact);
  }, [chatId]);

  useEffect(() => {
    getLocalContacts();
  }, [getLocalContacts]);

  return (
    <CardContainer style={{elevation: 20}}>
      <Avatar />
      <View>
        <ProfileName>{contact.name}</ProfileName>
        <Status>On line</Status>
      </View>
      <Button>
        <Icon name="phone" size={20} />
      </Button>
      <Button>
        <Icon name="video" size={20} />
      </Button>
    </CardContainer>
  );
};

export default CardChatProfile;
