import React, {FC, useContext, useMemo} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import Avatar from '../data-display/Avatar';
import {useNavigation} from '@react-navigation/native';
import {RootTabParamList} from '../../navegation';
import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';
import {GlobalContext} from '../../App';

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
  uid: string;
  srcImg?: string;
  name: string;
  lastMessage?: string;
  date?: Date;
}

const CardConvers: FC<CardConversProps> = ({name, lastMessage, date, uid}) => {
  const context = useContext(GlobalContext);
  const setContext = useMemo(() => context?.setContext, [context]);
  const navigation =
    useNavigation<MaterialBottomTabNavigationProp<RootTabParamList>>();
  const habldePress = () => {
    if (setContext) {
      setContext(prev => ({...prev, chatId: uid}));
    }
    navigation.navigate('Chat');
  };
  return (
    <CardPill onPress={habldePress}>
      <Avatar />
      <SectionView>
        <View>
          <Title>{name}</Title>
          <SubTitle>{lastMessage}</SubTitle>
        </View>
        <DateText>
          {date &&
            date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()}
        </DateText>
      </SectionView>
    </CardPill>
  );
};

export default CardConvers;
