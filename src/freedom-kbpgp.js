/*globals freedom:true, fdom, console, require, global, kbpgp*/

/**
 * Implementation of a crypto-pgp provider for freedom.js
 * using the Keybase PGP implementation, kbpgp.
 **/

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

console.log(kbpgp.box);  // proof that we can see kbpgp

// TODO - the actual module below
var fdomkb = function() {
  this.kbpgp = kbpgp;
};

/** REGISTER PROVIDER **/
/*if (typeof fdom !== 'undefined') {
  fdom.apis.register('freedom-kbpgp', fdomkb);
}*/