import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle',
  imports: [CommonModule],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent {
  viewTypes: InputSignal<{ label: string; value: 'grid' | 'list' }[]> =
    input.required();
  activeViewType: InputSignal<{ label: string; value: 'grid' | 'list' }> =
    input.required();
  toggleViewType: OutputEmitterRef<{ label: string; value: 'grid' | 'list' }> =
    output();
}
