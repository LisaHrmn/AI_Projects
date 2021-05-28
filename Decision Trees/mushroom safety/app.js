import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"

//
// DATA
//
const csvFile = "./data/mushrooms.csv"
const trainingLabel = "class"  
const ignored = []  

//
// laad csv data als json
//
function loadData() {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: results => trainModel(results.data)   // gebruik deze data om te trainen
    })
}

//
// MACHINE LEARNING - Decision Tree
//
function trainModel(data) {
    //splits data in traindata en testdata
    let trainData = data.slice(0, Math.floor(data.length * 0.8))
    let testData = data.slice(Math.floor(data.length * 0.8) + 1)

    // maak het algoritme aan
    let decisionTree = new DecisionTree({
        ignoredAttributes: ignored,
        trainingSet: trainData,
        categoryAttr: trainingLabel
    })

    // Teken de boomstructuur - DOM element, breedte, hoogte, decision tree
    let visual = new VegaTree('#view', 1500, 500, decisionTree.toJSON())

    //prediction 
    let mushroom = {
        bruises: "t",
        cap_color: "n",
        cap_shape: "x",
        cap_surface: "s",
        class: "p",
        gill_attachment: "f",
        gill_color: "k",
        gill_size: "n",
        gill_spacing: "c",
        habitat: "u",
        odor: "p",
        population: "s",
        ring_number: "o",
        ring_type: "p",
        spore_print_color: "k",
        stalk_color_above_ring: "w",
        stalk_color_below_ring: "w",
        stalk_root: "e",
        stalk_shape: "e",
        stalk_surface_above_ring: "s",
        stalk_surface_below_ring: "s",
        veil_color: "w",
        veil_type: "p"
    }

    let prediction = decisionTree.predict(mushroom)
    console.log(`This mushroom is probably ${prediction}`)

    //test prediction
    let testMushroom = Object.assign ({}, testData[0])
    delete testMushroom.class
    console.log(testMushroom)

    let testPrediction = decisionTree.predict(testMushroom)
    console.log(`This mushroom is probably ${testPrediction}`)

    if (testPrediction == testData[0].class){
        console.log("correcte voorspelling!")
    }

    //accuracy met behulp van alle test data
    let amountcorrect = 0
    for(let i = 0; i < testData.length; i++){
        if(testPrediction == testData[i].class){
            amountcorrect++
        }
    }

    let accuracy = amountcorrect / testData.length
    console.log(accuracy)
    document.getElementById("accuracy").innerHTML= accuracy;
}

loadData()