'use strict'

if (typeof log === 'undefined') {
    var log = function (consoleText) {
        console.log('FlUI[' + Date() + ']\t' + consoleText)
    }
    log("Using FlUI's log Engine")
}

function FlUI(modelDataItemValue, modelDataGroupsValue) {
    var modelDataItemStore = modelDataItemValue
    var modelDataGroupsStore = modelDataGroupsValue

    this.setAllMDI = function (modelDataItem) {
        /* Template for modelDataItem
        {       'dataItem': {
                'Property': { 'min': 'minValue', 'max': 'maxValue', 'step': 'stepValue', 'value': 'value' },
                'ConnectedIDs': [Array of ElementIDs directly linked to dataItem]
        }*/
        modelDataItemStore = modelDataItem
    }

    this.getAllMDI = function () { return modelDataItemStore }

    this.setAllMDG = function (modelDataGroups) {
        /* Template for modelDataGroups
        {       'groupName': {//Logical and not used anywhere
                'active': [Array of Related DataItems whose Sum needs to be max of the DataItem with max 'sumValue'],
                'buffer': Buffer DataItem used to compensate active DataItems sum being lower than needed 'maxSumValue'
            }
        }*/
        modelDataGroupsStore = modelDataGroups
    }

    this.getAllMDG = function () { return modelDataGroupsStore }

    log('FlUI Loaded' + JSON.stringify(this))

}