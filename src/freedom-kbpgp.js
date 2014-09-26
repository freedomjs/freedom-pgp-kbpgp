/*globals freedom:true, fdom, console, require, global*/

/**
 * Implementation of a crypto-pgp provider for freedom.js
 * using the Keybase PGP implementation, kbpgp.
 **/

//var kbpgp = require('kbpgp');

// Global declarations for node.js
if (typeof global !== 'undefined') {
  if (typeof window === 'undefined') {
    global.window = {};
  }
  if (typeof XMLHttpRequest === 'undefined') {
    global.XMLHttpRequest = {};
  }
} else {
  if (typeof window === 'undefined') {
    window = {};
  }
  if (typeof XMLHttpRequest === 'undefined') {
    XMLHttpRequest = {};
  }
}

var fdomkb = function() {
};

/** REGISTER PROVIDER **/
/*if (typeof fdom !== 'undefined') {
  fdom.apis.register('freedom-kbpgp', fdomkb);
}*/