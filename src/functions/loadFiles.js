const fs = require('fs')
const path = require('path')

/**
 * Return an Array of objects of required Javascript file in a directory.
 * @param { String } directory
 * @return { Array }
 */
module.exports = (directory) => {
  const objectsArray = [];

  /**
   * Recursively search a directory and push required objects to the array.
   * @param { String } _directory
   */
  (function recursive (_directory) {
    const files = fs.readdirSync(path.join(__dirname, _directory))

    files.forEach((file) => {
      const fileStat = fs.lstatSync(path.join(__dirname, _directory, file))

      if (fileStat.isDirectory()) {
        recursive(path.join(_directory, file))
      } else {
        const object = require(path.join(__dirname, _directory, file))

        objectsArray.push(object)

        delete require.cache[require.resolve(path.join(__dirname, _directory, file))]
      }
    })
  })(directory)

  return objectsArray
}
