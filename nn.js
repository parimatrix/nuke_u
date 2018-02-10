var jsregression = require('js-regression');

// === Create the linear regression === //
var logistic = new jsregression.LogisticRegression({
   alpha: 0.001,
   iterations: 100,
   lambda: 0.0
});
// can also use default configuration: var logistic = new jsregression.LogisticRegression();

// === Create training data and testing data ===//

var trainingDataSize =5;
var trainingData = [[1, 1], [0, 0], [1, 1], [1, 1], [1,0], [0,0]]; //runs in family, overweight, prediabete, age
var testingData = [[1,1], [0,0], [1,0]];

var trainingData1 = [[1, 1], [0, 0], [1, 1], [1, 1], [1,0], [0,1]]; //runs in family, overweight, prediabete, age
var testingData1 = [[0,1], [0,0], [1,1]];

var trainingData2 = [[1, 1], [0, 0], [1, 1], [1, 1], [1,0], [0,0]]; //runs in family, overweight, prediabete, age
var testingData2 = [[0,1], [0,0], [1,1]];

var trainingData3 = [[36, 1], [20, 0], [70, 1], [80, 1], [24,0], [17,0]]; //runs in family, overweight, prediabete, age
var testingData3 = [[90,1], [30,0], [61,1]];

var trainingData4=[[1, 1, 1, 1, 1], [0, 0, 0, 1, 0], [1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [0, 1, 1, 1, 1], [1,0, 1, 1, 1]];
var testingData4 = [[0,0,0, 0, 0], [1,0,1, 1, 1], [0, 1, 1, 1, 1]];

// === Train the logistic regression === //
var model = logistic.fit(trainingData);

// === Print the trained model === //
console.log(model);

// === Testing the trained logistic regression === //
for(var i=0; i < testingData.length; ++i){
   var probabilityOfBeingDiabetic = logistic.transform(testingData[i]);
   var predicted = logistic.transform(testingData[i]) >= logistic.threshold ? 1 : 0;
   console.log("actual: " + testingData[i][1] + " probability of being diabetic: " + probabilityOfBeingDiabetic);
   console.log("actual: " + testingData[i][1] + " predicted: " + predicted);
}

var model1=logistic.fit(trainingData1);

console.log(model1);
for(var i=0; i < testingData1.length; ++i){
   var probabilityOfBeingDiabetic = logistic.transform(testingData1[i]);
   var predicted = logistic.transform(testingData1[i]) >= logistic.threshold ? 1 : 0;
   console.log("actual: " + testingData1[i][1] + " probability of being diabetic: " + probabilityOfBeingDiabetic);
   console.log("actual: " + testingData1[i][1] + " predicted: " + predicted);
}

var model2 = logistic.fit(trainingData2);
console.log(model2);
for(var i=0; i < testingData2.length; ++i){
   var probabilityOfBeingDiabetic = logistic.transform(testingData2[i]);
   var predicted = logistic.transform(testingData2[i]) >= logistic.threshold ? 1 : 0;
   console.log("actual: " + testingData2[i][1] + " probability of being diabetic: " + probabilityOfBeingDiabetic);
   console.log("actual: " + testingData2[i][1] + " predicted: " + predicted);
}

var model3 = logistic.fit(trainingData3);
console.log(model3);
for(var i=0; i < testingData3.length; ++i){
   var probabilityOfBeingDiabetic = logistic.transform(testingData3[i]);
   var predicted = logistic.transform(testingData3[i]) >= logistic.threshold ? 1 : 0;
   console.log("actual: " + testingData3[i][1] + " probability of being diabetic: " + probabilityOfBeingDiabetic);
   console.log("actual: " + testingData3[i][1] + " predicted: " + predicted);
}

var model4 = logistic.fit(trainingData4);
console.log(model4);
for(var i=0; i < testingData4.length; ++i){
   var probabilityOfBeingDiabetic = logistic.transform(testingData4[i]);
   var predicted = logistic.transform(testingData4[i]) >= logistic.threshold ? 1 : 0;
   console.log("actual: " + testingData4[i][4] + " probability of being diabetic: " + probabilityOfBeingDiabetic);
   console.log("actual: " + testingData4[i][4] + " predicted: " + predicted);
}
