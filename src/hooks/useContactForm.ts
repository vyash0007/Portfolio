import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

interface UseContactFormReturn {
  formData: FormData;
  formStatus: FormStatus;
  errorMessage: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  resetForm: () => void;
}

export const useContactForm = (): UseContactFormReturn => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    setErrorMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "");
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("message", formData.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to send message');
      }

      setFormStatus('success');
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);

    } catch (error) {
      setFormStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
      
      // Reset error status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setFormStatus('idle');
    setErrorMessage('');
  };

  return {
    formData,
    formStatus,
    errorMessage,
    handleChange,
    handleSubmit,
    resetForm
  };
};
