module.exports = function(string) {
  if(string === '') return [];
  var out = [];
  string.trim().split(/\n+/).forEach(function(item) {
    var newObject = {name: item.trim(), children: []};
    var target = out;
    for (var i = 0; item[i] === ' '; i++) {
      target = target[target.length-1].children;
    }
    target.push(newObject);      
  });
  return out;
};
