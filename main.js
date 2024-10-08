const nome = document.getElementById("nome");
const telefone = document.getElementById("telefone");
const form = document.getElementById("form-lista");
const tbodyTable = document.getElementById("tbody-table");
const msgContatos = document.getElementById("msg-contatos");
const msgErro = document.getElementById("msgErro");

const arrayNomes = [];
const arrayTelefones = [];

let i = 0;


form.addEventListener('submit', function(e){
    e.preventDefault();

    verificarStringTel();
})

function verificarStringTel(){
    telefone.value = telefone.value.replace(/ /g, "");
    
    telefone.value = telefone.value.replace(/[()]/g, "");

    telefone.value = telefone.value.replace(/-/g, "");
    
    if (telefone.value.length != 11){
        msgErro.style.display = "block";
        msgErro.textContent = "O Número deve seguir a formatação: 99 99999-9999.";
    }

    else{
        msgErro.style.display = "none";
        adicionarContato();
    }

}



function adicionarContato(){

    if(arrayNomes.includes(nome.value.trim())){

        msgErro.textContent = (`Já existe um contato com o nome "${nome.value}" na lista.`);
        msgErro.style.display="block";

    } else if (arrayTelefones.includes(telefone.value.trim())){

        msgErro.textContent = (`O número ${telefone.value} já existe na lista.`);
        msgErro.style.display="block";

    } else{
        arrayNomes.push(nome.value);
        arrayTelefones.push(telefone.value);
        adicionarLinha();
    }

}


function adicionarLinha(){
    telefone.value = "(" + telefone.value.slice(0,2) + ")" + " " + telefone.value.slice(2,7) + "-" + telefone.value.slice(7);
    
    let i = tbodyTable.rows.length;

    tbodyTable.innerHTML += `<tr id = "index${i}">
    <td>${nome.value}</td> 
    <td>${telefone.value}</td>
    <td>
    <button class = "btn-apagar" onclick="excluirContato(${i})" type="submit">🗑️</button></td>
    </tr>`

    removerMensagem();

}

function removerMensagem(){

    if (arrayNomes.length  > 0){
        msgContatos.style.display = "none";
    } else{
        msgContatos.style.display = "block";
    }
    
}


function excluirContato(i){
    let linha = document.getElementById(`index${i}`);
    linha.remove();

    arrayNomes.splice(i, 1);
    arrayTelefones.splice(i, 1);

    removerMensagem();

    console.log(arrayNomes);
    console.log(arrayTelefones);
}

