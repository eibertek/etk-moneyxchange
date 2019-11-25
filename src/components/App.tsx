import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { Provider } from 'react-redux'; 
import { store } from '../store/redux';
import { NavigatorInstance } from '../store/redux/types';
import { createAppContainer } from 'react-navigation';
import Navigation from '../views/Navigator';

const AppNavigation = createAppContainer(Navigation);

class App extends React.Component {
  navigation: any;
  componentDidMount() {
    NavigatorInstance.dispatch = this.navigation.dispatch;
  }

  render = () => {
    return (
    <>
      <Provider store={store}>
        <ThemeProvider>
            <AppNavigation ref={(nav) => this.navigation = nav} />
        </ThemeProvider>
      </Provider>
    </>
    );
  }
}

export default App;