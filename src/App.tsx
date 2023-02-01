import React, {useState, SetStateAction, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {chatAppTheme} from './theme/theme';
import {NavigationContainer} from '@react-navigation/native';
import TabNavergator from './navegation';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Loading from './screens/Loading';

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
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);

      if (initializing) {
        setInitializing(false);
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      setContext(prev => ({...prev, uid: user.uid}));
    } else {
      setContext(prev => ({...prev, uid: ''}));
    }
  }, [user]);

  return (
    <GlobalContext.Provider value={{context, setContext}}>
      <ThemeProvider theme={chatAppTheme}>
        <NavigationContainer>
          <SafeAreaView style={{flex: 1}}>
            {initializing ? <Loading /> : <TabNavergator />}
          </SafeAreaView>
        </NavigationContainer>
      </ThemeProvider>
    </GlobalContext.Provider>
  );
};

export default App;
