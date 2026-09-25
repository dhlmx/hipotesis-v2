import { Injectable } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Process } from '../models/process';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private dataBlob: Blob = new Blob();
  private dataJson = '';
  private dataURL = '';
  process = new Process();

  constructor(
    private readonly meta: Meta,
    private readonly title: Title,
    private readonly jsonPipe: JsonPipe
  ) { }

  get fileSize(): string {
    if (this.dataBlob.size === 0) {
      return '';
    } else {
      return this.dataBlob.size > 1048576 ? `${Math.round(this.dataBlob.size / 1048576)} MB` : `${Math.round(this.dataBlob.size / 1024)} KB`;
    }
  }

  get fileURL(): string {
    return this.dataURL;
  }

  createDataJson = (data: any): void => {
    this.dataJson = this.jsonPipe.transform({ data });
    this.dataBlob = new Blob([this.dataJson], { type: 'application/json' });
    this.dataURL = window.URL.createObjectURL(this.dataBlob);
  }

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
