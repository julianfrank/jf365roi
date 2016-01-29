"use strict"

var inputs = {}//json table to hold input values

//Initialization
function init_document() {
    console.log("S4B PSTN Page Loaded")
    
    //Initialising the main Input model
    //CPM   =   Cost Per Minute
    //FMPU  =   Free Minutes Per User
    //P     =   Percentage (Parameters ending with 'P')
    inputs = {
        "PhoneCount": "",
        "AvgCallsPM": "",
        "InboundCallsP": "",
        "OutboundCallsP": "",
        "LocalCallsP": "",
        "IntCallsP": "",
        "PSTNMRC": "",
        "LocalInboundCPM": "",
        "LocalInboundFMPU": "",
        "LocalOutboundCPM": "",
        "LocalOutboundFMPU": "",
        "IntInboundCPM": "",
        "IntInboundFMPU": "",
        "IntOutboundCPM": "",
        "IntOutboundFMPU": "",
        "LocalCallingPackageP": "",
        "IntCallingPackageP": "",
        "NoCallingPackageP": "",
        "LocalCallingPackageDiscountP": "",
        "IntCallingPackageDiscountP": "",
        "MinutesPerUserPackage": "",
        "AzureExpressRouteCPM": ""
    }
    //Initializing the Mirroring Form Items
    update_value('ir_PhoneCount', 'in_PhoneCount', 'PhoneCount')
    update_value('ir_AvgCallsPM', 'in_AvgCallsPM', 'AvgCallsPM')
    update_value('ir_InboundCallsP', 'in_InboundCallsP', 'InboundCallsP')
    revupdate_value('ir_InboundCallsP', 'm_OutboundCallsP', 'OutboundCallsP')
    update_value('ir_LocalCallsP', 'in_LocalCallsP', 'LocalCallsP')
    revupdate_value('ir_LocalCallsP', 'm_IntCallsP', 'IntCallsP')
    update_value('ir_PSTNMRC', 'in_PSTNMRC', 'PSTNMRC')
    update_value('ir_LocalInboundCPM', 'in_LocalInboundCPM', 'LocalInboundCPM')
    update_value('ir_LocalInboundFMPU', 'in_LocalInboundFMPU', 'LocalInboundFMPU')
    update_value('ir_LocalOutboundCPM', 'in_LocalOutboundCPM', 'LocalOutboundCPM')
    update_value('ir_LocalOutboundFMPU', 'in_LocalOutboundFMPU', 'LocalOutboundFMPU')
    update_value('ir_IntInboundCPM', 'in_IntInboundCPM', 'IntInboundCPM')
    update_value('ir_IntInboundFMPU', 'in_IntInboundFMPU', 'IntInboundFMPU')
    update_value('ir_IntOutboundCPM', 'in_IntOutboundCPM', 'IntOutboundCPM')
    update_value('ir_IntOutboundFMPU', 'in_IntOutboundFMPU', 'IntOutboundFMPU')
    update_value('ir_LocalCallingPackageP', 'in_LocalCallingPackageP', 'LocalCallingPackageP')
    update_value('ir_IntCallingPackageP', 'in_IntCallingPackageP', 'IntCallingPackageP')
    //Need to handle NoCallingPackageP Initiation
    update_value('ir_LocalCallingPackageDiscountP', 'in_LocalCallingPackageDiscountP', 'LocalCallingPackageDiscountP')
    update_value('ir_IntCallingPackageDiscountP', 'in_IntCallingPackageDiscountP', 'IntCallingPackageDiscountP')
    update_value('ir_MinutesPerUserPackage', 'in_MinutesPerUserPackage', 'MinutesPerUserPackage')
    update_value('ir_AzureExpressRouteCPM', 'in_AzureExpressRouteCPM', 'AzureExpressRouteCPM')
    console.log(inputs)
}

/* Common Function to copy value from source to target
    @source     'id' of the 'Source' Element
    @target     'id' of the 'Target' Element
    @parameter  input parameter related to both source and target which needs to be updated with the final source's value
    */
function update_value(source, target, parameter) {
    var s = document.getElementById(source)
    var t = document.getElementById(target)
    var max = Number.parseInt(s.getAttribute('max'))//Pulling the 'max' value of the source input
    if (max < s.value) { s.value = max }
    inputs[parameter] = Number.parseFloat(s.value)
    t.value = inputs[parameter]
}

/* Common Function to copy value from source to target but using the formula (max-value)
    @source     'id' of the 'Source' Element
    @target     'id' of the 'Target' Element
    @parameter  input parameter related to the target which needs to be updated with the final source's value
    */
function revupdate_value(source, target, parameter) {
    var s = document.getElementById(source)
    var t = document.getElementById(target)
    var max = Number.parseInt(s.getAttribute('max'))//Pulling the 'max' value of the source input
    if (max < s.value) { s.value = max }
    inputs[parameter] = max - s.value
    t.value = inputs[parameter]
}

/* Common Function to Modified to copy value from two sources and compute the target but using the formula (max-value)
    @source     'id' of the 'Source' Element
    @target1    'id' of the 'Target1' Element
    @parameter1 input parameter related to the target which needs to be updated
    @target2    'id' of the 'Target2' Element
    @parameter2 input parameter related to the target which needs to be updated
    */
function modrevupdate_value(source, target1, parameter1, target2, parameter2) {
    var s = document.getElementById(source)
    var t1 = document.getElementById(target1)
    var t2 = document.getElementById(target2)
    var max = Number.parseInt(s.getAttribute('max'))//Pulling the 'max' value of the source input
    if (s.value > (max - t1.value - t2.value)) {
        if (max < (s.value + t1.value)) {
            // t1 +s >max so make t2=0 and t1 = max-t1
            inputs[parameter2] = 0
            t2.value = 0
            inputs[parameter1] = max - s.value
            t1.value = inputs[parameter1]
        } else {
            //No need to disturb t1
            inputs[parameter2] = max - s.value - t1.value
            t2.value = inputs[parameter2]
        }
    } else {
        inputs[parameter2] = max - s.value - t1.value
        t2.value = inputs[parameter2]
    }
}
