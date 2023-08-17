
class Forca{

    palavras = [
    "ABACAXI    "
    ,"ACEROLA"
    ,"AÇAÍ"
    ,"ARAÇA"
    ,"ABACATE"
    ,"BACABA"
    ,"BACURI"
    ,"BANANA"
    ,"CAJÁ"
    ,"CAJÚ"
    ,"CARAMBOLA"
    ,"CUPUAÇU"
    ,"GRAVIOLA"
    ,"GOIABA"
    ,"JABUTICABA"
    ,"JENIPAPO"
    ,"MAÇÃ"
    ,"MANGABA"
    ,"MANGA"
    ,"MARACUJÁ"
    ,"MURICI"
    ,"PEQUI"
    ,"PITANGA"
    ,"PITAYA"
    ,"SAPOTI"
    ,"TANGERINA"
    ,"UMBU"
    ,"UVA"
    ,"UVAIA"
    ,"ABACATE"
    
    ];
    palavraAtual = "";
    letrasAdivinhadas = [];
    erros = 0;
    imagens = document.querySelector("#imagem img");
    jogo = document.getElementById("container");
    final = document.getElementById("final");
    botaoReiniciar = document.getElementById("btnReiniciar");
    palavraFinal = document.getElementById("palavra-final");
    mensagem = document.getElementById("mensagem");
    venceu = false;
    exibicaoPalavra = "";
    constructor(){

      this.escolherPalavra();
      this.atualizarExibicao();
      this.criarTeclado();
  
    }

   escolherPalavra() {
    this.palavraAtual = this.palavras[Math.floor(Math.random() * this.palavras.length)];
  }

  exibirImagem() {
    this.imagens.src = `img/error${this.erros}.png`;
    
  }

  atualizarExibicao() {
       this.exibicaoPalavra = "";
      for (const letra of this.palavraAtual) {
        if (this.letrasAdivinhadas.includes(letra)) {
          this.exibicaoPalavra += letra;
        } else {
          this.exibicaoPalavra += "_";
        }
        this.exibicaoPalavra += " "; // Adiciona um espaço entre as letras
      }
      document.getElementById("exibicao-palavra").textContent = this.exibicaoPalavra;
    }
    
  atualizarTentativas() {
    document.getElementById("tentativas-atuais").textContent = this.erros;
    
  }

  criarTeclado() {
    const teclado = document.getElementById("teclado");
    teclado.innerHTML = ""; // Limpa o teclado antes de recriá-lo
    for (let i = 65; i <= 90; i++) {
      const letra = String.fromCharCode(i);
      const botao = document.createElement("button");
      botao.className = "botao";
      botao.textContent = letra;
      botao.addEventListener("click", () => this.adivinharLetra(letra));
      teclado.appendChild(botao);
    }
  }

  adivinharLetra(letra) {
    if (this.letrasAdivinhadas.includes(letra)) {
      return;
    }
    this.letrasAdivinhadas.push(letra);
    if (!this.palavraAtual.includes(letra)) {
      this.erros++;
      this.exibirImagem();
    }
    this.atualizarExibicao();
    this.atualizarTentativas();
    
    if (this.erros === 6) {
      this.venceu = false;
      this.fimDoJogo();
    }

    if(!this.exibicaoPalavra.includes("_")){
        this.venceu = true;
        this.fimDoJogo();
    }
  }

  fimDoJogo() {

    if(this.venceu){
      this.mensagem.textContent = "Parabéns, você venceu!";
    }else{
      this.mensagem.textContent = "Você perdeu!";
    }
    this.jogo.hidden = true;
    this.final.hidden = false;
    this.botaoReiniciar.addEventListener("click",()=> this.reiniciarJogo());
    this.palavraFinal.textContent = this.palavraAtual;   
  
   
  }

  reiniciarJogo() {
 
    this.letrasAdivinhadas = [];
    this.erros = 0;
    this.exibirImagem();
    this.escolherPalavra();
    this.atualizarExibicao();
    this.atualizarTentativas();
    this.criarTeclado(); // Chama a função para recriar o teclado
    this.jogo.hidden = false;
    this.final.hidden = true;
  }


}

window.addEventListener("load", ()=> new Forca())