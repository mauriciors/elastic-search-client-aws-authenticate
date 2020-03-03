var AWS = require('aws-sdk');

var region = 'us-east-1'; 
var domain = ''; // example search-domain.region.es.amazonaws.com

var endpoint = new AWS.Endpoint(domain);
var request = new AWS.HttpRequest(endpoint, region);

request.headers['host'] = domain;
request.path += ''; //example index/_doc/_search
request.headers['Content-Type'] = 'application/json';
json = '{ "size" : 20, "query": {  "wildcard" : { "name" : { "value" : "flori*", "boost" : 2.0 } } }, "sort" : {"priority": {"order": "asc"}, "name": {"order": "asc"}, "_score": {"order": "asc"}}}'
request.body = json;

var credentials = new AWS.EnvironmentCredentials('AWS');
var signer = new AWS.Signers.V4(request, 'es');
signer.addAuthorization(credentials, new Date());

var client = new AWS.HttpClient();
  client.handleRequest(request, null, function(response) {
    console.log(response.statusCode + ' ' + response.statusMessage);
    var responseBody = '';
    response.on('data', function (chunk) {
      responseBody += chunk;
    });
    response.on('end', function (chunk) {
      console.log('Response body: ' + responseBody);
    });
  }, function(error) {
    console.log('Error: ' + error);
  });

console.log("test")
