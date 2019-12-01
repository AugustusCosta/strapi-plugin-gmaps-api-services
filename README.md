<h1 align="center">Welcome to strapi-plugin-gmaps-api-services 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/strapi-plugin-gmaps-api-services" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/strapi-plugin-gmaps-api-services.svg">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D10.0.0-blue.svg" />
  <img src="https://img.shields.io/badge/npm-%3E%3D6.0.0-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/augustuscosta" target="_blank">
    <img alt="Twitter: augustuscosta" src="https://img.shields.io/twitter/follow/augustuscosta.svg?style=social" />
  </a>
</p>

> Strapi plugin for use Google Maps API services.


## Features

- Directions service https://developers.google.com/maps/documentation/directions/intro
- Directions to GPX using https://github.com/tyrasd/togpx ( just a first hand, needs improvement )
- Distance Matrix service https://developers.google.com/maps/documentation/distance-matrix/start

## Config

- /config/custom.json


```
"googleMapsClient": {
    "key": "",
    "mode": {
        "DRIVING": "driving",
        "WALKING": "walking",
        "BICYCLING": "bicycling",
        "TRANSIT": "transit"
    },
    "avoid": {
        "TOLLS": "tolls",
        "HIGHWAYS": "highways",
        "FERRIES": "ferries",
        "INDOOR": "indoor"
    },
    "traffic_model": {
        "BEST_GUESS": "best_guess",
        "PESSIMISTIC": "pessimistic",
        "OPTIMISTIC": "optimistic"
    },
    "transit_mode": {
        "BUS": "bus",
        "SUBWAY": "subway",
        "TRAIN": "train",
        "TRAM": "tram",
        "RAIL": "rail"
    },
    "transit_routing_preference": {
        "LESS_WALKING": "less_walking",
        "FEWER_TRANSFERS": "fewer_transfers"
    },
    "units": "metric",
    "language": "pt-BR",
    "region": "BR",
    "alternatives": false,
    "optimize": false
    }

  ```


## Prerequisites

- node >=10.0.0
- npm >=6.0.0

```

## Author

👤 **Augustus Costa**

* Twitter: [@augustuscosta](https://twitter.com/augustuscosta)
* Github: [@augustuscosta](https://github.com/augustuscosta)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/AugustusCosta/strapi-plugin-gmaps-api-services/issues).

## Show your support

Give a ⭐️ if this project helped you!
