//liste avec:
//question
//réponse juste après
var question = [
  "Trouver un mot",
  "grep",

  "Remplacer un mot",
  "sed",

  "Afficher les utilisateurs UNIX",
  "who",

  "Afficher la date",
  "date",

  "Afficher un calendrier",
  "cal",

  'Afficher "Bonjour" dans la console',
  'echo "Bonjour"'
];

var range = question.length; //nombre d'élements dans la liste
var nbquestion = Math.floor(range / 2);

questiondone = [];


function randomgif(){
  var gifnum = Math.floor(Math.random() * 4) + 1
  if (gifnum == 1){
    giftag="kaamelott"
  }
  if (gifnum == 2){
    giftag="palmashow"
  }
  if (gifnum == 3){
    giftag="fun"
  }
  if (gifnum == 4){
    giftag="geek"
  }
  $.ajax({
      url: "http://tv.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=palmashow&tag="+giftag,
      type: "GET",
      success: function(response) {
          console.log("This works too");
          //debugger
          console.log(response.data.image_url); // here is where I'm having an issue!
          var url=response.data.image_url;
          $('#gif').attr("src",url);

      }
  });
}


function generatequestion(question) {

  if (questiondone.length >= nbquestion) { //On regarde si le test est fini avant d'aller plus loin
    console.log("TEST FINI !");
    $('#question').text('TEST TERMINE');
    $('#reponse').val(''); //vide la barre
    return;
  }

  var number = Math.floor(Math.random() * range / 2) * 2; //génére un nombre impair aléatoire
  while (questiondone.indexOf(number) >= 0) { // ON CHECK SI LE NOMBRE EST DEJA SORTI DANS LES QUESTIONS
    number = Math.floor(Math.random() * range / 2) * 2; //génére un nombre impair aléatoire
  }
  numeroquestion = questiondone.length + 1;
  $('#question').text("(Question "+numeroquestion+"/"+nbquestion+"):    "+question[number]); //écrit la question

  questiondone.push(number);
  console.log(questiondone);
  return number
}




function validating(question, number) {
  $(document).keypress(function(event) {
    reponse = number + 1

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') { //détecte la touche entrée

      var checkreponse = $('#reponse').val();

      if (checkreponse != question[reponse]) {
        $('#yes').hide();
        $('#nope').hide();
        $('#nope').show();
      }

      if (checkreponse == question[reponse]) {
        console.log(reponse);
        $('#nope').hide();
        $('#yes').show()

        randomgif();

        event.preventDefault();
        event.stopPropagation();
      }

    }
  });
}



var number = generatequestion(question);
validating(question, number);

$("#next").on("click", function() { //à chaque click sur le bouton next on relance tout
  $('#reponse').val(''); //vide la barre
  $("#yes").hide();
  $('#nope').hide();
  var number = generatequestion(question);
  validating(question, number);





});