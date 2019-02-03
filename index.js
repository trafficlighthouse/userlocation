// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const requestPromise = require('request-promise');

// Get the address of the longtitude and latitude passed

app.get("/GetAddr", function (request, response) { 
  const requestOptions = {
  url:'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + request.query.location + '&key=' + process.env.G_API_KEY,
  headers: {
 Accept: 'application/json'
 },
 json: true
 }; 

 requestPromise.get(requestOptions)
 .then(function(data) {

var country = getCountry(data.results[0]['address_components']);
var zip = getZip(data.results[0]['address_components']);
var city = getCity(data.results[0]['address_components']);
var state = getState(data.results[0]['address_components']);

// console.log(country);
// console.log(data.results[0]['formatted_address']);
// console.log(data);
// console.log(request.query.location);
// console.log(data.results[6]['formatted_address']);

 // response.json({data});
   
   
response.json({
"version": "v2",
 "content": {
 "messages": [
 { 
 "type": "text",
 "text":  ""+
data.results[0]['formatted_address']
 }
 ],
 "actions": [
 {
 "action": "set_field_value",
 "field_name": "L01_Country",
 "value": country
 }, 
   
 {
 "action": "set_field_value",
 "field_name": "L01_City",
 "value": city
 },    
   
 {
 "action": "set_field_value",
 "field_name": "L01_Zip",
 "value": zip
 },    
 
  {
 "action": "set_field_value",
 "field_name": "L01_State",
 "value": state
 }  
   
   
 ]
      
   
 }
                
 });
 });

 });
   
   
function getCountry(addrComponents) {
 for (var i = 0; i < addrComponents.length; i++) {
 if (addrComponents[i].types[0] == "country") {
 return addrComponents[i].long_name;
 }
 if (addrComponents[i].types.length == 2) { 
 if (addrComponents[i].types[0] == "political") {
 return addrComponents[i].long_name;
 }
 }
 }
 return false;
};


function getZip(addrComponents) {
 for (var i = 0; i < addrComponents.length; i++) {
 if (addrComponents[i].types[0] == "postal_code") {
 return addrComponents[i].long_name;
 }
 
 }
 return false;
};


function getCity(addrComponents) {
 for (var i = 0; i < addrComponents.length; i++) {
 if (addrComponents[i].types[0] == "locality") {
 return addrComponents[i].long_name;
 }

 }
 return false;
};


function getState(addrComponents) {
 for (var i = 0; i < addrComponents.length; i++) {
 if (addrComponents[i].types[0] == "administrative_area_level_1") {
 return addrComponents[i].long_name;
 }

 }
 return false;
};






  

// listen for requests :)
app.listen(3000, function() {
  console.log('Your app is listening on port 3000');
});
