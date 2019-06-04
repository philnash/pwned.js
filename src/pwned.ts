import 'isomorphic-fetch';
import { API_URL, DEFAULT_HEADERS, HASH_PREFIX_LENGTH } from './constants';
import { PwnedError } from './pwned_error';
import { hashedPassword, matchHash } from './utils';

interface IPwnedResult {
  pwned: boolean;
  pwnedCount: number;
}

const pwned = async (password: string, headerOpts: { [s: string]: string } = {}): Promise<IPwnedResult> => {
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

export default pwned;
