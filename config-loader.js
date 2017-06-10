const fs = require('fs');
const path = require('path');

const {GOLB_CONFIG} = process.env;
const cwd = process.cwd();
const config = JSON.parse(fs.readFileSync(path.resolve(cwd, GOLB_CONFIG || "config.json"), 'utf8'));

exports.load = () =>
{
    return config;
};