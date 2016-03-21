window.onload = function(){
  console.log("loaded");



  var topic = document.getElementById('topic-input-box');
  var zipCode = document.getElementById('zip-input-box');
  var submitBtn = document.getElementById('submit-btn');
  // console.log(submitBtn);


  function unixTimeConvert(time){
    var date = new Date(time*1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      return formattedTime;
      }



  // HBS
  var source = document.getElementById('info-template').innerHTML;
  var template = Handlebars.compile(source);
  var resultsContainer = document.getElementById('results-container');
  var mapDiv = document.getElementById('map');

  // function geoFindMe() { //from MDN
  //   var output = document.getElementById("out");
  //
  //   if (!navigator.geolocation){
  //     output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
  //     return;
  //   }
  //
  //   function success(position) {
  //     var latitude  = position.coords.latitude;
  //     var longitude = position.coords.longitude;
  //     console.log(latitude);
  //     console.log(longitude);
  //
  //     output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
  //
  //     var img = new Image();
  //     img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
  //
  //     output.appendChild(img);
  //   };
  //
  //   function error() {
  //     // output.innerHTML = "Unable to retrieve your location";
  //   };
  //
  //   // output.innerHTML = "<p>Locating…</p>";
  //
  //   navigator.geolocation.getCurrentPosition(success, error);
  // }



  submitBtn.addEventListener('click', function(ev){
  //  console.log("clicked");
   ev.preventDefault();
  //  console.log(zipCode.value);
   console.log(topic.value.replace(/ +/g, ""));
   mapDiv.classList.toggle('map-hidden');


   var query = 'https://api.meetup.com/2/open_events?key=' + MEETUP_KEY + '&sign=true' +'&zip=' + zipCode.value + '&topic=' + topic.value.replace(/ +/g, "") + '&time=,1w';
   // console.log("query:", query);
   var filtered = {};

      // original ajax:
      $.ajax({
        url: query,
        dataType: 'jsonp'
      }).done(function(response){
        console.log(response);
        if (response.results.length === 0) {
          console.log("nothing here");
          var noResult = document.createElement('h3');
          noResult.innerText = "There seems to be nothing matching that topic.";
          console.log(noResult);
          document.body.appendChild(noResult);
        }
        // if(response.results[i].venue) {  GARBAGE
        //  var venueObj = response.results[i].venue;
        //  filtered.results.venue = venueObj;
        // }
        // for (var i = 0; i < response.results.length; i++) {
        //   var latitude = "the lat"
        //   var longitude = "the lon"
        //   filtered.image = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false"
        // }

         filtered.results = response.results; ////ORIGINAL FILTER
         console.log("filtered object" + filtered);
         var source = document.getElementById('info-template').innerHTML;
         var template = Handlebars.compile(source);
         var compiledHTML = template(filtered);
        //  console.log(compiledHTML);
         var resultsContainer = document.getElementById('results-container');
         resultsContainer.innerHTML = compiledHTML;
         var eventLocation = document.getElementById('event-location');
         console.log("heres the event " + eventLocation);



         });//ajax done


       });// event listener




 }//onload
