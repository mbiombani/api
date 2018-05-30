#!/usr/bin/env node

var fs = require('fs')

var args = process.argv;
args.shift();
args.shift();

fs.readdir(args.shift(), function (err, items) {
  if (err) {
    console.error(err);
    process.exit(1)
  }
  console.log(JSON.stringify(items))
})
