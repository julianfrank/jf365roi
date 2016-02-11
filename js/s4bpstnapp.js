'use strict'

var DEBUGMODE = true// turn Debugger on...When this is false log will not output anything

//This is the main equivalent
var myApp

function init_document() {

    myApp = new FlUI(modelDataItem, modelDataGroups)
    myApp.attachLogicFunction(computeResult)
}

function computeResult() {
    var currentDataModel = myApp.getDataModel()

    var pc = parseInt(currentDataModel['PhoneCount'])

    var cd = parseInt(currentDataModel['AvgCallDurationPC'])
    var calls = parseInt(currentDataModel['AvgCallsPM'])
    var callMPM = cd * calls * pc
    document.getElementById('o_CallMinutesPerMonth').value = callMPM

    var localCallsP = parseInt(currentDataModel['LocalCallsP'])
    var localcallsload = callMPM * localCallsP / 100
    document.getElementById('o_LocalCallMinutesPerMonth').value = callMPM * localCallsP / 100

    var intCallsP = parseInt(currentDataModel['IntCallsP'])
    var intcallsload = callMPM * intCallsP / 100
    document.getElementById('o_IntCallMinutesPerMonth').value = callMPM * intCallsP / 100

    var inCallsP = parseInt(currentDataModel['InboundCallsP'])
    var spendincpm = parseFloat(currentDataModel['LocalInboundCPM'])
    var inFMPU = parseInt(currentDataModel['LocalInboundFMPU'])
    var spendlocalin = Math.max(((inCallsP * localCallsP * callMPM / 10000) - inFMPU) * spendincpm, 0)
    document.getElementById('o_SpendLocalInPerMonth').value = spendlocalin

    var outCallsP = parseInt(currentDataModel['OutboundCallsP'])
    var spendoutcpm = parseFloat(currentDataModel['LocalOutboundCPM'])
    var outFMPU = parseInt(currentDataModel['LocalOutboundFMPU'])
    var spendlocalout = Math.max(((outCallsP * localCallsP * callMPM / 10000) - outFMPU) * spendoutcpm, 0)
    document.getElementById('o_SpendLocalOutPerMonth').value = spendlocalout

    var spendintincpm = parseFloat(currentDataModel['IntInboundCPM'])
    var inintinFMPU = parseInt(currentDataModel['IntInboundFMPU'])
    var spendintin = Math.max(((inCallsP * intCallsP * callMPM / 10000) - inintinFMPU) * spendintincpm, 0)
    document.getElementById('o_SpendIntInPerMonth').value = spendintin

    var spendintoutcpm = parseFloat(currentDataModel['IntOutboundCPM'])
    var inintoutFMPU = parseInt(currentDataModel['IntOutboundFMPU'])
    var spendintout = Math.max(((outCallsP * intCallsP * callMPM / 10000) - inintoutFMPU) * spendintoutcpm, 0)
    document.getElementById('o_SpendIntOutPerMonth').value = spendintout

    var pstnmrc = parseInt(currentDataModel['PSTNMRC'])
    var totalpstn = pstnmrc + spendlocalin + spendlocalout + spendintin + spendintout
    document.getElementById('o_SpendPSTNTotal').value = totalpstn

    var localcallinglp = 12
    document.getElementById('o_SpendLocalCallingPackageLP').value = localcallinglp

    var intcallinglp = 24
    document.getElementById('o_SpendIntCallingPackageLP').value = intcallinglp

    var localcallingdisc = parseFloat(currentDataModel['LocalCallingPackageDiscountP'])
    var localcallingdp = Math.round(localcallinglp * (1 - localcallingdisc / 100))
    document.getElementById('o_SpendLocalCallingPackageDP').value = localcallingdp

    var intcallingdisc = parseFloat(currentDataModel['IntCallingPackageDiscountP'])
    var intcallingdp = Math.round(intcallinglp * (1 - intcallingdisc / 100))
    document.getElementById('o_SpendIntCallingPackageDP').value = intcallingdp

    var localpkgp = parseInt(currentDataModel['LocalCallingPackageP'])
    var localpkgusers = Math.round(pc * localpkgp / 100)
    document.getElementById('o_LocalCallingPackageUsers').value = localpkgusers

    var intpkgp = parseInt(currentDataModel['IntCallingPackageP'])
    var intpkgusers = Math.round(pc * intpkgp / 100)
    document.getElementById('o_IntCallingPackageUsers').value = intpkgusers

    var nopkgp = parseInt(currentDataModel['NoCallingPackageP'])
    var nopkgusers = Math.round(pc * nopkgp / 100)
    document.getElementById('o_NoCallingPackageUsers').value = nopkgusers

    var localpkgusersspend = localpkgusers * localcallingdp
    document.getElementById('o_SpendLocalCallingPackageUsers').value = localpkgusersspend

    var intpkgusersspend = intpkgusers * intcallingdp
    document.getElementById('o_SpendIntCallingPackageUsers').value = intpkgusersspend

    var s4be5poolpu = parseInt(currentDataModel['MinutesPerUserPackage'])

    var pooledlocalmins = localpkgusers * s4be5poolpu
    document.getElementById('o_PooledLocalMins').value = pooledlocalmins

    var pooledintmins = intpkgusers * s4be5poolpu
    document.getElementById('o_PooledIntMins').value = pooledintmins

    var exlocalpkg = 0
    if (pooledlocalmins < localcallsload) {
        exlocalpkg = Math.floor((localcallsload - pooledlocalmins) / s4be5poolpu)
        document.getElementById('o_ExcessLocalPkg').value = exlocalpkg
    }

    var exintpkg = 0
    if (pooledintmins < intcallsload) {
        exintpkg = Math.floor((intcallsload - pooledintmins) / s4be5poolpu)
        document.getElementById('o_ExcessIntPkg').value = exintpkg
    }

    var totalNeededlocal = (localpkgusers + exlocalpkg) * localcallingdp
    var totalNeededint = (intpkgusers + exintpkg) * intcallingdp

    var exproute = currentDataModel['AzureExpressRouteCPM']

    var totalNeeded = totalNeededlocal + totalNeededint + exproute
    document.getElementById('o_SpendTotalNeeded').value = totalNeeded

    var savings = totalpstn - totalNeeded 

    if (savings > 0) {
        document.getElementById('o_Recomendation').value = 'Recomended - You will save $' + savings + ' Per Month'
    } else {
        document.getElementById('o_Recomendation').value = 'Not Recomended - You will lose $' + savings + ' Per Month'
    }

}