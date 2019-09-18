'use strict';

/**
 * StrapiPluginGmapsApiServices.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {

    directions: async ( origin, waypoints, destination ) =>
    {
        const googleMapsClient = require( '@google/maps' ).createClient( {
            key: strapi.plugins[ 'strapi-plugin-gmaps-api-services' ].googleMapsClient.key,
            Promise: Promise
        } );

        let result;
        // waypoints.push(
        //     {
        //         latitude: -18.678388,
        //         longitude: -46.626739
        //     }
        // );
        // waypoints = [
        //     {
        //         latitude: -18.678388,
        //         longitude: -46.626739
        //     },
        //     {
        //         latitude: -17.109884,
        //         longitude: -50.337268
        //     },
        // ];

        result = await googleMapsClient.directions( {
            origin,
            destination,
            waypoints,
            mode: strapi.plugins[ 'strapi-plugin-gmaps-api-services' ].config.googleMapsClient.mode.DRIVING,
            units: strapi.plugins[ 'strapi-plugin-gmaps-api-services' ].config.googleMapsClient.units,
            language: strapi.plugins[ 'strapi-plugin-gmaps-api-services' ].config.googleMapsClient.language,
            region: strapi.plugins[ 'strapi-plugin-gmaps-api-services' ].config.googleMapsClient.region,
            alternatives: strapi.plugins[ 'strapi-plugin-gmaps-api-services' ].config.googleMapsClient.alternatives,
            optimize: strapi.plugins[ 'strapi-plugin-gmaps-api-services' ].config.googleMapsClient.optimize,
        } )
            .asPromise()
            .then( ( response ) =>
            {
                return response.json;
            } )
            .catch( ( err ) =>
            {
                console.log( err );
                return null;
            } );

        return { ...result, origin, destination, waypoints };

    },
    distance: async ( origins = [], destinations = [] ) =>
    {
        const googleMapsClient = require( '@google/maps' ).createClient( {
            key: strapi.plugins[ 'strapi-plugin-gmaps-api-services' ].googleMapsClient.key,
            Promise: Promise
        } );

        let result;

        result = await googleMapsClient.distanceMatrix( {
            origins,
            destinations,
            mode: strapi.plugins[ 'strapi-plugin-gmaps-api-services' ].config.googleMapsClient.mode.DRIVING,
            units: strapi.plugins[ 'strapi-plugin-gmaps-api-services' ].config.googleMapsClient.units,
            language: strapi.plugins[ 'strapi-plugin-gmaps-api-services' ].config.googleMapsClient.language,
            region: strapi.plugins[ 'strapi-plugin-gmaps-api-services' ].config.googleMapsClient.region
        } )
            .asPromise()
            .then( ( response ) =>
            {
                return response.json;
            } )
            .catch( ( err ) =>
            {
                console.log( err );
                return null;
            } );

        return { ...result, origins, destinations };

    },
};
