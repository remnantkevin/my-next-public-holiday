console.log("Start script.js");

(async function () {
  console.log("Start async func in script.js");

  const response = await fetch("/api");
  const json = await response.text();
  console.log(json);

  console.log("End async func in script.js");
})();
