$(document).ready(function () {
  const createLog = () => {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        url: "/logs/new",
        data: {
          company: $("#companyInput").val().trim(),
          roast: $("#roastInput").val().trim(),
          description: $("#descriptionInput").val().trim(),
          name: $("#nameInput").val().trim(),
        },

      }).then((res) => {
        console.log(res); 
        $("#companyInput").val("");
        $("#roastInput").val("");
        $("#descriptionInput").val("");
        $("#nameInput").val("");
        logInstance.close();
        resolve("success");
      });
    });
  };

  const renderLogs = () => {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "GET",
        url: "/logs/user",
      }).then((logs) => {
        console.log(logs);
        $("#logsContainer").empty();
        logs.forEach((log) => {
          let { name, company, roast, description } = log;
          if (name) {
            name = `<p>${name}</p>`;
          } else {
            name = "";
          }
          console.log(name);
          $("#logsContainer").append(`
          <div class="row">
            <div class="card brown darken-1">
              <div class="card-content white-text">
              ${name}
              <span class="card-title">${company}</span>
              <br>
              <p>${roast}</p>
              <p>${description}</p>

              </div>
            </div>
          </div>
          `);
          resolve("success");
        });
        // resolve("success");
      });
    });
  };

  $(".parallax").parallax();
  $(".sidenav").sidenav();

  const logModal = document.getElementById("newLogModal");
  const logInstance = M.Modal.init(logModal, { dismissible: true });

  renderLogs();

  $("#newLogBtn").on("click", () => logInstance.open());
  $("#logCancel").on("click", () => logInstance.close());

  $("#logForm").on("submit", (e) => {
    e.preventDefault();
    createLog().then(() => renderLogs());
  });
});