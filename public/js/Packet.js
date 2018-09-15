import {rndBool, rndChoice, rndInt} from './util.js';

export default class Packet {
    constructor(good = true, data) {
        // Set whether this is a good packet or not
        this.good = good;
    }

    restart() {
        this.good = rndBool();
        this.ip = this.good ? `${rndInt(0, 255)}.${rndInt(0, 255)}.${rndInt(0, 255)}.${rndInt(0, 255)}` : (this.data.blockedIp.length ? rndChoice(this.data.blockedIp) : (this.data.blockedIp.push(`${rndInt(0, 255)}.${rndInt(0, 255)}.${rndInt(0, 255)}.${rndInt(0, 255)}`), this.data.blockedIp[0]));
        this.origin = this.good ? rndChoice(this.data.countries) : rndChoice(this.data.blockedCountries);
        var http = rndBool();
        this.dataTypes = this.good ? rndChoice(this.data.dataTypes, rndInt(1,3)) : rndChoice(this.data.blockedDataTypes, rndInt(1,3));
        this.http = this.good ? http : !http;

        this.destIp = this.good ? `${rndInt(0, 255)}.${rndInt(0, 255)}.${rndInt(0, 255)}.${rndInt(0, 255)}` : (this.data.blockedIp.length ? rndChoice(this.data.blockedIp) : (this.data.blockedIp.push(`${rndInt(0, 255)}.${rndInt(0, 255)}.${rndInt(0, 255)}.${rndInt(0, 255)}`), this.data.blockedIp[0]));
        this.destOrigin = this.good ? rndChoice(this.data.countries) : rndChoice(this.data.blockedCountries);
        this.destHttp = this.good ? this.http : !this.http;
    }

    accept() {
        if (!this.good) {
            this.data.stats.badMissed++;
        }
    }
    disallow() {
        if (!this.good) {
            this.data.stats.badStopped++;
        }
    }
    block() {
        this.disallow();

        this.data.blockedIp.push(this.ip);
    }
}
