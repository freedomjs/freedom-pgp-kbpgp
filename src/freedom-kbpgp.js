/* globals freedom:true, console, require, global, kbpgp */
/* jslint indent:2,white:true,sloppy:true */

/**
 * Implementation of a crypto-pgp provider for freedom.js
 * using the Keybase PGP implementation, kbpgp.
 **/

console.log(kbpgp.box);  // proof that we can see kbpgp

// TODO - the actual module below
var fdomkbpgp = function() {
  this.kbpgp = kbpgp;
};

fdomkbpgp.prototype.initialize = function(initOpts) {
  this.keypair = kbpgp.KeyManager.generate_ecc(
    { userid : initOpts.userid },
    function(err, user) {
      user.sign({}, function(err) {
        console.log('ecc key generated!');
      });
    });
};

/** REGISTER PROVIDER **/
if (typeof freedom !== 'undefined') {
  //freedom.apis.register('freedomkbpgp', fdomkbpgp);
  freedom.freedomkbpgp.providePromises(fdomkbpgp);
  console.log('fdomkbpgp api registered!');
} else {
  console.log('no freedom :(');
}