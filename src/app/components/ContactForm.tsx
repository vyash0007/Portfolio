'use client';
import { useContactForm } from '@/hooks/useContactForm';

export default function ContactForm() {
  const { formData, formStatus, errorMessage, handleChange, handleSubmit } = useContactForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            disabled={formStatus === 'sending'}
            className="w-full bg-transparent border-b-2 border-dotted border-white/20 py-3 text-white placeholder-gray-500 focus:border-white/40 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-Mail"
            required
            disabled={formStatus === 'sending'}
            className="w-full bg-transparent border-b-2 border-dotted border-white/20 py-3 text-white placeholder-gray-500 focus:border-white/40 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>
      </div>

      <div>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
          disabled={formStatus === 'sending'}
          className="w-full bg-transparent border-b-2 border-dotted border-white/20 py-3 text-white placeholder-gray-500 focus:border-white/40 focus:outline-none transition-colors disabled:opacity-50"
        />
      </div>

      <div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          rows={6}
          required
          disabled={formStatus === 'sending'}
          className="w-full bg-transparent border-b-2 border-dotted border-white/20 py-3 text-white placeholder-gray-500 focus:border-white/40 focus:outline-none transition-colors resize-none disabled:opacity-50"
        ></textarea>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <button
          type="submit"
          disabled={formStatus === 'sending'}
          className="bg-white hover:bg-gray-200 text-black font-semibold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {formStatus === 'sending' ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>

        {formStatus === 'success' && (
          <div className="flex items-center gap-2 text-green-400 font-medium animate-fade-in">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Message sent successfully!
          </div>
        )}

        {formStatus === 'error' && (
          <div className="flex items-center gap-2 text-red-400 font-medium animate-fade-in">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {errorMessage || 'Failed to send message. Please try again.'}
          </div>
        )}
      </div>
    </form>
  );
}
