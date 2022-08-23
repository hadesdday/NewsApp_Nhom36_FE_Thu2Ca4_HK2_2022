const express = require("express");
const path = require("path");
const app = express();

const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(["https://", req.get("Host"), req.url].join(""));
    }
    next();
  };
};
app.use(express.static("./dist/mdb5-angular-ui-kit-pro-advanced"));

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "/dist/mdb5-angular-ui-kit-pro-advanced/index.html")
  );
});

app.use(forceSSL());

app.listen(process.env.PORT || 8080);
