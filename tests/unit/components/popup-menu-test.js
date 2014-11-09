import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from "ember";

var get = Ember.get;
var set = Ember.set;
var run = Ember.run;

moduleForComponent('popup-menu', 'PopupMenuComponent');

test('"for" takes an string id', function() {
  expect(1);

  // creates the component instance
  var component = this.subject({
    on: "click"
  });
  set(component, 'for', "ember-testing-container");
  equal(get(component, 'targetElement'), document.getElementById("ember-testing-container"));
});

test('"for" takes an element', function() {
  expect(1);

  // creates the component instance
  var component = this.subject({
    on: "click"
  });
  var element = document.getElementById("ember-testing-container");
  set(component, 'for', element);
  equal(get(component, 'targetElement'), element);
});

test('"for" takes a view', function() {
  expect(2);

  // creates the component instance
  var component = this.subject({
    on: "click"
  });
  this.append();

  var view = get(component, 'parentView');
  ok(view);
  var element = get(view, 'element');
  set(component, 'for', view);
  equal(get(component, 'targetElement'), element);
});

test('"retile" is called when will-change properties change', function() {
  expect(4);

  var RETILE_CALLED = false;

  // creates the component instance
  var component = this.subject({
    on: "click",
    retile: function () {
      RETILE_CALLED = true;
    }
  });

  run(function () {
    set(component, 'willChange', "text");
  });
  ok(RETILE_CALLED);

  RETILE_CALLED = false;
  run(function () {
    set(component, 'text', "Hello");
  });
  ok(RETILE_CALLED);

  RETILE_CALLED = false;
  run(function () {
    set(component, 'willChange', null);
  });
  ok(RETILE_CALLED);

  RETILE_CALLED = false;
  run(function () {
    set(component, 'text', "Hello");
   });
  ok(!RETILE_CALLED);
});