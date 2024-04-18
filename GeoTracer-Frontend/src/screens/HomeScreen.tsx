import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeNavigationProp>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to GeoTracer App</Text>
            <Text style={styles.slogan}>Trace Your Journey, Navigate Your Path</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="Login"
                    onPress={() => navigation.navigate('SignIn')}
                />
                <View style={styles.buttonSpacer} />
                <Button
                    title="Sign Up"
                    onPress={() => navigation.navigate('SignUp')}
                    color="#007BFF"
                />
                <View style={styles.buttonSpacer} />
                <Button
                    title="Password Reset"
                    onPress={() => navigation.navigate('PasswordResetRequest')}
                    color="#007BFF"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    slogan: {
        fontSize: 18,
        fontStyle: 'italic',
        marginBottom: 20,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    buttonSpacer: {
        height: 10,  // Height of the spacer for separation
    },
});

export default HomeScreen;
