import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

// Modules
import { CoreModule } from '../../../core/modules/core.module';
import { PrimeNgModule } from '../../../core/modules/prime-ng.module';

// Services
import { AppService } from '../../../core/services/app.service';
import { ForceD3, IOptionsXY } from '../../../core/services/math/d3-force';
import { PdfService } from '../../../core/services/pdf.service';

// Pipes
import { SetPipe } from '../../../core/pipes/set.pipe';

// Interfaces & Models
import { Apex } from '../../../core/models/math/apex';
import { Color } from '../../../core/models/math/color';
import { Edge } from '../../../core/models/math/edge';
import { Graph } from '../../../core/models/math/graph';
import { IChild } from '../../../core/interfaces/math/ichild';
import { ISelect } from '../../../core/interfaces/iselect';

// Enums & Constants
import { ADELA, ADELA_COUPLE, ADELA_COUPLE_ID, ADELA_ID, ALONDRA, ALONDRA_COUPLE, ALONDRA_COUPLE_ID, ALONDRA_ID,
  ANABEL, ANABEL_COUPLE, ANABEL_COUPLE_ID, ANABEL_ID, BARBARA, BARBARA_COUPLE, BARBARA_COUPLE_ID, BARBARA_ID, BERTHA,
  BERTHA_COUPLE, BERTHA_COUPLE_ID, BERTHA_ID, CONDESA, CONDESA_ID, CONDE_MAYOR, CONDE_MAYOR_ID,
  CONDE_MENOR, CONDE_MENOR_ID, DUQUESA, DUQUESA_ID, EDGES, ENRIQUE, ENRIQUE_COUPLE, ENRIQUE_COUPLE_ID,
  ENRIQUE_ID, ESTEBAN, ESTEBAN_COUPLE, ESTEBAN_COUPLE_ID, ESTEBAN_ID, NODES
} from '../../../core/constants/math/math';
import { D3RadialTreeComponent } from '../../../core/components/d3/radial/d3-radial-tree.component';

const APEXES: Apex[] = [
  new Apex({ id: 1, alias: CONDESA_ID, name: CONDESA, blackList: [CONDE_MAYOR_ID, CONDE_MENOR_ID] }),
  new Apex({ id: 2, alias: CONDE_MAYOR_ID, name: CONDE_MAYOR, blackList: [CONDESA_ID, CONDE_MENOR_ID] }),
  new Apex({ id: 3, alias: ANABEL_ID, name: ANABEL, blackList: [CONDE_MENOR_ID, BERTHA_ID, ENRIQUE_ID] }),
  new Apex({ id: 4, alias: BARBARA_ID, name: BARBARA, blackList: [CONDE_MAYOR_ID, ADELA_ID] }),
  new Apex({ id: 5, alias: ADELA_COUPLE_ID, name: ADELA_COUPLE, blackList: [CONDE_MENOR_ID] }),
  new Apex({ id: 6, alias: BERTHA_COUPLE_ID, name: BERTHA_COUPLE, blackList: [CONDE_MAYOR_ID, ADELA_ID] }),
  new Apex({ id: 7, alias: ADELA_ID, name: ADELA, blackList: [CONDE_MENOR_ID] }),
  new Apex({ id: 8, alias: DUQUESA_ID, name: DUQUESA, blackList: [
    ADELA_COUPLE_ID, ALONDRA_COUPLE_ID, ANABEL_COUPLE_ID,
    BARBARA_COUPLE_ID, BERTHA_COUPLE_ID,
    ENRIQUE_COUPLE_ID, ESTEBAN_COUPLE_ID
  ] }),
  new Apex({ id: 9, alias: ENRIQUE_COUPLE_ID, name: ENRIQUE_COUPLE, blackList: [ESTEBAN_ID] }),
  new Apex({ id: 10, alias: ENRIQUE_ID, name: ENRIQUE, blackList: [ESTEBAN_ID] }),
  new Apex({ id: 11, alias: ESTEBAN_COUPLE_ID, name: ESTEBAN_COUPLE, blackList: [ENRIQUE_ID] }),
  new Apex({ id: 12, alias: BARBARA_COUPLE_ID, name: BARBARA_COUPLE, blackList: [CONDE_MAYOR_ID, ADELA_ID] }),
  new Apex({ id: 13, alias: ALONDRA_ID, name: ALONDRA, blackList: [CONDE_MENOR_ID, BARBARA_ID, ESTEBAN_ID] }),
  new Apex({ id: 14, alias: ESTEBAN_ID, name: ESTEBAN, blackList: [ENRIQUE_ID] }),
  new Apex({ id: 15, alias: CONDE_MENOR_ID, name: CONDE_MENOR, blackList: [CONDESA_ID, CONDE_MAYOR_ID] }),
  new Apex({ id: 16, alias: ALONDRA_COUPLE_ID, name: ALONDRA_COUPLE, blackList: [CONDE_MENOR_ID, BARBARA_ID, ESTEBAN_ID] }),
  new Apex({ id: 17, alias: ANABEL_COUPLE_ID, name: ANABEL_COUPLE, blackList: [CONDE_MENOR_ID, BERTHA_ID, ENRIQUE_ID] }),
  new Apex({ id: 18, alias: BERTHA_ID, name: BERTHA, blackList: [CONDE_MAYOR_ID, ADELA_ID] })
];

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.html',
  styleUrls: ['./graphs.css'],
  providers: [ConfirmationService, MessageService, AppService, PdfService, SetPipe],
  imports: [CoreModule, PrimeNgModule, D3RadialTreeComponent],
})
export class Graphs implements OnInit {
  set = inject(SetPipe);

  @ViewChild('htmlContent', { static: false }) htmlContent: ElementRef;

  graph = new Graph();
  calculations: ISelect[] = [
    {
      label: 'Orden original de los invitados (1, 2, 3, ..., 18)',
      value: 0,
      inactive: false
    },
    {
      label: 'Orden aleatorio de los invitados',
      value: 1,
      inactive: false
    }
  ];

  controls = {
    isRandom: new FormControl(false)
  };

  search = new FormControl('');

  form = new FormGroup({ ...this.controls });

  options: IOptionsXY = { width: 800, height: 600 };
  forcesGraph = new ForceD3([], [], { width: 400, height: 320});

  constructor(
    public appService: AppService,
    public pdfService: PdfService,
    public elementRef: ElementRef
  ) {
    this.htmlContent = elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.appService.process.start('Loading...');

    this.graph.apexes = APEXES;

    this.getTables();
    this.updateTreeData();

    this.appService.process.stop();
  }

  get edges(): any[] {
    return EDGES ;
  }

  get nodes(): any[] {
    return NODES;
  }

  getColor = (color: string): string => {
    return this.getColor(color);
  }

  getRandomApexes = (): void => {
    this.graph.apexes = [];

    while (this.graph.apexes.length < APEXES.length) {
      const index = Math.round(Math.random() * (APEXES.length - 1)),
          apex = APEXES[index];

      if (!this.graph.apexes.find(a => a.id === apex.id)) {
        this.graph.apexes.push(apex);
      }

      // console.info('index', index, apex, this.graph.apexes.length);
    }
  }

  getTables = (): void => {
    this.graph.edges = [];
    this.graph.colors = [];

    this.graph.apexes.forEach(apex => {
      this.graph.apexes.forEach(relativeApex => {
        if (apex.id !== relativeApex.id && apex.inBlackList(relativeApex.alias)) {
          this.graph.edges.push(new Edge({ start: apex, end: relativeApex }));
        }
      });
    });

    this.graph.apexes.forEach(apex => {
      let apexAdded = false;

      if (this.graph.colors.length > 0) {
        this.graph.colors.forEach(color => {
          if (!apexAdded && !color.inApexes(apex) && !color.inApexBlackList(apex) && !color.inSomeBlackList(apex)) {
            // console.info(`new Apex in Color: ${color.id} ${color.name}`, apex.id, apex.alias);
            color.apexes.push(apex);
            apexAdded = true;
          }
        });

        if (!apexAdded) {
          // console.info(`new Color: ${this.graph.colors.length + 1}`, apex.id, apex.alias);
          this.graph.colors.push(new Color({ id: this.graph.colors.length + 1, name: '', apexes: [apex] }));
        }
      } else {
        // console.info('colors = 0', apex.id, apex.alias);
        this.graph.colors.push(new Color({ id: this.graph.colors.length + 1, name: '', apexes: [apex] }));
      }
    });

    this.graph.defineColor();
  }

  mapColorApex = (index: number): string[] => {
    return this.graph.colors[index].apexes.map(a => a.name);
  }

  onCalculate = (isRandom: boolean): void => {
    this.appService.process.start('In process... A moment, please');
    this.controls.isRandom.setValue(isRandom);

    setTimeout(() => {
      if (!isRandom) {
        this.getRandomApexes();
      } else {
        this.graph.apexes = APEXES;
      }

      this.getTables();
      this.updateTreeData();

      this.appService.process.stop();
    }, 1000);
  }

  onClickPrint = (): void => {
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
  }

  updateTreeData = (): void => {
    this.graph.tree = {
      name: 'Guests',
      value: 18,
      type: 'black',
      level: 'maroon',
      children: this.graph.colors.map(color => {
        return {
          name: `Table ${color.id}`,
          value: 12,
          type: 'black',
          level: color.name,
          children: color.apexes.map(apex => {
            return {
              name: apex.name,
              value: 6,
              type: 'gray',
              level: color.name
            }
          })
        }
      })
    } as IChild;
  }
}
