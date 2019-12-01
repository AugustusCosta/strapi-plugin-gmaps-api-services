'use strict';

/**
 * GmapsApiServices.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 * 
 * Directions service docs https://developers.google.com/maps/documentation/directions/intro
 * 
 * Distance Matrix docs https://developers.google.com/maps/documentation/distance-matrix/start
 */

const convertToGpx = points => {
    const polyline = require('@mapbox/polyline');
    const togpx = require('togpx');
    const geojson = require('geojson');

    const normalizedPoints = [];
    const decodedPoints = polyline.decode(points);

    for (let point of decodedPoints) {
        const value = [point[1], point[0]];
        normalizedPoints.push(value);
    }

    const data = { line: normalizedPoints };
    const geoData = geojson.parse(data, { "LineString": "line" });

    return togpx(geoData);
};

module.exports = {


    directions: async (origin, waypoints, destination, getGpx = false) => {
        const googleMapsClient = require('@google/maps').createClient({
            key: strapi.plugins['gmaps-api-services'].config.googleMapsClient.key,
            Promise: Promise
        });

        let result, gpx;

        //response format: https://developers.google.com/maps/documentation/directions/intro#json
        result = await googleMapsClient.directions({
            origin,
            destination,
            waypoints,
            mode: strapi.plugins['gmaps-api-services'].config.googleMapsClient.mode.DRIVING,
            units: strapi.plugins['gmaps-api-services'].config.googleMapsClient.units,
            language: strapi.plugins['gmaps-api-services'].config.googleMapsClient.language,
            region: strapi.plugins['gmaps-api-services'].config.googleMapsClient.region,
            alternatives: strapi.plugins['gmaps-api-services'].config.googleMapsClient.alternatives,
            optimize: strapi.plugins['gmaps-api-services'].config.googleMapsClient.optimize,
        })
            .asPromise()
            .then((response) => {
                return response.json;
            })
            .catch((err) => {
                console.log(err);
                return null;
            });
        if (getGpx && result.routes && result.routes.length)
            gpx = convertToGpx(result.routes[0].overview_polyline.points);

        return { ...result, origin, destination, waypoints, gpx };

    },




    distance: async (origins = [], destinations = []) => {
        const googleMapsClient = require('@google/maps').createClient({
            key: strapi.plugins['gmaps-api-services'].config.googleMapsClient.key,
            Promise: Promise
        });

        let result;

        result = await googleMapsClient.distanceMatrix({
            origins,
            destinations,
            mode: strapi.plugins['gmaps-api-services'].config.googleMapsClient.mode.DRIVING,
            units: strapi.plugins['gmaps-api-services'].config.googleMapsClient.units,
            language: strapi.plugins['gmaps-api-services'].config.googleMapsClient.language,
            region: strapi.plugins['gmaps-api-services'].config.googleMapsClient.region
        })
            .asPromise()
            .then((response) => {
                return response.json;
            })
            .catch((err) => {
                console.log(err);
                return null;
            });

        return { ...result, origins, destinations };

    },


    gpx: async overviewPolylinePoints => {
        return convertToGpx(overviewPolylinePoints);
    }

};
