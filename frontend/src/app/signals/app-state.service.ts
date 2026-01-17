import { computed, Injectable, signal } from '@angular/core';
import { diffChars } from 'diff';
import { AppStatus, DiffChange } from '../models/correction.model';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  // Signals
  public readonly originalText = signal<string>('');
  public readonly correctedText = signal<string>('');
  public readonly translatedText = signal<string>('');
  public readonly diffChanges = signal<DiffChange[]>([]);
  public readonly acceptedChanges = signal<Map<number, boolean>>(new Map());
  public readonly appStatus = signal<AppStatus>('input');
  public readonly customInstruction = signal<string>('');

  // Computed
  public readonly isTextValid = computed(() => {
    const text = this.originalText();
    return text.length > 0 && text.length <= 1000;
  });

  public readonly characterCount = computed(() => this.originalText().length);

  public readonly canStartCorrection = computed(() => {
    return this.isTextValid() && this.appStatus() === 'input';
  });

  public readonly canTranslate = computed(() => {
    return this.appStatus() === 'review';
  });

  public readonly finalText = computed(() => {
    const changes = this.diffChanges();
    const accepted = this.acceptedChanges();
    let result = '';

    changes.forEach((change, index) => {
      if (change.removed) {
        // 如果是刪除的內容，檢查是否被拒絕（保留原文）
        if (accepted.get(index) === false) {
          result += change.value;
        }
      } else if (change.added) {
        // 如果是新增的內容，檢查是否被接受
        if (accepted.get(index) === true) {
          result += change.value;
        }
      } else {
        // 未改變的內容直接加入
        result += change.value;
      }
    });

    return result;
  });

  // Methods
  public calculateDiff(original: string, corrected: string): void {
    const diff = diffChars(original, corrected);
    this.diffChanges.set(diff as DiffChange[]);

    // 初始化所有變更為未處理狀態
    const newAcceptedMap = new Map<number, boolean>();
    diff.forEach((change, index) => {
      if (change.added) {
        // 預設接受所有新增
        newAcceptedMap.set(index, true);
      } else if (change.removed) {
        // 預設接受所有刪除（不保留原文）
        newAcceptedMap.set(index, true);
      }
    });
    this.acceptedChanges.set(newAcceptedMap);
  }

  public acceptChange(index: number): void {
    const newMap = new Map(this.acceptedChanges());
    newMap.set(index, true);
    this.acceptedChanges.set(newMap);
  }

  public rejectChange(index: number): void {
    const newMap = new Map(this.acceptedChanges());
    newMap.set(index, false);
    this.acceptedChanges.set(newMap);
  }

  public toggleChange(index: number): void {
    const current = this.acceptedChanges().get(index);
    if (current === true) {
      this.rejectChange(index);
    } else {
      this.acceptChange(index);
    }
  }

  public setOriginalText(text: string): void {
    this.originalText.set(text);
  }

  public setCorrectedText(text: string): void {
    this.correctedText.set(text);
    this.calculateDiff(this.originalText(), text);
  }

  public setTranslatedText(text: string): void {
    this.translatedText.set(text);
  }

  public setAppStatus(status: AppStatus): void {
    this.appStatus.set(status);
  }

  public setCustomInstruction(instruction: string): void {
    this.customInstruction.set(instruction);
  }

  public reset(): void {
    this.originalText.set('');
    this.correctedText.set('');
    this.translatedText.set('');
    this.diffChanges.set([]);
    this.acceptedChanges.set(new Map());
    this.appStatus.set('input');
    this.customInstruction.set('');
  }
}
