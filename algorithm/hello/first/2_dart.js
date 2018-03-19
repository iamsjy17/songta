var TestCases = [{input:"1S2D*3T", output:37}, {input:"1D2S#10S", output:9}, {input:"1D2S0T", output:3}];

var Test = function(testCases) {
  if(typeof testCases !== 'object'){
    return;
  }
  var result = -1;
  for(var i=0; i < testCases.length; i++){
    result = CalcScore(testCases[i].input);
    console.log(testCases[i].input + " : " + result);
  }
};

var CalcScore = function(input){
  if(typeof input !== 'string'){
    return -1;
  }

  var scoreArray = [{num: 0, bonus:"", option:""},
                    {num: 0, bonus:"", option:""},
                    {num: 0, bonus:"", option:""}];
  var i = 0;
  var scoreIdx = -1;
  var token = "";

  var numberStr = /^[0-9]+$/;
  var optionStr = "*#";
  var bonusStr = "SDT";

  for (i; i < input.length; i++) {
    if(scoreIdx > 2){
      return -1;
    }
    token = input.charAt(i);
    if(token.match(numberStr) != null){
      scoreArray[++scoreIdx].num = parseInt(token, 10);

      if(input.charAt(i + 1).match(numberStr) != null){
        token = input.substr(i, 2);
        scoreArray[scoreIdx].num = parseInt(token, 10);
        if(scoreArray[scoreIdx].num > 10){
          return -1;
        }
        i++;
      }
    } else if(optionStr.indexOf(token) != -1) {
      if(scoreArray[scoreIdx].option.length > 0){
        return -1;
      }
      scoreArray[scoreIdx].option += token;
    } else if(bonusStr.indexOf(token) != -1){
      if(scoreArray[scoreIdx].bonus.length > 0){
        return -1;
      }
      scoreArray[scoreIdx].bonus += token;
    }
  }

  for (i = 0; i < scoreArray.length; i++) {
    if(isNaN(scoreArray[i].num)){
      return -1;
    }

    if(scoreArray[i].bonus == "D"){
      scoreArray[i].num = Math.pow(scoreArray[i].num, 2)
    } else if(scoreArray[i].bonus == "T"){
      scoreArray[i].num = Math.pow(scoreArray[i].num, 3)
    }

    if(scoreArray[i].option == "*"){
      if(i > 0){
        scoreArray[i - 1].num *= 2;
      }
      scoreArray[i].num *= 2;
    } else if(scoreArray[i].option == "#"){
      scoreArray[i].num *= -1;
    }
  }

  var resultScore = 0;
  for(i = 0; i < scoreArray.length; i++){
    resultScore += scoreArray[i].num;
  }

  return resultScore;
};
