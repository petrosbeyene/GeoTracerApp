import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LocationTrackingScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>User's location tracked will be here.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0'
    },
    text: {
        fontSize: 18,
        color: 'black'
    }
});

export default LocationTrackingScreen;
