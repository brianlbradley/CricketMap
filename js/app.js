// Map Key AIzaSyBO7zaTpALyiQJOvnvA7_muATPumXQT2uU
//GeoSync Key  AIzaSyAB7BN8tkg05jkP4fsGts_jxQw_EPPrEW0
     //Global map variable






var siteAddress = [
  {
    name: "The Back Porch Grill",
    address: "270 Marina Drive, Talladega, AL 35160"
  },
  {
    name: "Chilly Williys",
    address: "4300 Martin St S, Cropwell, AL 35054"

   },
   {
    name: "Pam and Mike's",
    address: "780 River Oaks Drive, Cropwell, Al"
   },
   {
    name: "Pier 59",
    address: "1366 Rivercrest Dr"
  },
  {
    name: "The Ark",
    address:  "Riverside, Al 35135"
  }
]
var map;

var Place = function(data) {
    this.name = ko.observable(data.name);
    this.address = ko.observable(data.address);
    console.log(this.name);
}


//Load Initial Map Object
var initMap = function(data) {


    map = {
        zoom: 12,
        center: new google.maps.LatLng(33.474614, -86.252804),
        mapTypeId: 'terrain'
    };

     infowindow = new google.maps.InfoWindow ({
      content: "None"
     });
    map = new google.maps.Map($('#map')[0], map);

     //Use GeoCoding to get the LatLng
    siteAddress.forEach(function(marker) {
        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + marker.address + "&key=AIzaSyAB7BN8tkg05jkP4fsGts_jxQw_EPPrEW0",
         function (data) {
            var p = data.results[0].geometry.location
            var latlng = new google.maps.LatLng(p.lat, p.lng);

                marker = new google.maps.Marker({
                position: latlng,
                map: map,
                address: marker.address,
                title: marker.name,
                contentString: marker.name,
                animation: google.maps.Animation.DROP,
                icon: "img/boating.svg"

            });

  //console.log(siteAddress[0].name);


               google.maps.event.addListener(marker, "click", function () {

                infowindow.open(map, this);
                infowindow.setContent(this.contentString);
                this.marker = marker;

            });
         })
      })
  }


var ViewModel = function() {
    var self = this;
       //makes a reference for the list of places for the html
    this.placeList = ko.observableArray([]);

    siteAddress.forEach(function(placeItem) {
           self.placeList.push( new Place(placeItem) );
           //console.log(placeItem);
         });

    self.showInfo = function (placeItem) {
        google.maps.event.trigger(placeItem.marker, 'click');
        self.hideElements();
    };


       }; //viewModel




ko.applyBindings(new ViewModel());



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