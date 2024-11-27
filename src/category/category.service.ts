import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create.category.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, id: number) {
    const isExist = await this.categoryRepository.findBy({
      user: { id: id },
      title: createCategoryDto.title,
    });
    if (isExist.length) {
      throw new BadRequestException('This category already exists');
    } else {
      const newCategory = {
        title: createCategoryDto.title,
        user: { id: id },
      };
      await this.categoryRepository.save(newCategory);
      return 'This action adds a new category';
    }
  }

  async findAll(id: number) {
    return await this.categoryRepository.find({
      where: { user: { id: id } },
      relations: { transactions: true },
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
      relations: { user: true, transactions: true },
    });
    if (!category) {
      throw new BadRequestException('This category does not find');
    } else {
      return category;
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id: id });
    if (!category) {
      throw new BadRequestException('This category does not find');
    } else {
      await this.categoryRepository.update(id, updateCategoryDto);
      return `This action updated a #${id} category`;
    }
  }

  async delete(id: number) {
    const category = await this.categoryRepository.findOneBy({ id: id });
    if (!category) {
      throw new BadRequestException('This category does not find');
    } else {
      await this.categoryRepository.delete(id);
      return `This action deleted a #${id} category`;
    }
  }
}
