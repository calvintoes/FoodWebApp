Vue.component('cards', {
  methods:{
    save: function(){
      let cardInfo = {};

      cardInfo = {
        UserID: this.$root.userID,
        Name: this.businessName,
        Link: this.businessLink,
        Image: this.businessImage,
        Status: this.businessStatus,
        Rating: this.businessRating,
        Phone: this.businessPhone
      };

      this.$root.savedList.push(cardInfo);

      let path = 'users/' + this.$root.userID + '/saved/' + this.businessName;
      firebase.database().ref(path).set(cardInfo);
    }

  },
  props:{
          businessName: String,
          businessLink: String,
          businessImage: String,
          businessStatus: Boolean,
          businessPrice: String,
          businessRating: String,
          businessPhone: String
        },
  template:`
  <div class="card large hoverable">
   <div class="card-image waves-effect waves-block waves-light">
     <img class="activator" :src=businessImage>
   </div>
   <div class="card-content">
   <a class="btn-floating halfway-fab waves-effect waves-light blue" @click="save()"><i class="material-icons">add</i></a>
     <span class="card-title activator grey-text text-darken-4">{{businessName}}<i class="material-icons right">more_vert</i></span>
     <p><a target="_blank" :href=businessLink>Link</a></p>
     <p v-if="businessStatus">Closed</p>
     <p v-else>Open</p>
     <p>{{businessPrice}}</p>
     <p>{{businessRating}}</p>
     <p>{{businessPhone}}</p>
   </div>
   <div class="card-reveal">
     <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
     <p>Here is some more information about this product that is only revealed once clicked on.</p>
   </div>
 </div>

  `
})

Vue.component('savedcard', {
  methods:{
    deleteCard: function(){
      let saved = this.$root.savedList
      let tempObj = {
        Name: this.businessName
      }
      for (let i = 0; i < saved.length; i++) {
        //go through list of saved objects and find itself, return index and splice
        if (saved[i].Name == tempObj.Name) {
          saved.splice(i,1);

          //let path = 'users/' + this.$root.userID + '/saved/' + this.businessName;
          //firebase.database().ref(path).remove();
        }
      }
    }

  },
  props:{
          businessName: String
        },
  template:`
  <div class="card large hoverable">
   <div class="card-image waves-effect waves-block waves-light">
     <img class="activator" :src=businessImage>
   </div>
   <div class="card-content">
   <a class="btn-floating halfway-fab waves-effect waves-light red" @click="deleteCard()"><i class="material-icons">clear</i></a>
     <span class="card-title activator grey-text text-darken-4">{{businessName}}<i class="material-icons right">more_vert</i></span>
     <p><a target="_blank" :href=businessLink>Link</a></p>
     <p v-if="businessStatus">Closed</p>
     <p v-else>Open</p>
     <p>{{businessPrice}}</p>
     <p>{{businessRating}}</p>
     <p>{{businessPhone}}</p>
   </div>
   <div class="card-reveal">
     <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
     <p>Here is some more information about this product that is only revealed once clicked on.</p>
   </div>
 </div>

  `
})
