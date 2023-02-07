const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
app.use(cors());
app.use(express.json());

const balances = {
  "0x16bb6031cbf3a12b899ab99d96b64b7bbd719705": 100,
  "0x2": 50,
  "0x3": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  //Get signature
  const { sender, recipient, amount, publicKey, signature, messageHash } =
    req.body;

  if (secp.verify(signature, messageHash, publicKey)) {
    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } else {
    res.status(400).send({ message: "Not owner" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
