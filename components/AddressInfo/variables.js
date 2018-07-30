const colors = {
  'holding': '#FDE74C',
  'taken': '#5BC0EB',
  'active': '#9BC53D',
  'finished': '#211A1E',
  'canceled': '#C3423F'
}

const spinnerColor = {
  'holding': '#FDE74C',
  'taken': '#5BC0EB',
  'active': '#9BC53D',
  'finished': null,
  'canceled': null
}

const spinnerMessage = {
  'holding': 'Esperando que algún taxista acepte el viaje',
  'taken': 'Tú viaje ha sido tomado, el taxista va en camino',
  'active': 'Estás llendo a tu destino, disfruta el viaje',
  'finished': 'Ha terminado tu viaje, gracias por usar NOMBRE',
  'canceled': 'Se ha cancelado tú viaje'
}

export default {
  colors,
  spinnerColor,
  spinnerMessage
};
