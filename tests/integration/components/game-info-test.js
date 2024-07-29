import { module, test } from 'qunit';
import { setupRenderingTest } from 'tictactoe-deliver/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | game-info', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<GameInfo />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <GameInfo>
        template block text
      </GameInfo>
    `);

    assert.dom().hasText('template block text');
  });
});
