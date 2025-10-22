function check() {
  var y = document.getElementById("year").value;

  var leap = "не високосный";
  if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) {
    leap = "високосный";
  }

  var vek = Math.ceil(y / 100);

  var resultText = "Год " + y + " — " + leap + ", " + vek + " век.";
  document.getElementById("result").innerHTML = resultText;

  sendToServer(y, leap, vek, resultText);
}

function sendToServer(y, leap, vek, resultText) {

  const url = "https://ya.ru/";

  const data = {
    task: "Определить, високосный ли год и к какому веку он относится.",
    input: y,
    output: resultText
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.text())
  .then(serverResponse => {
    
    document.getElementById("server").innerHTML =
      "Ответ сервера:<br><pre>" + serverResponse + "</pre>";
  })
  .catch(error => {
    document.getElementById("server").textContent =
      "Ошибка при отправке: " + error;
  });
}
