// Data
const data = {
    shownPacket: {},
    currentPacket: {}
};

// Methods
class Methods {
    constructor() {}
    static ip() {}
    static origin() {}
    static data() {}
    static http() {}
    static ip2() {}
    static origin2() {}
    static http2() {}
    static allow() {}
    static disallow() {}
    static block() {}
    static manual() {
        manual.hidden = !manual.hidden;
    }
}

// Variables
const manual = document.querySelector('#manual');
const fields = document.querySelectorAll('.detail');
// console.log();
const clickables = document.querySelectorAll('[data-handler]');
clickables.forEach(ele => {
    // 
    ele.onclick = Methods[ele.dataset.handler];
});

// Buttons
const manualBtn = document.querySelector('.manual .btn');
const manualCloseBtn = document.querySelector('#manual .closer');
const allowBtn = document.querySelector('.allow.btn');
const disallowBtn = document.querySelector('.disallow.btn');
const blockBtn = document.querySelector('.block.btn');
const pauseBtn = document.querySelector('.pause');
const muteBtn = document.querySelector('.mute');

// Initialization
manual.hidden = true;

// Event listeners
// manualBtn.onclick = Methods.manual;
// manualCloseBtn.onclick = Methods.manual;

// Add event listeners for all elements with an event handler