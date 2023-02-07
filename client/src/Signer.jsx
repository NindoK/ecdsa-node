import { useState } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
//const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

function Signer({
  privateKey,
  setPrivateKey,
  setPublicKey,
  setSignature,
  message,
  setMessage,
  setAddress,
  setMessageHash,
  setBalance,
}) {
  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function signMessage() {
    if (message != "") {
      const bytes = utf8ToBytes(message);
      const hash = keccak256(bytes);
      const [sig, recoveryBit] = await secp.sign(hash, privateKey, {
        recovered: true,
      });
      const publicKey = secp.recoverPublicKey(hash, sig, recoveryBit);
      const address = getAddress(publicKey);
      setPublicKey(toHex(publicKey));
      setSignature(toHex(sig));
      setAddress(address);
      setMessageHash(toHex(hash));
      if (address) {
        const {
          data: { balance },
        } = await server.get(`balance/${address}`);
        setBalance(balance);
      } else {
        setBalance(0);
      }
    } else {
      setPublicKey("");
      setSignature("");
      setAddress("");
      setMessageHash("");
    }
  }

  function getAddress(publicKey) {
    const addressSliced = publicKey.slice(1, publicKey.length);
    const hash = keccak256(addressSliced);
    return "0x" + toHex(hash.slice(hash.length - 20, hash.length));
  }

  return (
    <div className="container transfer">
      <h1>Sign Message</h1>

      <label>
        Private Key
        <input
          placeholder="94209c92d93..."
          value={privateKey}
          onChange={setValue(setPrivateKey)}
        ></input>
      </label>

      <label>
        Message
        <input
          placeholder="Type an address, for example: 0x2"
          value={message}
          onChange={setValue(setMessage)}
        ></input>
      </label>

      <input
        type="submit"
        className="button"
        value="Sign"
        onClick={signMessage}
      />
    </div>
  );
}

export default Signer;
