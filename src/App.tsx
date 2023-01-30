import React, {useState, SetStateAction} from 'react';
import {SafeAreaView} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {chatAppTheme} from './theme/theme';
import {NavigationContainer} from '@react-navigation/native';
import TabNavergator from './navegation';

interface GlobalContextType {
  uid: string;
}
export interface ContextType {
  context: GlobalContextType;
  setContext: React.Dispatch<SetStateAction<GlobalContextType>>;
}

export const GlobalContext = React.createContext<ContextType | null>(null);

const App = () => {
  const [context, setContext] = useState<GlobalContextType>({uid: ''});
  return (
    <GlobalContext.Provider value={{context, setContext}}>
      <ThemeProvider theme={chatAppTheme}>
        <NavigationContainer>
          <SafeAreaView style={{flex: 1}}>
            <TabNavergator />
          </SafeAreaView>
        </NavigationContainer>
      </ThemeProvider>
    </GlobalContext.Provider>
  );
};

export default App;
