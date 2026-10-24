import { IFormControl } from '../../../interfaces/iform-control';
import { getColor } from '../../color';

export const C = 1,
  GAMMA = 0.25,
  MAX_ITERATIONS = 1000,
  RANDOM_STATE = 42,
  TOLERANCE = 0.0001;

export const CONTROL_C: IFormControl = { value: C, min: 0.01, max: 2.99, minLength: -1, maxLength: -1, step: 0.01 },
  CONTROL_GAMMA: IFormControl = { value: GAMMA, min: 0.01, max: 0.99, minLength: -1, maxLength: -1, step: 0.01 },
  CONTROL_MAX_ITERATIONS: IFormControl = { value: MAX_ITERATIONS, min: 100, max: 9999, minLength: -1, maxLength: -1, step: 100 },
  CONTROL_RANDOM_STATE: IFormControl = { value: RANDOM_STATE, min: 1, max: 100, minLength: -1, maxLength: -1, step: 1 },
  CONTROL_TOLERANCE: IFormControl = { value: TOLERANCE, min: 0.00001, max: 0.001, minLength: -1, maxLength: -1, step: 0.00001 };

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

export const PETAL_LENGTH_VS_WIDTH: any = {
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

export const SEPAL_LENGTH_VS_PETAL_LENGTH: any = {
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

export const SEPAL_LENGTH_VS_PETAL_WIDTH: any = {
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

export const SEPAL_LENGTH_VS_WIDTH: any = {
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

export const SEPAL_WIDTH_VS_PETAL_LENGTH: any = {
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

export const SEPAL_WIDTH_VS_PETAL_WIDTH: any = {
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
