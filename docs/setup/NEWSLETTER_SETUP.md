# Newsletter Setup Guide

## Mailchimp Integration

This project includes a newsletter signup feature integrated with Mailchimp. Follow these steps to set it up:

### 1. Create a Mailchimp Account
- Go to [mailchimp.com](https://mailchimp.com) and create a free account
- Verify your email address

### 2. Create an Audience (List)
- In your Mailchimp dashboard, go to "Audience" > "All contacts"
- Click "Create Audience" if you don't have one
- Fill in the required information
- Note down your **Audience ID** (List ID)

### 3. Get Your API Key
- Go to Account > Extras > API Keys
- Click "Create A Key"
- Copy the API key
- Note the server prefix (e.g., `us1`, `us2`) from your API key

### 4. Environment Variables
Create a `.env.local` file in your project root with:

```env
MAILCHIMP_API_KEY=your_api_key_here
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_LIST_ID=your_list_id_here
```

### 5. Example Configuration
```env
MAILCHIMP_API_KEY=abc123def456-us1
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_LIST_ID=a1b2c3d4e5
```

### 6. Test the Integration
1. Start your development server: `npm run dev`
2. Go to your homepage
3. Scroll to the newsletter section
4. Enter an email address and click "Subscribe"
5. Check your Mailchimp audience to see the new subscriber

### Features Included
- ✅ Email validation
- ✅ Duplicate email handling
- ✅ Loading states
- ✅ Success/error messages
- ✅ Responsive design
- ✅ Accessibility features

### Customization
You can customize the newsletter section by editing:
- `src/components/home/NewsletterSection.js` - UI and styling
- `src/app/api/newsletter/route.js` - API logic and Mailchimp integration

### Troubleshooting
- **"Newsletter service is not configured"**: Check your environment variables
- **"This email is already subscribed"**: User is already in your Mailchimp list
- **Network errors**: Check your internet connection and Mailchimp API status

### Security Notes
- Never commit your `.env.local` file to version control
- Keep your Mailchimp API key secure
- Consider implementing rate limiting for production use
