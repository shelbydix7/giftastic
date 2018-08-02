$(document).ready(function() {

  lastClick = [];
  
  
  
    var animalGifs = {
      
      animalSearches: ["Horse", "Pig", "Dog", "Cat", "Whale","Bird",
     "Elephant", "Dolphin", "Dinosaur", "Fish", "Giraffe", "Lizard",
     "Shark", "Spider", "Tiger", "Lion", "Squirell", "Hedgehog", "Octopus"],
  
    buttonLoop: function() {
      for (var b = 0; b < animalGifs.animalSearches.length - 1; b++) {
        var buttonM = $("<button class='dynGen'>").text(animalGifs.animalSearches[b]).attr("data-index", animalGifs.animalSearches[b]);
        $("#buttons").append(buttonM);
      }
    },
  
    divLoop: function(click) {
  
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=T13BgZHM0d4cjAEPaHZQ4wvYDDoitlbb&q=" + lastClick + "&limit=10"
  
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
  
        
          for (var i = 0; i < response.data.length; i++) {
            var respData = response.data[i];
            var image = respData.images.fixed_height_still.url;
          var gif = respData.images.fixed_height.url;
            var rating = respData.rating;
  
            var dynDiv = $("<div class='dyn-div'>");
  
            var animalImg = $("<img class='still-image'>");
  
            animalImg.attr("src", image);
            animalImg.attr("alt", "Animal still frame of gif");
            animalImg.attr("data-gif", gif);
            animalImg.attr("class", "animalImg");
            animalImg.attr("data-index", i);
            animalImg.attr("data-img", image);
  
            dynDiv.append("<p> Rating: " + rating + "</p>");
            dynDiv.append(animalImg);
  
            $("#append-img-div").prepend($(dynDiv));
        };
  
          });
      },
    userPush: function () {
         var userInput = $("input[type='text']").val().trim();
          //console.log(userInput);
          animalGifs.animalSearches.push(userInput);
          var buttonU = $("<button class='dynGen'>").text(userInput).attr("data-index", userInput);
          $("#buttons").append(buttonU);
          //console.log(animalGifs.animalsearches);
      }
  };
  
  animalGifs.buttonLoop();
  
  $("#animal-add-submit").on("click", function(event) {
    event.preventDefault();
    animalGifs.userPush();
  });
  
  $(document).on("click", "button.dynGen", function(event) {
      var currentIndex = $(this).attr("data-index");
    lastClick.push(currentIndex);
    //console.log(currentIndex);
    event.preventDefault();
    $("#append-img-div").empty();
    animalGifs.divLoop();
    lastClick = [];
  });
    
  $(document).on("click", ".animalImg", function(event) {
    //console.log("test");
    var currentIn = $(this).attr("data-index");
    var tempUrl = $(this).attr("data-gif");
    var tempUrl2 = $(this).attr("data-img");
    //console.log(currentIn);
    //console.log(tempUrl);
    if ($(this).attr("src") == tempUrl2) {
  
    $(this).attr("src", tempUrl);
    }
    else if ($(this).attr("src") == tempUrl) {
    $(this).attr("src", tempUrl2);
    };
  });
});