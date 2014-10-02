/* globals freedom:true, console, require, global */
/* jslint indent:2,white:true,sloppy:true */

/**
 * Demo of a crypto-pgp provider for freedom.js
 * using the Keybase PGP implementation, kbpgp.
 **/

var pgp = freedom.mypgp();
console.log(pgp);

// TODO: test pgp API calls once crypto/getRandomValues is set up in freedom
//pgp.initialize({ userid: 'Joe Tester', passphrase: 'abc123' });