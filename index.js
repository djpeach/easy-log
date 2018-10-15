const colorizer = require('cli-color');
var colorCodes = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 226, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];

let allNamespaces = [];
let enabledNamespaces = process.env.DEBUG ? process.env.DEBUG.split(/[\s,]+/) : [];
let longestNamespaceLength = 0;

function createLogger(namespace, { colorCode, includeFunction, includeFile, includeLineNumber } = {}) {
    logger.colorCode = colorCode ? colorCodes[colorCodes.indexOf(colorCode)] : colorCodes[pickColor(namespace)];
    logger.includeFunction = includeFunction ? includeFunction : true;
    logger.includeFile = includeFile ? includeFile : true;
    logger.includeLineNumber = includeLineNumber ? includeLineNumber : true;
    logger.namespace = namespace ? namespace : '';

    allNamespaces.push(logger.namespace);

    if (logger.namespace.length > longestNamespaceLength) {
        longestNamespaceLength = logger.namespace.length;
    }

    function logger(data) {
        if (namespaceEnabled(namespace)) {
            const color = colorizer.xterm(logger.colorCode)
                , fileName = logger.includeFile ? theFileName() : ''
                , functionName = logger.includeFunction ? theFunctionName() : ''
                , lineNumber = logger.includeLineNumber ? theLineNumber() : ''
                , logTraceBar = logger.includeFile || logger.includeFunction || logger.includeLineNumber ? ' |' : ''
                , logTrace = `${logTraceBar}${functionName}${fileName}${lineNumber}`
                , totalPrefix = namespace.padStart(longestNamespaceLength) + logTrace + ' -> ';
            console.log(color(totalPrefix) + `${data}`);
        }
    }

    logger.enable = function () {
        if (!enabledNamespaces.includes(this.namespace)) {
            enabledNamespaces.push(this.namespace);
        }
    }

    logger.disable = function () {
        enabledNamespaces.splice(enabledNamespaces.indexOf(this.namespace), 1);
    }

    return logger;
}

function namespaceEnabled(namespace) {
    if (enabledNamespaces.includes(namespace)) {
        return true;
    }
    let enabled = false;
    enabledNamespaces.forEach(en => {
        if (en[0] === "-") {
            if (en.substr(1, en.length - 1) === namespace) {
                enabled = false;
            } else if (en[en.length - 1] === "*") {
                enBase = en.substr(1, en.length - 3);
                if (namespace.length > enBase.length) {
                    if (namespace.substr(0, enBase.length) === enBase) {
                        enabled = false;
                    }
                }
            }
        } else if (en[en.length - 1] === "*") {
            enBase = en.substr(0, en.length - 3);
            if (namespace.length > enBase.length) {
                if (namespace.substr(0, enBase.length) === enBase) {
                    enabled = true;
                }
            }
        }
    })
    return enabled;
}

function pickColor(namespace) {
    return [...namespace].reduce((valTotal, char) => valTotal + char.charCodeAt(0), 0) % colorCodes.length;
}

function theFileName() {
    const filePath = currentStack[2].getFileName();
    const filePathArray = filePath.split('/');
    const simpleFileName = filePathArray[filePathArray.length - 1];
    return ' ' + simpleFileName;
}

function theFunctionName() {
    return currentStack[2].getFunctionName() ? ' ' + currentStack[2].getFunctionName() + '()' : ' Top Level';
}

function theLineNumber() {
    return ':' + currentStack[2].getLineNumber();
}

Object.defineProperty(global, 'currentStack', {
    get: function () {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function (_, stack) {
            return stack;
        };
        var err = new Error;
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});

module.exports = createLogger;