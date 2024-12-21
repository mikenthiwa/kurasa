import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-search',
  imports: [MatFormFieldModule, MatInput, FormsModule],
  templateUrl: './custom-search.component.html',
  styleUrl: './custom-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSearchComponent {
  searchTerm = output<string>();

  search(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm.emit(inputElement.value);
  }
}
