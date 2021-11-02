const readline = require('readline');
const puppeteer = require('puppeteer');

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

interface UrlMatch {
    urlPart: string;
    name: string;
}

readlineInterface.question('What\'s your favorite genre of literature? ', async (genre: string) => {
    readlineInterface.close();
    try {
        const urlMatches = await getUrlMatches();
        const processedGenreName = genre.toLowerCase();
        if (!urlMatches.some(({ name }) => name === processedGenreName)) {
            console.log('Your genre doesn\'t match any in the list');
        } else {
            await addToCart(processedGenreName, urlMatches);
        }
    } catch(error) {
        console.error(error);
    }
});

const getUrlMatches = async (): Promise<Array<UrlMatch>> => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.goodreads.com/choiceawards/best-books-2020`);

    const urlMatches = await page.evaluate(() => {
        const DOMElements = document.querySelectorAll('.category > a');

        const result: Array<UrlMatch> = [];
        DOMElements.forEach((element: Element) => {
            result.push({
                urlPart: element.getAttribute('href') || '',
                name: element
                    .firstElementChild
                    ?.innerHTML
                    .trim()
                    .toLowerCase()
                    .replace(/&amp;/g, '&') || '',
            });
        });

        return result;
    });

    await browser.close();

    return urlMatches;
};

const addToCart = async (genre: string, urlMatches: Array<UrlMatch>) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = (await browser.pages())[0];

    const urlPart = urlMatches.find(({ name }) => name === genre)?.urlPart ?? '';
    await page.goto(`https://www.goodreads.com${urlPart}`);

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
        page.click('.winningTitle'),
    ]);

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
        page.reload(),
    ]);
    const amazonLink = await page.$('#buyButton');
    await page.evaluateHandle((element: any) => element.target = '_self', amazonLink);
    await page.click('#buyButton');

    await page.waitForSelector('#add-to-cart-button');
    await page.click('#add-to-cart-button');
    await page.goto('https://www.amazon.com/gp/cart/view.html?ref_=nav_cart');
};
