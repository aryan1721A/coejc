prediction1="";
Webcam.set({
    height:350,
    width:300,
    image_format:"png",
    png_quality:90
})

camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version",ml5.version);

classifier=ml5.imageClassifier("https://storage.googleapis.com/tm-model/xaLtw8BTk/model.json",modelLoaded);

function modelLoaded(){
console.log("Model loaded!");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_out_1="the first prediction is "+prediction1;
    var utterThis=new SpeechSynthesisUtterance(speak_out_1);
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult)
}

function gotResult(error,result){
    if(error){
        console.error(error);
    }

    else{
        document.getElementById("result_emotion_name").innerHTML=result[0].label;
         prediction1=result[0].label;
       

        speak();

        if(result[0].label=="Amazing"){
            document.getElementById("update_emotion").innerHTML="&#128076;";
        }

        if(result[0].label=="Best"){
            document.getElementById("updated_emotion").innerHTML="&#128077;";
        }
        if(result[0].label=="Victory"){
            document.getElementById("updated_emotion").innerHTML="&#x270c;";
        }

        
    }
}
