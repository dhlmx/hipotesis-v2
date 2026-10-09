import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, from, map, Observable, of } from 'rxjs';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

// Modules
import { CoreModule } from '../../../core/modules/core.module';
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services & Utilities
import { AppService } from '../../../core/services/app.service';
import { PdfService } from '../../../core/services/pdf.service';

// Interfaces & Models
import { INAIVE_BAYES_LOG, INaiveBayesLog } from '../../../core/interfaces/ml/inaive-bayes-log';
import { INAIVE_BAYES_TEST, INaiveBayesTest } from '../../../core/interfaces/ml/inaive-bayes-test';
import { NaiveBayesAlgorithm } from '../../../core/models/ml/naive-bayes-algorithm';

// Enums & Constants
import { APP_TITLE } from '../../../core/constants/general';
import { CONTROL_EPSILON as EPSILON, CONTROL_RARE_TOKEN_WEIGHT as WEIGHT } from '../../../core/constants/ml/naive-bayes/data';

@Component({
  selector: 'app-naive-bayes',
  templateUrl: './naive-bayes.html',
  styleUrl: './naive-bayes.css',
  providers: [HttpClient],
  imports: [CoreModule, PrimeNgModule],
})
export class NaiveBayes implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly documentStyle = getComputedStyle(document.documentElement);
  private textColor = '';
  private textColorSecondary = '';
  private surfaceBorder = '';

  epsilon = EPSILON;
  weight = WEIGHT;

  controls: {
    epsilon: FormControl,
    weight: FormControl
  } = {
    epsilon: new FormControl(EPSILON.value,
      [Validators.required, Validators.min(EPSILON.min), Validators.max(EPSILON.max), Validators.minLength(EPSILON.minLength), Validators.maxLength(EPSILON.maxLength)]),
    weight: new FormControl(WEIGHT.value,
      [Validators.required, Validators.min(WEIGHT.min), Validators.max(WEIGHT.max), Validators.minLength(WEIGHT.minLength), Validators.maxLength(WEIGHT.maxLength)])
  };

  form = new FormGroup({
    ...this.controls
  });

  naiveBayes = new NaiveBayesAlgorithm();

  constructor(
    public readonly appService: AppService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly pdfService: PdfService
  ) {
    this.appService.setTitle(APP_TITLE, 'Naive-Bayes Classifier');
    this.appService.process.start('Loading...');

    if (isPlatformBrowser(this.platformId)) {
      this.textColor = this.documentStyle.getPropertyValue('--p-text-color');
      this.textColorSecondary = this.documentStyle.getPropertyValue('--p-text-muted-color');
      this.surfaceBorder = this.documentStyle.getPropertyValue('--p-content-border-color');
    } else {
      this.textColor = '#000000';
      this.textColorSecondary = '#000000';
      this.surfaceBorder = '#000000';
    }

    this.appService.process.stop();
  }

  ngOnInit(): void {
    this.initialize();
  }

  get fileURL(): string {
    return this.appService.fileURL;
  }

  get fileSize(): string {
    return this.appService.fileSize;
  }

  onPredict(isNeutral: boolean = false): void {
    if (!this.naiveBayes.isTrained) {
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'It is necessary to train the model first...'});
      return;
    }

    if (this.naiveBayes.tests.length > 0) {
      this.naiveBayes.tests.splice(0, this.naiveBayes.tests.length);
    }

    this.appService.process.setSteps(1, 2);
    this.appService.process.start('Predicting the tests data...');

    if (isNeutral) {
      this.neutralTest().subscribe({
        complete: () => {
          this.appService.process.start('Creating download file (results)...');
          this.summaryTest();

          setTimeout(() => {
            this.appService.createDataJson(this.naiveBayes.info());
            this.appService.process.stop();
          }, 2400);
        }
      });
    } else {
      this.test().subscribe({
        complete: () => {
          this.summaryTest();
          this.appService.process.resetSteps();
          this.appService.process.start('Creating download file (results)...');

          setTimeout(() => {
            this.appService.createDataJson(this.naiveBayes.info());
            this.appService.process.stop();
          }, 2400);
        }
      });
    }
  };

  onPrint = (): void => {
    this.appService.process.start('Printing...');

    this.pdfService.exportPDF('htmlContent', 'resultados').subscribe({
      next: (status) => {
        console.info('exportPDF', status);
      },
      error: (e) => {
        console.info('exportPDF:ERROR', e);
      },
      complete: () => {
        this.appService.process.stop();
      }
    });
  };

  onSave(): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de proceder?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.appService.process.start('Upload SQL File');
        this.appService.process.stop();
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'warn', summary: 'Información', detail: 'Operación no realizada'})
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelación', detail: 'Operación cancelada'})
            break;
        }
      }
    });
  }

  onTrain(): void {
    if (this.naiveBayes.isTrained) {
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Model is trained already'});
      return;
    }

    this.appService.process.start('Training model...');
    this.appService.resetFile();
    this.appService.process.setSteps(1, 2);

    this.train().subscribe({
      complete: () => {
        this.naiveBayes.isTrained = true;
        this.appService.process.resetSteps();
        this.appService.process.stop();
      }
    });
  }

  // Private Methods
  private initialize = (): void => {
    this.appService.process.start('Loading initial data...');
    this.appService.process.stop();
  }

  private readonly manualTest = (): Observable<INaiveBayesTest> => {
    const tests = [
      { label: 'Negative', text: `i really hated this awful movie, it was so bad I didn't even know what to do with myself` },
      { label: 'Positive', text: `this was the best movie i've ever seen. it was so exciting, i was on the edge of my seat every minute` },
      { label: 'Positive', text: `i am indifferent about this` }
    ];

    return from(tests).pipe(
      map((test: { label: string, text: string }) => {
        this.naiveBayes.predict('', test.label, test.text, this.controls.epsilon.value, this.controls.weight.value);
        return this.naiveBayes.lastTest;
      }),
      catchError((err: any) => {
        console.error('negativeTest: ERROR', err);
        return of({ ...INAIVE_BAYES_TEST });
      })
    );
  };

  private readonly negativeTest = (): Observable<INaiveBayesTest> => {
    this.appService.process.setSteps(1);
    this.appService.process.start('Testing negative viewpoints');

    return this.http.get('data/test_negative.txt', { responseType: 'text' }).pipe(
      map((fileContent: string) => {
        this.naiveBayes.predict('test_negative.txt', 'Negative', fileContent, this.controls.epsilon.value, this.controls.weight.value);
        return this.naiveBayes.lastTest;
      }),
      catchError((err: any) => {
        console.error('negativeTest: ERROR', err);
        return of({ ...INAIVE_BAYES_TEST });
      })
    );
  };

  private readonly negativeTraining = (): Observable<INaiveBayesLog> => {
    this.appService.process.setSteps(1);
    this.appService.process.start('Training negative viewpoints');

    return this.http.get('data/train_negative.txt', { responseType: 'text' }).pipe(
      map((fileContent: string) => {
        this.naiveBayes.train('train_negative.txt', 'Negative', fileContent, this.controls.epsilon.value, this.controls.weight.value);
        return this.naiveBayes.lastLog;
      }),
      catchError((err: any) => {
        console.error('positiveTraining: ERROR', err);
        return of({ ...INAIVE_BAYES_LOG });
      })
    );
  };

  private readonly positiveTest = (): Observable<INaiveBayesTest> => {
    this.appService.process.setSteps(2);
    this.appService.process.start('Testing positive viewpoints');

    return this.http.get('data/test_positive.txt', { responseType: 'text' }).pipe(
      map((fileContent: string) => {
        this.naiveBayes.predict('test_positive.txt', 'Positive', fileContent, this.controls.epsilon.value, this.controls.weight.value);
        return this.naiveBayes.lastTest;
      }),
      catchError((err: any) => {
        console.error('positiveTest: ERROR', err);
        return of({ ...INAIVE_BAYES_TEST });
      })
    );
  };

  private readonly positiveTraining = (): Observable<INaiveBayesLog> => {
    this.appService.process.setSteps(2);
    this.appService.process.start('Training positive viewpoints');

    return this.http.get('data/train_positive.txt', { responseType: 'text' }).pipe(
      map((fileContent: string) => {
        this.naiveBayes.train('train_positive.txt', 'Positive', fileContent, this.controls.epsilon.value, this.controls.weight.value);
        return this.naiveBayes.lastLog;
      }),
      catchError((err: any) => {
        console.error('positiveTraining: ERROR', err);
        return of({ ...INAIVE_BAYES_LOG });
      })
    );
  };

  private readonly summaryTest = (): void => {
    const finalTest = this.naiveBayes.tests.reduce((previous, current) => {
      return {
        ...previous,
        total: previous.total + current.total,
        correct: previous.correct + current.correct,
        incorrect: previous.incorrect + current.incorrect,
        efficiency: (previous.correct + current.correct) / (previous.total + current.total) * 100
      };
    }, { filename: '', label: 'Summary', total: 0, correct: 0, incorrect: 0, efficiency: 0 });

    this.naiveBayes.tests.push(finalTest);
  };

  private neutralTest = (): Observable<{ neutral: INaiveBayesTest }> => {
    return forkJoin({ neutral: this.manualTest()});
  };

  private test = (): Observable<{negative: INaiveBayesTest, positive: INaiveBayesTest }> => {
    return forkJoin({ negative: this.negativeTest(), positive: this.positiveTest() });
  };

  private train = (): Observable<{negative: INaiveBayesLog, positive: INaiveBayesLog }> => {
    return forkJoin({
      negative: this.negativeTraining(),
      positive: this.positiveTraining()
    });
  };
}
