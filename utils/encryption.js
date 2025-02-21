const CryptoJS = require("crypto-js");

const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET;
const IV = CryptoJS.enc.Utf8.parse("1234567890123456");

const getKey = () => {
    return CryptoJS.enc.Utf8.parse(ENCRYPTION_SECRET.padEnd(32, "0").substring(0, 32));
};

const encryptData = (data) => {
    if (!data) return "";

    const key = getKey();
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
};


const decryptData = (encryptedData) => {
    if (!encryptedData) return "";

    try {
        console.log(" Encrypted Data:", encryptedData);

        const key = getKey();
        const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        console.log(" Decrypted Text:", decryptedText);

        return decryptedText || "Decryption Failed";
    } catch (error) {
        console.error(" Decryption Error:", error.message);
        return "Decryption Failed";
    }
};

module.exports = { encryptData, decryptData };
