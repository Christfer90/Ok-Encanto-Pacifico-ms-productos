import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Imagen, ImagenRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class ImagenRepository extends DefaultCrudRepository<
  Imagen,
  typeof Imagen.prototype.id,
  ImagenRelations
> {

  public readonly tiene_producto: BelongsToAccessor<Producto, typeof Imagen.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Imagen, dataSource);
    this.tiene_producto = this.createBelongsToAccessorFor('tiene_producto', productoRepositoryGetter,);
    this.registerInclusionResolver('tiene_producto', this.tiene_producto.inclusionResolver);
  }
}
