import { IColor } from '../../../interfaces/icolor';
import { IFormControl } from '../../../interfaces/iform-control';
import { IPerson } from '../../../interfaces/ml/iperson';

// Constants
export const COLORS: IColor[] = [
  { name: 'Black', hex: '#000000', rgb: [0, 0, 0] },
  { name: 'Gray', hex: '#808080', rgb: [128, 128, 128] },
  { name: 'Maroon', hex: '#800000', rgb: [128, 0, 0] },
  { name: 'Red', hex: '#FF0000', rgb: [255, 0, 0] },
  { name: 'Green', hex: '#008000', rgb: [0, 128, 0] },
  { name: 'Lime', hex: '#00FF00', rgb: [0, 255, 0] },
  { name: 'Olive', hex: '#808000', rgb: [128, 128, 0] },
  { name: 'Yellow', hex: '#FFFF00', rgb: [255, 255, 0] },
  { name: 'Navy', hex: '#000080', rgb: [0, 0, 128] },
  { name: 'Blue', hex: '#0000FF', rgb: [0, 0, 255] },
  { name: 'Purple', hex: '#800080', rgb: [128, 0, 128] },
  { name: 'Fuchsia', hex: '#FF00FF', rgb: [255, 0, 255] },
  { name: 'Teal', hex: '#008080', rgb: [0, 128, 128] },
  { name: 'Aqua', hex: '#00FFFF', rgb: [0, 255, 255] },
  { name: 'Silver', hex: '#C0C0C0', rgb: [192, 192, 192] },
  { name: 'Orange', hex: '#FFA500', rgb: [255, 165, 0] },
  { name: 'White', hex: '#FFFFFF', rgb: [255, 255, 255] },
],

HEIGHT: IFormControl = { value: 65.00, min: 1.00, max: 100.00, minLength: 1, maxLength: 6, step: 0.10 },

K: IFormControl = { value: 3, min: 1, max: 10, minLength: 1, maxLength: 2, step: 1 },

WEIGHT: IFormControl = { value: 150.00, min: 1.00, max: 900.00, minLength: 1, maxLength: 6, step: 0.10 };

// chart.js
export const K_NEAREST_NEIGHBOR_DATA: any = {
  labels: [],
  datasets: [
    {
      label: 'Female',
      data: [],
      backgroundColor: COLORS[2].hex,
      borderColor: COLORS[2].hex,
      pointRadius: 2
    },
    {
      label: 'Male',
      data: [],
      backgroundColor: COLORS[12].hex,
      borderColor: COLORS[12].hex,
      pointRadius: 2
    }
  ]
},

K_NEAREST_NEIGHBOR_CHART: any = {
  type: 'scatter',
  data: K_NEAREST_NEIGHBOR_DATA,
  options: {
    responsive: true,
    aspectRatio: 2,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#000000'
        }
      },
      title: {
        display: true,
        text: 'Weight and height of men and women',
        font: {
          size: 24
        }
      }
    },
    legend: {
      display: false
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Weight (pounds)'
        },
        ticks: {
          color: '#000000'
        },
        grid: {
          color: '#000000',
          drawBorder: false
        }
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Height (inches)'
        },
        ticks: {
          color: '#000000'
        },
        grid: {
          color: '#000000',
          drawBorder: false
        }
      }
    }
  }
};

// Data
export const PERSONS: IPerson[] = [
  {
    weight: 150,
    height: 67,
    genre: "Female"
  },
  {
    weight: 100,
    height: 67,
    genre: "Female"
  },
  {
    weight: 185,
    height: 62,
    genre: "Female"
  },
  {
    weight: 140,
    height: 62,
    genre: "Female"
  },
  {
    weight: 140,
    height: 68,
    genre: "Female"
  },
  {
    weight: 123,
    height: 64,
    genre: "Female"
  },
  {
    weight: 91,
    height: 59,
    genre: "Female"
  },
  {
    weight: 175,
    height: 59,
    genre: "Female"
  },
  {
    weight: 94,
    height: 59,
    genre: "Female"
  },
  {
    weight: 190,
    height: 63,
    genre: "Female"
  },
  {
    weight: 130,
    height: 66,
    genre: "Female"
  },
  {
    weight: 120,
    height: 63,
    genre: "Female"
  },
  {
    weight: 124,
    height: 68,
    genre: "Female"
  },
  {
    weight: 135,
    height: 64,
    genre: "Female"
  },
  {
    weight: 98,
    height: 64,
    genre: "Female"
  },
  {
    weight: 160,
    height: 67,
    genre: "Female"
  },
  {
    weight: 140,
    height: 67,
    genre: "Female"
  },
  {
    weight: 109,
    height: 60,
    genre: "Female"
  },
  {
    weight: 165,
    height: 63,
    genre: "Female"
  },
  {
    weight: 110,
    height: 63,
    genre: "Female"
  },
  {
    weight: 125,
    height: 60,
    genre: "Female"
  },
  {
    weight: 142,
    height: 66,
    genre: "Female"
  },
  {
    weight: 154,
    height: 65,
    genre: "Female"
  },
  {
    weight: 119,
    height: 62,
    genre: "Female"
  },
  {
    weight: 110,
    height: 63,
    genre: "Female"
  },
  {
    weight: 140,
    height: 63,
    genre: "Female"
  },
  {
    weight: 219,
    height: 64,
    genre: "Female"
  },
  {
    weight: 135,
    height: 66,
    genre: "Female"
  },
  {
    weight: 135,
    height: 62,
    genre: "Female"
  },
  {
    weight: 150,
    height: 63,
    genre: "Female"
  },
  {
    weight: 130,
    height: 66,
    genre: "Female"
  },
  {
    weight: 110,
    height: 61,
    genre: "Female"
  },
  {
    weight: 116,
    height: 62,
    genre: "Female"
  },
  {
    weight: 122,
    height: 63,
    genre: "Female"
  },
  {
    weight: 110,
    height: 66,
    genre: "Female"
  },
  {
    weight: 115,
    height: 62,
    genre: "Female"
  },
  {
    weight: 110,
    height: 64,
    genre: "Female"
  },
  {
    weight: 180,
    height: 68,
    genre: "Female"
  },
  {
    weight: 134,
    height: 63,
    genre: "Female"
  },
  {
    weight: 143,
    height: 65,
    genre: "Female"
  },
  {
    weight: 180,
    height: 68,
    genre: "Female"
  },
  {
    weight: 130,
    height: 65,
    genre: "Female"
  },
  {
    weight: 200,
    height: 65,
    genre: "Female"
  },
  {
    weight: 195,
    height: 65,
    genre: "Female"
  },
  {
    weight: 120,
    height: 63,
    genre: "Female"
  },
  {
    weight: 110,
    height: 64,
    genre: "Female"
  },
  {
    weight: 140,
    height: 67,
    genre: "Female"
  },
  {
    weight: 104,
    height: 66,
    genre: "Female"
  },
  {
    weight: 125,
    height: 63,
    genre: "Female"
  },
  {
    weight: 190,
    height: 68,
    genre: "Female"
  },
  {
    weight: 125,
    height: 65,
    genre: "Female"
  },
  {
    weight: 130,
    height: 62,
    genre: "Female"
  },
  {
    weight: 120,
    height: 62,
    genre: "Female"
  },
  {
    weight: 155,
    height: 63,
    genre: "Female"
  },
  {
    weight: 130,
    height: 65,
    genre: "Female"
  },
  {
    weight: 130,
    height: 64,
    genre: "Female"
  },
  {
    weight: 124,
    height: 61,
    genre: "Female"
  },
  {
    weight: 125,
    height: 66,
    genre: "Female"
  },
  {
    weight: 120,
    height: 66,
    genre: "Female"
  },
  {
    weight: 103,
    height: 62,
    genre: "Female"
  },
  {
    weight: 162,
    height: 65,
    genre: "Female"
  },
  {
    weight: 103,
    height: 58,
    genre: "Female"
  },
  {
    weight: 135,
    height: 63,
    genre: "Female"
  },
  {
    weight: 160,
    height: 68,
    genre: "Female"
  },
  {
    weight: 145,
    height: 67,
    genre: "Female"
  },
  {
    weight: 180,
    height: 67,
    genre: "Female"
  },
  {
    weight: 170,
    height: 60,
    genre: "Female"
  },
  {
    weight: 175,
    height: 66,
    genre: "Female"
  },
  {
    weight: 130,
    height: 64,
    genre: "Female"
  },
  {
    weight: 108,
    height: 64,
    genre: "Female"
  },
  {
    weight: 142,
    height: 66,
    genre: "Female"
  },
  {
    weight: 110,
    height: 64,
    genre: "Female"
  },
  {
    weight: 118,
    height: 65,
    genre: "Female"
  },
  {
    weight: 145,
    height: 61,
    genre: "Female"
  },
  {
    weight: 110,
    height: 63,
    genre: "Female"
  },
  {
    weight: 115,
    height: 65,
    genre: "Female"
  },
  {
    weight: 160,
    height: 66,
    genre: "Female"
  },
  {
    weight: 123,
    height: 62,
    genre: "Female"
  },
  {
    weight: 135,
    height: 65,
    genre: "Female"
  },
  {
    weight: 150,
    height: 60,
    genre: "Female"
  },
  {
    weight: 100,
    height: 61,
    genre: "Female"
  },
  {
    weight: 100,
    height: 62,
    genre: "Female"
  },
  {
    weight: 135,
    height: 62,
    genre: "Female"
  },
  {
    weight: 200,
    height: 64,
    genre: "Female"
  },
  {
    weight: 185,
    height: 62,
    genre: "Female"
  },
  {
    weight: 95,
    height: 64,
    genre: "Female"
  },
  {
    weight: 110,
    height: 65,
    genre: "Female"
  },
  {
    weight: 165,
    height: 67,
    genre: "Female"
  },
  {
    weight: 132,
    height: 65,
    genre: "Female"
  },
  {
    weight: 120,
    height: 64,
    genre: "Female"
  },
  {
    weight: 130,
    height: 63,
    genre: "Female"
  },
  {
    weight: 160,
    height: 59,
    genre: "Female"
  },
  {
    weight: 130,
    height: 64,
    genre: "Female"
  },
  {
    weight: 120,
    height: 61,
    genre: "Female"
  },
  {
    weight: 250,
    height: 66,
    genre: "Female"
  },
  {
    weight: 105,
    height: 61,
    genre: "Female"
  },
  {
    weight: 130,
    height: 64,
    genre: "Female"
  },
  {
    weight: 132,
    height: 63,
    genre: "Female"
  },
  {
    weight: 110,
    height: 66,
    genre: "Female"
  },
  {
    weight: 122,
    height: 65,
    genre: "Female"
  },
  {
    weight: 113,
    height: 64,
    genre: "Female"
  },
  {
    weight: 108,
    height: 60,
    genre: "Female"
  },
  {
    weight: 130,
    height: 60,
    genre: "Female"
  },
  {
    weight: 105,
    height: 60,
    genre: "Female"
  },
  {
    weight: 120,
    height: 61,
    genre: "Female"
  },
  {
    weight: 122,
    height: 65,
    genre: "Female"
  },
  {
    weight: 132,
    height: 69,
    genre: "Female"
  },
  {
    weight: 105,
    height: 67,
    genre: "Female"
  },
  {
    weight: 102,
    height: 61,
    genre: "Female"
  },
  {
    weight: 110,
    height: 61,
    genre: "Female"
  },
  {
    weight: 140,
    height: 70,
    genre: "Female"
  },
  {
    weight: 135,
    height: 67,
    genre: "Female"
  },
  {
    weight: 131,
    height: 65,
    genre: "Female"
  },
  {
    weight: 120,
    height: 64,
    genre: "Female"
  },
  {
    weight: 117,
    height: 63,
    genre: "Female"
  },
  {
    weight: 210,
    height: 59,
    genre: "Female"
  },
  {
    weight: 130,
    height: 66,
    genre: "Female"
  },
  {
    weight: 90,
    height: 63,
    genre: "Female"
  },
  {
    weight: 135,
    height: 64,
    genre: "Female"
  },
  {
    weight: 140,
    height: 63,
    genre: "Female"
  },
  {
    weight: 110,
    height: 62,
    genre: "Female"
  },
  {
    weight: 120,
    height: 64,
    genre: "Female"
  },
  {
    weight: 110,
    height: 61,
    genre: "Female"
  },
  {
    weight: 150,
    height: 65,
    genre: "Female"
  },
  {
    weight: 105,
    height: 64,
    genre: "Female"
  },
  {
    weight: 120,
    height: 63,
    genre: "Female"
  },
  {
    weight: 140,
    height: 64,
    genre: "Female"
  },
  {
    weight: 155,
    height: 68,
    genre: "Female"
  },
  {
    weight: 110,
    height: 59,
    genre: "Female"
  },
  {
    weight: 125,
    height: 63,
    genre: "Female"
  },
  {
    weight: 125,
    height: 63,
    genre: "Female"
  },
  {
    weight: 135,
    height: 65,
    genre: "Female"
  },
  {
    weight: 135,
    height: 68,
    genre: "Female"
  },
  {
    weight: 116,
    height: 64,
    genre: "Female"
  },
  {
    weight: 140,
    height: 65,
    genre: "Female"
  },
  {
    weight: 165,
    height: 66,
    genre: "Female"
  },
  {
    weight: 90,
    height: 60,
    genre: "Female"
  },
  {
    weight: 115,
    height: 64,
    genre: "Female"
  },
  {
    weight: 113,
    height: 62,
    genre: "Female"
  },
  {
    weight: 120,
    height: 62,
    genre: "Female"
  },
  {
    weight: 98,
    height: 63,
    genre: "Female"
  },
  {
    weight: 113,
    height: 66,
    genre: "Female"
  },
  {
    weight: 112,
    height: 62,
    genre: "Female"
  },
  {
    weight: 115,
    height: 62,
    genre: "Female"
  },
  {
    weight: 140,
    height: 66,
    genre: "Female"
  },
  {
    weight: 174,
    height: 62,
    genre: "Female"
  },
  {
    weight: 117,
    height: 63,
    genre: "Female"
  },
  {
    weight: 120,
    height: 59,
    genre: "Female"
  },
  {
    weight: 175,
    height: 64,
    genre: "Female"
  },
  {
    weight: 128,
    height: 64,
    genre: "Female"
  },
  {
    weight: 120,
    height: 60,
    genre: "Female"
  },
  {
    weight: 117,
    height: 63,
    genre: "Female"
  },
  {
    weight: 160,
    height: 65,
    genre: "Female"
  },
  {
    weight: 170,
    height: 65,
    genre: "Female"
  },
  {
    weight: 148,
    height: 66,
    genre: "Female"
  },
  {
    weight: 280,
    height: 64,
    genre: "Female"
  },
  {
    weight: 101,
    height: 66,
    genre: "Female"
  },
  {
    weight: 120,
    height: 59,
    genre: "Female"
  },
  {
    weight: 106,
    height: 62,
    genre: "Female"
  },
  {
    weight: 140,
    height: 67,
    genre: "Female"
  },
  {
    weight: 135,
    height: 67,
    genre: "Female"
  },
  {
    weight: 150,
    height: 66,
    genre: "Female"
  },
  {
    weight: 125,
    height: 68,
    genre: "Female"
  },
  {
    weight: 125,
    height: 66,
    genre: "Female"
  },
  {
    weight: 178,
    height: 70,
    genre: "Female"
  },
  {
    weight: 130,
    height: 65,
    genre: "Female"
  },
  {
    weight: 120,
    height: 63,
    genre: "Female"
  },
  {
    weight: 195,
    height: 69,
    genre: "Female"
  },
  {
    weight: 160,
    height: 66,
    genre: "Female"
  },
  {
    weight: 140,
    height: 68,
    genre: "Female"
  },
  {
    weight: 104,
    height: 60,
    genre: "Female"
  },
  {
    weight: 130,
    height: 65,
    genre: "Female"
  },
  {
    weight: 116,
    height: 65,
    genre: "Female"
  },
  {
    weight: 145,
    height: 66,
    genre: "Female"
  },
  {
    weight: 140,
    height: 63,
    genre: "Female"
  },
  {
    weight: 98,
    height: 53,
    genre: "Female"
  },
  {
    weight: 160,
    height: 63,
    genre: "Female"
  },
  {
    weight: 118,
    height: 62,
    genre: "Female"
  },
  {
    weight: 150,
    height: 65,
    genre: "Female"
  },
  {
    weight: 165,
    height: 71,
    genre: "Female"
  },
  {
    weight: 165,
    height: 66,
    genre: "Female"
  },
  {
    weight: 145,
    height: 64,
    genre: "Female"
  },
  {
    weight: 160,
    height: 67,
    genre: "Female"
  },
  {
    weight: 143,
    height: 62,
    genre: "Female"
  },
  {
    weight: 136,
    height: 56,
    genre: "Female"
  },
  {
    weight: 125,
    height: 62,
    genre: "Female"
  },
  {
    weight: 130,
    height: 63,
    genre: "Female"
  },
  {
    weight: 140,
    height: 65,
    genre: "Female"
  },
  {
    weight: 190,
    height: 63,
    genre: "Female"
  },
  {
    weight: 103,
    height: 68,
    genre: "Female"
  },
  {
    weight: 110,
    height: 60,
    genre: "Female"
  },
  {
    weight: 102,
    height: 60,
    genre: "Female"
  },
  {
    weight: 125,
    height: 62,
    genre: "Female"
  },
  {
    weight: 126,
    height: 65,
    genre: "Female"
  },
  {
    weight: 130,
    height: 61,
    genre: "Female"
  },
  {
    weight: 104,
    height: 61,
    genre: "Female"
  },
  {
    weight: 104,
    height: 66,
    genre: "Female"
  },
  {
    weight: 150,
    height: 60,
    genre: "Female"
  },
  {
    weight: 120,
    height: 61,
    genre: "Female"
  },
  {
    weight: 101,
    height: 62,
    genre: "Female"
  },
  {
    weight: 120,
    height: 60,
    genre: "Female"
  },
  {
    weight: 120,
    height: 62,
    genre: "Female"
  },
  {
    weight: 155,
    height: 65,
    genre: "Female"
  },
  {
    weight: 135,
    height: 65,
    genre: "Female"
  },
  {
    weight: 100,
    height: 60,
    genre: "Female"
  },
  {
    weight: 170,
    height: 65,
    genre: "Female"
  },
  {
    weight: 135,
    height: 71,
    genre: "Female"
  },
  {
    weight: 125,
    height: 63,
    genre: "Female"
  },
  {
    weight: 103,
    height: 62,
    genre: "Female"
  },
  {
    weight: 127,
    height: 68,
    genre: "Female"
  },
  {
    weight: 110,
    height: 64,
    genre: "Female"
  },
  {
    weight: 125,
    height: 67,
    genre: "Female"
  },
  {
    weight: 108,
    height: 60,
    genre: "Female"
  },
  {
    weight: 120,
    height: 66,
    genre: "Female"
  },
  {
    weight: 100,
    height: 62,
    genre: "Female"
  },
  {
    weight: 115,
    height: 66,
    genre: "Female"
  },
  {
    weight: 170,
    height: 60,
    genre: "Female"
  },
  {
    weight: 103,
    height: 62,
    genre: "Female"
  },
  {
    weight: 110,
    height: 59,
    genre: "Female"
  },
  {
    weight: 160,
    height: 64,
    genre: "Female"
  },
  {
    weight: 130,
    height: 62,
    genre: "Female"
  },
  {
    weight: 135,
    height: 66,
    genre: "Female"
  },
  {
    weight: 135,
    height: 66,
    genre: "Female"
  },
  {
    weight: 120,
    height: 64,
    genre: "Female"
  },
  {
    weight: 138,
    height: 63,
    genre: "Female"
  },
  {
    weight: 100,
    height: 63,
    genre: "Female"
  },
  {
    weight: 110,
    height: 63,
    genre: "Female"
  },
  {
    weight: 135,
    height: 65,
    genre: "Female"
  },
  {
    weight: 130,
    height: 67,
    genre: "Female"
  },
  {
    weight: 140,
    height: 67,
    genre: "Male"
  },
  {
    weight: 145,
    height: 66,
    genre: "Male"
  },
  {
    weight: 183,
    height: 69,
    genre: "Male"
  },
  {
    weight: 175,
    height: 71,
    genre: "Male"
  },
  {
    weight: 108,
    height: 66,
    genre: "Male"
  },
  {
    weight: 215,
    height: 66,
    genre: "Male"
  },
  {
    weight: 128,
    height: 62,
    genre: "Male"
  },
  {
    weight: 198,
    height: 73,
    genre: "Male"
  },
  {
    weight: 145,
    height: 67,
    genre: "Male"
  },
  {
    weight: 118,
    height: 64,
    genre: "Male"
  },
  {
    weight: 150,
    height: 71,
    genre: "Male"
  },
  {
    weight: 125,
    height: 71,
    genre: "Male"
  },
  {
    weight: 180,
    height: 69,
    genre: "Male"
  },
  {
    weight: 160,
    height: 74,
    genre: "Male"
  },
  {
    weight: 145,
    height: 65,
    genre: "Male"
  },
  {
    weight: 160,
    height: 69,
    genre: "Male"
  },
  {
    weight: 125,
    height: 65,
    genre: "Male"
  },
  {
    weight: 150,
    height: 66,
    genre: "Male"
  },
  {
    weight: 170,
    height: 71,
    genre: "Male"
  },
  {
    weight: 170,
    height: 68,
    genre: "Male"
  },
  {
    weight: 147,
    height: 67,
    genre: "Male"
  },
  {
    weight: 160,
    height: 68,
    genre: "Male"
  },
  {
    weight: 135,
    height: 65,
    genre: "Male"
  },
  {
    weight: 195,
    height: 69,
    genre: "Male"
  },
  {
    weight: 140,
    height: 66,
    genre: "Male"
  },
  {
    weight: 135,
    height: 68,
    genre: "Male"
  },
  {
    weight: 100,
    height: 64,
    genre: "Male"
  },
  {
    weight: 200,
    height: 74,
    genre: "Male"
  },
  {
    weight: 163,
    height: 69,
    genre: "Male"
  },
  {
    weight: 116,
    height: 71,
    genre: "Male"
  },
  {
    weight: 145,
    height: 68,
    genre: "Male"
  },
  {
    weight: 140,
    height: 71,
    genre: "Male"
  },
  {
    weight: 125,
    height: 68,
    genre: "Male"
  },
  {
    weight: 157,
    height: 72,
    genre: "Male"
  },
  {
    weight: 200,
    height: 68,
    genre: "Male"
  },
  {
    weight: 165,
    height: 64,
    genre: "Male"
  },
  {
    weight: 115,
    height: 70,
    genre: "Male"
  },
  {
    weight: 153,
    height: 67,
    genre: "Male"
  },
  {
    weight: 135,
    height: 65,
    genre: "Male"
  },
  {
    weight: 130,
    height: 66,
    genre: "Male"
  },
  {
    weight: 180,
    height: 73,
    genre: "Male"
  },
  {
    weight: 190,
    height: 69,
    genre: "Male"
  },
  {
    weight: 160,
    height: 68,
    genre: "Male"
  },
  {
    weight: 130,
    height: 66,
    genre: "Male"
  },
  {
    weight: 150,
    height: 70,
    genre: "Male"
  },
  {
    weight: 185,
    height: 72,
    genre: "Male"
  },
  {
    weight: 175,
    height: 70,
    genre: "Male"
  },
  {
    weight: 200,
    height: 66,
    genre: "Male"
  },
  {
    weight: 135,
    height: 62,
    genre: "Male"
  },
  {
    weight: 120,
    height: 63,
    genre: "Male"
  },
  {
    weight: 185,
    height: 72,
    genre: "Male"
  },
  {
    weight: 160,
    height: 72,
    genre: "Male"
  },
  {
    weight: 160,
    height: 68,
    genre: "Male"
  },
  {
    weight: 160,
    height: 66,
    genre: "Male"
  },
  {
    weight: 195,
    height: 70,
    genre: "Male"
  },
  {
    weight: 120,
    height: 69,
    genre: "Male"
  },
  {
    weight: 140,
    height: 71,
    genre: "Male"
  },
  {
    weight: 125,
    height: 66,
    genre: "Male"
  },
  {
    weight: 125,
    height: 64,
    genre: "Male"
  },
  {
    weight: 245,
    height: 72,
    genre: "Male"
  },
  {
    weight: 235,
    height: 74,
    genre: "Male"
  },
  {
    weight: 135,
    height: 68,
    genre: "Male"
  },
  {
    weight: 200,
    height: 74,
    genre: "Male"
  },
  {
    weight: 145,
    height: 70,
    genre: "Male"
  },
  {
    weight: 140,
    height: 68,
    genre: "Male"
  },
  {
    weight: 135,
    height: 69,
    genre: "Male"
  },
  {
    weight: 216,
    height: 76,
    genre: "Male"
  },
  {
    weight: 165,
    height: 69,
    genre: "Male"
  },
  {
    weight: 164,
    height: 73,
    genre: "Male"
  },
  {
    weight: 153,
    height: 70,
    genre: "Male"
  },
  {
    weight: 172,
    height: 75,
    genre: "Male"
  },
  {
    weight: 141,
    height: 69,
    genre: "Male"
  },
  {
    weight: 148,
    height: 68,
    genre: "Male"
  },
  {
    weight: 150,
    height: 70,
    genre: "Male"
  },
  {
    weight: 160,
    height: 70,
    genre: "Male"
  },
  {
    weight: 210,
    height: 70,
    genre: "Male"
  },
  {
    weight: 172,
    height: 72,
    genre: "Male"
  },
  {
    weight: 190,
    height: 72,
    genre: "Male"
  },
  {
    weight: 235,
    height: 69,
    genre: "Male"
  },
  {
    weight: 145,
    height: 72,
    genre: "Male"
  },
  {
    weight: 196,
    height: 70,
    genre: "Male"
  },
  {
    weight: 200,
    height: 72,
    genre: "Male"
  },
  {
    weight: 170,
    height: 70,
    genre: "Male"
  },
  {
    weight: 140,
    height: 68,
    genre: "Male"
  },
  {
    weight: 160,
    height: 65,
    genre: "Male"
  },
  {
    weight: 168,
    height: 72,
    genre: "Male"
  },
  {
    weight: 135,
    height: 66,
    genre: "Male"
  },
  {
    weight: 155,
    height: 67,
    genre: "Male"
  },
  {
    weight: 140,
    height: 66,
    genre: "Male"
  },
  {
    weight: 125,
    height: 65,
    genre: "Male"
  },
  {
    weight: 165,
    height: 72,
    genre: "Male"
  },
  {
    weight: 155,
    height: 72,
    genre: "Male"
  },
  {
    weight: 125,
    height: 66,
    genre: "Male"
  },
  {
    weight: 130,
    height: 66,
    genre: "Male"
  },
  {
    weight: 115,
    height: 63,
    genre: "Male"
  },
  {
    weight: 150,
    height: 64,
    genre: "Male"
  },
  {
    weight: 150,
    height: 66,
    genre: "Male"
  },
  {
    weight: 150,
    height: 71,
    genre: "Male"
  },
  {
    weight: 180,
    height: 70,
    genre: "Male"
  },
  {
    weight: 210,
    height: 69,
    genre: "Male"
  },
  {
    weight: 140,
    height: 64,
    genre: "Male"
  },
  {
    weight: 130,
    height: 63,
    genre: "Male"
  },
  {
    weight: 210,
    height: 71,
    genre: "Male"
  },
  {
    weight: 125,
    height: 70,
    genre: "Male"
  },
  {
    weight: 125,
    height: 65,
    genre: "Male"
  },
  {
    weight: 167,
    height: 67,
    genre: "Male"
  },
  {
    weight: 140,
    height: 67,
    genre: "Male"
  },
  {
    weight: 130,
    height: 69,
    genre: "Male"
  },
  {
    weight: 120,
    height: 66,
    genre: "Male"
  },
  {
    weight: 180,
    height: 70,
    genre: "Male"
  },
  {
    weight: 170,
    height: 69,
    genre: "Male"
  },
  {
    weight: 145,
    height: 67,
    genre: "Male"
  },
  {
    weight: 155,
    height: 70,
    genre: "Male"
  },
  {
    weight: 160,
    height: 70,
    genre: "Male"
  },
  {
    weight: 120,
    height: 64,
    genre: "Male"
  },
  {
    weight: 140,
    height: 71,
    genre: "Male"
  },
  {
    weight: 130,
    height: 72,
    genre: "Male"
  },
  {
    weight: 155,
    height: 71,
    genre: "Male"
  },
  {
    weight: 190,
    height: 72,
    genre: "Male"
  },
  {
    weight: 130,
    height: 68,
    genre: "Male"
  },
  {
    weight: 140,
    height: 73,
    genre: "Male"
  },
  {
    weight: 140,
    height: 66,
    genre: "Male"
  },
  {
    weight: 136,
    height: 69,
    genre: "Male"
  },
  {
    weight: 130,
    height: 67,
    genre: "Male"
  },
  {
    weight: 142,
    height: 69,
    genre: "Male"
  },
  {
    weight: 120,
    height: 65,
    genre: "Male"
  },
  {
    weight: 170,
    height: 72,
    genre: "Male"
  },
  {
    weight: 160,
    height: 71,
    genre: "Male"
  },
  {
    weight: 165,
    height: 71,
    genre: "Male"
  },
  {
    weight: 135,
    height: 67,
    genre: "Male"
  },
  {
    weight: 120,
    height: 66,
    genre: "Male"
  },
  {
    weight: 110,
    height: 65,
    genre: "Male"
  },
  {
    weight: 180,
    height: 69,
    genre: "Male"
  },
  {
    weight: 180,
    height: 72,
    genre: "Male"
  },
  {
    weight: 150,
    height: 65,
    genre: "Male"
  },
  {
    weight: 180,
    height: 70,
    genre: "Male"
  },
  {
    weight: 160,
    height: 66,
    genre: "Male"
  },
  {
    weight: 150,
    height: 64,
    genre: "Male"
  },
  {
    weight: 180,
    height: 74,
    genre: "Male"
  },
  {
    weight: 160,
    height: 66,
    genre: "Male"
  },
  {
    weight: 130,
    height: 68,
    genre: "Male"
  },
  {
    weight: 195,
    height: 73,
    genre: "Male"
  },
  {
    weight: 160,
    height: 74,
    genre: "Male"
  },
  {
    weight: 200,
    height: 75,
    genre: "Male"
  },
  {
    weight: 135,
    height: 64,
    genre: "Male"
  },
  {
    weight: 113,
    height: 65,
    genre: "Male"
  },
  {
    weight: 150,
    height: 72,
    genre: "Male"
  },
  {
    weight: 110,
    height: 62,
    genre: "Male"
  },
  {
    weight: 145,
    height: 69,
    genre: "Male"
  },
  {
    weight: 132,
    height: 72,
    genre: "Male"
  },
  {
    weight: 125,
    height: 64,
    genre: "Male"
  },
  {
    weight: 125,
    height: 65,
    genre: "Male"
  },
  {
    weight: 200,
    height: 70,
    genre: "Male"
  },
  {
    weight: 112,
    height: 63,
    genre: "Male"
  },
  {
    weight: 110,
    height: 63,
    genre: "Male"
  },
  {
    weight: 142,
    height: 67,
    genre: "Male"
  },
  {
    weight: 130,
    height: 66,
    genre: "Male"
  },
  {
    weight: 140,
    height: 64,
    genre: "Male"
  },
  {
    weight: 150,
    height: 69,
    genre: "Male"
  },
  {
    weight: 160,
    height: 68,
    genre: "Male"
  },
  {
    weight: 225,
    height: 72,
    genre: "Male"
  },
  {
    weight: 145,
    height: 70,
    genre: "Male"
  },
  {
    weight: 135,
    height: 67,
    genre: "Male"
  },
  {
    weight: 260,
    height: 78,
    genre: "Male"
  },
  {
    weight: 150,
    height: 66,
    genre: "Male"
  },
  {
    weight: 175,
    height: 71,
    genre: "Male"
  },
  {
    weight: 124,
    height: 70,
    genre: "Male"
  },
  {
    weight: 245,
    height: 73,
    genre: "Male"
  },
  {
    weight: 154,
    height: 72,
    genre: "Male"
  },
  {
    weight: 160,
    height: 69,
    genre: "Male"
  },
  {
    weight: 210,
    height: 68,
    genre: "Male"
  },
  {
    weight: 154,
    height: 68,
    genre: "Male"
  },
  {
    weight: 195,
    height: 72,
    genre: "Male"
  },
  {
    weight: 139,
    height: 67,
    genre: "Male"
  },
  {
    weight: 160,
    height: 67,
    genre: "Male"
  },
  {
    weight: 155,
    height: 67,
    genre: "Male"
  },
  {
    weight: 145,
    height: 66,
    genre: "Male"
  },
  {
    weight: 140,
    height: 62,
    genre: "Male"
  },
  {
    weight: 150,
    height: 69,
    genre: "Male"
  },
  {
    weight: 130,
    height: 70,
    genre: "Male"
  },
  {
    weight: 153,
    height: 69,
    genre: "Male"
  },
  {
    weight: 180,
    height: 74,
    genre: "Male"
  },
  {
    weight: 135,
    height: 70,
    genre: "Male"
  },
  {
    weight: 160,
    height: 72,
    genre: "Male"
  },
  {
    weight: 165,
    height: 76,
    genre: "Male"
  },
  {
    weight: 175,
    height: 70,
    genre: "Male"
  },
  {
    weight: 157,
    height: 65,
    genre: "Male"
  },
  {
    weight: 165,
    height: 74,
    genre: "Male"
  },
  {
    weight: 320,
    height: 72,
    genre: "Male"
  },
  {
    weight: 150,
    height: 69,
    genre: "Male"
  },
  {
    weight: 155,
    height: 73,
    genre: "Male"
  },
  {
    weight: 175,
    height: 71,
    genre: "Male"
  },
  {
    weight: 175,
    height: 70,
    genre: "Male"
  },
  {
    weight: 135,
    height: 66,
    genre: "Male"
  },
  {
    weight: 142,
    height: 63,
    genre: "Male"
  },
  {
    weight: 265,
    height: 66,
    genre: "Male"
  },
  {
    weight: 164,
    height: 66,
    genre: "Male"
  },
  {
    weight: 175,
    height: 71,
    genre: "Male"
  },
  {
    weight: 155,
    height: 76,
    genre: "Male"
  },
  {
    weight: 180,
    height: 74,
    genre: "Male"
  },
  {
    weight: 160,
    height: 64,
    genre: "Male"
  },
  {
    weight: 210,
    height: 66,
    genre: "Male"
  },
  {
    weight: 165,
    height: 67,
    genre: "Male"
  },
  {
    weight: 160,
    height: 63,
    genre: "Male"
  },
  {
    weight: 150,
    height: 68,
    genre: "Male"
  },
  {
    weight: 175,
    height: 73,
    genre: "Male"
  },
  {
    weight: 170,
    height: 71,
    genre: "Male"
  },
  {
    weight: 176,
    height: 70,
    genre: "Male"
  },
  {
    weight: 170,
    height: 69,
    genre: "Male"
  },
  {
    weight: 160,
    height: 67,
    genre: "Male"
  },
  {
    weight: 110,
    height: 62,
    genre: "Male"
  },
  {
    weight: 126,
    height: 67,
    genre: "Male"
  },
  {
    weight: 180,
    height: 69,
    genre: "Male"
  },
  {
    weight: 147,
    height: 68,
    genre: "Male"
  },
  {
    weight: 155,
    height: 71,
    genre: "Male"
  },
  {
    weight: 187,
    height: 70,
    genre: "Male"
  },
  {
    weight: 235,
    height: 71,
    genre: "Male"
  },
  {
    weight: 140,
    height: 68,
    genre: "Male"
  },
  {
    weight: 147,
    height: 66,
    genre: "Male"
  },
  {
    weight: 199,
    height: 68,
    genre: "Male"
  },
  {
    weight: 280,
    height: 73,
    genre: "Male"
  },
  {
    weight: 180,
    height: 70,
    genre: "Male"
  },
  {
    weight: 164,
    height: 75,
    genre: "Male"
  },
  {
    weight: 120,
    height: 65,
    genre: "Male"
  },
  {
    weight: 260,
    height: 69,
    genre: "Male"
  },
  {
    weight: 220,
    height: 68,
    genre: "Male"
  },
  {
    weight: 230,
    height: 72,
    genre: "Male"
  },
  {
    weight: 161,
    height: 73,
    genre: "Male"
  },
  {
    weight: 145,
    height: 71,
    genre: "Male"
  },
  {
    weight: 232,
    height: 67,
    genre: "Male"
  },
  {
    weight: 135,
    height: 69,
    genre: "Male"
  },
  {
    weight: 160,
    height: 67,
    genre: "Male"
  },
  {
    weight: 142,
    height: 66,
    genre: "Male"
  },
  {
    weight: 120,
    height: 68,
    genre: "Male"
  },
  {
    weight: 170,
    height: 70,
    genre: "Male"
  },
  {
    weight: 170,
    height: 66,
    genre: "Male"
  },
  {
    weight: 140,
    height: 64,
    genre: "Male"
  },
  {
    weight: 130,
    height: 70,
    genre: "Male"
  },
  {
    weight: 130,
    height: 67,
    genre: "Male"
  },
  {
    weight: 175,
    height: 69,
    genre: "Male"
  },
  {
    weight: 150,
    height: 68,
    genre: "Male"
  },
  {
    weight: 160,
    height: 68,
    genre: "Male"
  },
  {
    weight: 185,
    height: 73,
    genre: "Male"
  },
  {
    weight: 220,
    height: 74,
    genre: "Male"
  },
  {
    weight: 165,
    height: 72,
    genre: "Male"
  }
],

WEIGHT_HEIGHT: any = {
  data: [
    [150, 67],
    [100, 67],
    [185, 62],
    [140, 62],
    [140, 68],
    [123, 64],
    [91, 59],
    [175, 59],
    [94, 59],
    [190, 63],
    [130, 66],
    [120, 63],
    [124, 68],
    [135, 64],
    [98, 64],
    [160, 67],
    [140, 67],
    [109, 60],
    [165, 63],
    [110, 63],
    [125, 60],
    [142, 66],
    [154, 65],
    [119, 62],
    [110, 63],
    [140, 63],
    [219, 64],
    [135, 66],
    [135, 62],
    [150, 63],
    [130, 66],
    [110, 61],
    [116, 62],
    [122, 63],
    [110, 66],
    [115, 62],
    [110, 64],
    [180, 68],
    [134, 63],
    [143, 65],
    [180, 68],
    [130, 65],
    [200, 65],
    [195, 65],
    [120, 63],
    [110, 64],
    [140, 67],
    [104, 66],
    [125, 63],
    [190, 68],
    [125, 65],
    [130, 62],
    [120, 62],
    [155, 63],
    [130, 65],
    [130, 64],
    [124, 61],
    [125, 66],
    [120, 66],
    [103, 62],
    [162, 65],
    [103, 58],
    [135, 63],
    [160, 68],
    [145, 67],
    [180, 67],
    [170, 60],
    [175, 66],
    [130, 64],
    [108, 64],
    [142, 66],
    [110, 64],
    [118, 65],
    [145, 61],
    [110, 63],
    [115, 65],
    [160, 66],
    [123, 62],
    [135, 65],
    [150, 60],
    [100, 61],
    [100, 62],
    [135, 62],
    [200, 64],
    [185, 62],
    [95, 64],
    [110, 65],
    [165, 67],
    [132, 65],
    [120, 64],
    [130, 63],
    [160, 59],
    [130, 64],
    [120, 61],
    [250, 66],
    [105, 61],
    [130, 64],
    [132, 63],
    [110, 66],
    [122, 65],
    [113, 64],
    [108, 60],
    [130, 60],
    [105, 60],
    [120, 61],
    [122, 65],
    [132, 69],
    [105, 67],
    [102, 61],
    [110, 61],
    [140, 70],
    [135, 67],
    [131, 65],
    [120, 64],
    [117, 63],
    [210, 59],
    [130, 66],
    [90, 63],
    [135, 64],
    [140, 63],
    [110, 62],
    [120, 64],
    [110, 61],
    [150, 65],
    [105, 64],
    [120, 63],
    [140, 64],
    [155, 68],
    [110, 59],
    [125, 63],
    [125, 63],
    [135, 65],
    [135, 68],
    [116, 64],
    [140, 65],
    [165, 66],
    [90, 60],
    [115, 64],
    [113, 62],
    [120, 62],
    [98, 63],
    [113, 66],
    [112, 62],
    [115, 62],
    [140, 66],
    [174, 62],
    [117, 63],
    [120, 59],
    [175, 64],
    [128, 64],
    [120, 60],
    [117, 63],
    [160, 65],
    [170, 65],
    [148, 66],
    [280, 64],
    [101, 66],
    [120, 59],
    [106, 62],
    [140, 67],
    [135, 67],
    [150, 66],
    [125, 68],
    [125, 66],
    [178, 70],
    [130, 65],
    [120, 63],
    [195, 69],
    [160, 66],
    [140, 68],
    [104, 60],
    [130, 65],
    [116, 65],
    [145, 66],
    [140, 63],
    [98, 53],
    [160, 63],
    [118, 62],
    [150, 65],
    [165, 71],
    [165, 66],
    [145, 64],
    [160, 67],
    [143, 62],
    [136, 56],
    [125, 62],
    [130, 63],
    [140, 65],
    [190, 63],
    [103, 68],
    [110, 60],
    [102, 60],
    [125, 62],
    [126, 65],
    [130, 61],
    [104, 61],
    [104, 66],
    [150, 60],
    [120, 61],
    [101, 62],
    [120, 60],
    [120, 62],
    [155, 65],
    [135, 65],
    [100, 60],
    [170, 65],
    [135, 71],
    [125, 63],
    [103, 62],
    [127, 68],
    [110, 64],
    [125, 67],
    [108, 60],
    [120, 66],
    [100, 62],
    [115, 66],
    [170, 60],
    [103, 62],
    [110, 59],
    [160, 64],
    [130, 62],
    [135, 66],
    [135, 66],
    [120, 64],
    [138, 63],
    [100, 63],
    [110, 63],
    [135, 65],
    [130, 67],
    [140, 67],
    [145, 66],
    [183, 69],
    [175, 71],
    [108, 66],
    [215, 66],
    [128, 62],
    [198, 73],
    [145, 67],
    [118, 64],
    [150, 71],
    [125, 71],
    [180, 69],
    [160, 74],
    [145, 65],
    [160, 69],
    [125, 65],
    [150, 66],
    [170, 71],
    [170, 68],
    [147, 67],
    [160, 68],
    [135, 65],
    [195, 69],
    [140, 66],
    [135, 68],
    [100, 64],
    [200, 74],
    [163, 69],
    [116, 71],
    [145, 68],
    [140, 71],
    [125, 68],
    [157, 72],
    [200, 68],
    [165, 64],
    [115, 70],
    [153, 67],
    [135, 65],
    [130, 66],
    [180, 73],
    [190, 69],
    [160, 68],
    [130, 66],
    [150, 70],
    [185, 72],
    [175, 70],
    [200, 66],
    [135, 62],
    [120, 63],
    [185, 72],
    [160, 72],
    [160, 68],
    [160, 66],
    [195, 70],
    [120, 69],
    [140, 71],
    [125, 66],
    [125, 64],
    [245, 72],
    [235, 74],
    [135, 68],
    [200, 74],
    [145, 70],
    [140, 68],
    [135, 69],
    [216, 76],
    [165, 69],
    [164, 73],
    [153, 70],
    [172, 75],
    [141, 69],
    [148, 68],
    [150, 70],
    [160, 70],
    [210, 70],
    [172, 72],
    [190, 72],
    [235, 69],
    [145, 72],
    [196, 70],
    [200, 72],
    [170, 70],
    [140, 68],
    [160, 65],
    [168, 72],
    [135, 66],
    [155, 67],
    [140, 66],
    [125, 65],
    [165, 72],
    [155, 72],
    [125, 66],
    [130, 66],
    [115, 63],
    [150, 64],
    [150, 66],
    [150, 71],
    [180, 70],
    [210, 69],
    [140, 64],
    [130, 63],
    [210, 71],
    [125, 70],
    [125, 65],
    [167, 67],
    [140, 67],
    [130, 69],
    [120, 66],
    [180, 70],
    [170, 69],
    [145, 67],
    [155, 70],
    [160, 70],
    [120, 64],
    [140, 71],
    [130, 72],
    [155, 71],
    [190, 72],
    [130, 68],
    [140, 73],
    [140, 66],
    [136, 69],
    [130, 67],
    [142, 69],
    [120, 65],
    [170, 72],
    [160, 71],
    [165, 71],
    [135, 67],
    [120, 66],
    [110, 65],
    [180, 69],
    [180, 72],
    [150, 65],
    [180, 70],
    [160, 66],
    [150, 64],
    [180, 74],
    [160, 66],
    [130, 68],
    [195, 73],
    [160, 74],
    [200, 75],
    [135, 64],
    [113, 65],
    [150, 72],
    [110, 62],
    [145, 69],
    [132, 72],
    [125, 64],
    [125, 65],
    [200, 70],
    [112, 63],
    [110, 63],
    [142, 67],
    [130, 66],
    [140, 64],
    [150, 69],
    [160, 68],
    [225, 72],
    [145, 70],
    [135, 67],
    [260, 78],
    [150, 66],
    [175, 71],
    [124, 70],
    [245, 73],
    [154, 72],
    [160, 69],
    [210, 68],
    [154, 68],
    [195, 72],
    [139, 67],
    [160, 67],
    [155, 67],
    [145, 66],
    [140, 62],
    [150, 69],
    [130, 70],
    [153, 69],
    [180, 74],
    [135, 70],
    [160, 72],
    [165, 76],
    [175, 70],
    [157, 65],
    [165, 74],
    [320, 72],
    [150, 69],
    [155, 73],
    [175, 71],
    [175, 70],
    [135, 66],
    [142, 63],
    [265, 66],
    [164, 66],
    [175, 71],
    [155, 76],
    [180, 74],
    [160, 64],
    [210, 66],
    [165, 67],
    [160, 63],
    [150, 68],
    [175, 73],
    [170, 71],
    [176, 70],
    [170, 69],
    [160, 67],
    [110, 62],
    [126, 67],
    [180, 69],
    [147, 68],
    [155, 71],
    [187, 70],
    [235, 71],
    [140, 68],
    [147, 66],
    [199, 68],
    [280, 73],
    [180, 70],
    [164, 75],
    [120, 65],
    [260, 69],
    [220, 68],
    [230, 72],
    [161, 73],
    [145, 71],
    [232, 67],
    [135, 69],
    [160, 67],
    [142, 66],
    [120, 68],
    [170, 70],
    [170, 66],
    [140, 64],
    [130, 70],
    [130, 67],
    [175, 69],
    [150, 68],
    [160, 68],
    [185, 73],
    [220, 74],
    [165, 72]
  ],
  labels: [
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Female',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male',
    'Male'
  ]
};
