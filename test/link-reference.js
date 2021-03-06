/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module mdast-util-to-hast
 * @fileoverview Test suite for `mdast-util-to-hast`.
 */

'use strict';

/* eslint-env node */

/* Dependencies. */
var test = require('tape');
var u = require('unist-builder');
var to = require('..');

/* Tests. */
test('LinkReference', function (t) {
  t.deepEqual(
    to(u('linkReference', {
      identifier: 'bravo'
    }, [u('text', 'bravo')])),
    [u('text', '['), u('text', 'bravo'), u('text', ']')],
    'should fall back on `linkReference`s without definition'
  );

  t.deepEqual(
    to(u('linkReference', {
      identifier: 'delta',
      referenceType: 'full'
    }, [u('text', 'echo')])),
    u('element', {tagName: 'a', properties: {
      href: ''
    }}, [u('text', 'echo')]),
    'should not fall back on full `linkReference`s'
  );

  t.deepEqual(
    to(u('linkReference', {
      identifier: 'hotel',
      referenceType: 'collapsed'
    }, [u('text', 'hotel')])),
    u('element', {tagName: 'a', properties: {
      href: ''
    }}, [u('text', 'hotel')]),
    'should not fall back on collapsed `linkReference`s'
  );

  t.deepEqual(
    to(u('paragraph', [
      u('linkReference', {
        identifier: 'juliett'
      }, [u('text', 'kilo')]),
      u('definition', {
        identifier: 'juliett',
        url: 'http://kilo.lima/mike',
        title: 'november'
      })
    ])),
    u('element', {tagName: 'p', properties: {}}, [
      u('element', {tagName: 'a', properties: {
        href: 'http://kilo.lima/mike',
        title: 'november'
      }}, [u('text', 'kilo')])
    ]),
    'should transform `linkReference`s to `a`s'
  );

  t.end();
});
