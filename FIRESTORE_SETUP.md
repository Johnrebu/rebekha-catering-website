# Email Webhook Configuration

This project uses Firestore for storing inquiries and needs an email webhook service to send notifications.

## Setup Options

### Option 1: Firebase Cloud Functions (Recommended)
Set up a Cloud Function to listen for new documents in the `inquiries` collection and send emails via SendGrid or another service.

### Option 2: Vercel Serverless Functions (If using Vercel)
Create a serverless function endpoint and add to `.env.local`:
```
VITE_EMAIL_WEBHOOK_URL=https://your-domain.vercel.app/api/send-inquiry-email
VITE_EMAIL_WEBHOOK_SECRET=your-secret-key
```

### Option 3: External Service (Zapier, Make.com)
1. Set up a webhook in Zapier/Make.com
2. Create an automation to send emails when a new document is added to Firestore
3. Add the webhook URL to `.env.local`

### Option 4: Custom Backend
Set up your own backend (Node.js, Python, etc.) to handle emails:
```
VITE_EMAIL_WEBHOOK_URL=https://your-backend.com/api/send-inquiry-email
VITE_EMAIL_WEBHOOK_SECRET=your-api-key
```

## Environment Variables

Create a `.env.local` file in the project root with:

```env
# Firebase config (already in src/config/firebase.ts)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Email webhook (optional - form will still work without this)
VITE_EMAIL_WEBHOOK_URL=https://your-webhook-url.com/send-email
VITE_EMAIL_WEBHOOK_SECRET=your_secret_key
```

## Firestore Setup

### Step 1: Create the "inquiries" Collection

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `rebekhacaterers-a6002`
3. Navigate to **Firestore Database** section
4. Click the **Data** tab
5. Click **Start collection** (or **Add collection**)
6. Set the Collection ID to `inquiries`
7. Create an initial dummy document using **Auto-ID** to initialize the collection
   - You can safely delete this dummy document once your web form starts sending live data

### Step 2: Configure Security Rules

1. In Firestore Console, go to the **Rules** tab
2. Replace the entire ruleset with this configuration:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Allow anyone to submit an inquiry, but block public reading, editing, or deleting
    match /inquiries/{inquiryId} {
      allow create: if true;
      allow read, update, delete: if false;
    }
    
    // Secure other collections by default
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click **Publish** to activate the rules

**⚠️ Important:** Disallowing `read` access on the `inquiries` collection ensures that public users cannot browse other people's submitted messages.

### Step 3: Verify Setup

Once published, your backend is ready! Test by:
1. Running your dev server locally
2. Filling out the contact form
3. Checking Firestore Database → `inquiries` collection to see the new submission

## Testing

1. The form will now save submissions to Firestore
2. Check Firebase Console → Firestore → `inquiries` collection to see submissions
3. Emails will only send if you configure a webhook URL
4. Without webhook, submissions are still stored and you can access them in Firebase Console

## Cloud Function Example (Optional)

If using Firebase Cloud Functions, create a function like:

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  }
});

exports.sendInquiryEmail = functions.firestore
  .document('inquiries/{docId}')
  .onCreate(async (snap) => {
    const data = snap.data();
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: data.email,
      subject: 'We Received Your Catering Inquiry - Rebekha Catering Services',
      html: generateEmailTemplate(data),
    };

    await transporter.sendMail(mailOptions);
  });
```

## Support

For questions about Firestore setup, visit: https://firebase.google.com/docs/firestore
