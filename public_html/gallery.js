let socket = io.connect();


socket.emit('getFileCount');


socket.on('fileCount', function(files){


  console.log(files)


  //loop through the files onee by one and call them out and generate a html tag for each and append to the DOM
  for(let index in files){

    console.log(files[index])

    $('.gallery').append( '<img src=uploads/' + files[index] + '>' )


  } //end the loop


//wait for a message form the server for a new drawing that got uploaded
  socket.on('newDrawing', function(filename){

    $('.gallery').append( '<img src=uploads/' + filename + '>' )


  })




})
