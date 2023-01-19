import React, {FC} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import Avatar from '../data-display/Avatar';
import {useNavigation} from '@react-navigation/native';
import {RootTabParamList} from '../../navegation';
import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';

const CardPill = styled.TouchableOpacity`
  margin: 7px;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const SectionView = styled.View`
  flex: 1;
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 18px;
  color: ${({theme}) => theme.colors.primaryText};
`;
const SubTitle = styled.Text`
  font-size: 13px;
  color: ${({theme}) => theme.colors.seccoindaryText};
`;
const DateText = styled.Text`
  font-size: 15px;
`;

interface CardConversProps {
  srcImg?: string;
  name: string;
  lastMessage: string;
  date: string;
}

const CardConvers: FC<CardConversProps> = ({name, lastMessage, date}) => {
  const navigation =
    useNavigation<MaterialBottomTabNavigationProp<RootTabParamList>>();
  return (
    <CardPill onPress={() => navigation.navigate('Chat')}>
      <Avatar />
      <SectionView>
        <View>
          <Title>{name}</Title>
          <SubTitle>{lastMessage}</SubTitle>
        </View>
        <DateText>{date}</DateText>
      </SectionView>
    </CardPill>
  );
};

export default CardConvers;
