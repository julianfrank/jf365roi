// Import key Libraries
var crypto = require('crypto')
var fs = require('fs')
var https = require('https')
var os = require('os')

// Initializing

/* Change this to change the logging method of the app
@logText    String  Text to be logged with a timestamp
*/
function log(logText){
    console.log(Date()+'\t: '+logText)
}
module.exports.log = exports.log = log

/*Pulls the details of the network interfaces connected to the Node-Server in an Array
*/
function getHostNetworkInterfaces() {
	var networkInterfaces = os.networkInterfaces( )
	return networkInterfaces
}
module.exports.getHostNetworkInterfaces = exports.getHostNetworkInterfaces = getHostNetworkInterfaces

/*Generate a Hashed String that stays the same only for one hour
@mySecret 	String 	Any String that remains constant between creation and checking time/entity
*/
function hourlyState(mySecret) {
	var shasum = crypto.createHash('sha1')
	shasum.update(mySecret + Date().substring(0, 19))
	var hs = shasum.digest('hex').toString()
	return hs
}
module.exports.hourlyState = exports.hourlyState = hourlyState

/*Return Hour Difference between two Dates
@date1 	Date() 	First Date
@date2 	Date() 	Second Date - dates can be provided in any order but returned value will remain positive
*/
function hourDiff(date1, date2) {
	var diff = (diff < 0) ? (date1 - date2) : -(date1 - date2)
	diff = diff / 1000 / 60 / 60;//1000 milisecs->60 seconds ->60 mins
	return Math.floor(diff)
}
module.exports.hourDiff = exports.hourDiff = hourDiff

/*Generic function to read file within express engine declaration...currently planned to be used only for HTML
Add this into express using this statement =>	app.engine('html', helpers.readHTML);
Parameters are called directly by express, so no coding needed*/
function readHTML(filePath, options, callback) {
	fs.readFile(filePath, function (err, content) {
		if (err) return callback(new Error(err.message))
		// this is an extremely simple template engine
		var rendered = content.toString()
		return callback(null, rendered)
	})
}
module.exports.readHTML = exports.readHTML = readHTML

/*Generic function to reaquest from any https site
@options 	JSON 						Use Standard NodeJS's HTTPS Options JSON Structure
										example =>
                                        {
											method: 'GET',
											hostname: 'host.com',
											path: '/' + this.tenant + '/me?api-version=1.6',
											headers: {
												'Content-Type': 'application/JSON',
												'Authorization': 'Bearer ' + token
												}
										}
@body 		String 						Body of the Request
@callback 	function(response,error) 	CallBack Function to be called when request receives a response
	@response 	JSON 	response received as a JSON Object
	@error 		Error 	Error if any  
*/
function requestHTTPS(options, body, callback) {
	var response = '';
	var req = https.request(options, function (x) {
		//log.info("helpers.requestHTTPS: \nstatusCode: ", x.statusCode, "\nheaders: ", x.headers);
		x.setEncoding('utf8');
		x.on('data', function (d) { response += d; })
		x.on('end', function () {
			if ((response === null) || (response.length === 0)) {
				options = JSON.stringify(options); body = JSON.stringify(body)
		//		log.fatal("\nhelpers.requestHTTPS:=> Fatal Error while calling with \n Options: " + options + "\nBody: " + body + '\n');
				callback(null, "helpers.requestHTTPS:=><br>Fatal Error while calling with <br> Options: " + options + "<br>Body: " + body + "<br>Returned StatusCode: " + x.statusCode + "<br>Returned Headers: " + x.rawHeaders + "<br>Returned Trailers: " + x.rawTrailers)
				return
			} else {//No Error so just return the response
				response = JSON.parse(response);
				callback(response, null);
				return;
			}
		});
	});
	if (body != undefined) req.write(body);
	req.end();
	req.on('error', function (e) {
		//log.fatal("\nhelpers.requestHTTPS: Fatal Error while calling with \n Options:" + options + "\nBody:" + body + "\nError Details:" + e + '\n');
		callback(null, "helpers.requestHTTPS: Fatal Error while calling with \n Options:" + options + "\nBody:" + body + "\nError Details:" + e);
	});
}
module.exports.requestHTTPS = exports.requestHTTPS = requestHTTPS;

/*Read Variables in package.json
@variable 	String 	Top level string to be read from 'PAckage.JSON' file*/
function readPackageJSON(pkgDir,variable) {
	var packageJSON = require(pkgDir+'/package.json')
	return packageJSON[variable];
}
module.exports.readPackageJSON = exports.readPackageJSON = readPackageJSON


/*Return a clean array with only the specific JSON field you need
This is specifically meant for Arrays of Jsons and requirement is for a new array with just one field from the entire jason object
@array 	Array/[] 	Source Array of JSONs
@field 	String 		Name of the Field that is required*/
function cleanArray(array, field) {
	var cleanA = [];
	array.forEach(function (value, index, array) {
		cleanA.push(value[field]);
	})
	return cleanA;
}
module.exports.cleanArray = exports.cleanArray = cleanArray;