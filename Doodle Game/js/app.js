let nn
let synth = window.speechSynthesis
let playButton = document.querySelector("#playbutton")

const image = document.getElementById('output')
const fileButton = document.querySelector("#file")

let promptList = ['airplane', 'ant', 'apple', 'bear', 'bee', 'bird', 'bus', 'cat', 'cow', 'crab', 'dog', 'dragon', 'elephant', 'fish', 'frog', 'rain']
let prompt = document.getElementById('prompt').innerHTML = promptList[Math.floor(Math.random() * promptList.length)]

function tryAgain(){
    location.reload();
}

fileButton.addEventListener("change", (event)=>loadFile(event))

function loadFile(event) {
	image.src = URL.createObjectURL(event.target.files[0])
    image.addEventListener('load', () => modelLoaded())
}

function loadModel() {
    nn = ml5.imageClassifier('DoodleNet', modelLoaded);
}

function modelLoaded() {
    console.log('Model Loaded!')
    nn.classify(document.getElementById('output'), classifyImage)
}

function classifyImage(err, results) {
    console.log(results)
    let label = results[0].label
    let confidence = results[0].confidence
    confidence = (confidence)*100
    let label2 = results[1].label

    
    console.log('I am ' + confidence + '% sure that is a ' + label + ' but it could also be a ' + label2)

    playButton.addEventListener("click", () => {
        if(prompt == label){ 
            console.log("right")
            document.getElementById('prediction').innerHTML = 'I am ' + confidence + '% sure that is ' + label + ' but it could also be ' + label2 + ', you did great!'
            let message = 'I am ' + confidence + '% sure that is ' + label + ' but it could also be ' + label2 + ', you did great!'
            speak(message)
            points = +1
        }
        else{
            console.log("wrong")
            document.getElementById('prediction').innerHTML = 'I am ' + confidence + '% sure that is ' + label + ' but it could also be ' + label2 + ', your drawing skills could use improvement.. try again'
            let message = 'I am ' + confidence + '% sure that is ' + label + ' but it could also be ' + label2 + ', your drawing skills could use improvement.. try again'
            speak(message)
        }
    })
}

function speak(message) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (message !== '') {
        let utterThis = new SpeechSynthesisUtterance(message)
        synth.speak(utterThis)
    }
}

loadModel()