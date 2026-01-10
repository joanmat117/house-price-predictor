import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
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
import { Loader2 } from 'lucide-react';

interface UserFormProps {
  onSuccess?: () => void;
}

export function UserForm({ onSuccess }: UserFormProps) {
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

  const mutation = useMutation({
    mutationFn: userService.registerUser,
    onSuccess: () => {
      form.reset();
      
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: Error) => {
    
    },
  });

  function onSubmit(data: UserFormData) {
    const formattedData = {
      ...data,
      phone_number: data.phone_number || undefined,
      real_state_agency: data.real_state_agency || undefined,
    };

    mutation.mutate(formattedData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  disabled={mutation.isPending}
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
              <FormControl>
                <Input 
                  placeholder="+1 (555) 123-4567" 
                  {...field} 
                  value={field.value || ''}
                  disabled={mutation.isPending}
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
                  disabled={mutation.isPending}
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
                    disabled={mutation.isPending}
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
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Registrando...
            </>
          ) : (
            'Registrarse'
          )}
        </Button>
      </form>
    </Form>
  );
}
