# n8n Integration Guide

This guide explains how to integrate n8n workflows to automatically trigger actions when users sign up.

## What is n8n?

n8n is a workflow automation tool that allows you to connect different services and automate tasks. You can use it to:
- Send welcome emails to new users
- Log user details to Google Sheets
- Send notifications to Slack/Discord
- Add users to your CRM
- And much more!

## Use Cases

### 1. Send Welcome Email
Automatically send a personalized welcome email to new users after they sign up.

### 2. Log to Google Sheets
Keep track of new signups by automatically adding user details to a Google Sheet.

### 3. Notify Your Team
Get instant notifications in Slack or Discord when someone signs up.

### 4. Add to Email Marketing
Automatically add new users to your email marketing list (Mailchimp, SendGrid, etc.).

## Setup Instructions

### Step 1: Create an n8n Account

1. Go to [n8n.io](https://n8n.io)
2. Sign up for a free account (n8n Cloud)
3. Or self-host n8n if you prefer

### Step 2: Create a New Workflow

1. Log in to your n8n dashboard
2. Click "Create New Workflow"
3. Give it a name like "New User Signup Handler"

### Step 3: Add a Webhook Trigger

1. Click the "+" button to add a node
2. Search for "Webhook" and select it
3. Configure the webhook:
   - HTTP Method: POST
   - Path: `/signup` (or any path you prefer)
4. Click "Execute Node" to get your webhook URL
5. Copy the webhook URL (e.g., `https://your-instance.app.n8n.cloud/webhook/YOUR_ID`)

### Step 4: Add Actions

#### Option A: Send Welcome Email

1. Add an "Email" node after the webhook
2. Configure the email settings:
   - To: `{{ $json.email }}`
   - Subject: "Welcome to Our Platform!"
   - Body: `Hi {{ $json.name }}, welcome to our platform!`
3. Connect your email provider (Gmail, SendGrid, etc.)

#### Option B: Add to Google Sheets

1. Add a "Google Sheets" node after the webhook
2. Authenticate with Google
3. Configure the node:
   - Operation: Append
   - Document: Select your Google Sheet
   - Sheet: Sheet1 (or your preferred sheet)
   - Columns to Send: name, email, timestamp

#### Option C: Send Slack Notification

1. Add a "Slack" node after the webhook
2. Authenticate with Slack
3. Configure the message:
   - Channel: #signups
   - Text: `New user signed up: {{ $json.name }} ({{ $json.email }})`

### Step 5: Activate the Workflow

1. Save your workflow
2. Toggle the switch to "Active"
3. Your webhook is now live and ready to receive data

## Integration with Your App

### Method 1: Modify AuthContext (Recommended)

Edit `src/contexts/AuthContext.tsx` and update the `signUp` function:

```typescript
const signUp = async (email: string, password: string, name: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: data.user.id, name, email }]);

      if (profileError) throw profileError;

      // Trigger n8n webhook
      try {
        await fetch('YOUR_N8N_WEBHOOK_URL', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            userId: data.user.id,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (webhookError) {
        console.error('n8n webhook error:', webhookError);
      }
    }

    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
};
```

### Method 2: Use Supabase Database Webhooks

1. In your Supabase Dashboard, go to Database → Webhooks
2. Create a new webhook:
   - Name: "New User Signup"
   - Table: `profiles`
   - Events: INSERT
   - Webhook URL: Your n8n webhook URL
3. Save the webhook

This will automatically trigger n8n whenever a new profile is created.

## Example Workflows

### 1. Welcome Email + Google Sheets

```
Webhook → Google Sheets → Email
```

1. Receive signup data via webhook
2. Log to Google Sheets
3. Send welcome email

### 2. Multi-Channel Notification

```
Webhook → Split in Batches → [Slack, Discord, Email]
```

1. Receive signup data
2. Split to multiple channels
3. Notify all channels simultaneously

### 3. Advanced Onboarding

```
Webhook → Google Sheets → Delay → Email Sequence
```

1. Log to Google Sheets
2. Wait 1 day
3. Send first onboarding email
4. Wait 3 days
5. Send second onboarding email

## Testing Your Integration

1. Go to your signup page
2. Create a test account
3. Check that:
   - The user is created in Supabase
   - The n8n workflow is triggered
   - The desired action occurs (email sent, sheet updated, etc.)

## Webhook Payload

Your n8n webhook will receive the following data:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "userId": "uuid-here",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

You can access these values in n8n using:
- `{{ $json.name }}`
- `{{ $json.email }}`
- `{{ $json.userId }}`
- `{{ $json.timestamp }}`

## Security Considerations

1. **Webhook Authentication**: Add a secret token to your webhook URL
2. **HTTPS Only**: Always use HTTPS for webhooks
3. **Validate Data**: Verify incoming data in your n8n workflow
4. **Rate Limiting**: Implement rate limiting if needed
5. **Error Handling**: Add error nodes to handle failures gracefully

## Troubleshooting

### Webhook Not Triggering
- Verify the webhook URL is correct
- Check that the workflow is Active
- Look for errors in the browser console
- Test the webhook directly with Postman

### Email Not Sending
- Verify email credentials are correct
- Check spam folder
- Ensure email node is properly configured
- Check n8n execution logs

### Google Sheets Not Updating
- Verify Google authentication is valid
- Check that the spreadsheet exists
- Ensure column mappings are correct
- Verify sheet permissions

## Advanced Features

### 1. Conditional Logic

Add an "IF" node to send different emails based on user attributes:

```
Webhook → IF (email contains "company.com") →
  - Yes: Send enterprise welcome email
  - No: Send standard welcome email
```

### 2. User Segmentation

Use "Switch" node to segment users:

```
Webhook → Switch (by domain) →
  - gmail.com: Tag as personal user
  - company domains: Tag as business user
```

### 3. A/B Testing

Randomly assign users to different email campaigns:

```
Webhook → Function (random number) → Switch →
  - 50%: Version A email
  - 50%: Version B email
```

## Resources

- [n8n Documentation](https://docs.n8n.io)
- [n8n Community](https://community.n8n.io)
- [Webhook Best Practices](https://docs.n8n.io/workflows/webhooks/)
- [Google Sheets Integration](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/)

## Need Help?

If you encounter issues:
1. Check n8n execution logs
2. Test webhook with Postman/curl
3. Verify credentials and permissions
4. Ask in the n8n community forum
