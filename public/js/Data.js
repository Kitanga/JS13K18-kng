import Packet from './Packet.js';
import {
    rndInt
} from './util.js';

// Data
const data = {
    countries: ['Malicia', 'Caran', 'Haim', 'Seventkur'],
    blockedCountries: ['Broun', 'Turg', 'Taii'],
    blockedIp: [],
    dataTypes: ['Image', 'Video', 'Text'],
    blockedDataTypes: ['VOIP', 'Encrypted Data'],
    curiousDataTypes: ['32 bytes data'],
    attackIp: `${rndInt(0, 255)}.${rndInt(0, 255)}.${rndInt(0, 255)}.${rndInt(0, 255)}`,
    balance: 0,
    paused: false,
    packet: new Packet(true),
    muted: false,
    playing: false,
    stats: {
        badMissed: 0,
        badStopped: 0,
    }
};

data.packet.data = data;
data.packet.restart();
export default data;