prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width : 350,
    height : 300,
    image_format: 'png',
    png_quality: 90
  });

camera = document.getElementById('camera')

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
 
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/w6mj4Zc1f/model.json',modelLoaded);

function speak(){
var synth = window.speechSynthesis;
speak_data_1 = "A primeira previsão é " + prediction_1;
speak_data_2 = "E a segunda previsão é " + prediction_2;
var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
synth.speak(utterThis)
}


function check()
{
  img = document.getElementById('captured_image');
  classifier.classify(img, gotResult);
}


function gotResult(error, results) {
if(error){
  console.error(error)
} else {
  document.getElementById("result_emotion_name").innerHTML = results[0].label;
  document.getElementById("result_emotion_name2").innerHTML = results[1].label;
  prediction_1 = results[0].label;
  prediction_2 = results[1].label;
  speak();

  if(result[0].label == "feliz")
  {
    document.getElementById("update_emoji").innerHTML = "&#128522;";
  }
  if(result[0].label == "triste")
  {
    document.getElementById("update_emoji").innerHTML = "&#128532;";
  }
  if(result[0].label == "irritado")
  {
    document.getElementById("update_emoji").innerHTML = "&#128548;";
  }

  //Adicione o número 1, pois ele corresponde a segunda previsão
  if(result[1].label == "feliz")
  {
    document.getElementById("update_emoji2").innerHTML = "&#128522;";
  }
  if(result[1].label == "triste")
  {
    document.getElementById("update_emoji2").innerHTML = "&#128532;";
  }
  if(result[1].label == "irritado")
  {
    document.getElementById("update_emoji2").innerHTML = "&#128548;";
  }
}
}
function modelLoaded(){
  console.log("modelo carregado!")
}
