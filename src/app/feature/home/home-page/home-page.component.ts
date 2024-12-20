import { ChangeDetectionStrategy, Component, signal, Signal, WritableSignal } from '@angular/core';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ContactListViewComponent } from '../contact-list-view/contact-list-view.component';
import { HomeService } from '../../../core/home/home.service';
import { Contact } from '../../../core/home/models/contact.model';
import { ViewTypeModel } from '../../../core/home/models/view-type.model';
import { ToggleComponent } from '../../../ui/toggle/toggle.component';
import { ContactGridViewComponent } from '../contact-grid-view/contact-grid-view.component';

@Component({
  selector: 'app-home-page',
  imports: [ContactListViewComponent, ToggleComponent, ContactGridViewComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private homeService: HomeService = inject(HomeService);

  contacts: Signal<Contact[] | undefined> = toSignal(this.homeService.getContacts$());
  viewTypes: WritableSignal<ViewTypeModel[]> = signal([
    { label: 'List', value: 'list' },
    { label: 'Grid', value: 'grid' },
  ]);

  activeViewType: WritableSignal<ViewTypeModel> = signal(this.viewTypes()[0]);

  toggleViewType(viewType: ViewTypeModel) {
    this.activeViewType.set(viewType);
  }
}
