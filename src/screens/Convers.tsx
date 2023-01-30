import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import CardConvers from '../components/cards/CardConversation';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import {ConversationList} from '../utils/constants';
import {useNavigation} from '@react-navigation/native';
import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';
import {RootTabParamList} from '../navegation';

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
  const theme = useTheme();
  const navigation =
    useNavigation<MaterialBottomTabNavigationProp<RootTabParamList>>();
  return (
    <ContainerConver>
      <TopMargin style={styles.borderShadow} />
      <ScrollView>
        {/* {ConversationList.map(conver => (
          <CardConvers id={conver.id} name={conver.} />
        ))} */}
        <CardConvers
          name={'Sebastian Montagna'}
          lastMessage={'hola'}
          date={'20/03'}
        />
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
