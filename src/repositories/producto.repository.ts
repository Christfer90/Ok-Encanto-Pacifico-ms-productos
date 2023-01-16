import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Producto, ProductoRelations, Categoria, CategoriaProducto, Imagen} from '../models';
import {CategoriaRepository} from './categoria.repository';
import {CategoriaProductoRepository} from './categoria-producto.repository';
import {ImagenRepository} from './imagen.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly tiene_categoria: BelongsToAccessor<Categoria, typeof Producto.prototype.id>;

  public readonly categorias: HasManyThroughRepositoryFactory<Categoria, typeof Categoria.prototype.id,
          CategoriaProducto,
          typeof Producto.prototype.id
        >;

  public readonly imagenes: HasManyRepositoryFactory<Imagen, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>, @repository.getter('CategoriaProductoRepository') protected categoriaProductoRepositoryGetter: Getter<CategoriaProductoRepository>, @repository.getter('ImagenRepository') protected imagenRepositoryGetter: Getter<ImagenRepository>,
  ) {
    super(Producto, dataSource);
    this.imagenes = this.createHasManyRepositoryFactoryFor('imagenes', imagenRepositoryGetter,);
    this.registerInclusionResolver('imagenes', this.imagenes.inclusionResolver);
    this.categorias = this.createHasManyThroughRepositoryFactoryFor('categorias', categoriaRepositoryGetter, categoriaProductoRepositoryGetter,);
    this.registerInclusionResolver('categorias', this.categorias.inclusionResolver);
    this.tiene_categoria = this.createBelongsToAccessorFor('tiene_categoria', categoriaRepositoryGetter,);
    this.registerInclusionResolver('tiene_categoria', this.tiene_categoria.inclusionResolver);
  }
}
