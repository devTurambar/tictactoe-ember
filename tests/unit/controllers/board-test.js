import { module, test } from 'qunit';
import { setupTest } from 'tictactoe-deliver/tests/helpers';

module('Unit | Controller | board', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:board');
    assert.ok(controller);
  });
});
