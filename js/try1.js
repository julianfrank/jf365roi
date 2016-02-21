'use strict'

var DEBUGMODE = true
var s4bpstnpage = new Fluid('s4bpstn')

function init_document() {
    console.info(s4bpstnpage.info())
    s4bpstnpage.addDataItem('DI1', 1)
    s4bpstnpage.setDIValue('DI3', 'This should not work')
    console.info(s4bpstnpage.getDIValue('DI1'))
    console.info(s4bpstnpage.getDIProperty('DI1','min'))//Should not work
    s4bpstnpage.setDIProperty('DI1', { min: 0 })
    console.info(s4bpstnpage.getDIProperty('DI1','min'))//Should work
    
    s4bpstnpage.addDataItem('DI2', '2')
    s4bpstnpage.setDIProperty('DI2', { min: 0, max: 100, len: 5 })
    console.info(s4bpstnpage.getDIProperty('DI2'))
    
    s4bpstnpage.addDataItem('DI3', { 1233: 90909 })//This value should not get loaded
    s4bpstnpage.setDIProperty('DI3', "This value should not get loaded")//This value should not get loaded
    s4bpstnpage.setDIProperty('DI3', 1234)//This value should not get loaded
    s4bpstnpage.setDIValue('DI3', 'This should work')
    console.info(s4bpstnpage.getDIStore())
}