import {type UserFormData } from '@/shared/schemas/UserSchema';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const userService = {
  async registerUser(data: UserFormData,authToken:string): Promise<{detail?:Record<string,any>[]|string,token?:string}> {
    try {
    const response = await fetch(`${BACKEND_URL}/register?token=${authToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.json();
    } catch(e:any){
      console.log('Error registering user: ',e)
      throw new Error(e.message || 'error registering user')
    }
  },
};
