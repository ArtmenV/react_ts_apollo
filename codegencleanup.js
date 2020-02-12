

const fs = require("fs")
const glob = require("glob")
const files = glob.sync("./src/**/*.generated.*")
files.forEach(file => fs.unlink(file, console.log))