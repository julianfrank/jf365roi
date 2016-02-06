'use strict'

var myDoc = new FlUI()

function init_document() {
    myDoc.setDataModel({
        'PhoneCount': { 'min': 0, 'max': 100000, 'step': 100, 'value': 66111 },
        'LocalCallsP': { 'min': 0, 'max': 100, 'step': 1, 'value': 77 },
        'IntCallsP': { 'min': 0, 'max': 100, 'step': 1, 'value': 33 },
        'LocalCallingPackageP': { 'min': 0, 'max': 100, 'step': 1, 'value': 63 },
        'IntCallingPackageP': { 'min': 0, 'max': 100, 'step': 1, 'value': 36 },
        'NoCallingPackageP': { 'min': 0, 'max': 100, 'step': 1, 'value': 1 }
    })
    //alert(JSON.stringify(myDoc.getDataModel()))

    myDoc.setCopyMap({
        'PhoneCount': ['ir_PhoneCount', 'in_PhoneCount'],
        'LocalCallsP': ['ir_LocalCallsP', 'in_LocalCallsP'],
        'IntCallsP': ['m_IntCallsP'],
        'LocalCallingPackageP': ['ir_LocalCallingPackageP', 'in_LocalCallingPackageP'],
        'IntCallingPackageP': ['ir_IntCallingPackageP', 'in_IntCallingPackageP'],
        'NoCallingPackageP': ['m_NoCallingPackageP']
    })
    //alert(JSON.stringify(myDoc.getCopyMap()))

    myDoc.setSumMap({
        'CallsP': { 'active': ['LocalCallsP', 'IntCallsP'] },
        'CallingPackage': {
            'active': ['LocalCallingPackageP', 'IntCallingPackageP'],
            'passive': ['NoCallingPackageP']
        }
    })
    //alert(JSON.stringify(myDoc.getSumMap()))
    
    myDoc.attachUI2Map()
}