const fs = require('fs')

function loadModule(filename, module, require) {
    /* The purpose of this IIFE is to create a local scope for the modules    *  code to run in, preventing its variables from polluting the global scope.
    */
    const wrappedSrc =
        `(function (module, exports, require) {
      ${fs.readFileSync(filename, 'utf8')}
    })(module, module.exports, require)`

    eval(wrappedSrc)

    // console.log('Evaluation ', module.exports)
}

function customRequire(moduleName) {
    console.log('Require invoked for module: ', moduleName)

    //Absolute path of the module file
    const id = require.resolve(moduleName)
    // console.log(id)

    if (require.cache[id]) {
        return require.cache[id].exports
    }

    // module metadata  
    const module = {
        exports: {},
        id
    }

    // Update the cache  
    require.cache[id] = module

    // load the module  
    loadModule(id, module, require)

    // return exported variables  
    return module.exports
}

// console.log(customRequire('./myModule'))

// Example on how to export using the customRequire
const myModule = customRequire('./myModule')

myModule.publicFoo()
myModule.publicBar()