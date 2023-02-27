import server from "./server"

import * as secp from "ethereum-cryptography/secp256k1"
import {toHex} from "ethereum-cryptography/utils"
import {keccak256} from "ethereum-cryptography/keccak"

function getAddress(publicKey) {
    return keccak256(publicKey.slice(1)).slice(-20)
}

function Wallet({address, setAddress, balance, setBalance, privateKey, setPrivateKey}) {

    async function onChange(evt) {
        const privateKey = evt.target.value
        setPrivateKey(privateKey)
        let publicKey = ""
        setBalance(0)
        setAddress("")
        if (privateKey.length === 64) {
            try {
                console.log("We have 64 character")
                publicKey = secp.getPublicKey(privateKey)
                const newAddress = toHex(getAddress(publicKey))
                setAddress(newAddress)
                const {
                    data: {balance}
                } = await server.get(`balance/${newAddress}`)
                setBalance(balance)
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <div className="container wallet">
            <h1>Your Wallet</h1>

            <label>
                Private Key
                <input placeholder="Type in a private key" value={privateKey} onChange={onChange}></input>
            </label>
            {
                address ? <div> Addresss: 0x{address}</div> : ""
            }

            <div className="balance">Balance: {balance}</div>
        </div>
    )
}

export default Wallet
