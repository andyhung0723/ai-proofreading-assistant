import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { AppStateService } from '../../signals/app-state.service';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-panel.component.html',
})
export class SidePanelComponent {
  public readonly state = inject(AppStateService);

  public readonly changes = computed(() => {
    const diffChanges = this.state.diffChanges();

    return diffChanges
      .map((change, index) => ({ change, index }))
      .filter(({ change }) => change.added || change.removed);
  });

  public readonly activeTab = computed(() => {
    return this.state.appStatus() === 'translated' ? 'translation' : 'changes';
  });

  public getChangeStatus(index: number): string {
    const accepted = this.state.acceptedChanges().get(index);
    if (accepted === true) {
      return '已接受';
    } else if (accepted === false) {
      return '已拒絕';
    }
    return '待處理';
  }

  public getChangeStatusColor(index: number): string {
    const accepted = this.state.acceptedChanges().get(index);
    if (accepted === true) {
      return 'text-green-600';
    } else if (accepted === false) {
      return 'text-red-600';
    }
    return 'text-gray-600';
  }
}
