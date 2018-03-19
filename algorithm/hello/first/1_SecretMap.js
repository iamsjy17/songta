var TestCase = function(n, arr1, arr2){
  this.n = n;
  this.arr1 = arr1;
  this.arr2 = arr2;

};

var testcase1 = new TestCase(5, [9, 20, 28,18, 11], [30,1, 21, 17, 28]);
var testcase2 = new TestCase(6, [46,33,33,22,31,50], [27,56,19,14,14,10]);
var testcase4 = new TestCase(10, [46,33,33,22,31,50,3, 22, 44, 20], [27,56,19,14,14,10, 10, 23, 40, 24]);

var Test = function(){
  console.log(DecodeMap(testcase1));
  console.log(DecodeMap(testcase2));
  console.log(DecodeMap(testcase4));
};

var DecodeMap = function(testCase){
  if(typeof testCase !== 'object'){
    return null;
  };

  if(testCase.n < 1 || testCase.n > 16){
    console.log("한 변의 크기는 1 ~ 16 사이만 받을 수 있습니다.");
    return null;
  }

  if(typeof testCase.arr1 !== 'object' || typeof testCase.arr2 !== 'object'){
    console.log("잘못된 인자가 들어왔습니다.");
    return null;
  }

  if(testCase.arr1.length != testCase.n || testCase.arr2.length != testCase.n){
    console.log("각 원소의 길이는 입력받은 n과 같아야 합니다.");
    return null;
  }


  var addArr = [];
  var i =0;
  for(i; i < testCase.n; i++){
    addArr[i] = testCase.arr1[i] | testCase.arr2[i];
  }

  var binaryArrays = [];
  var resultArr = [];
  for(i = 0; i < testCase.n; i++){
    binaryArrays[i] = ToBinaryStringArray(addArr[i], testCase.n);
    if(binaryArrays[i] == null || binaryArrays[i].length != testCase.n){
      return null;
    }
    resultArr[i] = ConvertWall(binaryArrays[i]);
    if(resultArr[i] == null){
      return null;
    }
  }
  return resultArr;
};

var ToBinaryStringArray = function(num, n){
  if(typeof num !== 'number'){
    return null;

  }

  var binary = num.toString(2);
  var binaryMap =[];

  var i = 0;
  var diffrentNum = n - binary.length;
  if(diffrentNum < 0){
    return null;
  }

  for(i; i< diffrentNum; i++){
    binaryMap[i] = "0";
  }

  for(i = 0; i< binary.length; i++){
    binaryMap[i + diffrentNum] = binary.charAt(i);
  }

  return binaryMap;
};

var ConvertWall = function(binaryStringArray){
  if(typeof binaryStringArray !== 'object'){
    return null;
  }
  var result = "";

  for(var i = 0; i < binaryStringArray.length; i++){
      if(binaryStringArray[i] == "0"){
        result += " ";
      } else if(binaryStringArray[i] = "1"){
        result += "#";
      } else{
        return null;
      }
  }
  return result;
}
