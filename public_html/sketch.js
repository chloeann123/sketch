var counter = 0;
var timeleft = 60;
let drawingStarted = false;
var interval;

let topZone = false;
let leftZone  = false;
let rightZone  = false;
let bottomZone  = false;

let bufferZone  = 20;


//start p5 stuff

function setup() {
  // put setup code here
  createCanvas(600,600);
}


function draw() {
  // put drawing code here


  ellipse(0,height/2,5,5) //left
  ellipse(width,height/2,5,5) // right
  ellipse(width/2,0,5,5) //top
  ellipse(width/2,height,5,5) // bottom

  fill(0)
  // noStroke()

  // ellipse(mouseX,mouseY, 15,15)
  strokeWeight(7.5)
  stroke(random(255), random(255), random(255))
  if (drawingStarted == true) {
    if (mouseIsPressed == true) {
      line(mouseX, mouseY, pmouseX, pmouseY)


      if( dist(mouseX, mouseY, width/2, 0 ) < bufferZone ){
        //we hit the top
        // console.log('proof!')
        topZone = true; //store it
        console.log(topZone)

      }

      if( dist(mouseX, mouseY, width/2,height ) < bufferZone ){
        //we hit the bottom
        // console.log('proof!')
        bottomZone = true; //store it
        console.log(bottomZone)

      }

      if( dist(mouseX, mouseY, 0,height/2 ) < bufferZone ){
        //we hit the left
        // console.log('proof!')
       leftZone = true; //store it
        console.log(leftZone)

      }

      if( dist(mouseX, mouseY, width,height/2 ) < bufferZone ){
        //we hit the right
        // console.log('proof!')
       rightZone = true; //store it
        console.log(rightZone)

      }

    // repeat for each one.



    }
  }
}




//end of the p5 stuff

$(function() { //jquery specific stuff in here!


      $('#timer').html(toHHMMSS(timeleft - counter));


      function timeIt() {
        counter++;
        $('#timer').html(toHHMMSS(timeleft - counter));
        if (counter == timeleft) {
          clearInterval(interval);
          //counter = 0;
          //Timer is done!
          //time ends, then we want to save it

          //check the zones

          if(topZone == true &&  bottomZone == true && leftZone == true && rightZone == true ){
          //get the element so we can convert to a blob
          var canvas = document.getElementById('defaultCanvas0'); //p5 generates a canvas with the ID of 'defaultCanvas0'

            //post it to the server!
            var formData = new FormData();
            formData.append('imageBlob',  canvas.toDataURL() ); // append the sound blob and the name of the file. third argument will show up on the server as req.file.originalname

            jQuery.ajax({
              url: '/upload',
              data: formData,
              cache: false,
              contentType: false,
              processData: false,
              method: 'POST',
              type: 'POST', // For jQuery < 1.9
              success: function(data) {
                // alert(data);
                console.log('image uploaded successfully')
                window.location = 'gallery.html'
              }

            }); //end on the ajax post
          }else{
            //thow an error because there were not enfough zones hit
            console.error('not enough zones')
            //alert('you need to hit all 4 zones')
            window.location = 'directions_corners.html'

          }

            ////////////
            // this is where you'll give feedback to re-direct to another page, etc.
            //////////////

        } //end timer is done check
      } //close the timeIt function


        function toHHMMSS(secs) {
          var sec_num = parseInt(secs, 10)
          var hours = Math.floor(sec_num / 3600) % 24
          var minutes = Math.floor(sec_num / 60) % 60
          var seconds = sec_num % 60
          return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
        }



        //get a random word for the prompt
        var words = ["Weather", "Flying", "Technology", "Mystery", "Animal", "Dream", "Memory", "Game", "Flower", "Maze", "Tropical", "Shadow", "Education", "Breeze"];

        var getRandomWord = function() {
          return words[Math.floor(Math.random() * words.length)];
        };

        $('#word').text(getRandomWord())



        $('.showButton').on('click', function() {
          console.log('hi');
          interval = setInterval(timeIt, 1000);
          drawingStarted = true;

          $('.showButton').hide()
          $('.center-this').hide()

          $('#word').show();


        })




      }) // end all jquery stuff
