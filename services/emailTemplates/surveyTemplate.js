const keys = require("../../config/secrets");
module.exports = survey => {
  return `
  <html>
  <body style="text-align: center;">
  <div style="text-align: center;">
      <h3>I'd like your input!</h3>
      <p>Please answer the following question:</p>
      <p>${survey.body}</p>
      <div style="text-align: center; display: flex; justify-content: center; align-items:center;">

          <button style="padding: 5px; color: white; border-style: none; background-color: teal; margin: 10px;" >
              <a style="color: white; text-decoration: none;" href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
          </button>

          <button style="padding: 5px; color: #fff; border-style: none; background-color: teal; margin: 10px;">
              <a style="color: #fff; text-decoration: none;" href="${keys.redirectDomain}/api/surveys/${survey.id}/no"> No </a>
          </button>

      </div>
  </div>
  </body>
</html>
    `;
};
