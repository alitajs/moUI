const fs = require('fs');
const path = require('path');
const appjsonPath = path.join(__dirname, 'app.json');
fs.readFile(appjsonPath, 'utf8', (err, data) => {
  if (err) return;
  const appjson = JSON.parse(data);
  if (!('sitemapLocation' in appjson)) return;
  delete appjson.sitemapLocation;
  fs.writeFile(appjsonPath, JSON.stringify(appjson, null, 2) + '\n', 'utf8', () => {});
});
fs.readdir(__dirname, (err, filepaths) => {
  if (err) return;
  filepaths
    .filter(filepath => /sitemap\d*.json/.test(filepath))
    .forEach(filepath => fs.unlink(filepath, () => {}));
});
