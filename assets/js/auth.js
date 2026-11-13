// Autenticação SIMULADA (apenas front-end) para validar o fluxo de telas.
// Será substituída pelo login via API FastAPI com controle de acesso (RNF02).
(function(){
 const f=document.getElementById("login");if(!f)return;
 if(sessionStorage.getItem("capim_user"))location.replace("pages/planta.html");
 f.addEventListener("submit",e=>{
  e.preventDefault();
  const m=f.email.value.trim(),s=f.senha.value,out=document.getElementById("err");
  if(!/^\S+@\S+\.\S+$/.test(m)||s.length<4){out.textContent="Informe um e-mail válido e senha com ao menos 4 caracteres.";return}
  sessionStorage.setItem("capim_user",m);location.href="pages/planta.html";
 });
})();
