// Map Key AIzaSyBO7zaTpALyiQJOvnvA7_muATPumXQT2uU

      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }













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