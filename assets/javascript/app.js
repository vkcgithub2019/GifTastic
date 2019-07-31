// only executes the function when the document is done loading 
$(document).ready(function() {

// setting a variable called 'animals' and for creating an array to store the type of animals
	var animals = [
	  "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
	  "bird", "ferret", "turtle", "sugar glider", "chinchilla",
	  "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
	  "capybara", "teacup pig", "serval", "salamander", "frog"
	];
//starting buttons for topics/search terms and for new button for the new search,
//placeholders
	function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
// clearing any data in the areaToAddTo to allow for new data/newly created button
	  $(areaToAddTo).empty();
//for looping through the 'arrayToUse' array
	  for (var i = 0; i < arrayToUse.length; i++) {
//to create button and stored in a variable called 'a'
		var a = $("<button>");
//assigning class of classToAdd to the button created with the variable of 'a'
		a.addClass(classToAdd);
//	assign data attribute call data-type to the animal at the position[i],in the array	
		a.attr("data-type", arrayToUse[i]);
//is whatever array to pass on
		a.text(arrayToUse[i]);
//appending button to specified 'areaToAddTo location at the end of the array 
		$(areaToAddTo).append(a);
	  }
// "<button class='classtoAdd' type='rabbit'>rabbit</button>"
	}
//listening for click event on anything that belongs to class animal button
	$(document).on("click", ".animal-button", function() {
// anything with id of 'animals' will be emptied in this div
	  $("#animals").empty();
//selecting class of animal-button, to remove the active class
	  $(".animal-button").removeClass("active");
// refering to whatever is clicked, and adding active class
	  $(this).addClass("active");
//creating new variable called type ,taking the value of the class attribute and storing in the var
	  var type = $(this).attr("data-type");
//requesting data from the giphy site using assigned api key, with a limit of 10 gifs per search
	  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
// using AJAX  
	  $.ajax({
// to extract information from the requested site
		url: queryURL,
//using the AJAX request GET method to queryURL
		method: "GET"
	  })
//the result/data of the query from API
		.then(function(response) {
// storing an array of results in a variable called 'results'
		  var results = response.data;
// for looping through every result item in the results array
  		  for (var i = 0; i < results.length; i++) {
// make a new div with class 'animal-item' and assigning it to the variable animalDiv
			var animalDiv = $("<div class=\"animal-item\">");
// storing the result item's rating of the ith object in variable 'rating'
			var rating = results[i].rating;
// creating a paragraph tag with the result item's rating and storing the results in a variable called p
			var p = $("<p>").text("Rating: " + rating);
//giving the image tag an src attribute of a property from the result item of the ith location and storing the result in a variable called animated
			var animated = results[i].images.fixed_height.url;
// obtained the still images url and store them in a variable called 'still'
			var still = results[i].images.fixed_height_still.url;
// image tag created is stored in the variable animalImage
			var animalImage = $("<img>");
// setting the animalImage src attribute to still if the variable state is still, url for the still image is store here
			animalImage.attr("src", still);
// update image's src attribute to still or what its data-animate value is, 
			animalImage.attr("data-still", still);
//update data-state attribute to 'animate'
			animalImage.attr("data-animate", animated);
//update data-state attribute to 'still' upon initial loading
			animalImage.attr("data-state", "still");
// adding the animal images with class of 'animal-image' 
			animalImage.addClass("animal-image");
//appending the paragraph  created to the animalDiv that was created
			animalDiv.append(p);
// appending the animalImage created to the animalDiv that was created
			animalDiv.append(animalImage);
//  appending the animalDiv to the '#animals' div in the HTML to the end of the list
			$("#animals").append(animalDiv);
		  }
		});
	});
//adding a click event listener to all elements with a class of 'animal-image'
	$(document).on("click", ".animal-image", function() {
// the attr jquery method allows us to get or set the value of any attribute on our HYML element
	  var state = $(this).attr("data-state");
//check to see if gif is still or animated, if still, click to animate
	  if (state === "still") {
//selecting the html object(button) using $(this) and reassign the src attribute to the value of the data animate attribute 
		$(this).attr("src", $(this).attr("data-animate"));
//selecting the button click and reassign the data-state attribute and set it equal to animate
		$(this).attr("data-state", "animate");
	  }
	  
	  else {
// if animate then when clicked will change to still 
		$(this).attr("src", $(this).attr("data-still"));
// set the data-state attribute to 'still'
		$(this).attr("data-state", "still");
	  }
	});
//event listener function- handles events where an animal button is clicked
	$("#add-animal").on("click", function(event) {
//The preventDefault() method cancels the event if it is cancelable, the default action that belongs to the event will not occur.
	  event.preventDefault();
//this line grabs the input from the textbox  
	  var newAnimal = $("input").eq(0).val();
// if the name of the animals in the Add an animal input box has less than 2 characters, nothing will happen. The search name must have at least 3 characters (greater than 2)
	  if (newAnimal.length > 2) {
// if the above input search name has more than 2 characters, then add the newAnimal to the end of the animal array
		animals.push(newAnimal);
	  }
// when user input the kind of animal in the 'Add an animal' box, and clicked submit, the new search button will be created and it will show up along with the other existing buttons, 
  populateButtons(animals, "animal-button", "#animal-buttons");
  
	});
//when document is finished loading, this function will start generating animal buttons and this will display all the animal buttons on the top of the page. 
	populateButtons(animals, "animal-button", "#animal-buttons");
  });