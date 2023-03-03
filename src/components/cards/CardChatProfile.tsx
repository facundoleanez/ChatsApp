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
// import Icon from 'react-native-vector-icons/FontAwesome5';
import {GlobalContext} from '../../App';
import {
  deleteLastMessageContacts,
  getDataLocal,
  removeConversationLocal,
} from '../../controllers/localStorage';
import {ContactType} from '../../utils/types';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';
import {RootTabParamList} from '../../navegation';

interface ToggleMenuProps {
  show: boolean;
}
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
const ToggleMenu = styled.View<ToggleMenuProps>`
  display: ${({show}) => (show ? 'flex' : 'none')};
  background-color: ${({theme}) => theme.colors.primaryBackground};
  border: 1px solid ${({theme}) => theme.colors.seccoindaryText};
  border-radius: 15px;
  position: absolute;
  top: 100%;
  left: 50%;
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
  //Render states
  const [contact, setContact] = useState<ContactType>();
  const [showMenu, setShowMenu] = useState(false);
  //Context
  const context = useContext(GlobalContext);
  const chatId = useMemo(() => context?.context.chatId, [context]);
  const setContext = useMemo(() => context?.setContext, [context]);

  const navigation =
    useNavigation<MaterialBottomTabNavigationProp<RootTabParamList>>();

  const getLocalContacts = useCallback(async () => {
    try {
      const contactsLocal: ContactType[] = await getDataLocal('contactList');
      const currentContact = contactsLocal.filter(
        cont => cont.uid === chatId,
      )[0];
      setContact(currentContact);
    } catch (error) {
      console.log('Location: Components/cards/CardChatProfile', error);
    }
  }, [chatId]);

  useEffect(() => {
    getLocalContacts();
  }, [getLocalContacts]);

  const handlePressDelete = () => {
    if (chatId && setContext) {
      deleteLastMessageContacts(chatId);
      removeConversationLocal(chatId);
      navigation.navigate('Conversations');
      setShowMenu(false);
      setContext(prev => ({...prev, chatId: ''}));
      console.log(chatId);
    }
  };

  return (
    <CardContainer style={{elevation: 20}}>
      <Avatar />
      <View>
        {contact && <ProfileName>{contact.name}</ProfileName>}
        <Status>On line</Status>
      </View>
      {/* <Button>
        <Icon name="phone" size={20} />
      </Button>
      <Button>
        <Icon name="video" size={20} />
      </Button> */}
      <View>
        <Button onPress={() => setShowMenu(prev => !prev)}>
          <Icons name={'dots-vertical'} size={25} />
        </Button>

        <ToggleMenu show={showMenu}>
          <Button onPress={handlePressDelete}>
            <Icons name={'delete'} size={20} />
          </Button>
        </ToggleMenu>
      </View>
    </CardContainer>
  );
};

export default CardChatProfile;
