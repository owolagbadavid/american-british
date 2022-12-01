const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");
var RegexEscape = require("regex-escape");
 
class Translator {
  replace(str, obj) {

    return str;
  }

  americanToBritish(string) {
    let mike = string
    for(let key in americanOnly){
    mike = mike.replaceAll(RegExp(key+'(?![a-z0-9])', 'ig'),  `<span class="highlight">${americanOnly[key]}</span>`)
    }
    for(let key in americanToBritishSpelling){
    mike = mike.replaceAll(RegExp(key+'(?![a-z0-9])', 'ig'), `<span class="highlight">${americanToBritishSpelling[key]}</span>`)
    }
    for(let key in americanToBritishTitles){
    mike = mike.replaceAll(RegExp(RegexEscape(key)+'(?![a-z0-9])', 'ig'), `<span class="highlight">${americanToBritishTitles[key][0].toUpperCase()+americanToBritishTitles[key].slice(1)}</span>`)
    }
    
    mike = mike.replaceAll(
      /(\d{1,2})(\:)(\d{2})/g,
      `<span class="highlight">$1.$3</span>`
    );
    console.log(mike);
    return mike == string ? "Everything looks good to me!" : mike;
  }

  britishToAmerican(string) {
    let spelling = Object.fromEntries(
      Object.entries(americanToBritishSpelling).map((item) => item.reverse())
    );

    let titles = Object.fromEntries(
      Object.entries(americanToBritishTitles).map((item) => item.reverse())
    );

    let mike = string
    for(let key in britishOnly){
    mike = mike.replaceAll(RegExp(key+'(?![a-z0-9])', 'ig'), `<span class="highlight">${britishOnly[key]}</span>`)
    }
    for(let key in spelling){
    mike = mike.replaceAll(RegExp(key+'(?![a-z0-9])', 'ig'), `<span class="highlight">${spelling[key]}</span>`)
    }
    for(let key in titles){
    mike = mike.replaceAll(RegExp(key+'(?![a-z0-9])', 'ig'), `<span class="highlight">${titles[key][0].toUpperCase()+titles[key].slice(1)}</span>`)
    }
      
    mike = mike.replaceAll(
      /(\d{1,2})(\.)(\d{2})/g,
      `<span class="highlight">$1:$3</span>`
    );
    
    console.log(mike);
    return mike == string ? "Everything looks good to me!" : mike;
  }
}

module.exports = Translator;
