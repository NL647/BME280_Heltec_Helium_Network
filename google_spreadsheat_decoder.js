function Decoder(bytes, port) {

  tempC = (bytesToFloat(bytes.slice(0, 4))).toFixed(2);
  humidity = (bytesToFloat(bytes.slice(4, 8))).toFixed(2);
  pressure = (bytesToFloat(bytes.slice(8, 12))).toFixed(2);
  altitude = (bytesToFloat(bytes.slice(12, 16))).toFixed(2);
  // TODO: Transform bytes to decoded payload below
  var decodedPayload = {
    "pressure": pressure,
    "temperature": tempC,
    "humidity": humidity,
    "altitude": altitude
  };
  // END TODO

  return Serialize(decodedPayload)
}

// Generated: Replace with your Google Form fields 
var field_mapping = {
  "pressure": "entry.1715912328",
  "temperature": "entry.39549968",
  "humidity": "entry.1632142506",
  "altitude": "entry.717472925"
};
// End Generated

function Serialize(payload) {
  var str = [];
  for (var key in payload) {
    if (payload.hasOwnProperty(key)) {
      var name = encodeURIComponent(field_mapping[key]);
      var value = encodeURIComponent(payload[key]);
      str.push(name + "=" + value);
    }
  }
  return str.join("&");
}

  function bytesToFloat(bytes) {
    //LSB Format (least significant byte first).
    var bits = bytes[3]<<24 | bytes[2]<<16 | bytes[1]<<8 | bytes[0];
    var sign = (bits>>>31 === 0) ? 1.0 : -1.0;
    var e = bits>>>23 & 0xff;
    var m = (e === 0) ? (bits & 0x7fffff)<<1 : (bits & 0x7fffff) | 0x800000;
    var f = sign * m * Math.pow(2, e - 150);
    return f;
  }
// DO NOT REMOVE: Google Form Function
  
