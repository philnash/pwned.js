import 'isomorphic-fetch';
import { hashedPassword, matchHash } from './utils';
import { API_URL, HASH_PREFIX_LENGTH, DEFAULT_HEADERS } from './constants';
import { PwnedError } from './pwned_error';

interface PwnedResult {
  pwned: boolean;
  pwnedCount: number;
}

const pwned = async (password: string, headerOpts: { [s: string]: string } = {}): Promise<PwnedResult> => {
  const hash = hashedPassword(password);
  const prefix = hash.substring(0, HASH_PREFIX_LENGTH);
  const suffix = hash.substring(HASH_PREFIX_LENGTH);
  const headers = { ...DEFAULT_HEADERS, ...headerOpts };
  try {
    const hashes = await fetch(`${API_URL}${prefix}`, { headers }).then(res => {
      if (!res.ok) {
        throw new PwnedError(res.statusText);
      }
      return res.text();
    });
    const result = matchHash(hashes, suffix);
    return {
      pwned: result > 0,
      pwnedCount: result,
    };
  } catch (error) {
    throw new PwnedError(error);
  }
};

module.exports = pwned;
