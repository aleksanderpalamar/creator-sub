import { UserRepository } from "@/lib/user-repository";
import { hashPassword } from "./validation-utils";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async registerUser(input: {
    name: string;
    email: string;
    password: string;
    isCreator: boolean;
  }) {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new Error("Esse email já está cadastrado.");
    }
    const hashedPassword = await hashPassword(input.password);
    const user = await this.userRepository.createUser({
      ...input,
      password: hashedPassword,
    });
    // Remove password do retorno
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
