"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    let output;
    if (req.body.text == undefined || req.body.locale == undefined) {
      return res.json({ error: "Required field(s) missing" });
    }
    if (req.body.text == "") {
      return res.json({ error: "No text to translate" });
    }
    if (req.body.locale == "british-to-american") {
      output = translator.britishToAmerican(req.body.text);
    } else if (req.body.locale == "american-to-british") {
      output = translator.americanToBritish(req.body.text);
    } else {
      return res.json({ error: "Invalid value for locale field" });
    }
    return res.json({ text: req.body.text, translation: output });
  });
};
