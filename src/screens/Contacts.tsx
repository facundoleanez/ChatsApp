import React from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import CardContact from '../components/cards/CardContact';

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
  return (
    <Container>
      <TopMargin style={styles.borderShadow} />
      <CardContact name={'Sebastian montagna'} />
      <CardContact name={'Fer Perez'} />
      <CardContact name={'Beatriz Juarez'} />
      <CardContact name={'Facundo Leanez'} />
    </Container>
  );
};

export default Contacts;
