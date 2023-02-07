import Wallet from "./Wallet";
import Transfer from "./Transfer";
import Signer from "./Signer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [signature, setSignature] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [message, setMessage] = useState("");
  const [messageHash, setMessageHash] = useState("");

  return (
    <div>
      <div className="app">
        <Wallet
          balance={balance}
          setBalance={setBalance}
          address={address}
          setAddress={setAddress}
        />
        <Transfer
          setBalance={setBalance}
          address={address}
          signature={signature}
          publicKey={publicKey}
          messageHash={messageHash}
        />
      </div>
      <div>
        <Signer
          privateKey={privateKey}
          setPrivateKey={setPrivateKey}
          setSignature={setSignature}
          setPublicKey={setPublicKey}
          message={message}
          setMessage={setMessage}
          setAddress={setAddress}
          setMessageHash={setMessageHash}
          setBalance={setBalance}
        />
      </div>
    </div>
  );
}

export default App;
