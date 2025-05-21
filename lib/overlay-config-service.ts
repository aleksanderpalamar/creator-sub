import { OverlayConfigRepository } from "@/lib/overlay-config-repository";

export class OverlayConfigService {
  constructor(private overlayConfigRepository: OverlayConfigRepository) {}

  async getConfig(creatorId: string) {
    return this.overlayConfigRepository.findByCreatorId(creatorId);
  }

  async saveConfig(creatorId: string, config: any) {
    return this.overlayConfigRepository.upsertConfig(creatorId, config);
  }
}
