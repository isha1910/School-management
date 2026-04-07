import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true   // ⭐ IMPORTANT
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], search: string): any[] {
    if (!items) return [];

    if (!search) return items;

    return items.filter(i =>
      i.name.toLowerCase().includes(search.toLowerCase())
    );
  }

}