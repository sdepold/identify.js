# identify.js

## What is it doing?

With identify.js you can turn the output of ImageMagick's `identify` command into a javascript object.

## Example

    var Identify = require("identify")
    Identify.parseFile('test/fixtures/google.png', function(err, json) {
      console.log(json)
      /*
        {
          Format: 'PNG (Portable Network Graphics)',
          Class: 'PseudoClass',
          Geometry: '275x95+0+0',
          Resolution: '72x72',
          ...
        }
      */
    })

    var identifyOutput = 'firstline\n  Format: PNG (Portable Network Graphics)\n'
      , output = Identify.parse(identifyOutput)

    console.log(output)
    /*
      {
        Format: 'PNG (Portable Network Graphics)'
      }
    */

## License

Released under MIT-License!
