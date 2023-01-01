const express = require("express")
const secp = require("ethereum-cryptography/secp256k1")
const { toHex } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak")

const app = express()
const cors = require("cors")
const port = 3042

app.use(cors())
app.use(express.json())

const messageHash = "a33321f98e4ff1c283c76998f14f57447545d339b3db534c6d886decb4209f28"

const balances = {
  "12b1bb2450644e61dca5d2febb5a02e89978dc7c": 100,
  "7f7d49faa2f9b8cede14c4d6be2dba67e12a6d0a": 50,
  "1927dde249df4c3ff5f459c5f7f84794015f6e6a": 75
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params
  const balance = balances[address] || 0
  res.send({ balance })
})

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, recoveryBit, publicKey } = req.body

  console.log("Sender : ", sender)
  console.log("Recipient : ", recipient)
  console.log("Amount : ", amount)
  console.log("Signature : ", signature)
  console.log("Recovery Bit : ", recoveryBit)

  let message = {
    from:   sender,
    to:     recipient,
    amount: amount
  }

  const messageHash = keccak256(utf8ToBytes(JSON.stringify(message)))
  const recoverKey = secp.recoverPublicKey(messageHash, signature, recoveryBit)

  setInitialBalance(sender)
  setInitialBalance(recipient)
  if (toHex(recoverKey) === publicKey) {
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
