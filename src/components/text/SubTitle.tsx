import React, {FC} from 'react';
import styled from 'styled-components/native';

const SubTitleText = styled.Text`
  font-size: 15px;
  color: ${({theme}) => theme.colors.seccoindaryText};
  align-self: center;
  margin: 20px;
`;

interface SubTitleProps {
  text: string;
}
const SubTitle: FC<SubTitleProps> = ({text}) => {
  return <SubTitleText>{text}</SubTitleText>;
};

export default SubTitle;
