document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggleBtn = document.getElementById('darkModeToggle');
    

    if (localStorage.getItem('theme') === 'light') {
        body.classList.remove('dark-mode');
    }


    if (toggleBtn) {
        updateToggleText(toggleBtn);
        

        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
        
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            updateToggleText(toggleBtn);
        });
    }
});

function updateToggleText(btn) {
    const isDark = document.body.classList.contains('dark-mode');

    btn.innerText = isDark ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode";
}
