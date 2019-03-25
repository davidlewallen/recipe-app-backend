const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const stripTitle = require('../title');

describe('stripTitle', () => {
  let dom = new JSDOM(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
      <title>Test Strip Title</title>
    </head>
    <body>
      
    </body>
    </html>
  `);

  it("should grab recipe title from the website's title", () => {
    const result = stripTitle(dom);

    expect(result).toEqual('Test Strip Title');
  });
});
