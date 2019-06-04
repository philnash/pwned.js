# @philnash/pwned

An easy, promise based, way to test passwords securely against the [Pwned Passwords API v2](https://haveibeenpwned.com/API/v2#PwnedPasswords) in Node.js.

## About

Troy Hunt's [Pwned Passwords API V2](https://haveibeenpwned.com/API/v2#PwnedPasswords) allows you to check if a password has been found in any of the huge data breaches.

`@philnash/pwned` is a JavaScript library to use the Pwned Passwords API's [k-Anonymity model](https://www.troyhunt.com/ive-just-launched-pwned-passwords-version-2/#cloudflareprivacyandkanonymity) to test a password against the API without sending the entire password to the service.

The data from this API is provided by [Have I been pwned?](https://haveibeenpwned.com/). Before using the API, please check [the acceptable uses and license of the API](https://haveibeenpwned.com/API/v2#AcceptableUse).

## Installation

```bash
npm install @philnash/pwned
```

## Usage

### With promises

```javascript
const pwned = require('@philnash/pwned').default;

pwned('password').then(password => {
  if (password.pwned) {
    console.log(`Your password has been pwned ${password.pwnedCount} times`);
  } else {
    console.log('Your password is safe, for now');
  }
});
```

### With async/await

```javascript
import pwned from '@philnash/pwned';

const testPassword = async attempt => {
  const password = await pwned(attempt);
  if (password.pwned) {
    console.log(`Your password has been pwned ${password.pwnedCount} times`);
  } else {
    console.log('Your password is safe, for now');
  }
};
testPassword('password');
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/philnash/pwned.js. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

This package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the Pwned project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/philnash/pwned.js/blob/master/CODE_OF_CONDUCT.md).
