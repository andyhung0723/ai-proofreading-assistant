import { Component } from '@angular/core';
import { EditorComponent } from './features/editor/editor.component';
import { SidePanelComponent } from './features/side-panel/side-panel.component';
import { ToolbarComponent } from './features/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  imports: [ToolbarComponent, EditorComponent, SidePanelComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'AI 逐字稿校正助手';
}
