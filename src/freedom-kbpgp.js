/* globals freedom:true, fdom, console, require, global, kbpgp */
/* jslint indent:2,white:true,sloppy:true */

/**
 * Implementation of a crypto-pgp provider for freedom.js
 * using the Keybase PGP implementation, kbpgp.
 **/

console.log(kbpgp.box);  // proof that we can see kbpgp

// TODO - the actual module below
var fdomkb = function() {
  this.kbpgp = kbpgp;
};

/** REGISTER PROVIDER **/
/*if (typeof fdom !== 'undefined') {
  fdom.apis.register('freedom-kbpgp', fdomkb);
}*/