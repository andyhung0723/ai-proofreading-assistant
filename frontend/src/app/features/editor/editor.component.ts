import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppStateService } from '../../signals/app-state.service';

@Component({
    selector: 'app-editor',
    imports: [CommonModule],
    templateUrl: './editor.component.html'
})
export class EditorComponent {
  public readonly state = inject(AppStateService);

  public onTextInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.state.setOriginalText(target.value);
  }

  public onCustomInstructionInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.state.setCustomInstruction(target.value);
  }

  public toggleChange(index: number): void {
    this.state.toggleChange(index);
  }

  public isChangeAccepted(index: number): boolean {
    return this.state.acceptedChanges().get(index) === true;
  }

  public isChangeRejected(index: number): boolean {
    return this.state.acceptedChanges().get(index) === false;
  }
}
