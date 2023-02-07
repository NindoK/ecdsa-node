import { useState } from "react";
import server from "./server";

function Transfer({ address, setBalance, signature, publicKey, messageHash }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        signature: signature,
        publicKey: publicKey,
        messageHash: messageHash,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Signature
        <input placeholder="a4d7192c823..." value={signature} readOnly></input>
      </label>

      <label>
        Message Hash
        <input
          placeholder="a4d7192c823..."
          value={messageHash}
          readOnly
        ></input>
      </label>

      <label>
        Public Key
        <input placeholder="94209c92d93..." value={publicKey} readOnly></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
