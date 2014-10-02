/* globals freedom:true, console, require, global, kbpgp, crypto */
/* jslint indent:2,white:true,sloppy:true */

/**
 * Implementation of a crypto-pgp provider for freedom.js
 * using the Keybase PGP implementation, kbpgp.
 **/

// native code that is visible in this scope, needed in webworker by kbpgp
// TODO: make core.crypto (or getRandomValues) and link window back to it
console.log(crypto.getRandomValues);

var fdomkbpgp = function() {
  this.kbpgp = kbpgp;
};

fdomkbpgp.prototype.initialize = function(opts) {
  this.passphrase = opts.passphrase;  // TODO hash!
  this.keypair = this.kbpgp.KeyManager.generate_ecc(
    { userid : opts.userid },
    function(err, user) {
      user.sign({}, function(err) {
        console.log('ecc key generated!');
      });
    });
};

fdomkbpgp.prototype.encrypt = function(opts) {
  this.kbpgp.box(
    { msg: opts.data, encrypt_for: opts.key },
    function(err, result_string, result_buffer) {
      console.log(err, result_string, result_buffer);
    });
};

fdomkbpgp.prototype.decrypt = function(opts) {
};

fdomkbpgp.prototype.sign = function(opts) {
  this.kbpgp.box(
    { msg: opts.data, sign_with: this.keypair },
    function(err, result_string, result_buffer) {
      console.log(err, result_string, result_buffer);
    });
};

fdomkbpgp.prototype.verify = function(opts) {
};

fdomkbpgp.prototype.signEncrypt = function(opts) {
  this.kbpgp.box(
    { msg: opts.data, encrypt_for: opts.key, sign_with: this.keypair },
    function(err, result_string, result_buffer) {
      console.log(err, result_string, result_buffer);
    });
};

fdomkbpgp.prototype.decryptVerify = function(opts) {
  var ring = new kbpgp.keyring.KeyRing();
  ring.add_key_manager(this.keypair);
  ring.add_key_manager(opts.verifyingKey);
  kbpgp.unbox(
    { keyfetch: ring, armored: opts.data },
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

fdomkbpgp.prototype.importKey = function(opts) {
};

fdomkbpgp.prototype.exportKey = function(opts) {
};

fdomkbpgp.prototype.wrapKey = function(opts) {
};

fdomkbpgp.prototype.unwrapKey = function(opts) {
};

/** REGISTER PROVIDER **/
if (typeof freedom !== 'undefined') {
  freedom.freedomkbpgp().providePromises(fdomkbpgp);
  console.log('fdomkbpgp api registered!');
} else {
  console.log('no freedom :(');
}