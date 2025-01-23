import bcrypt from 'bcrypt';

export const encryptPassword = async (password: string): Promise<string> => {
    const genSalt = await bcrypt.genSalt();
    const encrypted = await bcrypt.hash(password, genSalt);
    return encrypted;
}