import bcrypt from 'bcrypt';
import { z } from 'zod';

const validator = z.object({
  password: z.string().min(1, 'Password is required')
})

const encrypt = async (password: string): Promise<{ password: string }> => {
  return new Promise( async (resolve, reject) => {
    const credential = await validator.spa(password);
    if(!credential.success) return reject({ error: credential.error.issues[0].message });
  
    const encrypted_password = await bcrypt.hash(password, 10);
    resolve({ password: encrypted_password })
  })
}

const verify = async ({ password, encrypted_password }: { password: string; encrypted_password: string }): Promise<boolean> => {
  return await bcrypt.compare(password, encrypted_password);

}

export { encrypt, verify };