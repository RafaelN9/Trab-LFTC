const { contextBridge } = require("electron");

let rule = "";
let string = "";

const recieveInput = (value) => {
  if (value[0] != "^" || value.at(-1) != "$") return;
  rule = value;
};

const regexReader = (str) => {
  let re = new RegExp(rule);
  string = str;
  return re.test(string);
};

contextBridge.exposeInMainWorld("funcs", {
  regexReader,
  recieveInput
});
