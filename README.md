# Nashville Software School Front End Capstone: Bike Stash Nash
This application allows users see where bike racks are located in Nashville. Data is crowd-sourced by users and stored in JSON. The user can log in and add, edit, and delete bike racks they have seen around town--name, address, and picture. A map on the home page shows the user where  ALL the added racks are, not just theirs. 

## Why I Made This
I made this application because I thought it would be useful. I ride my bike around town, and I think it would be nice to see if wherever I'm going has a bike rack, or if I'm going to have to ride around for a minute and lock my bike to a random parking meter/skinny tree/wrought iron fence.

## MVP
-Create account/account login
-Map which renders all rack locations as pins
-Can click on pins to display a popup with details
-Nav bar with "Home", “My Racks”, “Logout”, “Add a Rack”
-“My Racks”--gets all racks from JSON that the user has added (with edit and delete capabilities)
-“Add a Rack”--renders form for user to add rack
-When posted, routed back to map and rack appears on map

## Tools Used
React, JSON, Leaflet, Mapbox
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


![Front End Capstone ERD](https://user-images.githubusercontent.com/55988070/69775674-129bff00-115f-11ea-94b5-b8ab7807d814.png)

## To See This Application:

1. Clone down the repo: `git@github.com:erinepolley/Front-End-Capstone.git`
2. Run `npm install` for dependencies.
3. In the api directory, run `json-server -p 5002 database.json`.
3. Run `npm start` in the root directory.







