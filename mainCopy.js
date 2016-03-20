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


  submitBtn.addEventListener('click', function(ev){
  //  console.log("clicked");
   ev.preventDefault();
  //  console.log(zipCode.value);
  //  console.log(topic.value);

   var query = 'https://api.meetup.com/2/open_events?key=' + MEETUP_KEY + '&sign=true' +'&zip=' + zipCode.value + '&topic=' + topic.value + '&time=,1w';
   // console.log("query:", query);
   var filtered = {};
  //
   $.ajax({
     url: query,
     dataType: 'jsonp'
   }).done(function(response){
     console.log("response.results:", response.results);
     filtered.results = [];
     for (var i = 0; i < response.results.length; i++) {
       if (response.results[i].name) {
         var name = response.results[i].name;
         filtered.results.name = name;
       }
       if (response.results[i].venue) {
         var venueObj = response.results[i].venue;
         filtered.results.venue = venueObj;
       }

       var id = response.results[i].id;
       var event_url = response.results[i].event_url;
       var groupName = response.results[i].group["name"];
     }
     console.log("filtered: ", filtered);
  //
      // var filtered = {
      //   results: [
      //     {
      //       name: "name of event",
      //       venue: {
      //         city: "city name",
      //         address_1: "90210",
      //         time: timestamp,
      //         name: ""
      //       }
      //     ]
      //   }
      // }
  //
  //   // HBS
    var compiledHTML = template(response.results);
    resultsContainer.innerHTML = compiledHTML;








  });//end liza ajax


      // original ajax:
      // $.ajax({
      //   url: query,
      //   dataType: 'jsonp'
      // }).done(function(response){
      //   console.log(response);
      //
      //   filtered.results = response.results;
      //    //  name: response.results.map(function(obj){
      //    //   console.log(obj.name);
      //    //   return obj.name;
      //    //name
      //    //  venue: response.results.map(function(obj){
      //    //    console.log("fuck");
      //    //    console.log();
      //      // return obj.venue.city;
      //      // }//venue
      //
      //    //filtered
      //
      //    console.log(filtered);
      //    var source = document.getElementById('info-template').innerHTML;
      //    var template = Handlebars.compile(source);
      //    var compiledHTML = template(filtered);
      //    console.log(compiledHTML);
      //    var resultsContainer = document.getElementById('results-container');
      //    resultsContainer.innerHTML = compiledHTML;
      //    });//ajax done


   });// event listener
}//onload
