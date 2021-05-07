const {
  ENCODED_KEY: RAW_ENCODED_KEY,
  ACCOUND_ID: RAW_ACCOUND_ID,
} = process.env;

if (!RAW_ENCODED_KEY) {
  throw new Error("ENCODED_KEY is not set on .env");
}
if (!RAW_ACCOUND_ID) {
  throw new Error("ACCOUND_ID is not set on .env");
}

export const ENCODED_KEY = RAW_ENCODED_KEY.replace(
  /(KEY-----)/,
  `$1\n`
).replace(/(-----END)/, `\n$1`);

export const ACCOUND_ID = RAW_ACCOUND_ID;
