# Programming assignment - Jobfeed Frontend developer
## Demo
I deployed the application on firebase. 
[Demo](http://textkernel-react-app.web.app/).
## Data

- [x] The Data is being fetched as indicated in the Assignment.md with us.jubfeed.com api.

## Functionality (All the main functionalities are covered)

- [x] The user should be presented with a nice overview of jobs
- [x] The user should be able to filter jobs "on the fly" by job title or organisation name
- [x] The user should be able to remove one or more jobs from the list
- [x] Unit tests - at least 1 or 2 tests, to demonstrate your approach to testing

### Optional features (only if you have time left)

- [x] Clicking on a job should point its location on a map. You can use any map service (Google Maps, Leaflet etc.).
- [x] Result pagination

## Requirements & Instruction

## 1. axios for calling API.

I use axios package to sending requests to api. I also could use Fetch api of the javascript, but since I really used to work with axios, I felt that It will speed up the process.

### 2. State Management

the reason that I liked to use RTK is to first I started to make the app, the number of local states was getting out of hand, and I wanted to prevent props drilling through the app. I also considered to use Context Api. However, I was thinking about the code readability and future development so I decided to go with RTK.

### 3. CSS and styling.

I used OneUI as you send the link, I found it a really good library to work with. I managed to make the best out of it and use the components when is needed. In addition, for the skeleton of the app and the layout I wrote a responsive pure css. The app works good on Mobile and Tablet, as well as Desktop.
As the main part of the styling, I used SCSS SASS preprocessor. I always use this technology when I'm thinking about the future of the app, and how scalable it is. sass giving me the opportunity to write clean and organized and nested properties for styling. In some cases only css can handle toggles and responsive menus without thinking that much about the javascript behind the scene. Bottom line, I tried to come with a simple UI and I hope it will be pleasant for you.

### 4. Map

I used "Leaflet & React-Leaflet & MapBox Tiles" maps. I found this package a really good one for testing and playing with maps over the Google Maps Api. since Google Maps recently limited its services for development purposes, I decided to go with Leaflet and using one of MapBox Tile templates I made.

### 5. Unit Test

React testing library and jest are two unit test purposes. I provided 4 test files (2 Components, 1 Custom Hook, and 1 Store Slice). All test are passed and wrote somehow to test some simple functionalities of components.

# Features

## displaying the latest jobs available on API.

    axios fetches latest jobs from the Api, saving them in "jobSlice" in the main store. Since the API doesn't return any unique id for jobs, I wrote a simple helper function for generating unique ids for each job after data successfully fetched. the pattern of the generated ids are simple and can be changed in the related file. src/helper/id-generator.ts. Now we have the data, it's time to display them on the main page of the app.

    There are two components are being given the responsibility. 1. "CardsList" for listing jobs and other related components. 2. CardItem which is the component for each job.

## Pagination

    with a combination of OneUI pagination component and a custom hook named "usePagination" src/hooks/usePagination.tsx, I managed to paginate the jobs.

## Search

    Users can filter jobs by searching through the search input. By entering Job title or Organization name and pressing "Enter" or Click.

## Remove jobs

    Users can remove each job by clicking on the minus icon in each job card.

## Locating job on map

    There is a button available for every job. By clicking on it, the map will fly to lat and lon provided for each job. In addition, it displays a pin marker on the map and you can see details for each job by clicking on the pin.

# Installation

### whether download zip file or clone the "dev" branch from the repository

```git
git clone https://gitlab.com/textkernel-pub/jobfeed/assignments/jobfeed-assignment-nader-jalayeri.git
```

```node
npm install     (install the dependency packages)
npm start       (start the application by default , http://localhost:3000)
npm test        (for runing the test units)
```

## Demo
I deployed the application on firebase. 
[Demo](http://textkernel-react-app.web.app/).


