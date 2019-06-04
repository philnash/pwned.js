import 'isomorphic-fetch';
import { hashedPassword, matchHash } from './utils';
import { API_URL, HASH_PREFIX_LENGTH, DEFAULT_HEADERS } from './constants';

interface PwnedResult {
  pwned: boolean;
  count: number;
}

const password = async (password: string, headers = DEFAULT_HEADERS): Promise<PwnedResult> => {
  const hash = hashedPassword(password);
  const prefix = hash.substring(0, HASH_PREFIX_LENGTH);
  const suffix = hash.substring(HASH_PREFIX_LENGTH);
  const hashes = await fetch(`${API_URL}${prefix}`, { headers }).then(res => res.text());
  const result = matchHash(hashes, suffix);
  return {
    pwned: result > 0,
    count: result,
  };
};

export default password;
