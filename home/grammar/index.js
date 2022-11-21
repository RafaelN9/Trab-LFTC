var ruleCount = 1;

const deleteRule = (num) => {
    document.getElementById('rule-'+num).remove()
    if(document.getElementById('rules').childElementCount == 1)
        ruleCount = 0
}

const addMoreInputs = () => {
    var div = document.createElement('div');
    div.id = `rule-${++ruleCount}`; div.className = "row mt-3"
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
    </div>`
    document.getElementById('rules').append(div)
}

const test = () => {
    let rules = []
    const string = document.getElementById('string').value
    for (let i = 0; i <= ruleCount; i++) {
        const element = document.getElementById('rule-'+i);
        if(element == null)
        continue
        const [left, right] = element.querySelectorAll('input')
        rules.push({
            left: left.value,
            right: right.value
        })
    }
    let grammar = {
        string,
        rules
    }
    console.log(grammar);
}

document.addEventListener('DOMContentLoaded', (e) => {
    const stringInput = document.getElementById('string')

    //stringInput.setAttribute('disabled', null)
    //stringInput.removeAttribute('disabled')



    //console.log(funcs.grammarReader());

})
