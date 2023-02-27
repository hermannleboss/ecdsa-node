const express = require("express")
const secp = require("ethereum-cryptography/secp256k1")
const { utf8ToBytes  } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak")

const app = express()
const cors = require("cors")
const port = 3042

app.use(cors())
app.use(express.json())

const balances = {
    "c611121019e56f6a284a475672c51541022cbf62": 100,
    "67218648aff7e98028f8e50395287917672dc957": 50,
    "595fed25db450f0ff500b39ae4dd41089c61a4ef": 75
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params
  const balance = balances[address] || 0
  res.send({ balance })
})

app.post("/send", (req, res) => {
  let { sender, recipient, amount, signature, nonce, publicKey } = req.body

  console.log("Sender : ", sender)
  console.log("Recipient : ", recipient)
  console.log("Amount : ", amount)

  let message = {
    from:   sender,
    to:     recipient,
    nonce,
    amount: amount
  }

  const messageHash = keccak256(utf8ToBytes(JSON.stringify(message)))
   signature=  new Uint8Array(Object.values(signature))
   const isSigned = secp.verify(signature, messageHash, publicKey);

   setInitialBalance(sender)
  setInitialBalance(recipient)
  if (isSigned) {
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" })
    } else {
      balances[sender] -= amount
      balances[recipient] += amount
      res.send({ balance: balances[sender] })
    }
  } else {
    res.status(400).send({ message: "Not the right signature !" })
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0
  }
}
