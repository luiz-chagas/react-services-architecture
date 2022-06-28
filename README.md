# React Services Architecture

This project shows an example of how to set up a service interface so external providers can adapt to your application.

## Motivation

This is how I perceive most React applications, which is fine but does not scale well after many features:
![old style react application](https://github.com/luiz-chagas/react-services-architecture/blob/main/old-style.jpg?raw=true)

After some research, I would like to propose writing applications with the following design:

![structured react application](https://github.com/luiz-chagas/react-services-architecture/blob/main/better-style.jpg?raw=true)

There are pros and cons to either models but I believe the proposed one is better suited for evolving applications.

## Structure

This repo has an application defined with some service interfaces (example: `AuthService`) that must be implemented by external providers.

It also defines hooks (example: `useAuth`) that integrates a service provider and makes it available for consumers (React components/hooks in this case).

It does not implement the whole architecture in the picture above but it's a good start.

## Defining new services

Defining new services isn't complicated, it feels a little cumbersome at first but the idea is that you have a more maintanable piece of software down the road.
Here are the steps to create a service that fits this design/architecture:

1. Define the service interface `src/services` at a high level, try to include all the necessary functions to make it operational
2. Create a react provider for it `src/ui/providers`. This provider creates a React Context and defines what consumers will get out of the `useService` hook and also handle any stateful logic in a generic way
3. Make a connector (called adapter `src/adapters`) from whatever external service you are using into the service you defined on step 1.
4. Put it all together inside your main App `src/ui/App.tsx` (React Provider + Adapter), best practice is to make the service a parameter of your application and pass it in whenever you instantiate your app (`src/index.tsx`).

## Why is this important

More often than not we let external services drive how our applications are built and while it's fast to get something going, it's also not the best practice for an application that wishes to grow and scale.

## Construction parallel

If you had to build a house with ceiling fans on the front porch, would you first build the front porch with ceiling fans and then the rest of the house around that or would you first come up with a blueprint for a house that included a front porch large enough for a ceiling fan?

Think of this service definition as a blueprint for any external connection. The application does not care (or need to know) about who is providing that service, only that it conforms to our specifications (or, the blueprint).

## Try it

Run this application with `npm start` and you will be able to sign-in using a local fake authentication provider; or firebase; or AWS. (I'll leave the configuration files in this repo and hope the internet won't mess too much with them 🤷).

To switch between providers you could edit the file `src/index.tsx` and use any of the adapters available.
