import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

//Props types
interface ComponentProps {
  main?: boolean;
}
interface MainButtonProps {
  title: string;
  main?: boolean;
  handlePress: () => void;
}
//StyleSheet
const styles = StyleSheet.create({
  elevations: {
    elevation: 10,
  },
});
//StyledComponents
const ButtonContainer = styled.TouchableOpacity<ComponentProps>`
  font-size: 20px;
  background-color: ${({theme, main}) =>
    main ? theme.colors.primary : theme.colors.secondary};
  border-radius: 20px;
  width: 100%;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 20px;
  padding: 5px;
`;
const ButtonTitle = styled.Text<ComponentProps>`
  font-size: 25px;
  color: ${({theme, main}) =>
    main ? theme.colors.primaryBackground : theme.colors.seccoindaryText};
  font-weight: 500;
`;
const MainButton: FC<MainButtonProps> = ({title, main = true, handlePress}) => {
  return (
    <ButtonContainer
      main={main}
      style={styles.elevations}
      onPress={handlePress}>
      <ButtonTitle main={main}>{title}</ButtonTitle>
    </ButtonContainer>
  );
};

export default MainButton;
