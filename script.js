

function buscaInfoCEP() {
	var cepBox = document.getElementById('cep')
	var cep = (cepBox.value).replace("-", "")

	var urlStr = "http://viacep.com.br/ws/" + cep + "/json"

	var ajax = new XMLHttpRequest()
	ajax.open("GET", urlStr)
	ajax.send()

	var res = document.getElementById('searchresults')
	ajax.addEventListener("readystatechange", 
		function(){
			if(ajax.readyState === 4 && ajax.status === 200){
				var resposta = JSON.parse(ajax.response)

				if (resposta.erro !== true){
					res.innerText = `Estado: ${resposta.uf}\n`
					res.innerText += `Cidade: ${resposta.localidade}\n`
					res.innerText += `Bairro: ${resposta.bairro}\n`
					res.innerText += `Rua: ${resposta.logradouro}\n`
					if (resposta.complemento !== "")
						res.innerText += `Complemento: ${resposta.complemento}\n`
					if (resposta.unidade !== "")
						res.innerText += `Unidade do correio resp.: ${resposta.unidade}\n`
				} else {
					res.innerText = "Cep invalido."
				}
			} else {
				res.innerText = "Cep's devem seguir o formato 01234-567"
			}
		}
	)
}

