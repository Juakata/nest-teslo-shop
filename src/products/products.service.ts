import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);

      return product;
    } catch (err) {
      this.handleDBExceptions(err);
    }
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product)
      throw new NotFoundException(`Product with id: ${id}, not found!`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.update(id, updateProductDto);
      return product;
    } catch (err) {
      this.handleDBExceptions(err);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    return await this.productRepository.remove(product);
  }

  private handleDBExceptions(err: any) {
    if (err.code === '23505') throw new BadRequestException(err.detail);
    if (err.code === '23502')
      throw new BadRequestException(`${err.column} is required!`);
    this.logger.error(err);

    throw new InternalServerErrorException('Check logs!');
  }
}
