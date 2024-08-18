import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HtmlDecoder {
  public htmlEntityDecode(encodedString: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(encodedString, 'text/html');
    return doc.documentElement.textContent || '';
  }
}
