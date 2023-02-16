import React, {useCallback, useContext, useMemo, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import CardConvers from '../components/cards/CardConversation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';
import {RootTabParamList} from '../navegation';
import TestingStorage from '../utils/TestingStorage';
import {ContactType, ConversType} from '../utils/types';
import {getData} from '../controllers/localStorage';
import {GlobalContext} from '../App';
import SubTitle from '../components/text/SubTitle';

const ContainerConver = styled.View`
  border: 0px solid ${({theme}) => theme.colors.seccoindaryText};
  border-bottom-width: 1px;
  /* border-top-width: 1px; */
  flex: 1;
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
const Convers = () => {
  const [convers, setConvers] = useState<ConversType[]>();
  const context = useContext(GlobalContext);
  const setContext = useMemo(() => context?.setContext, [context]);
  const chatId = useMemo(() => context?.context.chatId, [context]);
  const theme = useTheme();
  const navigation =
    useNavigation<MaterialBottomTabNavigationProp<RootTabParamList>>();

  const getConverList = useCallback(async () => {
    const contactList: ContactType[] = await getData('contacts');
    if (contactList) {
      const converListFiltered: ContactType[] = contactList.filter(
        cont => cont.lastTime,
      );
      if (converListFiltered[0] && setContext) {
        const converList: ConversType[] = converListFiltered.map(cont => ({
          uid: cont.uid,
          name: cont.name,
          pic: cont?.pic,
          lastMessage: cont.lastTime?.message || '',
          lastTime: cont.lastTime?.date || '',
        }));
        setConvers(converList);
        if (setContext && !chatId) {
          setContext(prev => ({...prev, chatId: converList[0].uid}));
        }
      }
    } else {
      setConvers([]);
    }
  }, [setContext, chatId]);

  useFocusEffect(
    useCallback(() => {
      getConverList();
    }, [getConverList]),
  );

  return (
    <ContainerConver>
      <TopMargin style={styles.borderShadow} />
      <ScrollView>
        {convers && convers[0] ? (
          convers.map(conver => (
            <CardConvers
              uid={conver.uid}
              key={conver.uid}
              name={conver.name}
              lastMessage={conver.lastMessage}
              date={new Date(conver.lastTime)}
            />
          ))
        ) : (
          <SubTitle text={'Nothing to show'} />
        )}
        <TestingStorage />
      </ScrollView>
      <ButtonPlus
        style={styles.borderShadow}
        onPress={() => navigation.navigate('Contacts')}>
        <Icon name="plus" size={20} color={theme.colors.seccoindaryText} />
      </ButtonPlus>
    </ContainerConver>
  );
};

export default Convers;
