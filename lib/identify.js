var exec = require("child_process").exec

var Identify = module.exports = {
  parseFile: function(path, _options, _callback) {
    var options = (typeof _options == 'function') ? {} : _options
      , callback = (typeof _options == 'function') ? _options : _callback

    exec("identify -verbose '" + path + "'", options, function(err, stdout, stderr) {
      callback(err, Identify.parse(stdout))
    })
  },

  parse: function(s) {
    var lines = s.split('\n').slice(1)
    return Identify._parseLines(lines)
  },

  // private

  _parseLines: function(lines) {
    var result = {}

    lines = lines.filter(function(line) { return !line.match(/^\s*$/) })

    for(var i = 0; i < lines.length; i++) {
      var line = lines[i]
        , next = lines[i+1] || ''
        , currentIdentation = Identify._leadingWhitespaces(line)
        , nextIdentation = Identify._leadingWhitespaces(next)
        , value = null

      if(nextIdentation <= currentIdentation) {
        var split = line.split(': ')
          , key   = split[0].replace(/^\s+/, '')

        value = split.slice(1).join(", ")
      } else {
        var key = line.split(':')[0].replace(/^\s+/, '')
          , j = i+1
          , nestedLine = next
          , selection = []

        do {
          selection.push(nestedLine)
          nestedLine = lines[++j] || ''
        } while(Identify._leadingWhitespaces(nestedLine) > currentIdentation)

        i = j-1
        value = Identify._parseLines(selection)
      }

      result[key] = value
    }

    return result
  },

  _leadingWhitespaces: function(line) {
    return line.match(/^\s*/)[0].length
  }
}
