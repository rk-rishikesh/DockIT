import { encodeURL, createQR } from '@solana/pay';


export const generatePaymentLink = async (recipient, amount, reference, label, message, memo) => {
    const url = encodeURL({ recipient, amount, reference, label, message, memo });
    return url;
}

export const generateQRCode = async (url) => {

    const qrCode = createQR(url);
    return qrCode;
}