import bcrypt from 'bcrypt'

export const comparePassword = async (password: string, encryptedPassword: string): Promise<boolean> => {
    const result = await bcrypt.compare(password, encryptedPassword);
    return result;
}