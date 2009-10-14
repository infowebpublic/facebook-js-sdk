////////////////////////////////////////////////////////////////////////////////
module('xd');
////////////////////////////////////////////////////////////////////////////////

test(
  'test default message flow',

  function() {
    Mu.XD.init();

    var url = Mu.XD.handler(function(response) {
      ok(response.answer == 42, 'expect the answer');
      start();
    }, 'parent') + '&answer=42';
    Mu.Frames.hidden(url, 'a');

    expect(1);
    stop();
  }
);

test(
  'test flash message flow',

  function() {
    Mu.XD.Flash.init();
    var oldTransport = Mu.XD._transport;
    Mu.XD._transport = 'flash';

    var url = Mu.XD.handler(function(response) {
      ok(response.answer == 42, 'expect the answer');
      start();
    }, 'parent') + '&answer=42';
    Mu.Frames.hidden(url, 'a');

    Mu.XD._transport = oldTransport;

    expect(1);
    stop();
  }
);

test(
  'test fragment message flow',

  function() {
    // Mu itself makes some functions no-ops, but here testing the guts, so we
    // make it a no-op ourselves.
    if (window.location.toString().indexOf(Mu.XD.Fragment._magic) > 0) {
      return;
    }

    var oldTransport = Mu.XD._transport;
    Mu.XD._transport = 'fragment';

    var url = Mu.XD.handler(function(response) {
      ok(response.answer == 42, 'expect the answer');
      start();
    }, 'parent') + '&answer=42';
    Mu.Frames.hidden(url, 'a');

    Mu.XD._transport = oldTransport;

    expect(1);
    stop();
  }
);