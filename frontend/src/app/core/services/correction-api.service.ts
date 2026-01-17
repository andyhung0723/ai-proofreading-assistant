import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  FixTextRequest,
  FixTextResponse,
  TranslateTextRequest,
  TranslateTextResponse,
} from '../../models/correction.model';

@Injectable({
  providedIn: 'root',
})
export class CorrectionApiService {
  private http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;

  public fixText(request: FixTextRequest): Observable<FixTextResponse> {
    return this.http.post<FixTextResponse>(
      `${this.apiUrl}/api/correction/fix`,
      request,
    );
  }

  public translateText(
    request: TranslateTextRequest,
  ): Observable<TranslateTextResponse> {
    return this.http.post<TranslateTextResponse>(
      `${this.apiUrl}/api/correction/translate`,
      request,
    );
  }
}
