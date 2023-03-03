import React, {useCallback, useContext, useMemo, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import CardConvers from '../components/cards/CardConversation';
import {useFocusEffect} from '@react-navigation/native';
// import TestingStorage from '../utils/TestingStorage';
import {ContactType, ConversType} from '../utils/types';
import {getFromStorage} from '../controllers/localStorage';
import {GlobalContext} from '../App';
import SubTitle from '../components/text/SubTitle';

const ContainerConver = styled.View`
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
const Convers = () => {
  const [convers, setConvers] = useState<ConversType[]>();
  const context = useContext(GlobalContext);
  const setContext = useMemo(() => context?.setContext, [context]);
  const chatId = useMemo(() => context?.context.chatId, [context]);

  const getConverList = useCallback(async () => {
    try {
      const contactList: ContactType[] = await getFromStorage('contactList');
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
          setConvers(
            converList.sort(
              (a, b) =>
                new Date(b.lastTime).getTime() - new Date(a.lastTime).getTime(),
            ),
          );
          if (setContext && !chatId) {
            setContext(prev => ({...prev, chatId: converList[0].uid}));
          }
        }
      } else {
        setConvers([]);
      }
    } catch (error) {
      console.log('Location: Convers screen, getConverList()');
      console.log(error);
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
        {/* <TestingStorage /> */}
      </ScrollView>
    </ContainerConver>
  );
};

export default Convers;
