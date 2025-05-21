import { UserSettingsRepository } from "@/lib/user-settings-repository";

export class UserSettingsService {
  constructor(private userSettingsRepository: UserSettingsRepository) {}

  async updateUserSettings(userId: string, data: { pixKey?: string; pixKeyType?: string; isCreator?: boolean }) {
    return this.userSettingsRepository.updateUserSettings(userId, data);
  }
}
