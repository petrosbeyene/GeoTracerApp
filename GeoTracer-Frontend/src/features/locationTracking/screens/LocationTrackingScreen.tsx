import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { updateLocationThunk } from '../locationThunks';
import { store } from '../../../app/store';
import { LocationCoords } from '../../../types';

const LOCATION_TASK_NAME = 'background-location-task';

interface TaskManagerData {
    locations: {
        coords: LocationCoords;
    }[];
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
        console.error(error);
        return;
    }

    const typedData = data as TaskManagerData;
    console.log(typedData.locations[0].coords)
    if (typedData.locations) {
        const { coords } = typedData.locations[0];
        const currentTimestamp = new Date().toISOString();

        store.dispatch(updateLocationThunk({
            latitude: coords.latitude,
            longitude: coords.longitude,
            accuracy: coords.accuracy,
            altitude: coords.altitude,
            speed: coords.speed,
            heading: coords.heading,
            timestamp: currentTimestamp,
        }));
    }
});

const LocationTrackingScreen: React.FC = () => {
    const [isTracking, setIsTracking] = useState(false);

    const startLocationTracking = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Allow location access to use this feature.');
            return;
        }

        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 60000,
            distanceInterval: 1,
            deferredUpdatesInterval: 1000,
            foregroundService: {
                notificationTitle: 'Location Tracking',
                notificationBody: 'Active',
            },
        });
        setIsTracking(true);
    };

    const stopLocationTracking = async () => {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
        setIsTracking(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.slogan}>Keep track of your journey, effortlessly!</Text>
            {!isTracking ? (
                <TouchableOpacity style={styles.button} onPress={startLocationTracking}>
                    <Text style={styles.buttonText}>Start Tracking</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.button} onPress={stopLocationTracking}>
                    <Text style={styles.buttonText}>Stop Tracking</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    slogan: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#ffffff',
    },
});

export default LocationTrackingScreen;