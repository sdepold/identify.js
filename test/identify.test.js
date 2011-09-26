var assert         = require('assert')
  , vows           = require('vows')
  , Identify = require('../index')

vows.describe('identify').addBatch({
  "#parse": {
    "should return json": function() {
      assert.deepEqual(Identify.parse("head: line\n  a: b"), {a:'b'})
    },
    "should parse keys with colons": function() {
      assert.deepEqual(Identify.parse("head: line\n  foo:bar: bar"), {'foo:bar': 'bar'})
    },
    "should parse values with colons": function() {
      assert.deepEqual(Identify.parse("head: line\n  foo: hello:world"), {foo: 'hello:world'})
    },
    "should parse nested values": function() {
      assert.deepEqual(Identify.parse("head: line\n  parent:\n    foo: bar"), {parent: {foo: 'bar'}})
    },
    "should parse super awesome constructs": function() {
      var nested = "head: line\n  parent:\n    foo: bar\n    hello: world\n    child:\n      bla: blubb\n  parent2: normal"
      var object = {
        parent: {
          foo: 'bar',
          hello: 'world',
          child: {
            bla: 'blubb'
          }
        },
        parent2: 'normal'
      }

      assert.deepEqual(Identify.parse(nested), object)
    },
    "should parse double nesting": function() {
      assert.deepEqual(Identify.parse('head: line\n  foo:\n    bar:\n      hello: world\n'), {foo:{bar:{hello: 'world'}}})
    },
    "should ignore empty lines": function() {
      assert.deepEqual(Identify.parse("head: line\n  a: b\n  \n  \n"), {a:'b'})
    }
  },

  '#parseFile': {
    topic: function() {
      Identify.parseFile(process.cwd() + '/test/fixtures/google.png', this.callback)
    },
    "should parse a file into json": function(err, json) {
      assert.deepEqual(json['Channel depth'], { red: '8-bit', green: '8-bit', blue: '8-bit' })
    }
  }
}).exportTo(module)
