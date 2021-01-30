//Express
const {auth, requiresAuth} = require("express-openid-connect");
const express = require("express");
const app = express();
require("dotenv").config();

app.use(
  auth({
    authRequired: false,
    auth0logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    //idpLogout: true,
  })
);

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

//Add a port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(` server up and running on port ${port}`));
