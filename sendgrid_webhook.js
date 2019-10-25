var localtunnel = require("localtunnel");
localtunnel(5000, { subdomain: "funny-owl-96" }, function(err, tunnel) {
  console.log("LT running");
});
