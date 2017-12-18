let ndefLibrary = require('./dist/ndef-lib');


// /**
//  * EXAMPLES
//  */

/**
 * URi record
 */
// create uri record
var ndefUriRecord = new ndefLibrary.NdefUriRecord();
var uri = "http://www.google.fr";
ndefUriRecord.setUri(uri);
console.log('uri:',Buffer.from(ndefUriRecord._payload))

// parse an uri record
console.log('uri:', ndefUriRecord.getUri())


/**
 * Geolocation record
 *
 * Geo types:
    GeoUri: 0 - Geo URI scheme, as defined in RFC 5870 (http://tools.ietf.org/html/rfc5870).
    BingMaps: 1 - Bing Maps URI scheme, used for Maps on Windows 8 (http://msdn.microsoft.com/en-us/library/windows/apps/jj635237.aspx)
    NokiaMapsUri: 2 - Nokia Maps HTTP URL to show maps in the browser.
    WebRedirect: 3 - Web redirection script that uses the appropriate URI format depending on the browser's user agent.
    MsDriveTo: 4 - Drive-to URI scheme for Windows Phone 8 (http://msdn.microsoft.com/en-us/library/windowsphone/develop/jj710324%28v=vs.105%29.aspx)
    MsDriveTo: 5 - Walk-to URI scheme for Windows Phone 8 (http://msdn.microsoft.com/en-us/library/windowsphone/develop/jj710324%28v=vs.105%29.aspx)
 *
 */
// create a geo record
var ndefGeoRecord = new ndefLibrary.NdefGeoRecord();
ndefGeoRecord.setGeoType(ndefLibrary.NdefGeoRecord.NfcGeoType.GeoUri);
ndefGeoRecord.setLatitude(14.848484);
ndefGeoRecord.setLongitude(48.848484);
console.log('geo:',Buffer.from(ndefGeoRecord._payload))

// parse a geo record
console.log('geo:', ndefGeoRecord.getGeoType(), ndefGeoRecord.getLatitude(), ndefGeoRecord.getLongitude())

/**
 * Text
 */
// create a text record
var ndefTextRecord = new ndefLibrary.NdefTextRecord();
ndefTextRecord.setText("I'm a text record");
ndefTextRecord.setLanguageCode("en");
console.log('text:', Buffer.from(ndefTextRecord._payload))

// parse a text record
console.log('text:', ndefTextRecord.getText(), ndefTextRecord.getLanguageCode())

/**
 * Social
 *
 * social types:
 		Twitter: 0,
		LinkedIn: 1,
		Facebook: 2,
		Xing: 3,
		VKontakte: 4,
		FoursquareWeb: 5,
		FoursquareApp: 6,
		Skype: 7,
		GooglePlus: 8
 */
// create a social record
var ndefSocialRecord = new ndefLibrary.NdefSocialRecord();
var userName = "username";
ndefSocialRecord.setSocialType(ndefLibrary.NdefSocialRecord.NfcSocialType.Facebook);
ndefSocialRecord.setSocialUserName(userName);
console.log('social:', Buffer.from(ndefSocialRecord._payload));

// parse a social record
console.log('social:', ndefSocialRecord.getUri())


/**
 * Android App Record (aar)
 */
// Create an android app record
var ndefAndroidAppRecord = new ndefLibrary.NdefAndroidAppRecord();
var packageName = "com.google.android.pro";
ndefAndroidAppRecord.setPackageName(packageName);
console.log('aar:', Buffer.from(ndefSocialRecord._payload));

// parse an android app record
console.log('aar:', ndefAndroidAppRecord.getPackageName())


/**
 * tel record
 */
// Create a tel record
var ndefTelRecord = new ndefLibrary.NdefTelRecord();
var telNumber = "123456123456";
ndefTelRecord.setTelNumber(telNumber);
console.log('tel:', Buffer.from(ndefTelRecord._payload));

// parse an android app record
console.log('tel:', ndefTelRecord.getTelNumber(), ndefTelRecord.getUri())


/**
 * ndef message
 *
 * misc funcs:
 *  length - number of record in the message
 *  getRecords - get _records
 *  push - push a message (this._records.push(value);)
 *  clear = - empty the array (= new Array())
 */
var ndefTextRecord2 = new ndefLibrary.NdefTextRecord();
ndefTextRecord2.setText("lol");
ndefTextRecord2.setLanguageCode("fr");


var ndefMessage = new ndefLibrary.NdefMessage(ndefUriRecord, ndefGeoRecord, ndefTextRecord, ndefSocialRecord, ndefAndroidAppRecord, ndefTelRecord);
// var ndefMessage = new ndefLibrary.NdefMessage(ndefTextRecord, ndefUriRecord, ndefTextRecord2);
console.log(ndefMessage.getRecords()) // get the records array for this message
console.log(Buffer.from(ndefMessage.toByteArray())) // full message as buffer or bytearray
console.log(Buffer.from(ndefMessage.toByteArray()).length) // index 14

/**
 * TODO to write a tag
 *
 * index 12  -> E1    - ndef format
 * index 16  -> 03    - ndef message type
 * index 17  -> xx    - ndef message length
 * index 18+ -> D1... - ndef message
 * index xx  -> FE    - terminator
 *
 */





/**
 * Raw message parsing test
 */
// let ndefRecordx = new Buffer('d101265402656e4865792074686572652c2069276d2061206e6465662074657874207265636f72642021fe', 'hex');

// var ndefParser = new ndefLibrary.NdefMessage.fromByteArray(ndefRecordx);
// console.log(ndefParser)
// console.log('record', ndefParser._records)
// console.log(Buffer.from(ndefParser._records[0]._payload))




/**
 * ---------------------------------  ---------------------------------  ---------------------------------  ---------------------------------
 */



/**
 * Details
 */


/**
 * Geolocation record
 *
	* <summary>
	* Store longitude and latitude on a tag, to allow the user
	* to view a map when tapping the tag.
	* </summary>
	* <remarks>
	* Geo tags are not standardized by the NFC forum, therefore,
	* this class supports three different types of writing the location
	* to a tag.
	*
	* * GeoUri: write URI based on the "geo:" URI scheme, as specified
	* by RFC5870, available at: http://geouri.org/
	*
	* * BingMaps: Uses the URI scheme defined by the Maps application
	* on Windows 8.
	*
	* * DriveTo / WalkTo: URI schemes supported by Windows Phone 8 and
	* used in apps to launch an installed navigation app to navigate
	* to a specified position. An app to handle DriveTo request should
	* be present by default on all WP8 phones; WalkTo not necessarily.
	*
	* * NokiaMapsUri: write URI based on a Nokia Maps link, following the
	* "http://m.ovi.me/?c=..." scheme of the Nokia/Ovi Maps Rendering API.
	* Depending on the target device, the phone / web service should then
	* redirect to the best maps representation.
	* On Symbian, the phone will launch the Nokia Maps client. On a
	* desktop computer, the full Nokia Maps web experience will open.
	* On other phones, the HTML 5 client may be available.
	*
	* * WebRedirect: uses the web service at NfcInteractor.com to
	* check the OS of the phone, and then redirect to the best way
	* of showing maps to the user.
	* Note the limitations and terms of use of the web service. For
	* real world deployment, outside of development and testing, it's
	* recommended to host the script on your own web server.
	* Find more information at nfcinteractor.com.
	*
	* As this class is based on the Smart URI base class, the
	* payload is formatted as a URI record initially. When first
	* adding Smart Poster information (like a title), the payload
  * instantly transforms into a Smart Poster.

 * Geo types:
    GeoUri: 0 - Geo URI scheme, as defined in RFC 5870 (http://tools.ietf.org/html/rfc5870).
    BingMaps: 1 - Bing Maps URI scheme, used for Maps on Windows 8 (http://msdn.microsoft.com/en-us/library/windows/apps/jj635237.aspx)
    NokiaMapsUri: 2 - Nokia Maps HTTP URL to show maps in the browser.
    WebRedirect: 3 - Web redirection script that uses the appropriate URI format depending on the browser's user agent.
    MsDriveTo: 4 - Drive-to URI scheme for Windows Phone 8 (http://msdn.microsoft.com/en-us/library/windowsphone/develop/jj710324%28v=vs.105%29.aspx)
    MsDriveTo: 5 - Walk-to URI scheme for Windows Phone 8 (http://msdn.microsoft.com/en-us/library/windowsphone/develop/jj710324%28v=vs.105%29.aspx)
  *
*/

/**
 * Social record
 *
 	/// <summary>
	/// Link to one of the supported social networks by
	/// simply selecting the network and specifying the username.
	/// </summary>
	/// <remarks>
	/// Tapping a tag written with this record type will take
	/// the user to the social network web site, where he can then
	/// for example start following you on Twitter.
	///
	/// As this class is based on the Smart URI base class, the
	/// payload is formatted as a URI record initially. When first
	/// adding Smart Poster information (like a title), the payload
	/// instantly transforms into a Smart Poster.
	/// </remarks>
 */


 /**
  * Android App Record
  *
    /// <summary>
    /// Creates the Android-specific Android Application Record.
    /// </summary>
    /// <remarks>
    /// Through specifying the package name, this record directly launches an
    /// app on an Android phone (4.0+). If the app isn't installed on the phone,
    /// it will open the store and search for the app.
    ///
    /// To pass custom data to the app, you would typically add other records
    /// to the NDEF message.
    ///
    /// If creating a multi-record NDEF message, it's recommended to put this
    /// record to the end of the message.
    /// </remarks>
    /// <seealso cref="http://developer.android.com/guide/topics/connectivity/nfc/nfc.html#aar"/>
  */
