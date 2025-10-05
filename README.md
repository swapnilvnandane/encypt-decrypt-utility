# Encrypt/Decrypt Utility

A simple CLI utility for encrypting and decrypting messages using AES-256-GCM in Node.js and TypeScript.

## Features

- **Encrypt** plaintext messages securely.
- **Decrypt** messages previously encrypted by this utility.
- Uses AES-256-GCM for authenticated encryption.
- CLI interface for interactive use.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

Clone the repository and install dependencies:

```sh
npm install
```

### Configuration

Set your encryption secret in [`src/crypto-utility.ts`](src/crypto-utility.ts):

```ts
const KEY = crypto
    .createHash("sha256")
    .update(String('<your-secret-here>'))
    .digest();
```

Replace `<your-secret-here>` with your passphrase.

### Build

Compile TypeScript to JavaScript:

```sh
npm run build
```

### Run

Start the CLI utility:

```sh
npm start
```

## Usage

Follow the prompts to encrypt or decrypt messages.

- **Encrypt:** Enter plaintext to receive an encrypted string (format: `ENC(...)`).
- **Decrypt:** Enter an encrypted string (format: `ENC(...)`) to retrieve the original plaintext.

## File Structure

- [`src/index.ts`](src/index.ts): CLI entrypoint.
- [`src/crypto-utility.ts`](src/crypto-utility.ts): Encryption/decryption logic.
