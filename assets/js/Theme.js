document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitch = document.getElementById('mode');
    const themeText = document.getElementById('theme');
  
    // Função para alternar o tema
    function switchTheme(e) {
      if (e.target.checked) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        themeText.textContent = 'Modo Escuro';
        localStorage.setItem('theme', 'dark'); // Salva o tema selecionado no localStorage
      } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        themeText.textContent = 'Modo Claro';
        localStorage.setItem('theme', 'light'); // Salva o tema selecionado no localStorage
      }
    }
  
    // Adiciona um event listener para o botão de alternância de tema
    toggleSwitch.addEventListener('change', switchTheme);
  
    // Verifica o tema atual ao carregar a página e configura o botão de alternância de acordo
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      document.body.classList.add('dark-theme');
      toggleSwitch.checked = true;
      themeText.textContent = 'Modo Escuro';
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      toggleSwitch.checked = false;
      themeText.textContent = 'Modo Claro';
    }
});
  