const myModule = (() => {
    const privateFoo = () => { }
    const privateBar = []

    const exported = {
        publicFoo: () => { console.log('publicFoo') },
        publicBar: () => { console.log('publicBar') }
    }

    return exported
})()

module.exports = myModule

/* Console logs to test how to check encapsulation (information hiding)
 * Only publicFoo and publicBar gets exported
*/

// console.log(myModule)
// console.log(myModule.privateFoo, myModule.privateBar)