/*  FlUId - Declarative Model Driven UI Data Management Framework
Author - Julian Frank
Version - 0.5.0
Last Update  - 20/Feb/2016  */

'use strict'

// This will be the base Object Library for Fluid to be separetely used by each 'Page' in the DOM
function Fluid(pagename) {

    //****Object Initialization consolidated here
    if (typeof pagename != 'string') {
        console.error('PageName has to be a String. This Object will not be Initialized Properly.'); return //Stop if Pagename is not a string 
    } else {
        pageName = pagename; console.info('Initializing Fluid Page:\t' + pageName)
    }
    if (!(this instanceof Fluid)) { console.error('This is not an instance of fluid. This Object will not be Initialized Properly.'); return }    //Check if this is a fluid Instance
    if (!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document)) console.warn('This is not meant to be used outside a browser')//Check if this is running inside a browse
    var libraryName = 'Fluid', version = '0.5.0', pageName = pagename || 'Error: Page Name Not Provided'  //, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty
    this.info = function () { return { libraryName: libraryName, version: version, pageName: pageName } }
    //****Initialization Over

    //Consolidating all the DataItem Store Specific Operations Here
    var DIStore = []; this.getDIStore = function () { return DIStore }      //This may need to be removed later

    //Consolidating all the DataItem Operations Here
    function DataItem(name, value) {
        //All variables on this.XXX are for debug purpose only and will not be used in internal Object manipulations
        if (!(this instanceof DataItem)) { console.error('This is not an instance of DataItem. This Object will not be Initialized Properly.'); return }    //Check if this is a DI Instance
        
        //Consolidating DI Name Operations here...
        var diName = null
        if (typeof name != 'string') {
            console.error('Data Item Name has to be a String. This Object will not be Initialized Properly.'); return  //Stop if diName is not a string 
        } else {
            diName = name; this.DataItemName = diName
        }
        // Name will not be changeable...hence not exposing getter/setter

        //Consolidating DI Value Operations here...
        var diValue = null
        this.getValue = function () { return diValue }
        //>>[TODO] As per current logic only strings and numbers can be added...In future got to add other types as well
        this.setValue = function (val) {
            if ((typeof val != 'undefined') && (typeCheck(val, ['string', 'number']))) {
                diValue = val
                this.DataItemValue = diValue
            } else {
                console.error(JSON.stringify(val) + '\tValue Add Unsuccessful - Value Has to be a String or Integer Only')
            }
        }
        this.setValue(value)
        //DI Value Ops Finish

        //Consolidating DI Property Operations here...
        var diProp = []
        this.setProperty = function (props) {
            if (typeof props === 'object') {
                Object.keys(props).map(function (val, ind) {
                    diProp[val] = ind
                })
                this.DataItemProperties = diProp
            } else {
                console.error(JSON.stringify(props) + '\tProperty Add Unsuccessful - Property Has to be a Object Only')
            }

        }
        this.getProperty = function (key) {
            if (key) {
                if (typeof diProp[key] != 'undefined') {
                    return diProp[key]
                } else {
                    console.error(key + '\tProperty for this Key does not exist')
                    return false
                }
            } else {
                return diProp       // If No Key Provided then return the whole diProp array
            }
        }

    }

    /*Exposing addDataItem
    @name   string                              Name of the DataItem to be Initialised
    @value  Optional number or String value     This will be the key Displayed Value on the UI
    */
    this.addDataItem = function (name, value) { DIStore[name] = new DataItem(name, value); return DIStore }

    this.setDIValue = function (di, value) {
        if (DIStore[di]) {
            DIStore[di].setValue(value)
        } else {
            console.error('Data Item ' + di + ' Not Found')
        }
    }
    this.getDIValue = function (di) {
        if (DIStore[di]) {
            return DIStore[di].getValue()
        } else {
            console.error('Data Item ' + di + ' Not Found')
            return new Error(di + ' Does not Exist')
        }
    }

    /*Exposing setDIProperty
    @di     DataItem                            The DataItem for which Property needs to be set
    @props  Array or single key value pair      Use the format {key:value} notation
    */
    this.setDIProperty = function (di, props) { DIStore[di].setProperty(props) }
    this.getDIProperty = function (di, key) { return DIStore[di].getProperty(key) }
    
    
    //All Helpers are below..may not be directly related to FluiD
    /*------------------------------------------------------------------
    | Helper function for iterating over an array. If the func returns
    | a true value, it will break out of the loop.    */
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < objLength(ary); i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }
    
    //Helper Function that gives the length of an Array with String Index since the default length will only give 0
    function objLength(obj) { return Object.keys(obj).length }
    
    //Helper Function that checks and tells if the object is of the type you need
    function typeCheck(obj, array) { return !(array.indexOf(typeof obj) === -1) }
}