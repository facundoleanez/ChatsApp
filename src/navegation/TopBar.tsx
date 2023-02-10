import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
// import imgProfile from '../imgs/profile.png';
import styled from 'styled-components/native';
import Avatar from '../components/data-display/Avatar';
import auth from '@react-native-firebase/auth';
import {Portal, Modal} from 'react-native-paper';
import TextButton from '../components/buttons/TextButton';
import {clearAll} from '../controllers/localStorage';

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
const ModalMenu = styled.View`
  padding: 20px;
  margin: auto;
  background-color: ${({theme}) => theme.colors.primaryBackground};
  border: 1px solid ${({theme}) => theme.colors.seccoindaryText};
  border-radius: 23px;
  position: absolute;
  top: 0;
  right: 0;
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
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const logOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    clearAll();
  };

  return (
    <Container>
      <Text style={styles.sectionTitle}>Chat Assssspp</Text>
      <TouchableOpacity onPress={showModal}>
        <Avatar size={30} />
        <Portal>
          <Modal visible={visible} onDismiss={hideModal}>
            <ModalMenu>
              {/* <TextButton text={'Profile'} handlePress={logOut} main={false} />
              <Divider /> */}
              <TextButton text={'LogOut'} handlePress={logOut} main={false} />
            </ModalMenu>
          </Modal>
        </Portal>
      </TouchableOpacity>
    </Container>
  );
};

export default TopBar;
