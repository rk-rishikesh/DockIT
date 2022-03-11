import { parseURL, createTransaction } from '@solana/pay';
import BigNumber from "bignumber.js";
import { sendAndConfirmTransaction } from '@solana/web3.js';



  export const createTx = async (connection, url, payerWallet) => {
    console.log("Pandu", connection)
    const { recipient, message, memo, amount, reference, label } = parseURL(url);
    console.log('label: ', payerWallet);
    console.log('message: ', url);
    const amountX = new BigNumber(amount);

    const tx = await createTransaction(connection, payerWallet.publicKey, recipient, amountX, {
        reference,
        memo,
    });

    sendAndConfirmTransaction(connection, tx, [payerWallet]);

    return tx;
}

