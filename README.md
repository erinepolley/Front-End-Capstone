# Bike Stash: NSS Front End Capstone
Bike Stash is a single page application that shows users where all the bike racks are located in Nashville. Users can look on a custom Mapbox map and see if where they're going 1) has a bike rack, and 2) where it is, because they can be hard to find. Data is obtained from the Nashville.gov external API as well as crowd-sourced by users and stored in JSON. The user can log in and add, edit, and delete bike racks they have seen around town. A map on the home page shows the user where  ALL the added racks are, not just theirs. 

## Why I Made This
I love to ride my bike around Nashville. It is one of my favorite things to do. I wanted to make it easier on myself and fellow bike lovers to get around, as well as make Nashville a bit more bike friendly, so I created Bike Stash.

## Demo
![Bike Stash Gif Demo](src/demo/Bestgif.gif)


## MVP
-Create account/account login  
-Map which renders all rack locations as pins  
-Can click on pins to display a popup with details  
-Nav bar with "Home", “My Racks”, “Logout”, “Add a Rack”  
-“My Racks”--gets all racks from JSON that the user has added (with edit and delete capabilities)  
-“Add a Rack”--renders form for user to add rack  

## Tools Used
React, JSON, Leaflet, Mapbox, Cloudinary, LocationIQ, Material-UI, Nashville.gov external API
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

![Front End Capstone ERD](ERD.png)

## To See This Application:

1. Clone down the repo: `git@github.com:erinepolley/Front-End-Capstone.git`
2. Run `npm install` for dependencies.
3. In the api directory, run `json-server -p 5002 racks.json`.
3. Run `npm start` in the root directory.







