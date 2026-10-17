import { COLORS } from '../../color';

// chart.js
export const SEPAL_LENGTH_DATA: any = {
  labels: [],
  datasets: [
    {
      label: 'Iris-setosa',
      data: [],
      backgroundColor: COLORS[2].hex,
      borderColor: COLORS[2].hex,
      pointRadius: 3,
      pointStyle: 'cross',
      showLine: false
    },
    {
      label: 'Iris-versicolor',
      data: [],
      backgroundColor: COLORS[12].hex,
      borderColor: COLORS[12].hex,
      pointRadius: 3,
      pointStyle: 'circle',
      showLine: false
    },
    {
      label: 'Iris-virginica',
      data: [],
      backgroundColor: COLORS[15].hex,
      borderColor: COLORS[15].hex,
      pointRadius: 3,
      pointStyle: 'triangle',
      showLine: false
    }
  ]
},

SEPAL_LENGTH: any = {
  type: 'line',
  data: SEPAL_LENGTH_DATA,
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
        text: 'Sepal Length by specie',
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
          text: 'Measurements'
        },
        ticks: {
          display: true,
          color: '#000000'
        },
        grid: {
          display: false,
          color: '#000000',
          drawBorder: false
        }
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Length (cm)'
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

export const SEPAL_WIDTH_DATA: any = {
  labels: [],
  datasets: [
    {
      label: 'Iris-setosa',
      data: [],
      backgroundColor: COLORS[2].hex,
      borderColor: COLORS[2].hex,
      pointRadius: 3,
      pointStyle: 'cross',
      showLine: false
    },
    {
      label: 'Iris-versicolor',
      data: [],
      backgroundColor: COLORS[12].hex,
      borderColor: COLORS[12].hex,
      pointRadius: 3,
      pointStyle: 'circle',
      showLine: false
    },
    {
      label: 'Iris-virginica',
      data: [],
      backgroundColor: COLORS[15].hex,
      borderColor: COLORS[15].hex,
      pointRadius: 3,
      pointStyle: 'triangle',
      showLine: false
    }
  ]
},

SEPAL_WIDTH: any = {
  type: 'line',
  data: SEPAL_WIDTH_DATA,
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
        text: 'Sepal Width by Specie',
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
          text: 'Measurements'
        },
        ticks: {
          display: true,
          color: '#000000'
        },
        grid: {
          display: false,
          color: '#000000',
          drawBorder: false
        }
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Length (cm)'
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

export const PETAL_LENGTH_DATA: any = {
  labels: [],
  datasets: [
    {
      label: 'Iris-setosa',
      data: [],
      backgroundColor: COLORS[2].hex,
      borderColor: COLORS[2].hex,
      pointRadius: 3,
      pointStyle: 'cross',
      showLine: false
    },
    {
      label: 'Iris-versicolor',
      data: [],
      backgroundColor: COLORS[12].hex,
      borderColor: COLORS[12].hex,
      pointRadius: 3,
      pointStyle: 'circle',
      showLine: false
    },
    {
      label: 'Iris-virginica',
      data: [],
      backgroundColor: COLORS[15].hex,
      borderColor: COLORS[15].hex,
      pointRadius: 3,
      pointStyle: 'triangle',
      showLine: false
    }
  ]
},

PETAL_LENGTH: any = {
  type: 'line',
  data: PETAL_LENGTH_DATA,
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
        text: 'Petal Length by Specie',
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
          text: 'Measurements'
        },
        ticks: {
          display: true,
          color: '#000000'
        },
        grid: {
          display: false,
          color: '#000000',
          drawBorder: false
        }
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Length (cm)'
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

export const PETAL_WIDTH_DATA: any = {
  labels: [],
  datasets: [
    {
      label: 'Iris-setosa',
      data: [],
      backgroundColor: COLORS[2].hex,
      borderColor: COLORS[2].hex,
      pointRadius: 3,
      pointStyle: 'cross',
      showLine: false
    },
    {
      label: 'Iris-versicolor',
      data: [],
      backgroundColor: COLORS[12].hex,
      borderColor: COLORS[12].hex,
      pointRadius: 3,
      pointStyle: 'circle',
      showLine: false
    },
    {
      label: 'Iris-virginica',
      data: [],
      backgroundColor: COLORS[15].hex,
      borderColor: COLORS[15].hex,
      pointRadius: 3,
      pointStyle: 'triangle',
      showLine: false
    }
  ]
},

PETAL_WIDTH: any = {
  type: 'line',
  data: PETAL_WIDTH_DATA,
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
        text: 'Petal Width by Specie',
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
          text: 'Measurements'
        },
        ticks: {
          display: true,
          color: '#000000'
        },
        grid: {
          display: false,
          color: '#000000',
          drawBorder: false
        }
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Length (cm)'
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
