var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var readline = require('readline');
var puppeteer = require('puppeteer');
var readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
readlineInterface.question('What\'s your favorite genre of literature? ', function (genre) { return __awaiter(_this, void 0, void 0, function () {
    var urlMatches, processedGenreName_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                readlineInterface.close();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, getUrlMatches()];
            case 2:
                urlMatches = _a.sent();
                processedGenreName_1 = genre.toLowerCase();
                if (!!urlMatches.some(function (_a) {
                    var name = _a.name;
                    return name === processedGenreName_1;
                })) return [3 /*break*/, 3];
                console.log('Your genre doesn\'t match any in the list');
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, addToCart(processedGenreName_1, urlMatches)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
var getUrlMatches = function () { return __awaiter(_this, void 0, void 0, function () {
    var browser, page, urlMatches;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer.launch()];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto("https://www.goodreads.com/choiceawards/best-books-2020")];
            case 3:
                _a.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        var DOMElements = document.querySelectorAll('.category > a');
                        var result = [];
                        DOMElements.forEach(function (element) {
                            var _a;
                            result.push({
                                urlPart: element.getAttribute('href') || '',
                                name: ((_a = element
                                    .firstElementChild) === null || _a === void 0 ? void 0 : _a.innerHTML.trim().toLowerCase().replace(/&amp;/g, '&')) || ''
                            });
                        });
                        return result;
                    })];
            case 4:
                urlMatches = _a.sent();
                return [4 /*yield*/, browser.close()];
            case 5:
                _a.sent();
                return [2 /*return*/, urlMatches];
        }
    });
}); };
var addToCart = function (genre, urlMatches) { return __awaiter(_this, void 0, void 0, function () {
    var browser, page, urlPart, amazonLink;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, puppeteer.launch({ headless: false })];
            case 1:
                browser = _c.sent();
                return [4 /*yield*/, browser.pages()];
            case 2:
                page = (_c.sent())[0];
                urlPart = (_b = (_a = urlMatches.find(function (_a) {
                    var name = _a.name;
                    return name === genre;
                })) === null || _a === void 0 ? void 0 : _a.urlPart) !== null && _b !== void 0 ? _b : '';
                return [4 /*yield*/, page.goto("https://www.goodreads.com" + urlPart)];
            case 3:
                _c.sent();
                return [4 /*yield*/, Promise.all([
                        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
                        page.click('.winningTitle'),
                    ])];
            case 4:
                _c.sent();
                return [4 /*yield*/, Promise.all([
                        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
                        page.reload(),
                    ])];
            case 5:
                _c.sent();
                return [4 /*yield*/, page.$('#buyButton')];
            case 6:
                amazonLink = _c.sent();
                return [4 /*yield*/, page.evaluateHandle(function (element) { return element.target = '_self'; }, amazonLink)];
            case 7:
                _c.sent();
                return [4 /*yield*/, page.click('#buyButton')];
            case 8:
                _c.sent();
                return [4 /*yield*/, page.waitForSelector('#add-to-cart-button')];
            case 9:
                _c.sent();
                return [4 /*yield*/, page.click('#add-to-cart-button')];
            case 10:
                _c.sent();
                return [4 /*yield*/, page.goto('https://www.amazon.com/gp/cart/view.html?ref_=nav_cart')];
            case 11:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); };
