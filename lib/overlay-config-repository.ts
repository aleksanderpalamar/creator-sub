import prisma from "@/lib/prisma";

export class OverlayConfigRepository {
  async findByCreatorId(creatorId: string) {
    return prisma.overlayConfig.findUnique({ where: { creatorId } });
  }

  async upsertConfig(creatorId: string, config: any) {
    return prisma.overlayConfig.upsert({
      where: { creatorId },
      update: { config },
      create: { creatorId, config },
    });
  }
}
