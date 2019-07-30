// only executes the function when the document is done loading 
$(document).ready(function() {

	// setting a variable called animals and creating an array to store the type of animals
	var animals = [
	  "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
	  "bird", "ferret", "turtle", "sugar glider", "chinchilla",
	  "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
	  "capybara", "teacup pig", "serval", "salamander", "frog"
	];
  //starting buttons for topics/search terms and for new button for new search
  //placeholders
	function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
	  $(areaToAddTo).empty();
  //for loop   
	  for (var i = 0; i < arrayToUse.length; i++) {
//to create button
		var a = $("<button>");
  //assigning class to the button,
		a.addClass(classToAdd);
	//	assign data attribute call types,	
		a.attr("data-type", arrayToUse[i]);
  //is whatever array to pass on
		a.text(arrayToUse[i]);
		//appending button to specified location
		$(areaToAddTo).append(a);
	  }
	 // "<button class='classtoAdd' type='rabbit'>rabbit</button>"
	}
  //listening for click event on anything that belongs to class animal button
	$(document).on("click", ".animal-button", function() {
	 // anything with id of animal will be emptied in this div
	  $("#animals").empty();
	  //selecting class of animal-button, to remove the active class
	  $(".animal-button").removeClass("active");
	 // refering to whatever is clicked, and adding active class
	  $(this).addClass("active");
  //creating new variable called type ,taking the value of the class attribute and storing in the var
	  var type = $(this).attr("data-type");
  //requesting data from the giphy site using assigned api key, with a limit of 10 gifs per search
	  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
  // using AJAX  
	  $.ajax({
  // to extract information from the requested site
		url: queryURL,
  //using the GET method
		method: "GET"
	  })
	  //the result of the query
		.then(function(response) {
  // the response data or result is assigned a variable called results
		  var results = response.data;
  // for looping through the results array
  		  for (var i = 0; i < results.length; i++) {
			var animalDiv = $("<div class=\"animal-item\">");
  
			var rating = results[i].rating;
  
			var p = $("<p>").text("Rating: " + rating);
  
			var animated = results[i].images.fixed_height.url;
  
			var still = results[i].images.fixed_height_still.url;
  
			var animalImage = $("<img>");
  
			animalImage.attr("src", still);
  
			animalImage.attr("data-still", still);
  
			animalImage.attr("data-animate", animated);
  
			animalImage.attr("data-state", "still");
  
			animalImage.addClass("animal-image");
  
			animalDiv.append(p);
  
			animalDiv.append(animalImage);
  
			$("#animals").append(animalDiv);
		  }
		});
	});
  
	$(document).on("click", ".animal-image", function() {
  
	  var state = $(this).attr("data-state");
  //check to see if gif is still or animalte, if still, click to animate
	  if (state === "still") {
		//selecting the html object(button) using $(this) and reassign the src attribute to the value of the data animate attribute
		$(this).attr("src", $(this).attr("data-animate"));
		//selecting the button click and reassign the data-state attribute and set it equal to animate
		$(this).attr("data-state", "animate");
	  }
	  // if animate then click to make it still
	  else {
		$(this).attr("src", $(this).attr("data-still"));
  
		$(this).attr("data-state", "still");
	  }
	});
  //
	$("#add-animal").on("click", function(event) {
	  //The preventDefault() method cancels the event if it is cancelable, the default action that belongs to the event will not occur.
	  event.preventDefault();
	  
	  var newAnimal = $("input").eq(0).val();
  
	  if (newAnimal.length > 2) {
		animals.push(newAnimal);
	  }
  
	  populateButtons(animals, "animal-button", "#animal-buttons");
  
	});
  
	populateButtons(animals, "animal-button", "#animal-buttons");
  });