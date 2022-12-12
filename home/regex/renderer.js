document.addEventListener("DOMContentLoaded", (e) => {
  const inputRole = document.getElementById("rule");
  const inputStr = document.getElementById("string");

  let isCorreto = false;

  inputRole.addEventListener("input", (e) => {
    funcs.recieveInput(e.target.value);
  });
  inputStr.addEventListener("input", (e) => {
    isCorreto = funcs.regexReader(e.target.value);
    if (!isCorreto)
      document.getElementById("string").className =
        "form-control w-50 is-invalid ";
    else
      document.getElementById("string").className =
        "form-control w-50 is-valid";
  });
});
