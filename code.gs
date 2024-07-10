function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index');
}

function reverse_geocode(lat, long) {
  var response = Maps.newGeocoder().reverseGeocode(lat, long);
  var address = response["results"][0]["formatted_address"];
  return address;
}

function saveCoordinates(latitude, longitude, mapLink) {
  var ss = SpreadsheetApp.openById("ADD YOUR SPREADSHEET ID HERE") ;
  var respSheet = ss.getSheets()[0] ;
  var data = respSheet.getDataRange().getValues() ;
  var headers = data[0] ;

  
  var address = reverse_geocode(latitude, longitude);
  var areacodematch = address.match(/,\s*[A-Z]{2}\s*(\d{5})/);
  if (areacodematch){
    var areacode = areacodematch[1];
  }
  var latCol = headers.indexOf("Latitude") + 1;
  var longCol = headers.indexOf("Longitude") + 1;
  var addressCol = headers.indexOf("Address") + 1;
  var areaCol = headers.indexOf("Zip Code") + 1;
  var mapLinkCol = headers.indexOf("GeoLocation") + 1;
  var lastRow = respSheet.getLastRow();
  respSheet.getRange(lastRow, latCol).setValue(latitude);
  respSheet.getRange(lastRow, longCol).setValue(longitude);
  respSheet.getRange(lastRow, addressCol).setValue(address);
  respSheet.getRange(lastRow, areaCol).setValue(areacode);
  respSheet.getRange(lastRow, mapLinkCol).setValue(mapLink);
}
