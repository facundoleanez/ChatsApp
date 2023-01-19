declare module '*.png' {
  const path: string;
  export default path;
}
declare module '*.jpg' {
  import {ImageSourcePropType} from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}
