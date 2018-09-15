import data from './Data.js';

// Get the Data
// const data = new Data();

// Buttons
const pauseBtn = document.querySelector('.pause-btn');
const muteBtn = document.querySelector('.mute-btn');

let hasLoaded = false;
let timer = {};
const totalTime = 70;
let secondCount = 'infinity';
let totalProcessed = 0;

// loader.hidden = true;
window.onload = () => {
    hasLoaded = true;
    loader.innerText = "Click/Touch to continue";
    loader.style.color = 'white';
};

// Methods
export default class Methods {
    constructor() {}
    static createLink(shareLink) {
        var name = location.toString().split('/');
        name = name[name.length - 2];
        var str = encodeURIComponent('https://js13kgames.com/entries/' + name);

        return shareLink + str;
    }
    static facebook() {
        // 
        var href = location.toString();
        var link = Methods.createLink('https://www.facebook.com/sharer/sharer.php?u=');
        return link;
    }
    static twitter() {
        // 
        var link = '';

        link = Methods.createLink(`https://twitter.com/intent/tweet?text=${encodeURIComponent("Checkout 'Packets, Please', a #js13k #gamejam game in which you help Teves Contura Pacifico manually handle IP packets...forever😱?!!!!!!! #gamedev #webdev @kitanga_nday @js13kGames")}&url=`);
        return link;
    }
    static scan() {
        fx.click.play();
        const type = this.dataset.type;
        document.body.classList.add('processing');
        switch (type) {
            case 'ip':
                Methods.checkIp('ip');
                break;
            case 'origin':
                Methods.checkOrigin('origin');
                break;
            case 'data':
                Methods.checkData('data');
                break;
            case 'http':
                Methods.checkHttp('http');
                break;
            case 'destIp':
                Methods.checkIp('destIp');
                break;
            case 'destOrigin':
                Methods.checkOrigin('destOrigin');
                break;
            case 'destHttp':
                Methods.checkHttp('destHttp');
                break;
        }
    }

    static checkDone(message, timeout) {
        var t = setInterval(() => {
            document.body.classList.remove('processing');
            clearInterval(t);
            alert(message);
        }, timeout);
    }

    static checkIp(varName) {
        for (let ix = data.blockedIp.length; ix--;) {
            if (data.packet[varName] === data.blockedIp[ix]) {
                Methods.checkDone("IP is on blocked list", 1700);
                return;
            }
        }
        Methods.checkDone("Nothing's wrong");
        return;
    }
    static checkOrigin(varName) {
        for (let ix = data.blockedCountries.length; ix--;) {
            if (data.packet[varName] === data.blockedCountries[ix]) {
                Methods.checkDone("Origin is on blocked list", 1400);
                return;
            }
        }
        Methods.checkDone("Nothing's wrong");
        return;
    }
    static checkData() {
        var types = data.packet.dataTypes.split(', ');

        for (let ix = data.blockedDataTypes.length; ix--;) {
            for (let kx = data.blockedDataTypes.length; kx--;) {
                if (types[kx] === data.blockedDataTypes[ix]) {
                    Methods.checkDone("Data type is on blocked list", 2500);
                    return;
                } else if (types[kx] === data.curiousDataTypes[ix]) {
                    Methods.checkDone("Something's not right", 2500);
                    return;
                }
            }
        }
        Methods.checkDone("Nothing's wrong");
        return;
    }
    static checkHttp() {
        Methods.checkDone("Make sure the HTTP fields on both origin and destination information are the same", 250);
    }

    static allow() {

        // totalProcessed++;
        fx.click.play();

        // Check if the user pressed the action
        // data.packet.allow();
        data.packet.restart();
        Methods.updateView();
    }
    static disallow() {

        // totalProcessed++;
        fx.click.play();

        // Check if the user pressed the action
        // data.packet.disallow();
        data.packet.restart();
        Methods.updateView();
    }
    static block() {
        // Evaluate correctly or incorrectly
        // totalProcessed++;
        fx.click.play();

        // Check if the user pressed the action
        // data.packet.block();
        data.packet.restart();
        Methods.updateView();
    }
    static next() {
        if (data.balance) {
            // Show the next round
            this.showNextRound();
        } else {
            document.querySelectorAll('.playing').forEach(ele => ele.classList.add('hidden'));
            document.querySelectorAll('.menu').forEach(ele => ele.classList.remove('hidden'));
        }
    }
    static showNextRound() {
        // secondCount = totalTime;
        totalProcessed = 0;
        this.start();
    }
    static endRound() {
        // secondCount = totalTime;

        document.querySelectorAll('.playing, .menu').forEach(ele => ele.classList.add('hidden'));
        document.querySelector('.results').classList.remove('hidden');
        document.querySelector('.social').classList.remove('hidden');

        // var totalNegative = data.stats.badMissed * 40;
    }
    static start() {
        Methods.updateView();
        timer = setTimeout(() => {
            //
            if (!data.paused) {
                Methods.updateView();
                timer = setTimeout(Methods.start, 1000);
            } else {
                clearTimeout(timer);
                // Methods.endRound();
            }
        }, 1000);
    }
    static updateView() {
        // Update IP info
        document.querySelector('.origin .ip .value').innerText = data.packet.ip;
        document.querySelector('.origin .origin .value').innerText = data.packet.origin;
        document.querySelector('.origin .data .value').innerText = data.packet.dataTypes;
        document.querySelector('.origin .http .value').innerText = data.packet.http;
        document.querySelector('.destination .ip .value').innerText = data.packet.destIp;
        document.querySelector('.destination .origin .value').innerText = data.packet.destOrigin;
        document.querySelector('.destination .http .value').innerText = data.packet.destHttp;
    }
    static startGame() {
        document.querySelectorAll('.playing').forEach(ele => ele.classList.remove('hidden'));
        document.querySelectorAll('.menu').forEach(ele => ele.classList.add('hidden'));
        document.querySelector('.results').classList.add('hidden');
        stopMenuMusic();
        playGameMusic();
        data.playing = true;
        data.balance = 170;
        Methods.start();
    }
    static mute() {
        fx.click.play();
        // console.log(muteBtn.children);
        for (let ix = muteBtn.children.length; ix--;) {
            muteBtn.children.item(ix).classList.toggle('hidden');
        }
        data.muted = !data.muted;
        if (data.muted) {
            if (data.playing) {
                stopGameMusic();
            } else {
                stopMenuMusic();
            }
        } else {
            if (data.playing) {
                playGameMusic();
            } else {
                playMenuMusic();
            }
        }
    }
    static pause() {
        // for (let ix = pauseBtn.children.length; ix--;) {
        //     pauseBtn.children.item(ix).classList.toggle('hidden');
        // }
        data.paused = !data.paused;
        if (data.paused) {
            clearTimeout(timer);
        } else {
            Methods.start();
        }
    }
    static manual() {
        manual.classList.toggle('hidden');
        Methods.pause();
        fx.click.play();
    }
    static doneLoading() {
        if (hasLoaded) {
            this.classList.add('hidden');
            playMenuMusic();
        }
    }
}

// Variables
const manual = document.querySelector('#manual');

const clickables = document.querySelectorAll('[data-handler]');
clickables.forEach(ele => {
    // 
    ele.onclick = Methods[ele.dataset.handler];
});

document.querySelectorAll('.social a').forEach(ele => {
    // 
    if (ele.innerText.toLowerCase() === 'facebook') {
        ele.onclick = () => ele.href = Methods.facebook();
    }
    if (ele.innerText.toLowerCase() === 'twitter') {
        ele.onclick = () => ele.href = Methods.twitter();
    }
});