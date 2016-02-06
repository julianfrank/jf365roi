'use strict'

//var log = console.log.call(log,Date().substring(4,24))
//var log = console.log.bind(console);

if (typeof log === 'undefined') {
    var log = function (consoleText) {
        var dispText = ""
        switch (typeof consoleText) {
            case 'string':
                dispText = consoleText
                break;

            case 'number':
                dispText = consoleText
                break;

            case 'function':
                dispText = JSON.stringify({
                    'Function name': consoleText.name,
                    'function': consoleText.toString()
                })
                break

            case 'object':
                dispText = 'Object name : <' + consoleText.name + '>\tvalue : ' + JSON.stringify(consoleText)
                break

            case 'undefined':
                dispText = 'Type : undefined'
                break

            default:
                dispText = 'Default Type : ' + consoleText
                break;
        }
        console.log(Date().substring(4, 24) + '\t' + (typeof consoleText).toUpperCase() + ' <' + dispText + '>')
    }
}