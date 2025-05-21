import prisma from "@/lib/prisma";

export class PlanRepository {
  async createPlan(data: {
    name: string;
    description?: string;
    price: number;
    benefits?: string[];
    creatorId: string;
  }) {
    return prisma.subscriptionPlan.create({
      data: {
        ...data,
        benefits: data.benefits ? JSON.stringify(data.benefits) : undefined,
      },
    });
  }
}
