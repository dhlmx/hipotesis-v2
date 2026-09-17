export const getColor = (color: string): string => {
  switch (color) {
    case 'Rojo':
      return 'red';
    case 'Amarillo':
      return 'yellow';
    case 'Morado':
      return 'purple';
    case 'Verde':
      return 'green';
    case 'Azul':
      return 'blue';
    default:
      return 'white';
  }
}
