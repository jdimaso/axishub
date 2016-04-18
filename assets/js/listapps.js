String Xrfkey = "0123456789abcdef";
 
  		String targetURL = "https://xx.xx.xx.xx:4243/qps/ticket?Xrfkey=";
  		
  		URL url = new URL(targetURL + "?Xrfkey=" + Xrfkey);
  		request = (HttpsURLConnection)url.openConnection();
  		request.setRequestMethod("POST");
  		request.setRequestProperty("Content-Type", "application/json");
  		request.setRequestProperty("X-Qlik-Xrfkey", Xrfkey);
  		request.setUseCaches(false);
  		request.setDoInput(true);
  		request.setDoOutput(true);
  		
  		String userDirectory = "USERDIRECTORY";
  		String userId= "USERID";
  		String body = "{'UserDirectory':'" + userDirectory + "', 'UserId':'" + userId + "','Attributes': []}";
  		byte[] bodyBytes = body.getBytes("UTF-8");
var https = require('https');
var fs = require('fs');     

/**
 * Since Qlik Sense is using self-signed certificates out of the box rejectUnauthorized: false is needed.
 */
 
var options = {
	rejectUnauthorized: false,
	hostname: 'localhost',
	port: 4242,
	path: '/qrs/app?xrfkey=abcdefghijklmnop',
	method: 'GET',
	headers: {
		'x-qlik-xrfkey': 'abcdefghijklmnop',
		'X-Qlik-User': 'UserDirectory= Internal; UserId= sa_repository ',
		'Content-Type': 'application/json'
	},
	key: fs.readFileSync(__dirname + '/client_key.pem'),
	cert: fs.readFileSync(__dirname + '/client.pem')
};

https.get(options, function(res) {
	console.log("Got response: " + res.statusCode)
	
	res.on("data", function(chunk) {
		console.log("BODY: " + chunk);
	});
	
}).on('error', function(e) {
	console.log("Got error: " + e.message);
});
