var express = require("express");
var app = express();
var methodOverride = require("method-override");
var expresssanitizer = require("express-sanitizer");
var jsregression = require('js-regression');

var passport = require('passport');
var localstrategy = require('passport-local');
var passportlocalmongoose = require('passport-local-mongoose');

var fbstrategy = require('passport-facebook').Strategy;
var request = require('request');
var FB = require('fb');

var PythonShell = require('python-shell');


app.set("view engine","ejs");
app.use(express.static("public"));
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));

app.use(expresssanitizer());
app.use(methodOverride("_method"));

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/hackeam2");

//mongoose.connect("mongodb://rohit:password@ds155644.mlab.com:55644/csiwebsite",{useMongoClient: true});
mongoose.Promise = global.Promise;

/************* */
function regression() {
  var logistic = new jsregression.LogisticRegression({
      alpha: 0.001,
      iterations: 100,
      lambda: 0.0
      })
   var trainingDataSize =5,
   trainingData = [[1, 1], [0, 0], [1, 1], [1, 1], [1,0], [0,0]], //runs in family, overweight, prediabete, age
   testingData = [[1,1], [0,0], [1,0]],

   trainingData1= [[1, 1], [0, 0], [1, 1], [1, 1], [1,0], [0,1]],//runs in family, overweight, prediabete, age
   testingData1 = [[0,1], [0,0], [1,1]],

   trainingData2 = [[1, 1], [0, 0], [1, 1], [1, 1], [1,0], [0,0]] ,//runs in family, overweight, prediabete, age
   testingData2 = [[0,1], [0,0], [1,1]],

   trainingData3 = [[36, 1], [20, 0], [70, 1], [80, 1], [24,0], [17,0]], //runs in family, overweight, prediabete, age
   testingData3 = [[90,1], [30,0], [61,1]],

   trainingData4=[[1, 1, 1, 1, 1], [0, 0, 0, 1, 0], [1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [0, 1, 1, 1, 1], [1,0, 1, 1, 1]],
   testingData4 = [[0,0,0, 0], [1,0,1, 1], [0, 1, 1, 1]]
   var model = new jsregression.LogisticRegression({
      alpha: 0.001,
      iterations: 100,
      lambda: 0.0
      }).fit(trainingData);

  // === Print the trained model === //
  //console.log(model);
  
  // === Testing the trained logistic regression === //
  for(var i=0; i < testingData.length; ++i){
    var probabilityOfBeingDiabetic = logistic.transform(testingData[i]);
    var predicted = logistic.transform(testingData[i]) >= logistic.threshold ? 1 : 0;
    //console.log("actual: " + testingData[i][1] + " probability of being diabetic: " + probabilityOfBeingDiabetic);
    //console.log("actual: " + testingData[i][1] + " predicted: " + predicted);
  }
  
  var model1=logistic.fit(trainingData1);
  
  //console.log(model1);
  for(var i=0; i < testingData1.length; ++i){
    var probabilityOfBeingDiabetic = logistic.transform(testingData1[i]);
    var predicted = logistic.transform(testingData1[i]) >= logistic.threshold ? 1 : 0;
   // console.log("actual: " + testingData1[i][1] + " probability of being diabetic: " + probabilityOfBeingDiabetic);
    //console.log("actual: " + testingData1[i][1] + " predicted: " + predicted);
  }
  
  var model2 = logistic.fit(trainingData2);
  //console.log(model2);
  for(var i=0; i < testingData2.length; ++i){
    var probabilityOfBeingDiabetic = logistic.transform(testingData2[i]);
    var predicted = logistic.transform(testingData2[i]) >= logistic.threshold ? 1 : 0;
    //console.log("actual: " + testingData2[i][1] + " probability of being diabetic: " + probabilityOfBeingDiabetic);
    //console.log("actual: " + testingData2[i][1] + " predicted: " + predicted);
  }
  
  var model3 = logistic.fit(trainingData3);
  //console.log(model3);
  for(var i=0; i < testingData3.length; ++i){
    var probabilityOfBeingDiabetic = logistic.transform(testingData3[i]);
    var predicted = logistic.transform(testingData3[i]) >= logistic.threshold ? 1 : 0;
    //console.log("actual: " + testingData3[i][1] + " probability of being diabetic: " + probabilityOfBeingDiabetic);
    //console.log("actual: " + testingData3[i][1] + " predicted: " + predicted);
  }
  
  var model4 = logistic.fit(trainingData4);
  //console.log(model4);
  var i;
  for(i=0; i < testingData4.length; ++i){
    var probabilityOfBeingDiabetic = logistic.transform(testingData4[i]);
    var predicted = logistic.transform(testingData4[i]) >= logistic.threshold ? 1 : 0;
    
  }
  console.log(" probability of being diabetic: " + probabilityOfBeingDiabetic);
  console.log(" predicted: " + predicted);
}



/****************/
// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(require('body-parser').urlencoded({ extended: true }));

//USING EXPRESS SESSION SO THAT USER REMAINS LOGGED IN EVEN IF PAGE REFRESHES OR UNTILL USER EXPLICITLY LOGS OUT

app.use(require('cookie-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

var nn = require('./nn');

var userSchema = new mongoose.Schema({
    facebookid : Number,
    name : String,
    age: Number,
    profileUrl: String,
    dpUrl: String,
    hometown: String,
    gender: String

});

var User = mongoose.model("User",userSchema);

passport.use(new fbstrategy({
    clientID: '190503814821838' ,
    clientSecret: '2b1af31f000083b609c15270ef207c39' ,
    callbackURL: 'http://localhost:3000/login/facebook/return',
    profileFields: ['id', 'displayName', 'photos', 'email','profileUrl','gender','hometown']
  },
  function(accessToken, refreshToken, profile, cb) {
    
    return cb(null, profile);
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

//DESERIALIZE USER

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(function(req,res,next){
  //console.log(req.user);
  res.locals.currentUser = req.user;
  //res.locals.currentStudent = req.user;
  next();

});



app.get('/login',function(req,res){
    res.redirect('/login/facebook');
  });
  
  
  app.get('/login/facebook',
    passport.authenticate('facebook'));
  

  
  
  app.get('/login/facebook/return', 
    passport.authenticate('facebook', { failureRedirect: '/login/facebook' }),
    function(req, res) {
      //console.log(req.user);
      User.find({facebookid:req.user.id},function(err,found){
        if(found.length){
          console.log('user exists!');
        }
        else
        {
          //console.log(req.user);
  
          User.create({
          name: req.user.displayName,
          facebookid: req.user.id,
          profileUrl: req.user.profileUrl,
          //dpUrl: req.user.photos[0].value,
          dpUrl: 'https://graph.facebook.com/' + req.user.id + '/picture?type=large&width=720&height=720',
          hometown: req.user.hometown,
          gender: req.user.gender

            },function(err,created){
          if(err)
            { 
              //console.log("error is here!")
              console.log(err);}
          else
          {
            console.log("new user");
          }
  
        })
        }
      });
  
      //console.log(req.user);
      res.redirect('/user');
      
    });
    
   app.get("/logout",function(req, res) {
  
      req.logout();
      res.redirect("/");
  });

app.get("/",function(req,res){
    res.render("home");
})
app.get("/trading",function(req,res){
    res.send("Hello2");
})
app.get("/user",isLoggedIn,function(req,res){
  
    User.find({facebookid:req.user.id}).exec(function(err,found){
        if(err)
         console.log('error!!!')
        else{
            res.render("user",{user:found});
        }

    });
});

app.get("/run",function(req,res){
  // PythonShell.run('script.py',function(err,result){
  //   console.log(result);
  // });
  var shell = new PythonShell('script.py',{mode:'text'});
  var tempmessage;
  shell.on('message',function(message){
    //console.log(message);
    //tempmessage = message;
    console.log(message);
    //res.render('user',{message:message});
  });
  //console.log('You are a normal person!');
  
  res.redirect('/user');
  //res.render('user',{tempmessage:tempmessage});
})

// can also use default configuration: var logistic = new jsregression.LogisticRegression();

// === Create training data and testing data ===//


         
app.get('/diabetes',function(req,res){
  res.render('diabetes');
});

app.post('/diabetes',function(req,res){
  
  nn.testingData.push(req.body.heredity);
  nn.testingData3.push(req.body.age);
  nn.testingData1.push(req.body.overweight);
  nn.testingData2.push(req.body.prediabetic);
  //console.log(req.body);
  console.log("before regression call");
  regression();
  console.log("after regression call");
  res.redirect('/user');
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
};

app.listen(process.env.PORT||3000,function(){
    console.log('Server started at locahost 3000');
});
var logistic = new jsregression.LogisticRegression({
  alpha: 0.001,
  iterations: 100,
  lambda: 0.0
  })