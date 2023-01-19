import React from 'react';
import {SafeAreaView} from 'react-native';
// import NavButtonBar from './navegation/NavButtonBar';
// import TopBar from './navegation/TopBar';
// import MainDisplay from './navegation/MainDisplay';
import {ThemeProvider} from 'styled-components/native';
import {chatAppTheme} from './theme/theme';
import {NavigationContainer} from '@react-navigation/native';
// import TabNavergator from './navegation';
// import TopBar from './navegation/TopBar';
import LogIn from './screens/LogIn';

const App = () => {
  // const GlobalContext = React.createContext(null);
  return (
    <ThemeProvider theme={chatAppTheme}>
      <NavigationContainer>
        <SafeAreaView style={{flex: 1}}>
          {/* <TopBar />
          <TabNavergator /> */}
          <LogIn />
        </SafeAreaView>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
