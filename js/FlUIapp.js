'use strict'

var DEBUGMODE = true// turn Debugger on...When this is false log will not output anything

var myApp

var modelDataItem = {
    'PhoneCount': {
        'Property': { 'min': 0, 'max': 100000, 'step': 100, 'value': 66111 },
        'ConnectedIDs': ['ir_PhoneCount', 'in_PhoneCount']
    },
    'LocalCallsP': {
        'Property': { 'min': 0, 'max': 100, 'step': 1, 'value': 77 },
        'ConnectedIDs': ['ir_LocalCallsP', 'in_LocalCallsP']
    },
    'IntCallsP': {
        'Property': { 'min': 0, 'max': 100, 'step': 1, 'value': 33 },
        'ConnectedIDs': ['m_IntCallsP']
    },
    'LocalCallingPackageP': {
        'Property': { 'min': 0, 'max': 100, 'step': 1, 'value': 63 },
        'ConnectedIDs': ['ir_LocalCallingPackageP', 'in_LocalCallingPackageP']
    },
    'IntCallingPackageP': {
        'Property': { 'min': 0, 'max': 100, 'step': 1, 'value': 36 },
        'ConnectedIDs': ['ir_IntCallingPackageP', 'in_IntCallingPackageP']
    },
    'NoCallingPackageP': {
        'Property': { 'min': 0, 'max': 100, 'step': 1, 'value': 1 },
        'ConnectedIDs': ['m_NoCallingPackageP']
    }
}

var modelDataGroups = {
    'CallsP': { 'active': ['LocalCallsP', 'IntCallsP'] },
    'CallingPackage': {
        'active': ['LocalCallingPackageP', 'IntCallingPackageP'],
        'buffer': 'NoCallingPackageP'
    }
}

//This is the main equivalent
function init_document() {

    myApp = new FlUI(modelDataItem, modelDataGroups)

    //log(myApp.getAllMDI())
    //log(myApp.getAllMDG())

}