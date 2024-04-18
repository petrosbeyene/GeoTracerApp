import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import SignInScreen from './src/features/auth/screens/SignInScreen';
import SignUpScreen from './src/features/auth/screens/SignUpScreen';
import EmailVerification from './src/features/auth/screens/EmailVerificationScreen';
import LocationTrackingScreen from './src/features/locationTracking/screens/LocationTrackingScreen';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types';
import * as Linking from 'expo-linking';
import { Text } from 'react-native';

const prefix = Linking.createURL('/');

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
    const linking = {
        prefixes: [prefix],
        config: {
            screens: {
                HomeScreen: 'home',
                SignIn: 'sign-in',
                SignUp: 'sign-up',
                EmailVerification: 'confirm-email',
                LocationTrackingScreen: 'location-tracking',
            },
        },
    };

    return (
        <Provider store={store}>
            <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
                <Stack.Navigator initialRouteName="HomeScreen">
                    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{title: 'GeoTracer'}} />
                    <Stack.Screen name="SignIn" component={SignInScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                    <Stack.Screen name="EmailVerification" component={EmailVerification} />
                    <Stack.Screen name="LocationTracker" component={LocationTrackingScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default App;
