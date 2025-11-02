/**
 * Lista dostępnych motywów kolorystycznych
 */
export const themeNames = [
  'theme-light',
  'theme-dark',
  'theme-choco-mint',
  'theme-deep-sea',
  'theme-invisible',
  'theme-leet',
  'theme-neon-bliss',
  'theme-old-couch',
  'theme-peppermint',
  'theme-pop-punk',
  'theme-refresher',
  'theme-slime',
  'theme-syntax',
  'theme-vanilla'
];

/**
 * Funkcja pomocnicza do formatowania nazw motywów
 * @param {string} theme - Nazwa motywu (np. 'theme-choco-mint')
 * @returns {string} - Sformatowana nazwa (np. 'Choco Mint')
 */
export function formatThemeName(theme) {
  return theme
    .replace('theme-', '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Funkcja do zmiany motywu
 * @param {string} theme - Nazwa motywu do ustawienia
 */
export function setTheme(theme) {
  const target = document.documentElement;
  
  // Usuń wszystkie poprzednie motywy
  target.classList.forEach((className) => {
    if (className.startsWith('theme-') && className !== theme) {
      target.classList.remove(className);
    }
  });
  
  // Dodaj nowy motyw
  if (!target.classList.contains(theme)) {
    target.classList.add(theme);
  }
  
  // Zapisz w localStorage
  localStorage.setItem('theme', theme);
}

/**
 * Funkcja do wczytania zapisanego motywu
 * @returns {string} - Nazwa zapisanego motywu lub domyślny
 */
export function loadTheme() {
  if (typeof localStorage !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'theme-choco-mint';
  }
  return 'theme-choco-mint';
}