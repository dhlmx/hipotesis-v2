import { Injectable } from '@angular/core';
import { Process } from '../models/process';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  process = new Process();

  constructor(
    private readonly meta: Meta,
    private readonly title: Title
  ) { }

  setTitle = (title: string, subtitle: string): void => {
    this.title.setTitle(`${title} | ${subtitle}`)
  }

  setDescription = (description: string): void => {
    if (this.meta.getTag('name="description"')) {
      this.meta.updateTag({ name: 'description', content: description });
      return;
    }
    this.meta.addTag({ name: 'description', content: description });
  }

  setTag = (tag: string, content: string): void => {
    if (this.meta.getTag(`name="${tag}"`)) {
      this.meta.updateTag({ name: tag, content });
      return;
    }
    this.meta.addTag({ name: tag, content });
  }
}
