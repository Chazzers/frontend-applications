import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | mask/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:mask/index');
    assert.ok(route);
  });
});
