'use strict';
// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const URL = "https://people.rit.edu/cxt6655/330/projects/3/yelp-proxy.php";
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?";
const weatherKEY = "&appid=f5a44f1602247efbe925b968d6eeb69d";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyADtcAoIVD2jg_dl8xGJCcqmie5GnU7k5o",
  authDomain: "foodwebapp-41955.firebaseapp.com",
  databaseURL: "https://foodwebapp-41955.firebaseio.com",
  projectId: "foodwebapp-41955",
  storageBucket: "foodwebapp-41955.appspot.com",
  messagingSenderId: "767313248711"
};
firebase.initializeApp(config);


//VUE Instance
const app = new Vue({
  el: '#root',
  data:
    {
      title: "Find A Spot",
      result: {},
      status: "",
      term: "",
      location: "",
      businessInfo: [],
      errors: [],
      weatherResult: {},
      weatherCityName: "",
      weatherCountryCode: "",
      temperature: "...",
      humidity: 0,
      minTemp: 0,
      maxTemp: 0,
      geoSpot: {},
      savedList: [],
      saveObj: {},
      userID: "",
      searched: "true"
    },

    mounted: function(){
      this.geolocation();
      this.retrieveStorage();
      this.userID = this.printGUID();
    },

    methods:
    {
      search(){
        if (this.term && this.location) {
          let url = this.makeURL();
          this.makeSearch(url);
          this.locallyStore();
        }
        else{
          this.errors = [];
          if (!this.term) {
            this.errors.push("Term is Required!")
          }

          if (!this.location) {
            this.errors.push("Location is Required!");
          }
        }

        this.searched = false;
      },

      makeURL(){

        // Check to see what object (type of search) it is by comparing its shape, property sets
          let t = this.term.replace(/\s+/g, '%20').toLowerCase();
          let loc = this.location.replace(/\s+/g, '%20').toLowerCase();
          let newUrl = URL + "?term=" + t + "&location=" + loc;

          return newUrl;
      },

      makeSearch(url){
        //if (! this.term.trim()) return;
        fetch(url)
        .then(response => {
          if(!response.ok){
            throw Error(`ERROR: ${response.statusText}`);
          }
          return response.json();
        })
        .then(json => {
          console.log(json);
          //this.result = json;
          this.updateCards(json)
          // console.log(this.result);
        });

      },

      updateCards(json){
        this.businessInfo = [];
        for (let i=0; i < json.businesses.length;i++) {
          this.businessInfo.push({
            businessName: json.businesses[i].name,
            businessLink: json.businesses[i].url,
            businessImage: json.businesses[i].image_url,
            businessStatus: json.businesses[i].is_closed,
            businessPrice: json.businesses[i].price,
            businessRating: '★'.repeat(json.businesses[i].rating),
            businessPhone: this.addDashes(json.businesses[i].phone)
            // businessAddress:
          })
        }

      },

      addDashes(num){
          let phoneNum = num.replace(/\D[^\.]/g, "");
          return "(" + phoneNum.slice(1,4) +  ")" + "-" + phoneNum.slice(4,7) + "-" + phoneNum.slice(7);

      },

      makeWeatherSearch(url){
        //if (! this.term.trim()) return;
        fetch(url)
        .then(response => {
          if(!response.ok){
            throw Error(`ERROR: ${response.statusText}`);
          }
          return response.json();
        })
        .then(json => {
          console.log(json);
          this.geoSpot = json;
          this.updateWeather(json)
        });

      },

      updateWeather(){
          this.temperature = this.geoSpot.main.temp;
          this.humidity = this.geoSpot.main.humidity;
          this.minTemp = this.geoSpot.main.temp_min;
          this.maxTemp = this.geoSpot.main.temp_max
      },

      geolocation() {
        navigator.geolocation.getCurrentPosition(this.buildUrl, this.geoError);
      },
      buildUrl(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        this.makeWeatherSearch(weatherURL + '&lat=' + lat + '&lon=' + lon + "&units=imperial" + weatherKEY);
      },
      geoError(error) {
        this.makeWeatherSearch(weatherURL + '&lat=0&lon=0' + weatherKEY);
      },

      makeGUID() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      },

      printGUID(){
          let guid = (this.makeGUID() + this.makeGUID() + "-" + this.makeGUID() + "-4" + this.makeGUID().substr(0,3) + "-" + this.makeGUID() + "-" + this.makeGUID() + this.makeGUID() + this.makeGUID()).toLowerCase();
          return guid;
      },

      locallyStore(){
          localStorage.setItem("term",this.term);
          localStorage.setItem("location", this.location);
          localStorage.setItem("GUID", this.UserID);
          localStorage.setItem("saved", this.savedList);

      },

      retrieveStorage(){
        if (typeof(Storage) !== "undefined") {
          this.term = localStorage.getItem("term");
          this.location = localStorage.getItem("location");
          this.userID = localStorage.getItem("GUID");
          this.savedList = localStorage.getItem("saved");

        }

      }

    }
});
