var Test = function(){
  console.log(FindPlace(3, ["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "Jeju", "Pangyo", "Seoul", "NewYork", "LA"]));
  console.log(FindPlace(3, ["Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul"]));
  console.log(FindPlace(2, ["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "SanFrancisco", "Seoul", "Rome", "Paris", "Jeju", "NewYork", "Rome"]));
  console.log(FindPlace(5, ["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "SanFrancisco", "Seoul", "Rome", "Paris", "Jeju", "NewYork", "Rome"]));
  console.log(FindPlace(2, ["Jeju", "Pangyo", "NewYork", "newyork"]));
  console.log(FindPlace(0, 	["Jeju", "Pangyo", "Seoul", "NewYork", "LA"]));
};

var FindPlace = function(cacheSize, cities){
  if(cacheSize > 30 || cacheSize < 0) {
    return -1;
  }
  var cityNum = cities.length;
  if(cityNum == 0){
    return 0;
  }
  var cache = [];
  var totalTime = 0;
  var key = "";
  var latterStr = /^[a-z]+$/;

  for(var i=0; i< cityNum; i++){
    key = cities[i];
    if(key > 20){
      return -1;
    }

    key = key.toLowerCase();
    if(key.match(latterStr) == null){
      return -1;
    }

    if(Caching(cache, key, cacheSize)){
      totalTime += 1;
    } else {
      totalTime += 5;
    }
  }
  return totalTime;
};

var Caching = function(cache, key, cacheSize){
  var cacheCount = cache.length;
  var result = false;
  var keyIdx = cache.indexOf(key);
  
  if(keyIdx != -1){
    result = true;
    cache.splice(keyIdx, 1);
    cache.unshift(key);
  } else {
    if(cacheCount < cacheSize){
        cache.unshift(key);
    } else {
        cache.pop();
        cache.unshift(key);
    }
  }
};
