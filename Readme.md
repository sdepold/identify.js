# identify.js

## What is it doing?

With identify.js you can turn the output of ImageMagick's `identify` command into a javascript object.

## Example

    var Identify = require("identify")

    // identify file and transform into json:
    // you can pass options, if you want to
    Identify.parseFile('test/fixtures/google.png', [, options], function(err, json) {
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

    // tansform an identify-output string into json
    var identifyOutput = 'firstline\n  Format: PNG (Portable Network Graphics)\n'
    console.log(Identify.parse(identifyOutput))
    /*
      {
        Format: 'PNG (Portable Network Graphics)'
      }
    */

## License

Released under MIT-License!
