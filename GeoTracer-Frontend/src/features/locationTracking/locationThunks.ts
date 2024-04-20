import { createAsyncThunk } from '@reduxjs/toolkit';
import { locationService } from './locationService';
import { LocationCoords } from '../../types';

export const updateLocationThunk = createAsyncThunk(
    'location/updateLocation',
    async (location: LocationCoords, { dispatch, rejectWithValue }) => {
        try {
            const result = await dispatch(locationService.endpoints.updateLocation.initiate(location));

            if ('error' in result) {
                console.log(result.error)
                throw new Error(result.error?.data?.details || 'Unknown error');
            }
            return result.data;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            } else {
                return rejectWithValue('An unexpected error occurred');
            }
        }
    }
);