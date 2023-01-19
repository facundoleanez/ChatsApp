import {chatAppTheme} from './theme';

type Theme = typeof chatAppTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
