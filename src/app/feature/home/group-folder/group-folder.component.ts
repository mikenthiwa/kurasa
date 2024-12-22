import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  WritableSignal,
  signal,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Folder } from '../../../core/home/models/folder.model';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-group-folder',
  imports: [
    MatListModule,
    MatIconModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatCheckbox,
  ],
  templateUrl: './group-folder.component.html',
  styleUrl: './group-folder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupFolderComponent {
  folderList: InputSignal<Folder[]> = input.required<Folder[]>();
  selectFolder: OutputEmitterRef<Folder> = output<Folder>();

  checked: WritableSignal<boolean> = signal(false);

  onSelectFolder(folder: Folder) {
    this.selectFolder.emit(folder);
    if (!folder.name) {
      this.checked.set(true);
      return;
    }
    if (this.checked()) this.checked.set(false);
  }
}
