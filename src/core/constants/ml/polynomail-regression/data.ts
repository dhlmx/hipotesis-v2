import * as tf from '@tensorflow/tfjs';
import { IChartData } from '../../../interfaces/charts/ichart-data';

const DOUBLE_PI = tf.scalar(2.0 * Math.PI);

// Data
export const XS = tf.mul(DOUBLE_PI, tf.range(-0.5, 0.5, 0.01)),
  NOISE = tf.randomNormal([XS.size]).mul(0.05),
  YS = tf.sin(XS),
  ZS = tf.sin(XS).add(NOISE);

// Chart.js
export const DATA_PROBLEM: IChartData = {
  labels: [],
  datasets: [
    {
      label: 'Sin(x)',
      data: [],
      fill: false,
      borderColor: '#42A5F5',
      tension: 0.4
    },
    {
      label: 'Sin(x) + Noise',
      data: [],
      fill: false,
      borderColor: '#FFA726',
      tension: 0.4
    }
  ]
},

CHART_PROBLEM: any = {
  type: 'line',
  data: DATA_PROBLEM,
  options: {
    responsive: true,
    aspectRatio: 2,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: '#000000'
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Radians',
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
        title: {
          display: true,
          text: 'Sin(x), Sin(x) + Noise',
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
},

DATA_LOSS: IChartData = {
  labels: [],
  datasets: [
    {
      label: 'Loss',
      data: [],
      fill: true,
      borderColor: '#66BB6A',
      tension: 0.4
    }
  ]
},

CHART_LOSS: any = {
  type: 'line',
  data: DATA_LOSS,
  options: {
    responsive: true,
    aspectRatio: 2,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: '#000000'
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Iterations',
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
        title: {
          display: true,
          text: 'Loss',
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
},

DATA_FX: IChartData = {
  labels: [],
  datasets: [
    {
      label: 'Sin(x)',
      data: [],
      fill: false,
      borderColor: '#42A5F5',
      tension: 0.4
    },
    {
      label: 'F(x)',
      data: [],
      fill: false,
      borderColor: '#FFA726',
      tension: 0.4
    }
  ]
},

CHART_FX: any = {
  type: 'line',
  data: DATA_FX,
  options: {
    responsive: true,
    aspectRatio: 2,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: '#000000'
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Radians',
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
        title: {
          display: true,
          text: 'Sin(x), F(x)',
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
