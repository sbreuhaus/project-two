window.onload = function(){
  console.log("loaded");

  var topic = document.getElementById('topic-input-box');
  var zipCode = document.getElementById('zip-input-box');
  var submitBtn = document.getElementById('submit-btn');
  // console.log(submitBtn);

  submitBtn.addEventListener('click', function(ev){
   console.log("clicked");
   ev.preventDefault();
   console.log(zipCode.value);
   console.log(topic.value);
   var query = 'https://api.meetup.com/2/open_events?key=' + MEETUP_KEY + '&sign=true' +'&zip=' + zipCode.value + '&topic=' + topic.value + '&time=,1w';
   console.log(query);
   $.ajax({
     url: query,
     dataType: 'jsonp'
   }).done(function(response){
     console.log(response);
     var results = {
       name: response.results.map(function(obj){
        console.log(obj.name);
        return obj.name;
      }),//name
       venue: response.results.map(function(obj){
         console.log("fuck");
         console.log(obj.city);
        // return obj.venue.city;
        })//venue

      }//results
      console.log(results);
      var source = document.getElementById('info-template').innerHTML;
      var template = Handlebars.compile(source);
      var compiledHTML = template(results);
      console.log(compiledHTML);
      var resultsContainer = document.getElementById('results-container');
      resultsContainer.innerHTML = compiledHTML;
      });//ajax done
   });// event listener
}//onload
