import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CorrectionApiService } from '../../core/services/correction-api.service';
import { AppStateService } from '../../signals/app-state.service';

@Component({
  selector: 'app-toolbar',
  imports: [CommonModule],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  public readonly state = inject(AppStateService);
  private readonly api = inject(CorrectionApiService);

  public async startCorrection(): Promise<void> {
    if (!this.state.canStartCorrection()) {
      return;
    }

    this.state.setAppStatus('correcting');

    try {
      const response = await firstValueFrom(
        this.api.fixText({
          text: this.state.originalText(),
          customInstruction: this.state.customInstruction() || undefined,
        }),
      );

      if (response) {
        this.state.setCorrectedText(response.correctedText);
        this.state.setAppStatus('review');
      }
    } catch (error) {
      console.error('校正失敗', error);
      alert('校正失敗，請稍後再試');
      this.state.setAppStatus('input');
    }
  }

  public async translate(): Promise<void> {
    if (!this.state.canTranslate()) {
      return;
    }

    try {
      const response = await firstValueFrom(
        this.api.translateText({
          finalText: this.state.finalText(),
        }),
      );

      if (response) {
        this.state.setTranslatedText(response.translatedText);
        this.state.setAppStatus('translated');
      }
    } catch (error) {
      console.error('翻譯失敗', error);
      alert('翻譯失敗，請稍後再試');
    }
  }

  public reset(): void {
    if (confirm('確定要重置所有內容嗎？')) {
      this.state.reset();
    }
  }

  public exportFinal(): void {
    const text = this.state.finalText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'corrected-text.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  public getStatusText(): string {
    const status = this.state.appStatus();
    switch (status) {
      case 'input':
        return '輸入模式';
      case 'correcting':
        return '校正中...';
      case 'review':
        return '審閱模式';
      case 'translated':
        return '翻譯完成';
      default:
        return '';
    }
  }

  public getStatusColor(): string {
    const status = this.state.appStatus();
    switch (status) {
      case 'input':
        return 'bg-gray-500';
      case 'correcting':
        return 'bg-blue-500';
      case 'review':
        return 'bg-green-500';
      case 'translated':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  }
}
