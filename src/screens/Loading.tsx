import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import styled, {useTheme} from 'styled-components/native';

const Container = styled.View`
  background-color: ${({theme}) => theme.colors.primaryBackground};
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 30px;
  opacity: 0.8;
  position: absolute;
  z-index: 1;
`;
const Title = styled.Text`
  font-size: 40px;
  color: ${({theme}) => theme.colors.primary};
  font-weight: 500;
`;
const Loading = () => {
  const theme = useTheme();
  return (
    <Container>
      <Title>Loading</Title>
      <ActivityIndicator
        animating={true}
        size={40}
        color={theme.colors.primary}
      />
    </Container>
  );
};

export default Loading;
