import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Points from './pages/Points';
import Detail from './pages/Detail';

const { Navigator, Screen } = createStackNavigator();

const Routes = () => (
  <NavigationContainer>
    <Navigator 
      headerMode="none"
      screenOptions={{ 
        cardStyle: {
          backgroundColor: '#f0f0f5',
        }
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Points" component={Points} />
      <Screen name="Detail" component={Detail} />
    </Navigator>
  </NavigationContainer>
);

export default Routes;