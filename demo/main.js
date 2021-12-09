const NdefLibrary = require("ndef-lib");
// Create NDEF Message

var ndefMessage = new NdefLibrary.NdefMessage();
// Create NDEF Uri Record
var ndefUriRecord = new NdefLibrary.NdefUriRecord();
// Set Uri in record
ndefUriRecord.setUri("https://www.mobilefactory.at");
// Add record to message
ndefMessage.push(ndefUriRecord);
// Get byte array for NFC tag
var byteArray = ndefMessage.toByteArray();
