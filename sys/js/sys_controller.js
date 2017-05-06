/**
 * Função que cria a matriz com o MAPA da Cidade
 * @param  {[type]} y [largura da matriz]
 * @param  {[type]} x [altura da matriz]
 * @return {[type]}   [matriz]
 */
function criarMapa(y, x) {
  var matriz = [];
  for (var i = 0; i < x; i++) {
    var linha = [];
    for (var j = 0; j < y; j++) {
      linha.push(".");
    }
    matriz.push(linha);
  }
  return matriz;
}

/**
 * Função que inicializa algumas regiões do mapa com cinzas.
 * Para essa inicialização, foi utilizado uma regra de ocupar ~10% do mapa com fumaça aleatoriamente,
 * sendo distribuidos em ~90% na altura e ~60% na largura.
 * @param  {[type]} pMatriz [Mapa gerado inicialmente]
 * @return {[type]}         [Mapa com as localidades com fumaça]
 */
function inserirFumaca(pMatriz)
{
	var largura = pMatriz[0].length;
	var altura = pMatriz.length;
	for (var i = 0; i < (largura*altura*0.1); i++) {
		pMatriz[Math.floor(Math.random()*((altura*0.9)-0+1)+0)][Math.floor(Math.random()*((largura*0.6)-0+1)+0)] = "*";
	}
	
	return pMatriz;
}

/**
 * Função que cria os aeroportos aleatoriamente no mapa.
 * Pode ser inserido aeroportos em qualquer parte do mapa e a quantidade informada pelo usuário.
 * @param  {[type]} pMatriz        [Mapa gerado inicialmente já com alguns locais com cinzas]
 * @param  {[type]} pQtdAeroportos [Quantidade de aeroportos que serão inseridos]
 * @return {[type]}                [Mapa com as regiões com cinzas e aeroportos]
 */
function inserirAeroporto(pMatriz,pQtdAeroportos)
{
	var largura = pMatriz[0].length;
	var altura = pMatriz.length;
	for (var i = 0; i < pQtdAeroportos; i++) {
		pMatriz[Math.floor(Math.random()*((altura-1)-0+1)+0)][Math.floor(Math.random()*((largura-1)-0+1)+0)] = "A";
	}
	
	return pMatriz;
}

/**
 * Principal função da lógica utilizada.
 * Verifica as regiões que estão preenchidas com cinzas e distribui nuvens para as regiões adjacentes.
 * Na função é verificado o número de aeroportos já atingidos.
 * @param  {[type]} pMatriz 			[Mapa com os locais com cinzas e aeroportos]
 * @param  {[type]} aeroportosAtingidos [Contador de aeroportos atingidos]
 * @return {[type]}         			[Mapa com as novas áreas com cinzas]
 */
function leituraFumaca(pMatriz, pAeroportosAtingidos)
{
	var nuvens = [];
	var largura = pMatriz[0].length;
	var altura = pMatriz.length;

	for (var i = 0; i < pMatriz.length; i++) {
		for (var j = 0; j < pMatriz[i].length; j++) {
			if(pMatriz[i][j] == "*"){
				nuvens.push({col:j, lin:i});
			}
		}
	}
	
	for (var i = 0; i < nuvens.length; i++) {
		if(nuvens[i].lin - 1 >= 0 && pMatriz[nuvens[i].lin - 1][nuvens[i].col] != "*")
		{
			if(pMatriz[nuvens[i].lin - 1][nuvens[i].col] == "A")
				pAeroportosAtingidos++;
			pMatriz[nuvens[i].lin - 1][nuvens[i].col] = "*";
		}	
		if(nuvens[i].col - 1 >= 0 && pMatriz[nuvens[i].lin][nuvens[i].col - 1] != "*")
		{
			if(pMatriz[nuvens[i].lin][nuvens[i].col - 1] == "A")
				pAeroportosAtingidos++; 
			pMatriz[nuvens[i].lin][nuvens[i].col - 1] = "*";
		}	
		if((nuvens[i].col + 1) < largura && pMatriz[nuvens[i].lin][(nuvens[i].col + 1)] != "*")
		{
			if(pMatriz[nuvens[i].lin][(nuvens[i].col + 1)] == "A")
				pAeroportosAtingidos++; 
			pMatriz[nuvens[i].lin][(nuvens[i].col + 1)] = "*";
		}	
		if((nuvens[i].lin + 1) < altura && pMatriz[(nuvens[i].lin + 1)][nuvens[i].col] != "*")
		{
			if(pMatriz[(nuvens[i].lin + 1)][nuvens[i].col] == "A")
				pAeroportosAtingidos++;
			pMatriz[(nuvens[i].lin + 1)][nuvens[i].col] = "*";
		}	
	}	

	return [pMatriz,pAeroportosAtingidos];
}

/**
 * Função para imprimir a matriz em uma tabela
 * @param  {[type]} pMatriz [Mapa com as informações carregadas]
 * @return {[type]}         [Tag HTML da tabela da matriz]
 */
function printMapa(pMatriz)
{
	var table = $("<table></table>");
	for (var i = 0; i < pMatriz.length; i++) {
		var line = $("<tr></tr>");
		for (var j = 0; j < pMatriz[i].length; j++) {
			line.append($("<td style='width: 30px; text-align: center; border: solid 1px #f9f9f9;'></td>").html(pMatriz[i][j]));
		}
		table.append(line);
	}
	return table;
}