import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import CardContact from '../components/cards/CardContact';
import SubTitle from '../components/text/SubTitle';
import {getData} from '../controllers/localStorage';
import {ContactType} from '../utils/types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Modal, Portal} from 'react-native-paper';
import ModalAddContact from '../components/inputs/ModalAddContact';

const Container = styled.View`
  border: 0px solid ${({theme}) => theme.colors.seccoindaryText};
  border-bottom-width: 1px;
  /* border-top-width: 1px; */
  flex: 1;
`;
const TopMargin = styled.View`
  background-color: ${({theme}) => theme.colors.primaryBackground};
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
  border: 0px solid ${({theme}) => theme.colors.seccoindaryText};
  border-bottom-width: 1px;
  height: 32px;
  border-left-width: 1px;
  border-right-width: 1px;
`;

const ButtonPlus = styled.TouchableOpacity`
  border: 2px solid ${({theme}) => theme.colors.seccoindaryText};
  position: absolute;
  height: 45px;
  width: 45px;
  border-radius: 30px;
  background-color: ${({theme}) => theme.colors.primaryBackground};
  bottom: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;
const styles = StyleSheet.create({
  borderShadow: {
    elevation: 20,
  },
});

const Contacts = () => {
  //Render states
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const theme = useTheme();

  const getContacts = async () => {
    const cont = await getData('contacts');
    if (cont) {
      setContacts(cont);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <Container>
      <TopMargin style={styles.borderShadow} />
      {contacts[0] ? (
        contacts.map(contact => (
          <CardContact
            key={contact.uid}
            uid={contact.uid}
            name={contact.name}
          />
        ))
      ) : (
        <SubTitle text={'Nothing to show'} />
      )}

      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(false)}>
          <ModalAddContact />
        </Modal>
      </Portal>
      <ButtonPlus
        style={styles.borderShadow}
        onPress={() => setIsModalVisible(true)}>
        <Icon name="plus" size={20} color={theme.colors.seccoindaryText} />
      </ButtonPlus>
    </Container>
  );
};

export default Contacts;
