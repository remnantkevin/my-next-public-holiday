console.log("Start script.js");

(async function () {
  console.log("Start async func in script.js");

  const response = await fetch("/api/data");
  const json = await response.json();
  console.log(json);

  console.log("End async func in script.js");
})();
