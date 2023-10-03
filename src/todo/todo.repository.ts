import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TodoRepository {
    constructor(private readonly prisma: PrismaService) {}

    create = this.prisma.todo.create
    findMany = this.prisma.todo.findMany
    findUnique = this.prisma.todo.findUnique
    update = this.prisma.todo.update
    delete = this.prisma.todo.delete

}