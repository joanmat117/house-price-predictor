import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSchema, type UserFormData } from '@/shared/schemas/UserSchema';
import { userService } from '@/shared/services/userService';
import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { useRedirectAfterLogin } from '@/shared/hooks/useRedirectAfterLogin';
import { useTranslations } from '@/shared/hooks/useTranslations';
import { Loader } from '@/shared/components/icons/Loader';
import { useAuthentication } from '@/shared/hooks/useAuthentication';
import { useState } from 'react';

interface UserFormProps {
  onSuccess?: () => void;
  registerToken:string
}

export function UserForm({registerToken,onSuccess}: UserFormProps) {
  
  const {setAuthToken} = useAuthentication()
  const t = useTranslations()
  const {redirect} = useRedirectAfterLogin()
  const [isLoading,setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(UserSchema as any),
    defaultValues: {
      name: '',
      is_agent: false,
      phone_number: '',
      real_state_agency: '',
    },
  });

  const isAgent = form.watch('is_agent');

  async function onSubmit(data: UserFormData) {
    const formattedData = {
      ...data,
      phone_number: data.phone_number || undefined,
      real_state_agency: data.real_state_agency || undefined,
    };
    try {
      setIsLoading(true)
    const res = await userService.registerUser(formattedData,registerToken);
      if(typeof res === 'string'){
        setAuthToken(res)
        form.reset()
        onSuccess && onSuccess()
        redirect()
      } else {
        alert('Error durign registering') 
      }
    } catch(e){
      console.log('Error in registering response: ',e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-3 max-w-lg mx-auto">
        <h1 className='text-2xl font-bold text-center'>
        {t.register.title}
        </h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre completo *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ingrese su nombre completo" 
                  {...field} 
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de teléfono</FormLabel>
              <FormControl >
                <Input 
                  placeholder="+1 (555) 123-4567" 
                  {...field} 
                  value={field.value || ''}
                  disabled={isLoading}
                />
              </FormControl>
              <FormDescription>
                Opcional - Puede dejarlo en blanco si no desea proporcionarlo
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_agent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>¿Es agente inmobiliario?</FormLabel>
                <FormDescription>
                  Marque esta opción si es un agente inmobiliario
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {isAgent && (
          <FormField
            control={form.control}
            name="real_state_agency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agencia inmobiliaria</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Nombre de su agencia" 
                    {...field} 
                    value={field.value || ''}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription>
                  Opcional - Solo para agentes inmobiliarios
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="mr-2 size-6" />
              {t.register.submitPending}
            </>
          ) : (
          t.register.submit
          )}
        </Button>
      </form>
    </Form>
  );
}
