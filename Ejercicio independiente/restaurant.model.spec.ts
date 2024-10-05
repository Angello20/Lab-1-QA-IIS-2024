import { Restaurant } from './restaurant.model';
import { SortedListOfImmutables } from './sorted-list-of-immutables.model';
import { Entree } from './entree.model';
import { Food } from './food.model';

describe('Restaurante', () => {
  let restaurante: Restaurant;

  beforeEach(() => {
    restaurante = new Restaurant('Restaurante de Prueba', 10000); // 10000 centavos = $100
  });

  // Prueba para verificar que el restaurante se crea con el nombre y efectivo inicial correcto.
  it('debería crear un restaurante con el nombre correcto y efectivo inicial', () => {
    expect(restaurante.getName()).toBe('Restaurante de Prueba');
    expect(restaurante.getCash()).toBe(10000); // 10000 centavos
  });

  // Prueba para asegurar que el restaurante se inicializa con un menú y un inventario vacíos.
  it('debería inicializar con un menú e inventario vacíos', () => {
    expect(restaurante.getMenu().getSize()).toBe(0);
    expect(restaurante.getInventory().getSize()).toBe(0);
  });
});

describe('Operaciones del Menú del Restaurante', () => {
  let restaurante: Restaurant;
  let plato: Entree;

  beforeEach(() => {
    restaurante = new Restaurant('Restaurante de Prueba', 10000); // 10000 centavos = $100
    const listaDeComida = new SortedListOfImmutables(null); // Lista vacía para probar
    plato = new Entree('Plato de Prueba', listaDeComida);
  });

  // Prueba para agregar un plato al menú del restaurante.
  it('debería agregar un plato al menú', () => {
    restaurante.addEntree(plato);
    expect(restaurante.getMenu().getSize()).toBe(1);
  });
});


describe('Restaurante addShipmentToInventory', () => {
  let restaurante: Restaurant;
  let comida1: Food;
  let comida3: Food;
  let lista: SortedListOfImmutables;

  beforeEach(() => {
    restaurante = new Restaurant('Restaurante de Prueba', 500); // 500 centavos = $5
    comida1 = new Food('Leche', 100, 200, 'Milk.jpg'); // Primer item de comida
    comida3 = new Food('Waffle', 600, 1200, 'Waffle.jpg');  // Tercer item de comida
  });

  // Prueba para verificar que el envío se agrega al inventario si el costo es menor que el efectivo disponible.
  it('debería devolver verdadero si el costo total del envío es menor que el efectivo disponible', () => {
    lista = new SortedListOfImmutables(null);
    lista.add(comida1); // Costo total al por mayor: 100 centavos
    
    const resultado = restaurante.addShipmentToInventory(lista);
    expect(resultado).toBeTrue();  // Debería tener éxito
  });

  // Prueba para verificar que el envío no se agrega al inventario si el costo excede el efectivo disponible.
  it('debería devolver falso si el costo total del envío excede el efectivo disponible', () => {
    lista = new SortedListOfImmutables(null);
    lista.add(comida3); // Costo total al por mayor: 600 centavos

    const resultado = restaurante.addShipmentToInventory(lista);
    expect(resultado).toBeFalse();  // Debería fallar
  });
});