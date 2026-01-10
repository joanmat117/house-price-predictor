import {type UserFormData } from '@/shared/schemas/UserSchema';
import { getAuthToken } from '../utils/getAuthToken';

export const userService = {
  async registerUser(data: UserFormData): Promise<{ id: string }> {
    try {
    const response = await fetch(`/api/register?token=${getAuthToken()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.json();
    } catch(e:any){
      console.log('Error registerin user: ',e)
      throw new Error(e.message || 'error registering user')
    }
  },
};
