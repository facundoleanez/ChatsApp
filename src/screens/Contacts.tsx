import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import CardContact from '../components/cards/CardContact';
import {getData} from '../controllers/localStorage';
import {ContactType} from '../utils/types';

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
const styles = StyleSheet.create({
  borderShadow: {
    elevation: 20,
  },
});

const Contacts = () => {
  const [contacts, setContacts] = useState<ContactType[]>([]);

  const getContacts = async () => {
    const cont = await getData('contacts');
    setContacts(cont);
    console.log(cont);
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <Container>
      <TopMargin style={styles.borderShadow} />
      {contacts.map(contact => (
        <CardContact key={contact.uid} uid={contact.uid} name={contact.name} />
      ))}
    </Container>
  );
};

export default Contacts;
