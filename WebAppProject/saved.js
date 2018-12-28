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

const app = new Vue({
  el: '#save',
  data:{
    title: 'Saved List',
    savedList: []
  }


})
