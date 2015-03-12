/*globals freedom,Uint8Array,ArrayBuffer*/
/*jslint indent:2*/

var demo = function (dispatchEvent) {
  'use strict';
  this.dispatch = dispatchEvent;
};

demo.prototype.runCryptoDemo = function() {
  'use strict';
  var pgp = new freedom.kbpgp();
  var buffer = new ArrayBuffer(12);
  var byteView = new Uint8Array(buffer);
  byteView.set([49, 50, 51, 52, 49, 50, 51, 52, 49, 50, 51, 52]);

  this.dispatch('print', 'Starting encryption test!');
  pgp.setup('secret passphrase', 'Joe Test <joetest@example.com>').then(
    function () {
      this.dispatch('print', 'Exporting public key...');
      return pgp.exportKey();
    }.bind(this)).then(function (publicKey) {
      this.dispatch('print', 'Encrypting/signing...');
      return pgp.signEncrypt(buffer, publicKey, true).then(
        function (encryptedData) {
          this.dispatch('print', 'Decrypting...');
          return pgp.verifyDecrypt(encryptedData, publicKey);
        }.bind(this));
    }.bind(this)).then(function (result) {
      this.dispatch('print', 'Decrypted!');
      var resultView = new Uint8Array(result.data);
      if (result.signedBy[0] === 'Joe Test <joetest@example.com>' &&
          String.fromCharCode.apply(null, resultView) ===
          String.fromCharCode.apply(null, byteView)) {
        this.dispatch('print', 'Encryption test SUCCEEDED.');
      } else {
        this.dispatch('print', 'Encryption test FAILED.');
      }
    }.bind(this)).catch(
      function (e) {
        this.dispatch('print', 'Encryption test encountered error %1', [e]);
      }.bind(this));
};

demo.prototype.runImportDemo = function(publicKeyStr, privateKeyStr) {
  'use strict';
  var pgp = new freedom.kbpgp();
  this.dispatch('print', '');  // blank line to separate from crypto test
  this.dispatch('print', 'Starting keypair import test!');
  pgp.importKeypair('', '<quantsword@gmail.com>', privateKeyStr).then(
    function() {
      this.dispatch('print', 'Imported keypair...');
      return pgp.exportKey();
    }.bind(this)).then(
      function (result) {
        if (result === publicKeyStr) {
          this.dispatch('print', 'Keypair import test SUCCEEDED.');
        } else {
          this.dispatch('print', 'Keypair import test FAILED.');
        }
      }.bind(this)).catch(
        function (e) {
          this.dispatch('print', 'Keypair import test encountered error %1',
                        [e]);
        }.bind(this));
};

freedom().provideSynchronous(demo);
