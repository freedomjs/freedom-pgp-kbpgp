/*globals freedom:true, fdom, console, require*/

/**
 * Implementation of a crypto-pgp provider for freedom.js
 * using the Keybase PGP implementation, kbpgp.
 **/

var kbpgp = require('kbpgp');

var fdomkb = function() {
};

/** REGISTER PROVIDER **/
if (typeof fdom !== 'undefined') {
  fdom.apis.register('freedom-kbpgp', fdomkb);
}