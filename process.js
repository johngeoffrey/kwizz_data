var fs = require("fs"),
	readline = require('readline');

var quizObj = {},
	thisQuestion = {},
	quizNames = [];

quizObj.quiz = {};
thisQuestion.answers = [];
thisQuestion.question = {};

var rootDir = __dirname;

fs.readdir(rootDir+"/v2/data/OpenTriviaQA/categories", function(err, files){
	if(err){
		return console.error(err);
	}
	
	//console.log(files);
	
	for(file in files){
		var filename = files[file];
		
		if(filename.indexOf('.js') < 0){
			console.log(filename);
			
			if (typeof quizObj.quiz[filename] == "undefined") {
				quizObj.quiz[filename] = {};
			}
			else{
				console.log("defined");
			}
			
			quizObj.quiz[filename].complete = true;
			quizObj.quiz[filename].questions = [];
			
			
			
			fs.readFileSync(rootDir+"/v2/data/OpenTriviaQA/categories/"+filename).toString().split('\n').forEach(function (line) { 
				if(line !== '' && typeof thisQuestion.question !== "undefined"){
		  
				  if(line.indexOf('#Q') == 0){
					  var questionLine = line.split('#Q ');
					  
					  thisQuestion.question = questionLine[1];
					  thisQuestion.type = "choice";
				  }
				  else if(line.indexOf('^') == 0){
					  var answerLine = line.split('^ ');
					  
					  thisQuestion.answer = answerLine[1];
				  }
				  else if(line.indexOf('A') == 0 || line.indexOf('B') == 0 || line.indexOf('C') == 0 || line.indexOf('D') == 0){
						var re =  /A |B |C |D /;
						var thisAnswer = line.split(re);
						
						thisQuestion.answers.push(thisAnswer[1]);
				  }
				  
				  
				  
				  
				  
			  }
			  else{
				if(thisQuestion.answers.length !== 0 ){
					quizObj.quiz[filename].questions.push(thisQuestion);
				}
				  
				thisQuestion = {};
				thisQuestion.answers = [];
				thisQuestion.question = {};
				  //add to questions array
			  }
			
			}
		);
		
		
		
			console.log("quizObj", quizObj);
			//console.log(quizObj.quiz.animals.questions);
			
		}
		
		fs.writeFileSync("json/"+filename+'.json', JSON.stringify(quizObj));
		
		quizNames.push(filename);
		
		quizObj = {};
		quizObj.quiz = {};
		
	}
	
	
	fs.writeFileSync("json/quizes.json", JSON.stringify(quizNames));
	
	
});


