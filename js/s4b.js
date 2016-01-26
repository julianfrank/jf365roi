"use strict"

var inputs = {}//json table to hold input values

function init_document() {
    console.log("s4b Loaded")
    
    //Initialising
    inputs = {
        "PhoneCount":"",
        "AvgCallsPM":"",
        "InboundCallsP":"",
        "OutboundCallsP":"",
        "LocalCallsP":"",
        "IntCallsP":""
    }
    update_value('ir_PhoneCount', 'in_PhoneCount', 'PhoneCount')
    update_value('ir_AvgCallsPM', 'in_AvgCallsPM', 'AvgCallsPM')
    update_value('ir_InboundCallsP', 'in_InboundCallsP', 'InboundCallsP')
    revupdate_value('ir_InboundCallsP', 'm_OutboundCallsP', 'OutboundCallsP')
    update_value('ir_LocalCallsP', 'in_LocalCallsP', 'LocalCallsP')
    revupdate_value('ir_LocalCallsP', 'm_IntCallsP', 'IntCallsP')
}


function update_value(source, target, parameter) {
    var s = document.getElementById(source)
    var t = document.getElementById(target)
    inputs[parameter] = s.value
    t.value = inputs[parameter]
    console.log(inputs)
}
function revupdate_value(source,target,parameter){
    var s = document.getElementById(source)
    var t = document.getElementById(target)
    inputs[parameter] = 100 - s.value
    t.value = inputs[parameter]
    console.log(inputs)    
}