import { Loader } from '@/shared/components/icons/Loader';
import { useTranslations } from '@/shared/hooks/useTranslations';

export const GoogleCallbackLoading = () => {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <Loader className="size-12 my-4" />
      <h2 className="text-2xl font-semibold mb-2">
        {t.signIn.title}
      </h2>
      <p className="text-muted-foreground">
        {t.signIn.description}
      </p>
    </div>
  );
};
