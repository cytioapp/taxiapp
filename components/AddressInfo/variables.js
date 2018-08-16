const colors = {
  'holding': '#C8CACC',
  'taken': '#e3c463',
  'active': '#e3c463',
  'finished': '#69CDCD',
  'canceled': '#EF604E'
}

const traductions = {
  'holding': 'En espera',
  'taken': 'Aceptado',
  'active': 'Activo',
  'finished': 'Finalizado',
  'canceled': 'Cancelado'
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

export {
  colors,
  spinnerColor,
  spinnerMessage,
  traductions
}

