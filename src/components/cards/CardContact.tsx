import React, {FC, useContext, useMemo} from 'react';
import styled, {useTheme} from 'styled-components/native';
import Avatar from '../data-display/Avatar';
import {useNavigation} from '@react-navigation/native';
import {RootTabParamList} from '../../navegation';
import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import {getDataLocal, storeDataLocal} from '../../controllers/localStorage';
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
  font-size: 22px;
  color: ${({theme}) => theme.colors.primaryText};
`;

interface CardContactProps {
  srcImg?: string;
  name: string;
  contactId: string;
}

const CardContact: FC<CardContactProps> = ({name, contactId}) => {
  const navigation =
    useNavigation<MaterialBottomTabNavigationProp<RootTabParamList>>();
  const theme = useTheme();
  // Global context
  const context = useContext(GlobalContext);
  const setContext = useMemo(() => context?.setContext, [context]);

  const handlePressStartConver = async () => {
    try {
      const already = await getDataLocal(contactId);
      if (!already && setContext) {
        await storeDataLocal(contactId, [{date: new Date()}]);
        setContext(prev => ({...prev, chatId: contactId}));
        navigation.navigate('Chat');
      } else if (setContext) {
        setContext(prev => ({...prev, chatId: contactId}));
        navigation.navigate('Chat');
      }
    } catch (error) {
      console.log(
        'Location Components/Cards/CardContact handlePRessStartConver()',
        error,
      );
    }
  };
  return (
    <CardPill>
      <Avatar />
      <SectionView>
        <Title>{name}</Title>
        <TouchableOpacity onPress={handlePressStartConver}>
          <Icon
            name="chat-plus-outline"
            size={30}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </SectionView>
    </CardPill>
  );
};

export default CardContact;
