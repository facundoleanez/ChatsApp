import React, {FC} from 'react';
import styled from 'styled-components/native';

interface ContainerProps {
  type: string;
}
const Container = styled.View<ContainerProps>`
  background-color: ${({theme}) => theme.colors.danger};
  border: solid 1px ${({theme}) => theme.colors.dangerText};
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
`;
const TextAlert = styled.Text`
  color: ${({theme}) => theme.colors.dangerText};
  font-size: 18px;
`;
interface AlertProps {
  type: string;
  text: string;
}
const Alert: FC<AlertProps> = ({type, text}) => {
  return (
    <Container type={type}>
      <TextAlert>{text}</TextAlert>
    </Container>
  );
};

export default Alert;
