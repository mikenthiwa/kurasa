import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../../core/theme/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [MatSlideToggleModule, MatIconModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);
  isChecked: WritableSignal<boolean> = signal<boolean>(false);

  constructor() {
    this.setCurrentTheme();
  }

  setCurrentTheme() {
    const theme = this.themeService.getTheme();
    if (theme === 'dark-mode') {
      this.isChecked.set(true);
    } else {
      this.isChecked.set(false);
    }
  }

  toggleTheme() {
    this.isChecked.set(!this.isChecked());
    this.themeService.setTheme(this.isChecked() ? 'dark-mode' : 'light');
  }
}
