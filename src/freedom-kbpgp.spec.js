/* globals freedom:true, console, require, global, fdomkbpgp, crypto */
/* jslint indent:2,white:true,sloppy:true */

describe('kbpgp implements freedom crypto API', function() {
  freedom = {
    mypgp: function() {
      return {
        STATUS: null,
        ERRCODE: null
      };
    }
  };
  var pgp;
  //var pgp = freedom.mypgp();

  var buffer = new ArrayBuffer(12);
  var byteView = new Uint8Array(buffer);
  // bytes for the string 'abcd1234'
  byteView.set([49, 50, 51, 52, 49, 50, 51, 52, 49, 50, 51, 52]);

  beforeEach(function() {
    pgp = new fdomkbpgp();
  });

  it('encrypt and decrypt', function(done) {
    pgp.setup('test passphrase', 'test user <testuser@gmail.com>')
    .then(function() {
      return pgp.exportKey();
    })
     .then(function(publicKey) {
       return pgp.signEncrypt(buffer, publicKey, false);
     })
     .then(function(encryptedData) {
       return pgp.verifyDecrypt(encryptedData);
     })
     .then(function(result) {
       expect(result.data).toEqual(buffer);
     })
     .catch(function(e) {
              console.log(e.toString());
              expect(false).toBeTruthy();})
     .then(done);
  });


  it('encryptSign and verifyDecrypt', function(done) {
    pgp.setup('test passphrase', 'test user <testuser@gmail.com>')
    .then(function() {
      return pgp.exportKey();
    })
     .then(function(publicKey) {
       return pgp.signEncrypt(buffer, publicKey, true)
              .then(function(encryptedData) {
                return pgp.verifyDecrypt(encryptedData, publicKey);
              });
     })
     .then(function(result) {
       expect(result.data).toEqual(buffer);
       expect(result.signedBy.length).toEqual(1);
       expect(result.signedBy[0]).toEqual('test user <testuser@gmail.com>');
     })
     .catch(function(e) {
              console.log(e.toString());
              expect(false).toBeTruthy();})
     .then(done);
  });

 it('export public key', function(done) {
    pgp.setup('test passphrase', 'test user <testuser@gmail.com>')
    .then(function() {
      expect(true).toBeTruthy();
      return pgp.exportKey();
    })
     .then(function(publicKeyStr) {
       expect(publicKeyStr.length > 36);
       expect(publicKeyStr.substring(0,36)).
         toEqual('-----BEGIN PGP PUBLIC KEY BLOCK-----');
     })
     .catch(function(e) {
              console.log(e.toString());
              expect(false).toBeTruthy();})
     .then(done);
  });

  it('armor and dearmor', function(done) {
    pgp.setup('test passphrase', 'test user <testuser@gmail.com>')
    .then(function() {
      return pgp.armor(buffer);
    })
    .then(function(armored) {
      return pgp.dearmor(armored);
    })
    .then(function(dearmored) {
      expect(dearmored).toEqual(buffer);
    })
    .catch(function(e) {
             console.log(e.toString());
             expect(false).toBeTruthy();})
    .then(done);
  });
});