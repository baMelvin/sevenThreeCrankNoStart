import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diagnosticStepFormat'
})
export class DiagnosticStepFormatPipe implements PipeTransform {
  transform(value: string, stepNumber?: number): string {
    if (!value) return '';

    const keywords = ['Check', 'Test', 'Replace', 'Ensure', 'Disconnect'];
    const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');

    let formatted = value.replace(regex, '<strong>$1</strong>');

    return formatted;
  }
}
