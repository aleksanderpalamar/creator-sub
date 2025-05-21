import prisma from "@/lib/prisma";

export class UserSettingsRepository {
  async updateUserSettings(userId: string, data: { pixKey?: string; pixKeyType?: string; isCreator?: boolean }) {
    return prisma.user.update({
      where: { id: userId },
      data,
    });
  }
}
