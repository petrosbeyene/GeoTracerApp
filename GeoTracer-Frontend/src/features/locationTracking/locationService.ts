import api from '../../app/api';
import { LocationCoords } from '../../types';


export const locationService = api.injectEndpoints({
    endpoints: (builder) => ({
        updateLocation: builder.mutation<LocationCoords, LocationCoords>({
            query: (data) => ({
                url: 'locations/geodata/',
                method: 'POST',
                body: data,
            })
        })
    })
})

export const { useUpdateLocationMutation } = locationService;

