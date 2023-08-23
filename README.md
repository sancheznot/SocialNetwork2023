This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## .ENV Configuration

You need to do some things before start, need set the Evironment Variable
such as :

- [GOOGLE_ID](https://console.developers.google.com/apis/credentials) - Here you can set and get your google ID.
- [GOOGLE_SECRET](https://console.developers.google.com/apis/credentials) - After that you can get the Secret too.
- [MONGODB_URI](https://www.mongodb.com/) - Go there and get your mongoDB URI.
- [NEXTAUTH_SECRET](example: -hello_world-) - The toke use this secrete for authenticate the USER.

After do everything you can start the project and you can go to this URL [http://localhost:3000/register] (http://localhost:3000/register)

Now you can check your mongoAtlas and you will see a new users added 

if you try this path [http://localhost:3000/dashboard/profile] (http://localhost:3000/dashboard/profile)
if all are right, you will see all information about the user

