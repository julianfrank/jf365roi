"use strict"

console.log("s4b Loaded")

function update_value(source, target) {
    var s = document.getElementById(source)
    var t = document.getElementById(target)
    t.value = s.value
}