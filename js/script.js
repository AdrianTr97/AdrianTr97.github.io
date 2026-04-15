// Importações
import ehUmCPF from "./valida-cpf.js";
import ehUmaIdadeValida from "./valida-idade.js";
import ehUmEmailValido from "./valida-email.js";
import ehUmaIdadeValida from "./valida-idade.js";

// Arrays

const btnTema = document.querySelector("#btn-tema");

// Seletores
// Função para aplicar o tema (REQUISITO: anonymous function)
const alternarTema = function() {
    const corpo = document.querySelector("body");
    const cards = document.querySelectorAll(".projeto-card, .tech-category, aside, form, .form"); // REQUISITO: querySelectorAll
    
    // Pega o estado atual (REQUISITO: getAttribute/setAttribute)
    const temaAtual = corpo.getAttribute("data-tema");

    if (temaAtual === "escuro") {
        corpo.setAttribute("data-tema", "claro");
        corpo.classList.replace("bg-gray-900", "bg-gray-50");
        corpo.classList.replace("text-white", "text-gray-900");
        
        // REQUISITO: forEach e arrowFunction para atualizar os cards/caixas
        cards.forEach(card => {
            card.classList.replace("bg-gray-800", "bg-white");
            card.classList.replace("text-white", "text-gray-900");
        });
        localStorage.setItem("tema", "claro");
    } else {
        corpo.setAttribute("data-tema", "escuro");
        corpo.classList.replace("bg-gray-50", "bg-gray-900");
        corpo.classList.replace("text-gray-900", "text-white");
        
        cards.forEach(card => {
            card.classList.replace("bg-white", "bg-gray-800");
            card.classList.replace("text-gray-900", "text-white");
        });
        localStorage.setItem("tema", "escuro");
    }
};

// REQUISITO: addEventListener
btnTema.addEventListener("click", alternarTema);

// Verifica se já existia uma preferência salva ao carregar a página
if (localStorage.getItem("tema") === "escuro") {
    alternarTema(); 
}


// --- PARTE 2: VALIDAÇÃO DE FORMULÁRIO ---
const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

const mensagens = {
    nome: { valueMissing: "O nome é obrigatório.", tooShort: "Nome muito curto." },
    email: { valueMissing: "O e-mail é obrigatório.", typeMismatch: "E-mail inválido." },
    cpf: { valueMissing: "O CPF é obrigatório.", patternMismatch: "Formato de CPF inválido.", customError: "Este CPF não existe.", tooShort: "CPF incompleto." },
    nascimento: { valueMissing: "Data de nascimento obrigatória.", customError: "Você deve ter mais de 18 anos." }
};

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", (e) => e.preventDefault());
});

function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');

    if (campo.name == "cpf" && campo.value.length >= 11) ehUmCPF(campo);
    if (campo.name == "nascimento" && campo.value != "") ehUmaIdadeValida(campo);

    const tiposDeErro = ['valueMissing', 'typeMismatch', 'patternMismatch', 'tooShort', 'customError'];
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro] || "Campo inválido.";
        }
    });

    // REQUISITO: nextElementSibling para pegar o <span> de erro
    const elementoErro = campo.nextElementSibling; 
    
    if (!campo.checkValidity()) {
        // REQUISITO: innerHTML
        elementoErro.innerHTML = mensagem;
        elementoErro.classList.remove('hidden');
    } else {
        elementoErro.innerHTML = "";
        elementoErro.classList.add('hidden');
    }
}