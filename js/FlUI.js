/*
FlUI - Declarative Model Driven UI Data Management Framework
Author - Julian Frank
Version - 0.2.0
Last Update  - 7/Feb/2016 
*/

'use strict'

if (typeof log === 'undefined') {
    var log = function (consoleText) {
        console.log('FlUI[' + Date() + ']\t' + consoleText)
    }
    log("Using FlUI's Internal Backup log Engine")
}

function FlUI(modelDataItemValue, modelDataGroupsValue) {
    var modelDataItemStore = {},
        modelElementIndex,
        modelDataGroupsStore = {}

    setAllMDI(modelDataItemValue)
    setAllMDG(modelDataGroupsValue)

    //Initialize Data Item Store
    function setAllMDI(modelDataItem) {
        /* Template for modelDataItem
        {       'dataItem': {
                'Property': { 'min': 'minValue', 'max': 'maxValue', 'step': 'stepValue', 'value': 'value' },
                'ConnectedIDs': [Array of ElementIDs directly linked to dataItem]
        }*/
        modelDataItemStore = modelDataItem
        buildDataItemIndexes()
        updateAllDItoUI()
    }
    this.getAllMDI = function () { return modelDataItemStore }

    //DataItem Index which maps each element with its peer (other elements that have the same DataItem)
    function buildDataItemIndexes() {
        modelElementIndex = []

        for (var di in modelDataItemStore) {//Browse through DataItems
            if (modelDataItemStore.hasOwnProperty(di)) {

                var diArray = modelDataItemStore[di].ConnectedIDs

                diArray.forEach(function (elA) {
                    
                    //Mpping the DataItem to the Element for use when element value changes in UI
                    if (typeof modelElementIndex[elA] === 'undefined') {
                        modelElementIndex[elA] = {}
                        modelElementIndex[elA]['sourceDataItem'] = di
                        modelElementIndex[elA]['peers'] = []
                    }

                    //Building the mapping between the Elements and their Peers (May not be needed)
                    diArray.forEach(function (elB) {
                        //if (typeof modelElementIndex[elA] === 'undefined') {  }
                        if (elA != elB) { modelElementIndex[elA]['peers'].push(elB) }
                    }, this);//elB Loop ends here

                }, this);//elA Loop ends here
            
            }
        }//End of DataItems Browse Loop

        log.info('FlUI DataItem Index Built')
    }

    function updateAllDItoUI() {
        for (var diKey in modelDataItemStore) {
            if (modelDataItemStore.hasOwnProperty(diKey)) {
                var di = modelDataItemStore[diKey];
                updateDataItem(diKey, 'value', di['Property']['value'])
            }
        }
    }
    
    //Update DataItem function that updates all the related UI Elements when data Item is updated
    function updateDataItem(di, property, newValue) {
        //Validate and correct newValue
        if (newValue < modelDataItemStore[di]['Property']['min']) {
            newValue = modelDataItemStore[di]['Property']['min']
        } else if (newValue > modelDataItemStore[di]['Property']['max']) {
            newValue = modelDataItemStore[di]['Property']['max']
        }
        
        //Directly Update the Property Value in the MDIStore
        modelDataItemStore[di]['Property'][property] = newValue
        //Update the Values to all related Elements in the DOM
        var relIDArray = modelDataItemStore[di]['ConnectedIDs']

        //Iterate through each Element ID in relIDArray and update the individual DOM properties
        relIDArray.forEach(function (relID) {//Loop for each ID related to DI
            var targetElement = document.getElementById(relID)
            var properties = modelDataItemStore[di]['Property']

            for (var prop in properties) { if (properties.hasOwnProperty(prop)) { targetElement[prop] = properties[prop]; } }

            targetElement.addEventListener('input', UIChange)

        }, this);////relID Loop stops here

    }
    //Make updateDataItem accessible from outside
    this.updateDataItem = function (di, property, newValue) {
        updateDataItem(di, property, newValue)
    }

    //All UI changes if registered Elements will land here
    function UIChange(event) {
        var changedElementId = event.currentTarget.id
        var changedDataItem = modelElementIndex[changedElementId]['sourceDataItem']
        var newValue = document.getElementById(changedElementId).value
        updateDataItem(changedDataItem, 'value', newValue)
    }

    //Initialize Data Groups Store
    function setAllMDG(modelDataGroups) {
        /* Template for modelDataGroups
        {       'groupName': {//Logical and not used anywhere
                'active': [Array of Related DataItems whose Sum needs to be max of the DataItem with max 'sumValue'],
                'buffer': Buffer DataItem used to compensate active DataItems sum being lower than needed 'maxSumValue'
            }
        }*/
        modelDataGroupsStore = modelDataGroups
        buildDataGroupIndexes()
    }
    this.getAllMDG = function () { return modelDataGroupsStore }

    function buildDataGroupIndexes() {
        log.info('FlUI DataGroup Indexes Built')
    }

    log.info('FlUI Loaded')
    log.debug(this)

}