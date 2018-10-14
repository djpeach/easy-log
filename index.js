const colorizer = require('cli-color');
var limitedColorCodes = [1, 4, 6, 9, 10, 46, 51, 75, 81, 123, 154, 166, 189, 190, 194, 195, 196, 197, 198, 199, 202, 204, 207, 208, 213, 214, 220, 225, 226]
var colorCodes = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 226, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
var lotsOColorCodes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231];

// for (i of limitedColorCodes) {
//     let msg = colorizer.xterm(i);
//     console.log(msg(i + ':   This is a test of the coloring system\n'));
// }

var enabledNamespaces = process.env.DEBUG ? process.env.DEBUG.split(",") : [];
const enabledAllNamespaces = enabledNamespaces.includes('*');

function createLogger(namespace, { formatted, colorCode, includeFunction, includeFile, includeLineNumber } = {}) {
    logger.formatted = formatted ? true : false;
    logger.colorCode = colorCode ? lotsOColorCodes.splice([lotsOColorCodes.indexOf(colorCode)], 1) : lotsOColorCodes.splice([pickColor(namespace)], 1);
    logger.includeFunction = includeFunction ? includeFunction : true;
    logger.includeFile = includeFile ? includeFile : true;
    logger.includeLineNumber = includeLineNumber ? includeLineNumber : true;
    logger.namespace = namespace;

    function logger(data) {
        if (enabledNamespaces.includes(namespace)) {
            const colorPrefix = colorizer.xterm(logger.colorCode);
            const fileName = logger.includeFile ? theFileName() : '';
            const functionName = logger.includeFunction ? theFunctionName() : '';
            let logTrace = fileName !== '' || functionName !== '' ? ` |` : ' ';
            logTrace += functionName !== '' ? ` ${theFunctionName()} ` : '';
            const fileSpace = functionName !== '' ? '' : ' ';
            logTrace += fileName !== '' ? `${fileSpace}${theFileName()}` : '';
            logTrace += logger.includeLineNumber ? `:${theLineNumber()} ` : ' ';
            console.log(colorPrefix(`${namespace}${logTrace}-> `) + `${data}`);
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

function pickColor(namespace) {
    return [...namespace].reduce((valTotal, char) => valTotal + char.charCodeAt(0), 0) % limitedColorCodes.length;
}

function theFileName() {
    const filePath = currentStack[2].getFileName();
    const filePathArray = filePath.split('/');
    const simpleFileName = filePathArray[filePathArray.length - 1];
    return simpleFileName;
}

function theFunctionName() {
    return currentStack[2].getFunctionName() ? currentStack[2].getFunctionName() + '()' : 'Top Level';
}

function theLineNumber() {
    return currentStack[2].getLineNumber();
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