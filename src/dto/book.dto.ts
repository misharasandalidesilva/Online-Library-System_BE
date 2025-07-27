// @ts-ignore
import { IsString, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    author!: string;

    @IsString()
    @IsNotEmpty()
    genre!: string;

    @IsString()
    @IsNotEmpty()
    isbn!: string;

    @IsNumber()
    @Min(0)
    stockCount!: number;
}

export class UpdateBookDto {
    @IsString()
    title?: string;

    @IsString()
    author?: string;

    @IsString()
    genre?: string;

    @IsString()
    isbn?: string;

    @IsNumber()
    @Min(0)
    stockCount?: number;
}
