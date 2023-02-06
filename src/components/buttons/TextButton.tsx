import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

//Props types
interface ComponentProps {
  main?: boolean;
}
interface TextButtonProps {
  text: string;
  main?: boolean;
  handlePress: () => void;
}

const ButonTitle = styled.Text<ComponentProps>`
  font-size: 20px;
  color: ${({theme, main}) =>
    main ? theme.colors.primary : theme.colors.seccoindaryText};
  margin: 5px;
`;

const TextButton: FC<TextButtonProps> = ({main = true, handlePress, text}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <ButonTitle main={main}>{text}</ButonTitle>
    </TouchableOpacity>
  );
};

export default TextButton;
