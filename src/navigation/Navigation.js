import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../views/login/LoginScreen';
import MenuScreen from '../views/menu/MenuScreen';
import OptionsScreen from '../views/options/OptionsScreen';

const Stack = createStackNavigator();

export default function Navigation(){
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component ={LoginScreen} options={{headerShown: false, title: ''}}/>
            <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false, title: '' }} />
            <Stack.Screen name="Options" component={OptionsScreen} options={{ headerShown: false, title: '' }} />
        </Stack.Navigator>
    );

}

