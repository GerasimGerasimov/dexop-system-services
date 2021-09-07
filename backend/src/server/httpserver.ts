import http = require('http');
import cors = require('cors');
import express = require("express");
import bodyParser = require('body-parser');
import { getIP } from '../system/system-api';

const app = express();
const jsonParser = bodyParser.json()

export class HttpServer{
    public https: any;

    private port: number;
    
    constructor (port: number) {
        this.port = port;
        this.init();
    }

    private init () {
        app.use(cors({origin:true}));
        app.route('/v1/time/')
            .get(jsonParser, [this.getLocalTime.bind(this)])
            .put(jsonParser, [this.setLocalTime.bind(this)]);
        
        app.route('/v1/IP/')
            .get(jsonParser, [this.getLocalIP.bind(this)])
        this.https = http.createServer(app).listen(this.port);
    }

    private async getLocalIP (request: any, response: any) {
        let IP: string = 'unnown';
        try {
            IP = await getIP();
            response.json({ status:'OK',
                            time: new Date().toISOString(),
                            result: IP});
        } catch (e) {
            response.status(400).json({status:'Error',
                                        msg: e.message || ''})
        }
        console.log(`get /v1/IP/ ${IP}`)
    }

    private async getLocalTime (request: any, response: any) {
        const date = new Date();
        try {
            response.json({ status:'OK',
                            time: {
                                ISO: date.toISOString(),
                                Local: date.toLocaleString(),
                                UNIX:date.valueOf()}
                            });
        } catch (e) {
            response.status(400).json({status:'Error',
                                        msg: e.message || ''})
        }
    }

    private async setLocalTime (request: any, response: any) {
        console.log(`/v1/data/PUT> ${request.body.cmd || ''}`);
        try {
            //response.json(await this.com.getCOMAnswer(request.body));
            response.status(200).json({status:'OK',
                                        msg: 'setLocalTime'})
        } catch (e) {
            response.status(400).json({status:'Error',
                                        msg: e.message || ''})
        }
    }
}