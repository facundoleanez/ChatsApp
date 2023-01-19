import React, {FC} from 'react';
import {ImageSourcePropType} from 'react-native';
import styled from 'styled-components/native';

interface ImgStyledProps {
  size: number;
}
const ImgStyled = styled.Image<ImgStyledProps>`
  height: ${({size}) => size + 'px'};
  width: ${({size}) => size + 'px'};
  border: 1px solid lightgray;
  border-radius: 25px;
`;

interface AvatarProps {
  srcImg?: ImageSourcePropType;
  size?: number;
}
const Avatar: FC<AvatarProps> = ({
  srcImg = require('../../imgs/profile.jpg'),
  size = 50,
}) => {
  return <ImgStyled source={srcImg} size={size} />;
};

export default Avatar;
