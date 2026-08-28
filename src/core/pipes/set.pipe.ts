import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'set'
})
export class SetPipe implements PipeTransform {

  transform(values: any[], ...args: unknown[]): string {
    return `{ ${values.join(', ')} }`;
  }

}
