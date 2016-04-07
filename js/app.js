// Map Key AIzaSyBO7zaTpALyiQJOvnvA7_muATPumXQT2uU
//GeoSync Key  AIzaSyAB7BN8tkg05jkP4fsGts_jxQw_EPPrEW0
     //Global map variable

//FourSquare Client id UDAIBO0KLAVZAXOV1QCFE5WMROTWBLH5EVIGT1YT4QE5GBZI
//Client secret UN3EV2ASZGLNVNKEUSMUNMRLA2WDOZVC1SSWD33SUESQ1FFT

//  https://api.foursquare.com/v2/venues/' + '?client_id=UDAIBO0KLAVZAXOV1QCFE5WMROTWBLH5EVIGT1YT4QE5GBZI&client_secret=UN3EV2ASZGLNVNKEUSMUNMRLA2WDOZVC1SSWD33SUESQ1FFT=20160404



var siteAddress = [
  {
    name: "Willow Grill-Clear Creek Marina",
    address: "270 Marina Drive, Talladega, AL 35160"
  },
  {
    name: "Chilly Willy's",
    address: "4300 Martin St S, Cropwell, AL 35054"
   },

   {
    name: "Pier 59",
    address: "1366 Rivercrest Dr"
  },
  {
    name: "The Ark",
    address:  "Riverside, Al 35135"
  },
  {
    name: "Fat Man's BBQ",
    address: "10179 US Hwy 231, Cropwell, AL 35054"
  },
   {
    name: "Pell City Coffee Company",
    address: "1605 Martin St S, Pell City, AL 35128"
  }
]

var map;

var Place = function(data) {
    this.name = ko.observable(data.name);
    this.address = ko.observable(data.address);
    //this.rating = ko.observable(data.rating);
 //   console.log(this.rating);
   // this.contentString = ko.observable('');
    //this.latlng = ko.observable(data.latlng);
   // this.LatLng = ko.observable(data.LatLng);
   // console.log(this.marker);
}


//Load Initial Map Object
var initMap = function(data) {


    map = {
        zoom: 12,
        center: new google.maps.LatLng(33.474614, -86.252804),
        mapTypeId: 'terrain'
    };



//Loading ViewModel after initMap is created becasue of map errors. Credit Heidi Kassimer coach for this tip.

   ko.applyBindings(new ViewModel());

}

var ViewModel = function() {
    var self = this;
       //makes a reference for the list of places for the html
    this.placeList = ko.observableArray([]);

      // Adds the listItems (name and address)
    siteAddress.forEach(function(placeItem) {
           self.placeList.push( new Place(placeItem) );
           console.log(placeItem);
         });


     map = new google.maps.Map($('#map')[0], map);
     var marker;

     //Use GeoCoding to get the LatLng-thought it was better than having to type in Lat's and Long's in the data model.
    self.placeList().forEach(function(placeItem) {
        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + placeItem.address() + "&key=AIzaSyAB7BN8tkg05jkP4fsGts_jxQw_EPPrEW0",
         function (data) {
            var p = data.results[0].geometry.location
            var latitude = p.lat;
            var longitude = p.lng;
            var contentString = '<div> <h4>' +placeItem.name()+'</h4> </div>'; //Doesn't recognize components of FourSquare e.g. placeItem.rating

            var latlng = new google.maps.LatLng(p.lat, p.lng);
                marker = new google.maps.Marker({
                position: latlng,
                map: map,
                address: placeItem.address(),
                title: placeItem.name(),
                contentString: contentString,
                animation: google.maps.Animation.DROP,
                icon: "img/boating.svg"

                                               });

console.log(placeItem);


      self.placeList().forEach(function(placeItem) {

             //Code adapted from https://github.com/joannawicz/Paradise-city
        var results, canonicalUrl,rating,status
       $.ajax({
      url: 'https://api.foursquare.com/v2/venues/explore',
      type: 'GET',
      dataType: 'json',

      data: {
          client_id: 'UDAIBO0KLAVZAXOV1QCFE5WMROTWBLH5EVIGT1YT4QE5GBZI',
          client_secret: 'UN3EV2ASZGLNVNKEUSMUNMRLA2WDOZVC1SSWD33SUESQ1FFT',
          v: '20160407',
          limit: 1,
          ll: latitude + ',' + longitude,
          query: placeItem.name(),
          async: true
          //limit: 8,
          //radius: 10000,
          //sortByDistance: 1,
          // openNow: true,

            },

         // Credit for the hasOwnProperty https://discussions.udacity.com/t/foursquare-results-undefined-until-the-second-click-on-infowindow/39673/9

/*var contact = venue.hasOwnProperty('contact') ? venue.contact : '';

if (contact.hasOwnProperty('formattedPhone')) {
    placeItem.phone(contact.formattedPhone || '');
}
*/
     success: function(results) {
      //console.log(results);
      results = results.response.groups[0].items[0];
      //result = respsonse.groups[0].items;
      //placeItem.url = results.url;
        placeItem.text =results.tips[0].text;
       placeItem.canonicalUrl =results.tips[0].canonicalUrl;
       placeItem.rating = results.venue.rating;
       placeItem.phone = results.venue.contact.formattedPhone;
      // console.log(placeItem.phone)
      //placeItem.status = results.hours["status"];
      // placeItem.name = results.name;
      // console.log(placeItem.rating)
      // console.log(placeItem.url)
      // console.log(placeItem.canonicalUrl) //undefined
      //  console.log(placeItem.status)


    } // End of success

   }) //End Ajax

 })       // End of function


                 //console.log(placeItem);


               //reference for the showWindows function
               placeItem.marker = marker;
               // console.log(placeItem.marker);

               infowindow = new google.maps.InfoWindow ({
               content: 'none',
               maxWidth:200


             });

     //console.log(siteAddress[0].name);
                 //Relates the appropriate name with marker
                  google.maps.event.addListener(placeItem.marker, "click", function () {
                  infowindow.open(map, this);
                  infowindow.setContent(this.contentString+'<div> <h4> Rating:'+placeItem.rating +'</h4><h4> Call Us:' +placeItem.phone+ '</h4><p>' + placeItem.text+ '</p><p><a href=' +placeItem.canonicalUrl+ '>FourSquare</a></p></div>');
                 // console.log(placeItem.marker);


            });


          })

         });
                 //infoWindow bound to the list items
                 self.showWindows = function (placeItem) {  //this recognizes GeoCoding and AJAX
                 //console.log(placeItem);
                 google.maps.event.trigger(placeItem.marker, 'click')
      }


       }; //viewModel








//"https://maps.googleapis.com/maps/api/geocode/json?address=" + places.address + "&key=AIzaSyAB7BN8tkg05jkP4fsGts_jxQw_EPPrEW0",



/*
 var initialCats = [

        {
          clickCount: 0,
          humanCounter: 0,
          name: "Fluffy",
          imgSrc: "images/Fluffy.jpeg",
          nicknames: ['Fluffmeister', 'Fluff', 'Docile']

        },
        {
          clickCount: 0,
          humanCounter: 0,
          name: "The Praying Kitty",
          imgSrc: "images/begging.jpeg",
          nicknames: ['Pretty Please']
        },
         {
          clickCount: 0,
          humanCounter: 0,
          name: "Blacky",
          imgSrc: "images/blacky.jpeg",
          nicknames:['Darth', 'Darky','Midnight']
        },
         {
          clickCount: 0,
          humanCounter: 0,
          name: "Cleo",
          imgSrc: "images/Cleo.jpeg",
          nicknames:['Cleopolis','Cleopatra']
        },
         {
          clickCount: 0,
          humanCounter: 0,
          name: "Tabby",
          imgSrc: "images/tabby.jpeg",
          nicknames: [ 'Tabbatha', 'Tab', 'Tabbathina' ]
        }

      ]


var Cat = function(data) {

    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.nicknames = ko.observable(data.nicknames);
    this.humanCounter = ko.observable(data.humanCounter);

    this.levels = ko.computed(function() {
       if(this.clickCount()  >= 100) {
            return 'Great Grand Cat';
        }

         if(this.clickCount()  > 80) {
            return 'WiseOldKat';
  	    }

  	     else if (this.clickCount() >= 50) {
  		    return 'Over the Hill';
  		}

  		else if (this.clickCount() >= 30) {
  		    return 'Adult';
  		}
  		else if (this.clickCount()  >= 20) {
  		    return 'Young Adult';
        }
        else if (this.clickCount()  >= 13) {
          return 'Teenager';
        }
        else if (this.clickCount()  >= 10) {
          return 'PreTeen';

        }


  	     else return 'NewBorn';

  },this);

}



var ViewModel = function() {
    var self = this;

    this.catList = ko.observableArray([]);

    initialCats.forEach(function(catItem) {
           self.catList.push( new Cat(catItem) );
    });

	this.currentCat = ko.observable( this.catList()[0] );

  this.setCat = function(clickedCat) {  // when click function runs it passes in object
    self.currentCat(clickedCat)
  }

  //this.incCounter = function() {

  //  self.currentCat().humanCounter(self.currentCat().humanCounter() +1/7);

 // }

	this.incrementCounter = function() {

		self.currentCat().clickCount(self.currentCat().clickCount() +1);
    self.currentCat().humanCounter(self.currentCat().humanCounter() + (1/7));
 // var rounded = Math.round( number *10)/10;
 // console.log(number);
   // this.incrementCounter().toFixed([2]);
		//former  this.clickcount(this.clickcount() + 1)
		//var count = 0;
		//count ++;
	}

	};
*/



//ko.applyBindings(new ViewModel());