import prisma from "@/lib/prisma";

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async createUser(data: {
    name: string;
    email: string;
    password: string;
    isCreator: boolean;
  }) {
    return prisma.user.create({ data });
  }
}
