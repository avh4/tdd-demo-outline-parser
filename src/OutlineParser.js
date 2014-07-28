module.exports = function(string) {
  if (string == '') return [];
  var result = [];
  string.trim().split(/\n+/).forEach(function(line) {
    var newItem = { name: line.trim(), children: [] };
    var target = result;
    for (var i = 0; line[i] == ' '; i++) {
      target = target[target.length - 1].children;
    }
    target.push(newItem);
  });
  return result;
};
