import { getColor } from '../../color';

export const SEPAL_LENGTH: any = {
  setosa: {
    dataset: {
      label: 'Iris-setosa',
      data: [],
      backgroundColor: getColor('Black'),
      borderColor: getColor('Aqua'),
      pointRadius: 4,
      pointStyle: 'cross',
      showLine: false
    }
  },
  versicolor: {
    dataset: {
      label: 'Iris-versicolor',
      data: [],
      backgroundColor: getColor('Black'),
      borderColor: getColor('Fuchsia'),
      pointRadius: 4,
      pointStyle: 'circle',
      showLine: false
    }
  },
  virginica: {
    dataset: {
      label: 'Iris-virginica',
      data: [],
      backgroundColor: getColor('Black'),
      borderColor: getColor('Lime'),
      pointRadius: 4,
      pointStyle: 'triangle',
      showLine: false
    }
  }
};

export const SEPAL_WIDTH: any = {
  setosa: {
    dataset: {
      label: 'Iris-setosa',
      data: [],
      backgroundColor: getColor('Black'),
      borderColor: getColor('Aqua'),
      pointRadius: 4,
      pointStyle: 'cross',
      showLine: false
    }
  },
  versicolor: {
    dataset: {
      label: 'Iris-versicolor',
      data: [],
      backgroundColor: getColor('Black'),
      borderColor: getColor('Fuchsia'),
      pointRadius: 4,
      pointStyle: 'circle',
      showLine: false
    }
  },
  virginica: {
    dataset: {
      label: 'Iris-virginica',
      data: [],
      backgroundColor: getColor('Black'),
      borderColor: getColor('Lime'),
      pointRadius: 4,
      pointStyle: 'triangle',
      showLine: false
    }
  }
};

export const PETAL_LENGTH: any = {
  setosa: {
    dataset: {
      label: 'Iris-setosa',
      data: [],
      backgroundColor: getColor('Black'),
      borderColor: getColor('Aqua'),
      pointRadius: 4,
      pointStyle: 'cross',
      showLine: false
    }
  },
  versicolor: {
    dataset: {
      label: 'Iris-versicolor',
      data: [],
      backgroundColor: getColor('Black'),
      borderColor: getColor('Fuchsia'),
      pointRadius: 4,
      pointStyle: 'circle',
      showLine: false
    }
  },
  virginica: {
    dataset: {
      label: 'Iris-virginica',
      data: [],
      backgroundColor: getColor('Black'),
      borderColor: getColor('Lime'),
      pointRadius: 4,
      pointStyle: 'triangle',
      showLine: false
    }
  }
};

export const PETAL_WIDTH: any = {
  setosa: {
    dataset: {
      label: 'Iris-setosa',
      data: [],
      backgroundColor: getColor('Black'),
      borderColor: getColor('Aqua'),
      pointRadius: 4,
      pointStyle: 'cross',
      showLine: false
    }
  },
  versicolor: {
    dataset: {
      label: 'Iris-versicolor',
      data: [],
      backgroundColor: getColor('Black'),
      borderColor: getColor('Fuchsia'),
      pointRadius: 4,
      pointStyle: 'circle',
      showLine: false
    }
  },
  virginica: {
    dataset: {
      label: 'Iris-virginica',
      data: [],
      backgroundColor: getColor('Black'),
      borderColor: getColor('Lime'),
      pointRadius: 4,
      pointStyle: 'triangle',
      showLine: false
    }
  }
};

export const SEPAL_LENGTH_CHART: any = {
  type: 'line',
  data: [],
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
        text: 'Sepal Length by Specie',
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

export const SEPAL_WIDTH_CHART: any = {
  type: 'line',
  data: [],
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

export const PETAL_LENGTH_CHART: any = {
  type: 'line',
  data: [],
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

// chart.js
/*





export const PETAL_WIDTH_DATA: any = {
  labels: [],
  datasets: [
    {
      label: 'Iris-setosa',
      data: [],
      backgroundColor: getColor('Black'),
      borderColor: getColor('Aqua'),
      pointRadius: 4,
      pointStyle: 'cross',
      showLine: false
    },
    {
      label: 'Iris-versicolor',
      data: [],
      backgroundColor: getColor('Black'),
      borderColor: getColor('Fuchsia'),
      pointRadius: 4,
      pointStyle: 'circle',
      showLine: false
    },
    {
      label: 'Iris-virginica',
      data: [],
      backgroundColor: getColor('Black'),
      borderColor: getColor('Lime'),
      pointRadius: 4,
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
*/
