// create the audio context
var ac = typeof AudioContext !== 'undefined' ? new AudioContext : new webkitAudioContext,
  // get the current Web Audio timestamp (this is when playback should begin)
  when = ac.currentTime,
  // set the tempo
  tempo = 70,
  // create an array of "note strings" that can be passed to a sequence
  lead = [

    '- es',
    'C4 es',
    'D4 es',
    'E4 es',

    '- es',
    'B3 es',
    'C4 es',
    'D4 es',

    '- es',
    'A3 es',
    'B3 es',
    'C4 es',
    'Ab3 es',
    'Ab3 es',
    'A3 es',
    'B3 es',

    '- es',
    'D3 es',
    'C4 es',
    'B3 es',
    'E3 es',
    'E3 es',
    'B3 es',
    'A3 es',

    '- es',
    'F3 es',
    'C4 es',
    'B3 es',
    'Ab3 es',
    'Ab3 es',
    'A3 es',
    'B3 es'
  ],
  playSong = [
    'C2 es',
    'D2 es',
    'E2 es',
    'G2 es',

    'C3 es',
    'D3 es',
    'E3 es',
    'G3 es',

    'C4 es',
    'D4 es',
    'E4 es',
    'G4 es',

    'C4 es',
    'D4 es',
    'E4 es',
    'G4 es',

    'C5 es',
    'G4 es',
    'E4 es',
    'D4 es',

    'C5 es',
    'G4 es',
    'E4 es',
    'D4 es',

    'C4 es',
    'G3 es',
    'E3 es',
    'D3 es',

    'C3 es',
    'G2 es',
    'E2 es',
    'D2 es',

    // 
    'A1 es',
    'B1 es',
    'C2 es',
    'E2 es',

    'A3 es',
    'B3 es',
    'C3 es',
    'E3 es',

    'A4 es',
    'B4 es',
    'C4 es',
    'E4 es',

    'A4 es',
    'B4 es',
    'C5 es',
    'E5 es',

    'A5 es',
    'E5 es',
    'C5 es',
    'B4 es',

    'A4 es',
    'E4 es',
    'C3 es',
    'B3 es',

    'A3 es',
    'E3 es',
    'C3 es',
    'B2 es',

    'A2 es',
    'E2 es',
    'C1 es',
    'B1 es',
  ];

// create 3 new sequences (one for lead, one for harmony, one for bass)
const sequence1 = new TinyMusic.Sequence(ac, tempo + 11, playSong);
const sequence2 = new TinyMusic.Sequence(ac, tempo, lead);

const fx = {
  click: new TinyMusic.Sequence(ac, tempo, ['G1 s'])
};

fx.click.staccato = 0.7;
fx.click.gain.gain.value = 0.14;
fx.click.waveType = 'square';
fx.click.loop = false;

// Waves only for testing
sequence1.waveType = 'triangle';
sequence2.waveType = 'pulse';

// sequence1.pulseWidth.gain.value = 0.07;
sequence2.pulseWidth.gain.value = 0.14;

// set staccato and smoothing values for maximum coolness
sequence1.staccato = 0.17;
sequence2.staccato = 0.55;
sequence2.smoothing = 0.0;

// adjust the levels so the bass and harmony aren't too loud
var gain = 0.17;
sequence1.gain.gain.value = gain;
sequence2.gain.gain.value = 0.07;

// Play
function playMenuMusic() {
  ac.resume().then(() => {
    when = ac.currentTime;
    // Start playing immediately
    sequence2.play(when);
  });
}

// Pause
function stopMenuMusic() {
  sequence2.stop();
}

// Play music as game starts
function playGameMusic() {
  ac.resume().then(() => {
    when = ac.currentTime;
    // Start playing immediately
    sequence1.play(when);
  });
}

// Pause
function stopGameMusic() {
  sequence1.stop();
}