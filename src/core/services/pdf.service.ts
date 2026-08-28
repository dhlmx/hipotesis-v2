import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Observable, from, map, of } from 'rxjs';

// Interfaces && Models
import { IJsPdfOptions } from '../interfaces/jsPDF/IJsPdfOptions';

// Enums && Constants
import { jsPDFFormatEnum, jsPDFOrientationEnum, jsPDFUnitEnum } from '../enums/jsPDF.enum';
import { LETTER_HEIGHT_MM, LETTER_WIDTH_MM } from '../constants/paper';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  date = new Date();
  htmlContent: any;
  pdf: jsPDF = new jsPDF();
  canvasData = '';

  margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  };

  height = 0;
  width = 0;
  innerHeight = 0;
  innerWidth = 0;

  pdfOptions = {
    orientation: jsPDFOrientationEnum.Lanscape,
    unit: jsPDFUnitEnum.Milimeter,
    format: jsPDFFormatEnum.Letter,
    compressPdf: false
  } as IJsPdfOptions;

  exportPDF = (elementId: string, fileName: string): Observable<{ status: string }> => {
    this.htmlContent = document.getElementById(elementId);

    if (!this.htmlContent) {
      console.error('HTML Content not found!');
      return of({ status: 'ERROR: HTML Content not found!'});
    }

    console.info('Starting printing..');

    return from(html2canvas(this.htmlContent)).pipe(
      map(canvas => {
        console.info('Canvas in process..');
        this.canvasData = canvas.toDataURL('image/png');
        this.getImageSize(canvas.width, canvas.height);
        return new jsPDF(this.pdfOptions);
      }),
      map(pdf => {
        console.info('PDF in process..');
        this.pdf = pdf;
        this.pdf.addImage(this.canvasData, 'PNG', this.margin.left, this.margin.top, this.innerWidth, this.innerHeight);
        this.pdf.text(`Math® v2.0.0 | ${this.date.getUTCFullYear()}`, 10, 8);
        this.pdf.save(`${fileName}.pdf`);
        return { status: 'OK' };
      })
    );
  }

  getImageSize = (canvasWidth: number, canvasHeight: number): void => {
    if (canvasWidth > canvasHeight) {
      this.pdfOptions.orientation = jsPDFOrientationEnum.Lanscape;

      this.width = LETTER_HEIGHT_MM;
      this.height = LETTER_WIDTH_MM;
      this.innerWidth = this.width - this.margin.left - this.margin.right;
      this.innerHeight = (canvasHeight / canvasWidth) * this.innerWidth;
      this.margin.top = Math.floor((this.height - this.innerHeight) / 2);
      this.margin.bottom = this.margin.top;
    } else {
      this.pdfOptions.orientation = jsPDFOrientationEnum.Portrait;

      this.height = LETTER_HEIGHT_MM;
      this.width = LETTER_WIDTH_MM;
      this.innerHeight = this.height - this.margin.top - this.margin.bottom;
      this.innerWidth = (canvasWidth / canvasHeight) * this.innerHeight;
      this.margin.left = Math.floor((this.width - this.innerWidth) / 2);
      this.margin.right = this.margin.left;
    }
  }
}
