import readline from "readline";
import {encrypt, decrypt} from "./crypto-utility";

/**
 * Application entrypoint for a CLI encryption/decryption utility.
 * Presents a simple menu, then encrypts or decrypts based on user choice.
 * Dependencies:
 *  - `encrypt(plain: string): string` returns a wrapped encrypted string (e.g. ENC(...))
 *  - `decrypt(wrapped: string): string` returns the original plaintext
 */

/**
 * Creates a readline.Interface for interactive CLI I/O.
 * @constant
 */
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(`

============================================
Welcome to the Encryption/Decryption Utility
============================================

Choose an option:

1. Encrypt a message
2. Decrypt a message
3. Exit

============================================

`);

/**
 * Initiates the first user prompt.
 * @callback mainQuestionCallback
 * @param {string} option - User provided menu selection.
 * @returns {void}
 */
rl.question("Enter option (1/2): ", (option) => {
    if (option === "1") {
        rl.question("Enter text to encrypt: ", (text) => {
            console.log("\nEncrypted Value:");
            console.log(encrypt(text));
            rl.close();
        });
    } else if (option === "2") {
        rl.question("Enter text to decrypt (with ENC(...)): ", (enc) => {
            try {
                console.log("\nDecrypted Value:");
                console.log(decrypt(enc));
            } catch (err) {
                console.log(err);
                console.error("❌ Failed to decrypt. Ensure correct input and ENCRYPTION_SECRET.");
            }
            rl.close();
        });
    } else if (option === "3") {
        console.log("Exiting...");
        rl.close();
    } else {
        console.log("Invalid option.");
        rl.close();
    }
});