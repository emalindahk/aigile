Aigile Ai Saas(Software as a Service) is an application that leverages cutting-edge technologies to provide a versatile and powerful platform for various AI-related tasks. It utilizes Tailwind CSS for styling, Clerk for authentication, Next.js for the frontend and API creation, and OpenAI for image generation, code generation, conversational AI, music generation, and video generation.

## Getting Started

Clone this repository to your local machine.

```bash
git clone [https://github.com/emalindahk/aigile.git](https://github.com/emalindahk/aigile.git)
cd aigile
```

Install the necessary dependencies using npm or yarn.

```bash
npm install
# or
yarn
```

Set up your environment variables in a .env.local file. You should define variables for Clerk authentication, OpenAI API keys, Replicate token and clerk routes.

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxx
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Technologies Used
**Tailwind CSS**: Used for styling the application's user interface.

**Clerk**: Provides authentication and user management capabilities.

**Next.js**: A React framework for building the frontend and creating APIs.

**OpenAI**: Utilized for various AI capabilities, including image generation, code generation, and conversational AI.

**Replicate**: For AI music and video generation.

## Features
Our AI SaaS application offers the following features:

**User Authentication**: Secure user authentication and management powered by Clerk.

**API Creation**: Easily create and manage APIs using Next.js.

**Image Generation**: Generate images using OpenAI's advanced models.

**Code Generation**: Automatically generate code snippets for various programming tasks.

**Conversational AI**: Engage in natural language conversations with AI-powered chatbots.

**Music Generation**: Create original music compositions with AI assistance.

**Video Generation**: Generate videos and animations using AI-driven techniques.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.