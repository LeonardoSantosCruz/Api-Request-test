const cleanForm = () =>{
    document.getElementById("endereco").value = ""
    document.getElementById("bairro").value = ""
    document.getElementById("cidade").value = ""
    document.getElementById("estado").value = ""
}

const fullFillForm = (promisseAdress)=>{ 
    document.getElementById("endereco").value = promisseAdress.logradouro
    document.getElementById("bairro").value = promisseAdress.bairro
    document.getElementById("cidade").value = promisseAdress.localidade
    document.getElementById("estado").value = promisseAdress.uf    
}
const validcep = (writtenCep)=> writtenCep.length ==8  // Função de retorno implícito (validar o tamanho e os dígitos numéricos) 

const buscarCep = async () => {
    cleanForm()
    const writtenCep = document.getElementById('cep').value
    const url = `https://viacep.com.br/ws/${writtenCep}/json/`
    if(validcep(writtenCep)){ // validação do tamanho do cep
        const promisseData = await fetch(url)
        const promisseAdress = await promisseData.json()
        if(promisseAdress.hasOwnProperty('erro')){ // verificar se o cpf existe na url
            document.getElementById("endereco").value = "CEP não encontrado"
        }else{
            fullFillForm(promisseAdress) 
        }
    } else {
        document.getElementById("endereco").value = "CEP Incorreto"
    }        
}

document.getElementById('cep').addEventListener('focusout',buscarCep);
