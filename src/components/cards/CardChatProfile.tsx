import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import Avatar from '../data-display/Avatar';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
  return (
    <CardContainer style={{elevation: 20}}>
      <Avatar />
      <View>
        <ProfileName>Sebastian Montagna</ProfileName>
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
