import {start} from '../dev-tools/server';
import config from './server.config';
//import path from 'path';
//import fs from 'fs';
//import {ArgumentParser} from 'argparse';

(async () => {

    //const parser = new ArgumentParser();

    //parser.addArgument(['-c', '--config'], {defaultValue: "config.json"});

    //const args = parser.parseArgs();
    //const cwd = process.cwd();
    /*
    const config = await new Promise(
        (resolve, reject) => fs.readFile(
            path.resolve(cwd, args.config),
            "utf-8",
            (err, data) => err ? reject(err) : resolve(JSON.parse(data))
        )
    );
    */

    start(config);

})();


