import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;

// KEY: Buffer containing the SHA-256 hash of a static passphrase
const KEY = crypto
    .createHash("sha256")
    .update(String('<your-secret-here>'))
    .digest();

/**
 * Encrypts a string using AES-256-GCM.
 * @param text - The plaintext string to encrypt.
 * @returns The encrypted string in the format ENC(ivbase64Zencryptedbase64ZauthTagbase64).
 */
export const encrypt = (text: string): string => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), iv);
    let encrypted = cipher.update(text, "utf8");
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const authTag = cipher.getAuthTag();
    return `ENC(${iv.toString("base64")}Z${encrypted.toString("base64")}Z${authTag.toString("base64")})`;
};

/**
 * Decrypts a string encrypted by the encrypt function.
 * @param text - The encrypted string in the format ENC(ivbase64Zencryptedbase64ZauthTagbase64).
 * @returns The decrypted plaintext string.
 */
export function decrypt(text: string): string {
    const encText = text.replace(/^ENC\(/, "").replace(/\)$/, "");
    const [ivBase64, encryptedData, authTag] = encText.split("Z");
    const iv = Buffer.from(ivBase64, "base64");
    const encrypted = Buffer.from(encryptedData, "base64");
    const at = Buffer.from(authTag, "base64");
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY), iv);
    decipher.setAuthTag(at);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString("utf8");
}
