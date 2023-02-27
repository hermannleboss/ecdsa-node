import {useState} from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1"
import {keccak256} from  "ethereum-cryptography/keccak"
import { toHex,utf8ToBytes  } from "ethereum-cryptography/utils"

function Transfer({address, setBalance, privateKey}) {
    const [sendAmount, setSendAmount] = useState("");
    const [recipient, setRecipient] = useState("");

    const setValue = (setter) => (evt) => setter(evt.target.value);


    async function transfer(evt) {
        evt.preventDefault();
        const nonce = Math.floor(Math.random() * 100)
        let message = {
            from:   address,
            to:     recipient,
            nonce,
            amount: parseInt(sendAmount)
        }
        const messageHash = keccak256(utf8ToBytes(JSON.stringify(message)))
        const signature = await secp.sign(messageHash, privateKey);
        try {
            const {
                data: {balance},
            } = await server.post(`send`, {
                sender: address,
                amount: parseInt(sendAmount),
                recipient,
                nonce,
                signature,
                publicKey:toHex(secp.getPublicKey(privateKey)),
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
                Recipient
                <input
                    placeholder="Type an address, for example: 0x2"
                    value={recipient}
                    onChange={setValue(setRecipient)}
                ></input>
            </label>
            <input type="submit" className="button" value="Transfer"/>
        </form>
    );
}

export default Transfer;
