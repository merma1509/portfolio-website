import { useState } from 'react';

interface FormSubmissionOptions {
  endpoint: string;
  successMessage?: string;
  errorMessage?: string;
}

export function useFormSubmit(options: FormSubmissionOptions) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const submitForm = async (data: any) => {
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${options.endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        if (options.successMessage) {
          alert(options.successMessage);
        }
        return { success: true, data: await response.json() };
      } else {
        const errorData = await response.json().catch(() => ({}));
        setErrors(errorData.detail ? { general: errorData.detail } : { general: 'Submission failed' });
        if (options.errorMessage) {
          alert(options.errorMessage);
        }
        return { success: false, error: errorData };
      }
    } catch (error) {
      const errorMsg = 'Network error. Please try again.';
      setErrors({ general: errorMsg });
      if (options.errorMessage) {
        alert(options.errorMessage);
      }
      return { success: false, error: errorMsg };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitForm, isSubmitting, errors };
}
