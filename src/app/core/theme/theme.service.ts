import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

type Theme = 'dark-mode' | 'light';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  document = inject(DOCUMENT);

  constructor() {
    this.setTheme(this.getTheme());
  }

  setTheme(theme: Theme) {
    if (theme === 'dark-mode') {
      this.document.body.classList.add('dark-mode');
    } else {
      this.document.body.classList.remove('dark-mode');
    }
    this.setThemeToLocalStorage(theme);
  }

  setThemeToLocalStorage(theme: Theme) {
    localStorage.setItem('theme', theme);
  }

  getTheme(): Theme {
    return (localStorage.getItem('theme') as Theme) ?? 'light';
  }
}
