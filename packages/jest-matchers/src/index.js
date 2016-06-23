/**
 * Copyright (c) 2014, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

const matchers = require('./matchers');

function expect(actual) {
  const expectation = {not: {}};
  const allMatchers = Object.assign({}, matchers);
  Object.keys(allMatchers).forEach(name => {
    expectation[name] = makeMatcher(allMatchers[name], false, actual);
    expectation.not[name] = makeMatcher(allMatchers[name], true, actual);
  });

  return expectation;
}

function makeMatcher(matcher, isNot, actual) {
  return function(expected) {
    const result = matcher(
      actual,
      expected,
      {args: arguments},
    );

    if (!result.pass ^ isNot) { // eslint-disable-line no-bitwise
      let message = result.message;

      if (typeof message === 'function') {
        message = message();
      }

      throw new Error(message);
    }
  };
}

module.exports = {
  expect,
};
