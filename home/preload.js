const { contextBridge } = require('electron');

const nearley = require("nearley");
const compile = require("nearley/lib/compile");
const generate = require("nearley/lib/generate");
const nearleyGrammar = require("nearley/lib/nearley-language-bootstrapped");


let rule = ''
let string = ''

const recieveInput = (value) => {
    if (value[0] != '^' || value.at(-1) != '$')
        return;
    rule = value
}

const regexReader = (str) => {
     
    let re = new RegExp(rule)
    string = str
    return re.test(string)
}

/*
const grammarReader = () => {
    function compileGrammar(sourceCode) {
        // Parse the grammar source into an AST
        const grammarParser = new nearley.Parser(nearleyGrammar);
        grammarParser.feed(sourceCode);
        const grammarAst = grammarParser.results[0]; // TODO check for errors
    
        // Compile the AST into a set of rules
        const grammarInfoObject = compile(grammarAst, {});
        // Generate JavaScript code from the rules
        const grammarJs = generate(grammarInfoObject, "grammar");
    
        // Pretend this is a CommonJS environment to catch exports from the grammar.
        const module = { exports: {} };
        eval(grammarJs);
    
        return module.exports;
    }
    
    const grammar = compileGrammar("main -> foo | bar");
    
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    
    // Parse something!
    parser.feed("if (true) {");
    parser.feed("x = 1");
    parser.feed("}");
    // or, parser.feed("if (true) {x=1}");
    // parser.results is an array of possible parsings.
    console.log(parser.results);
    // [{'type': 'if', 'condition': ..., 'body': ...}]

}*/

contextBridge.exposeInMainWorld('funcs', {
    regexReader,
    recieveInput
});