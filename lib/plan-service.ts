import { PlanRepository } from "@/lib/plan-repository";

export class PlanService {
  constructor(private planRepository: PlanRepository) {}

  async createPlan(input: {
    name: string;
    description?: string;
    price: number;
    benefits?: string[];
    creatorId: string;
  }) {
    // Aqui pode-se adicionar regras de negócio, validações, etc.
    return this.planRepository.createPlan(input);
  }
}
