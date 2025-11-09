# Contact Form Implementation

This contact form is implemented in a modular way with separate concerns for better maintainability.

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # API route handler
│   ├── components/
│   │   └── ContactForm.tsx       # Contact form component
│   └── page.tsx                  # Main page (imports ContactForm)
└── hooks/
    └── useContactForm.ts         # Custom hook for form logic
```

## How It Works

### 1. **Custom Hook (`useContactForm.ts`)**
- Manages form state (name, email, subject, message)
- Handles form status (idle, sending, success, error)
- Provides `handleChange` for input updates
- Provides `handleSubmit` for form submission
- Auto-resets form after successful submission
- Auto-clears status messages after 5 seconds

### 2. **Contact Form Component (`ContactForm.tsx`)**
- Uses the `useContactForm` hook
- Renders all form fields with proper validation
- Shows loading state while sending
- Displays success/error messages with icons
- Disables inputs during submission
- Includes animated spinner for better UX

### 3. **API Route (`api/contact/route.ts`)**
- Validates incoming form data
- Validates email format using regex
- Sends email using FormSubmit.co service
- Returns proper error messages
- Handles all edge cases

### 4. **Email Service**
The form uses **FormSubmit.co**, a free service that:
- Sends form data to your email (vyash5407@gmail.com)
- Doesn't require API keys or authentication
- Works out of the box
- Formats emails in a table layout
- No CAPTCHA required

## Email Details You'll Receive

When someone submits the form, you'll receive an email at **vyash5407@gmail.com** containing:

- **Name**: Sender's name
- **Email**: Sender's email (you can reply to this)
- **Subject**: Message subject
- **Message**: Full message content
- **Timestamp**: When the message was sent

## Features

✅ **Modular Architecture**: Separated into hooks, components, and API routes
✅ **Type-Safe**: Full TypeScript support
✅ **Form Validation**: Required fields and email validation
✅ **User Feedback**: Loading states, success/error messages
✅ **Auto-Reset**: Form clears after successful submission
✅ **Accessibility**: Proper HTML semantics and ARIA labels
✅ **Responsive**: Works on all screen sizes
✅ **Error Handling**: Graceful error messages
✅ **No Backend Required**: Uses third-party service

## Testing the Form

1. Fill in all required fields
2. Click "Send Message"
3. You'll see a loading spinner
4. On success: Green checkmark with success message
5. On error: Red X with error message
6. Check your email at vyash5407@gmail.com

## Customization

### Change Email Address
Edit `src/app/api/contact/route.ts`:
```typescript
const response = await fetch('https://formsubmit.co/ajax/YOUR_EMAIL@gmail.com', {
  // ...
});
```

### Modify Success/Error Messages
Edit `src/app/components/ContactForm.tsx` to change the text displayed.

### Add More Fields
1. Update the `FormData` interface in `src/hooks/useContactForm.ts`
2. Add the field to the form in `src/app/components/ContactForm.tsx`
3. The API route will automatically handle it

## Alternative Email Services

If you want to use a different service:

### Option 1: SendGrid (Recommended for production)
- Install: `npm install @sendgrid/mail`
- Get API key from SendGrid
- Update API route to use SendGrid

### Option 2: Nodemailer with Gmail
- Install: `npm install nodemailer`
- Configure Gmail app password
- Update API route to use Nodemailer

### Option 3: Resend (Modern alternative)
- Install: `npm install resend`
- Get API key from Resend
- Update API route to use Resend

## Security Notes

- FormSubmit.co is safe and widely used
- All data is transmitted over HTTPS
- No sensitive data is stored in the frontend
- Email validation prevents spam
- CAPTCHA is disabled for better UX (can be enabled if needed)

## Troubleshooting

**Form not sending?**
- Check browser console for errors
- Verify internet connection
- Check that email address is correct in API route

**Not receiving emails?**
- Check spam folder
- Verify email address in `route.ts`
- Test with FormSubmit.co directly

**Error messages?**
- Check that all fields are filled
- Verify email format is valid
- Check browser console for detailed errors
