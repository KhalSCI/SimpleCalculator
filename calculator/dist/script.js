import $ from "https://esm.sh/jquery";
import mixin from "https://esm.sh/mixin";

$(document).ready(function () {
  const buttons = Array.from(document.getElementsByTagName("button"));
  buttons.forEach(element => {
    element.style.gridArea = element.id;
  });

  const arr = [];
  let buffer = "";

  $("button").click(function (event) {
    const btn = event.target.innerText;
    const last = arr.length - 1;

    if (btn === "=") {
      if (arr[0] == "-" || arr[0] == "+") {
        if (arr[0] == "-") arr[1] = arr[1] * -1;
        arr.shift();
      }

      for (let i = 0; i < arr.length; i++) {
        if ((arr[i] == "-" || arr[i] == "+") && isNaN(arr[i - 1])) {
          if (arr[i] == "-") arr[i + 1] = arr[i + 1] * -1;
          arr.splice(i, 1);
        }
      }

      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "*" || arr[i] == "/") {
          if (arr[i] == "*") arr[i] = +arr[i - 1] * +arr[i + 1];
          if (arr[i] == "/") arr[i] = +arr[i - 1] / +arr[i + 1];
          arr.splice(i + 1, 1);
          arr.splice(i - 1, 1);
          i--;
        }
      }

      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "+" || arr[i] == "-") {
          if (arr[i] == "+") arr[i] = +arr[i - 1] + +arr[i + 1];
          if (arr[i] == "-") arr[i] = +arr[i - 1] - +arr[i + 1];
          arr.splice(i + 1, 1);
          arr.splice(i - 1, 1);
          i--;
        }
      }

      $("#display").text(arr[0]);
    } else if (btn === "AC") {
      buffer = "";
      arr.splice(0, arr.length);
      $("#display").text("0");
    } else if (btn === "-") {
      buffer = "";
      if (
      arr.length === 0 ||
      !isNaN(arr[last]) ||
      arr[last] === "." ||
      (!isNaN(arr[last - 1]) || arr[last - 1] === ".") && isNaN(arr[last]))
      {
        arr.push(btn);
        $("#display").text(btn);
      }
    } else if (btn === "+" || btn === "/" || btn === "*") {
      buffer = "";
      if (arr.length > 0) {
        if (!(!isNaN(arr[last]) || arr[last] === ".")) {
          arr.pop();
          if (isNaN(arr[last - 1])) {
            arr.pop();
          }
        }
        arr.push(btn);
        $("#display").text(btn);
      }
    } else {
      if (btn == ".") {
        if (!buffer.includes(".")) {
          if (!(buffer == "")) {
            arr.pop();
          }
          buffer += btn;
          arr.push(buffer);
          $("#display").text(buffer);
        }
      } else if (btn == "0") {
        if (!(buffer == "0")) {
          if (!(buffer == "")) {
            arr.pop();
          }
          buffer += btn;
          arr.push(buffer);
          $("#display").text(buffer);
        }
      } else {
        if (buffer == "0") {
          buffer = btn;
          arr.pop();
        } else {
          if (buffer == "") {
            buffer += btn;
          } else {
            buffer += btn;
            arr.pop();
          }
        }
        arr.push(buffer);
        $("#display").text(buffer);
      }
    }
    $("#display2").text(arr.join(""));
  });
});