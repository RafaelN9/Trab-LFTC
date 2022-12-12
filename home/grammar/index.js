var ruleCount = 1;

function strip(string) {
  return string.split(' ').join('');
}

const deleteRule = (num) => {
  document.getElementById("rule-" + num).remove();
  if (document.getElementById("rules").childElementCount == 1) ruleCount = 0;
};

const addMoreInputs = () => {
  var div = document.createElement("div");
  div.id = `rule-${++ruleCount}`;
  div.className = "row mt-3";
  div.innerHTML = `
    <div class="col-2">
        <input type="text" class="form-control"> 
    </div>
    <div class="col-1">
        <p class="h4">=></p>
    </div>
    <div class="col-4">
        <input class="form-control" type="text">
    </div>
    <div class="col-5">
        <button style="width: 30px; height: 30px; " class="p-0  mt-1 btn btn-danger btn-sm rounded-circle" onclick="deleteRule(${ruleCount})">
            <span class="h5">&times;</span>
        </button>
    </div>`;
  document.getElementById("rules").append(div);
};

const regex_gramatica_direita = new RegExp("^[A-Z]->(([a-z]|[0-9])([A-Z]{0,1})|([a-z]|[0-9]){0,1}([A-Z])|ε)$");


const testarGramatica = () => {
  const CHAR_RAIZ = 'S';
  if (!isRegrasValid()) {
    alert("Regras inválidas!")
    return
  }

  const regras = getRegras()
  const inputStr = document.getElementById('string');
  let str = inputStr.value
  try {
    const gramatica = new tinynlp.Grammar(regras);
    if (regras.join('').indexOf('ε') != -1) {
      str += 'ε'
    }
    const parsingArray = (strip(str).split('').length != 0) ? str.split('') : ['ε']
    let saida = tinynlp.parse(
      parsingArray,
      gramatica,
      CHAR_RAIZ
    );
    let estado = saida.getFinishedRoot(CHAR_RAIZ);
    console.log(parsingArray, gramatica, estado);
    if (estado == null) {
      inputStr.classList.add('is-invalid')
      inputStr.classList.remove('is-valid')
      return
    }
    inputStr.classList.add('is-valid')
    inputStr.classList.remove('is-invalid')

  } catch (error) {
    alert("Ocorreu um erro ao testar a gramática :(")
    console.log(error);
  }
}

const isRegrasValid = () => {
  const regex_gramatica_direita = new RegExp("^[A-Z]->(([a-z]|[0-9])([A-Z]{0,1})\|([a-z]|[0-9]){0,1}([A-Z])\|ε)$");
  console.log(getRegras().map(regra => strip(regra)))
  return getRegras().
    every(
      regra => regex_gramatica_direita.
        test(strip(regra)));
}

const getRegras = () => {
  let grammars = [];
  for (let i = 0; i <= ruleCount; i++) {
    const element = document.getElementById("rule-" + i);
    if (element == null) continue;
    const [left, right] = element.querySelectorAll("input");
    grammars.push({
      left: left.value,
      right: right.value,
    });
  }

  return grammars.map(grammar => {
    return (
      " " + strip(grammar['left']) +
      "->" +
      (strip(grammar['right']).replace(/([A-Z]|ε)/g, ' $1') || "ε"))
  })
}


const mudaCorTeste = (inputTest, valorResultado) => {
  if (valorResultado) {
    inputTest.style.backgroundColor = '#4ef73b';
  }
  else {
    inputTest.style.backgroundColor = '#f52a2a';
  }
}

document.getElementById("testBtn").addEventListener("click", (e) => {
  testarGramatica();
})

document.addEventListener("DOMContentLoaded", (e) => {
  /*
  getRegras()
  testarGramatica()
  testeRegrasProducao()
  getRegras()
  */


  const stringInput = document.getElementById("string");

  //stringInput.setAttribute('disabled', null)
  //stringInput.removeAttribute('disabled')

  //console.log(funcs.grammarReader());
});
