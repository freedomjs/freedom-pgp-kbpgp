/* globals freedom:true, console, require, global, kbpgp, crypto */
/* jslint indent:2,white:true,sloppy:true */
/* jshint -W020 */

/**
 * Implementation of a crypto-pgp provider for freedom.js
 * using the Keybase PGP implementation, kbpgp.
 **/

console.log(crypto);
console.log(window);
console.log(window.crypto);
window.crypto = crypto;

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

// native code that is visible in this scope, needed in webworker by kbpgp
// TODO: make core.crypto (or getRandomValues) and link window back to it
//console.log(crypto.getRandomValues);

var fdomkbpgp = function() {
  console.log(kbpgp);
  this.kbpgp = kbpgp;
};

fdomkbpgp.prototype.setup = function(passphrase, userid) {
  this.passphrase = passphrase;  // TODO hash!
  this.keypair = this.kbpgp.KeyManager.generate_ecc(
    { userid: userid },
    function(err, user) {
      user.sign({}, function(err) {
        console.log('ecc key generated!');
      });
    });
};

fdomkbpgp.prototype.importKeypair = function(passphrase, userid, privateKey) {
};

fdomkbpgp.prototype.exportKey = function() {
};

fdomkbpgp.prototype.signEncrypt = function(data, encryptKey, sign) {
  this.kbpgp.box(
    { msg: data, encrypt_for: encryptKey, sign_with: this.keypair },
    function(err, result_string, result_buffer) {
      console.log(err, result_string, result_buffer);
    });
};

fdomkbpgp.prototype.verifyDecrypt = function(data, verifyKey) {
  var ring = new kbpgp.keyring.KeyRing();
  if (typeof verifyKey === 'undefined') {
    verifyKey = '';
  } else {
    ring.add_key_manager(verifyKey);
  }
  ring.add_key_manager(this.keypair);
  kbpgp.unbox(
    { keyfetch: ring, armored: data },
    function(err, literals) {
      if (err !== null) {
        console.log('Problem: ' + err);
      } else {
        console.log('decrypted message');
        console.log(literals[0].toString());
        var ds, km = null;
        ds = literals[0].get_data_signer();
        if (ds) { km = ds.get_key_manager(); }
        if (km) {
          console.log("Signed by PGP fingerprint");
          console.log(km.get_pgp_fingerprint().toString('hex'));
        }
      }
    });
};

fdomkbpgp.prototype.armor = function(data, type) {
  if (typeof type === 'undefined') {
    type = 'MESSAGE';
  }
};

fdomkbpgp.prototype.dearmor = function(data) {
};

/** REGISTER PROVIDER **/
if (typeof freedom !== 'undefined') {
  freedom.crypto().providePromises(fdomkbpgp);
  console.log('fdomkbpgp api registered!');
} else {
  console.log('no freedom :(');
}
