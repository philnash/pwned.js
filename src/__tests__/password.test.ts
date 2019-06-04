import password from '../password';
import { API_URL } from '../constants';
import fetchMock from 'fetch-mock';

const hashes = `FD8D510BFF2210462F26307C2143E990E6E:2
FDFAEE848356AD27F8FB494E5C1B11956C2:2
FE5CCB19BA61C4C0873D391E987982FBBD3:74831
FF36DC7D3284A39991ADA90CAF20D1E3C0D:1
FFF983A91443AE72BD98E59ADAB93B31974:2`;

test('Fetching a pwned password', async () => {
  fetchMock.get(`${API_URL}A94A8`, hashes);
  expect(await password('test')).toMatchObject({
    count: 74831,
    pwned: true,
  });
});

test('A safe password', async () => {
  fetchMock.get(`${API_URL}37D5B`, hashes);
  expect(await password('t3hb3stpa55w0rd')).toMatchObject({
    count: 0,
    pwned: false,
  });
});
