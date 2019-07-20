import { createAppContainer, createStackNavigator } from 'react-navigation';

import Main from '../src/pages/main';

const AppNavigator = createStackNavigator({
    Main,
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
