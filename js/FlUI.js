/*
FlUI - Declarative Model Driven UI Data Management Framework
Author - Julian Frank
Version - 0.3.0
Last Update  - 7/Feb/2016 
*/

'use strict'

//Build crude log Function only if not already Defined
if ((typeof log === 'undefined') && (DEBUGMODE)) {
    function log(consoleText) {
        console.log('FlUI[' + Date() + ']\t' + consoleText)
    }
    log("Using FlUI's Internal Backup log Engine")
}

/* The main Function
@constructor
@param  {JSON}  JSON containing the modelDataItem (Initial)
        Template for modelDataItem
        {       'dataItem': {
                'Property': { 'min': 'minValue', 'max': 'maxValue', 'step': 'stepValue', 'value': 'value' },
                'ConnectedIDs': [Array of ElementIDs directly linked to dataItem]
        }
@param  {JSON}  JSON containing the modelGroup (Initial)
        Template for modelDataGroups
        {       'groupName': {//Logical and not used anywhere
                'active': [Array of Related DataItems whose Sum needs to be max of the DataItem with max 'sumValue'],
                'buffer': Buffer DataItem used to compensate active DataItems sum being lower than needed 'maxSumValue'
            }
        }*/
function FlUI(modelDataItemValue, modelDataGroupsValue) {
    var modelDataItemStore = {},
        modelDataGroupsStore = {},
        modelElementIndex = [],
        modelGroupIndex = [],
        modelDataItemIndex = []

    //Initiate Initialization of the DataItem and DataGroup Stores
    if (typeof modelDataItemValue != 'undefined') setAllMDI(modelDataItemValue)
    if (typeof modelDataGroupsValue != 'undefined') setAllMDG(modelDataGroupsValue)
    updateAllDItoUI()

    //All UI changes if registered Elements will land here
    function UIChange(event) {
        var changedElementId = event.currentTarget.id//Element that Changed                                   
        var changedDataItem = modelElementIndex[changedElementId]['sourceDataItem']//Related DataItem that changed 
        var newValue = document.getElementById(changedElementId).value//Retreive new Value
        updateDataItem(changedDataItem, 'value', newValue)// Update new Value to MDI Store and sync with UI
        updateGroupItem(changedDataItem, newValue)//Run all the Group Level Logics
        if (typeof FlUILogicFunction == 'function') FlUILogicFunction()//Run the Attached Logic Function (If attached)
    }

    //Allows Attachment of Logic Functions That use the Data in this object
    var FlUILogicFunction
    this.attachLogicFunction = function (logicfunction) {
        if (typeof logicfunction != 'function') {
            log('FlUI :\t Attach Failed - Attached object is of type ' + (typeof logicfunction))
        } else {
            FlUILogicFunction = logicfunction
            FlUILogicFunction()
            log('FlUI Logic Function Attached ' + (typeof FlUILogicFunction))
        }
    }

    //Update DataItem function that updates all the related UI Elements when data Item is updated
    function updateDataItem(di, property, newValue) {
        //Get newValue Validated before update
        newValue = validateDataItemChange(di, property, newValue)
        //Directly Update the Property Value in the MDIStore
        modelDataItemStore[di]['Property'][property] = newValue
        //Update the Values to all related Elements in the DOM
        var peerIDArray = modelDataItemStore[di]['ConnectedIDs']

        //Iterate through each Element ID in peerIDArray and update the individual DOM properties
        peerIDArray.forEach(function (peerID) {//Loop for each ID related to DI
            var targetElement = document.getElementById(peerID)
            var properties = modelDataItemStore[di]['Property']

            for (var prop in properties) { if (properties.hasOwnProperty(prop)) { targetElement[prop] = properties[prop]; } }

            targetElement.addEventListener('input', UIChange)

        }, this);//peerID Loop stops here
        
    }
    //Make updateDataItem accessible from outside
    this.updateDataItem = function (di, property, newValue) {
        updateDataItem(di, property, newValue)
    }

    //Initialize Data Item Store
    function setAllMDI(modelDataItem) {

        modelDataItemStore = modelDataItem
        buildmodelElementIndexes()
    }
    
    //From outside Get the Data Model as a JSON 
    this.getDataModel = function () {
        var dataModel = {}
        for (var di in modelDataItemStore) {
            if (modelDataItemStore.hasOwnProperty(di)) {
                var diObject = modelDataItemStore[di]['Property']['value'];
                dataModel[di] = diObject
            }
        }
        return dataModel
    }

    //From outside Get the Data Model as a JSON 
    this.getDataItemValue = function (searchDI) {
        return modelDataItemStore[searchDI]['Property']['value'];

    }

    //DataItem Index which maps each element with its peer (other elements that have the same DataItem)
    //[TODO] Anomalies in input model like different min/max to be detected and logged
    function buildmodelElementIndexes() {

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

                    //[Todo]Building the mapping between the Elements and their Peers (May not be needed)
                    diArray.forEach(function (elB) {
                        //if (typeof modelElementIndex[elA] === 'undefined') {  }
                        if (elA != elB) { modelElementIndex[elA]['peers'].push(elB) }
                    }, this);//elB Loop ends here

                }, this);//elA Loop ends here
            
            }
        }//End of DataItems Browse Loop

        //log(modelElementIndex)
        log('FlUI DataItem Index Built')
    }

    //Initialization function that updates all Elements with value properties from the Store
    function updateAllDItoUI() {
        for (var diKey in modelDataItemStore) {
            if (modelDataItemStore.hasOwnProperty(diKey)) {

                var di = modelDataItemStore[diKey];
                updateDataItem(diKey, 'value', di['Property']['value'])
                
                //Update the Group if this DataItem is part of a Group
                updateGroupItem(diKey, di['Property']['value'])

            }
        }
    }

    //Validate and correct newValue before updating the store
    function validateDataItemChange(di, property, newValue) {
        //[Todo]This needs to be updated to be robust...Currently problems in input if min is not 0
        if (modelDataItemStore[di]['Property']['min']) {
            if (newValue < modelDataItemStore[di]['Property']['min']) {
                newValue = modelDataItemStore[di]['Property']['min']
            }
        }
        if (modelDataItemStore[di]['Property']['max']) {
            if (newValue > modelDataItemStore[di]['Property']['max']) {
                newValue = modelDataItemStore[di]['Property']['max']
            }
        }

        return newValue
    }
    
    //Initialize Data Groups Store
    function setAllMDG(modelDataGroups) {
        modelDataGroupsStore = modelDataGroups
        buildDataGroupIndexes()
    }

    //Build Group Indexes to speed up group level 'Leveling'
    // This also includes Building the DataItem Index
    //[TODO] Anomalies in input model like different min/max to be detected and logged
    function buildDataGroupIndexes() {

        for (var group in modelDataGroupsStore) {
            if (modelDataGroupsStore.hasOwnProperty(group)) {
                var groupItems = modelDataGroupsStore[group];
                var activeItems = groupItems['active']
                var bufferItem = groupItems['buffer']
                modelGroupIndex[group] = {}

                //Build GI for Buffer Elements only here
                if (typeof bufferItem != 'undefined') {
                    //Building Max Table with the minimum of the max
                    if ((typeof modelGroupIndex[group]['max'] === 'undefined') || (modelGroupIndex[group]['max'] > modelDataItemStore[bufferItem]['Property']['max'])) {
                        modelGroupIndex[group]['max'] = modelDataItemStore[bufferItem]['Property']['max']
                    }
                    //Building Min Table with the maximum of the min
                    if ((typeof modelGroupIndex[group]['min'] === 'undefined') || (modelGroupIndex[group]['min'] < modelDataItemStore[bufferItem]['Property']['min'])) {
                        modelGroupIndex[group]['min'] = modelDataItemStore[bufferItem]['Property']['min']
                    }

                    modelDataItemIndex[bufferItem] = []
                    modelDataItemIndex[bufferItem]['group'] = group
                    //modelDataItemIndex[bufferItem]['groupMembers'] = []; modelDataItemIndex[bufferItem]['groupMembers'].push(bufferItem); log(bufferItem)
                }

                //Build GI for related active Elements here
                for (var x in activeItems) {
                    if (activeItems.hasOwnProperty(x)) {
                        var di = activeItems[x];

                        //Building Max Table with the minimum of the max
                        if ((typeof modelGroupIndex[group]['max'] === 'undefined') || (modelGroupIndex[group]['max'] > modelDataItemStore[di]['Property']['max'])) {
                            modelGroupIndex[group]['max'] = modelDataItemStore[di]['Property']['max']
                        }

                        //Building Min Table with the maximum of the min
                        if ((typeof modelGroupIndex[group]['min'] === 'undefined') || (modelGroupIndex[group]['min'] < modelDataItemStore[di]['Property']['min'])) {
                            modelGroupIndex[group]['min'] = modelDataItemStore[di]['Property']['min']
                        }

                        modelDataItemIndex[di] = []
                        modelDataItemIndex[di]['group'] = group
                        //modelDataItemIndex[di]['groupMembers'] = []; modelDataItemIndex[di]['groupMembers'].push(di); log(di)

                    }
                }//activeItems Loop ending
                
            }//group in MDGstore loop ending

        }
        
        //log(modelGroupIndex);        log(modelDataItemIndex)
        log('FlUI DataGroup and DataItem Indexes Built')
    }
    
    //Group Totalling function
    function calculateGroupTotal(groupArray) {
        var valueArray = []
        var total = 0

        groupArray.forEach(function (di) {
            valueArray[di] = Number.parseInt(modelDataItemStore[di]['Property']['value'])
            total += Number.parseInt(modelDataItemStore[di]['Property']['value'])
        });

        return { 'valueArray': valueArray, 'total': total }
    }
    
    //Update the Group Items based on Change of one Item
    function updateGroupItem(dataItem, newValue) {

        if ((typeof dataItem != 'undefined') && (typeof modelDataItemIndex[dataItem] != 'undefined')) {

            var impactedGroup = modelDataItemIndex[dataItem]['group']
            var groupMax = modelGroupIndex[impactedGroup]['max']
            //var groupMin = modelGroupIndex[impactedGroup]['min']
            var activeDIArray = modelDataGroupsStore[impactedGroup]['active']
            var activeGroupTotal = calculateGroupTotal(activeDIArray).total
            var bufferDI = modelDataGroupsStore[impactedGroup]['buffer']
            var allDI = activeDIArray.slice(0)

            if (typeof bufferDI != 'undefined') { allDI.push(bufferDI) }
            var finalValueArray = calculateGroupTotal(allDI).valueArray
            var finalGroupTotal = calculateGroupTotal(allDI).total

            if (typeof bufferDI != 'undefined') { //These are applicable only if buffer dataitemexists
                if (activeGroupTotal < groupMax) {
                    finalValueArray[bufferDI] = groupMax - activeGroupTotal
                } else {
                    finalValueArray[bufferDI] = 0
                }
                updateDataItem(bufferDI, 'value', finalValueArray[bufferDI])
            }

            var otherDIArray = activeDIArray.filter(function (value, index, array) {//Build array of other active items
                if (value === dataItem) { return false } else { return true }
            })
            //log(dataItem, newValue, finalGroupTotal, otherDIArray, groupMax)            
            //[ToDo] Logic not satisfactory...and not scaleable for multiple values...need to improve
            for (var index = 0; index < otherDIArray.length; index++) {
                var element = otherDIArray[index]
                otherDIArray[element] = groupMax - newValue - (finalValueArray[bufferDI] || 0)
                updateDataItem(element, 'value', otherDIArray[element])
                if (finalGroupTotal = groupMax) break
            }
        }
    }

    log('FlUI 0.3.0 Loaded')
    log(this)

}