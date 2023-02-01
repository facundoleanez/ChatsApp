import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
// import imgProfile from '../imgs/profile.png';
import styled from 'styled-components/native';
import Avatar from '../components/data-display/Avatar';
import auth from '@react-native-firebase/auth';

interface ContainerProps {
  dark?: boolean;
}

const Container = styled.View<ContainerProps>`
  background-color: ${({theme}) => theme.colors.primaryBackground};
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 0px solid ${({theme}) => theme.colors.seccoindaryText};
  border-left-width: 1px;
  border-right-width: 1px;
`;
const styles = StyleSheet.create({
  sectionContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'green',
  },
  sectionTitle: {
    fontSize: 20,
    // fontWeight: '600',
  },
  profileImg: {
    width: 30,
    height: 30,
  },
  avatar: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'grey',
    padding: 3,
  },
});

const TopBar = () => {
  const logOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return (
    <Container>
      <Text style={styles.sectionTitle}>Chat Assssspp</Text>
      <TouchableOpacity onPress={logOut}>
        <Avatar size={30} />
      </TouchableOpacity>
    </Container>
  );
};

export default TopBar;
