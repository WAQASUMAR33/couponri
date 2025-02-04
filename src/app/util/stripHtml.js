// utils/stripHtml.js
export const stripHtml = (html) => {
    if (typeof window === 'undefined') return ''; // Ensure compatibility with SSR
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };
  