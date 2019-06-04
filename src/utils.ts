import { createHash } from 'webcrypto';
import { HASH_PREFIX_LENGTH, SHA1_LENGTH } from './constants';

export const hashedPassword = (password: string): string => {
  const hash = createHash('sha1');
  hash.update(password);
  return hash.digest('hex').toUpperCase();
};

export const matchHash = (hashResult: string, suffix: string): number => {
  const hashes = hashResult.split(/\n/);
  const match = hashes.find(hash => hash.startsWith(suffix));
  if (match) {
    return parseInt(match.substring(SHA1_LENGTH - HASH_PREFIX_LENGTH + 1), 10);
  } else {
    return 0;
  }
};
