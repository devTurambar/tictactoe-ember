import { module, test } from 'qunit';
import { setupTest } from 'tictactoe-deliver/tests/helpers';

module('Unit | Controller | statistics', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:statistics');
    assert.ok(controller);
  });
});
