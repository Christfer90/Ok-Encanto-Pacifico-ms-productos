import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Categoria} from './categoria.model';
import {CategoriaProducto} from './categoria-producto.model';
import {Imagen} from './imagen.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'boolean',
    required: true,
  })
  es_stock: boolean;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @hasMany(() => Categoria, {through: {model: () => CategoriaProducto, keyFrom: 'id_producto', keyTo: 'id_categoria'}})
  categorias: Categoria[];

  @hasMany(() => Imagen, {keyTo: 'id_producto'})
  imagenes: Imagen[];

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
