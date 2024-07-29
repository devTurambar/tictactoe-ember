import { module, test } from 'qunit';
import { setupTest } from 'tictactoe-deliver/tests/helpers';

module('Unit | Service | game-initial-data', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:game-initial-data');
    assert.ok(service);
  });
});
