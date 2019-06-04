import { hashedPassword, matchHash } from '../utils';

describe('hashing a password correctly', () => {
  it('hashes correctly and into uppercase', () => {
    expect(hashedPassword('password')).toBe('5BAA61E4C9B93F3F0682250B6CF8331B7EE68FD8');
  });
});

describe('matching the hash suffix against a list', () => {
  const exampleHashes = `FF457ED69101D5FA9657D0AC888BFF1632E:1
FF535E8286A9D9394E33ED388B20F73A794:4
FFCDFF228BE98F296C0CA4CE1FC8815A30E:5`;

  it('matches and returns the number if the suffix is available', () => {
    const suffix = 'FFCDFF228BE98F296C0CA4CE1FC8815A30E';
    expect(matchHash(exampleHashes, suffix)).toBe(5);
  });

  it("returns 0 when the suffix doesn't match", () => {
    const suffix = 'blahblahblah';
    expect(matchHash(exampleHashes, suffix)).toBe(0);
  });
});
