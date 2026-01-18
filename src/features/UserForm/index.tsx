import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSchema, type UserFormData } from '@/shared/schemas/UserSchema';
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
import { useTranslations } from '@/shared/hooks/useTranslations';
import { Loader } from '@/shared/components/icons/Loader';

interface UserFormProps {
  onSubmit: (data: UserFormData) => Promise<void>;
  isSubmitting: boolean;
}

export function UserForm({ onSubmit, isSubmitting }: UserFormProps) {
  const t = useTranslations();

  const form = useForm<UserFormData>({
    resolver: zodResolver(UserSchema as any),
    defaultValues: {
      name: '',
      is_agent: false,
      phone_number: '',
      real_state_agency: '',
    },
  });

  const isAgent = form.watch('is_agent');

  // Función para manejar cambios en el input de teléfono
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    // Permitir solo números y espacios
    const value = e.target.value.replace(/[^\d\s]/g, '');
    field.onChange(value);
  };

  // Format data before sending it up to the parent
  const handleFormSubmit = (data: UserFormData) => {
    const formattedData = {
      ...data,
      // Agregar prefijo +57 solo si hay algún número
      phone_number: data.phone_number && data.phone_number.trim() !== '' 
        ? `+57${data.phone_number.replace(/\D/g, '')}` 
        : undefined,
      real_state_agency: data.is_agent ? data.real_state_agency : undefined,
    };
    return onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6 p-3 max-w-lg mx-auto">
        <h1 className='text-2xl font-bold text-center'>
          {t.register.title}
        </h1>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.register.fullName.label}</FormLabel>
              <FormControl>
                <Input 
                  placeholder={t.register.fullName.placeholder} 
                  {...field} 
                  disabled={isSubmitting}
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
              <FormLabel>{t.register.phoneNumber.label}</FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2 text-gray-500 pointer-events-none">
                    <span className="text-sm font-medium">🇨🇴</span>
                    <span className="text-sm font-medium">+57</span>
                  </div>
                  <Input 
                    placeholder={t.register.phoneNumber.placeholder} 
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => handlePhoneChange(e, field)}
                    disabled={isSubmitting}
                    className="pl-20"
                  />
                </div>
              </FormControl>
              <FormDescription>
                {t.register.phoneNumber.description}
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
                  disabled={isSubmitting}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{t.register.isAgent.label}</FormLabel>
                <FormDescription>
                  {t.register.isAgent.description}
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
                <FormLabel>{t.register.realStateAgency.label}</FormLabel>
                <FormControl>
                  <Input 
                    placeholder={t.register.realStateAgency.placeholder} 
                    {...field} 
                    value={field.value || ''}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  {t.register.realStateAgency.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader className="mr-2 size-6 animate-spin" />
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
