# React Auth Service

This project shows an example of how to set up an authentication service interface so external providers can adapt to your application.

## Structure

This application defines an interface `AuthService` that must be implemented by external providers.

It also defines a hook `useAuth` that integrates with the current provider and makes it available for consumers (React components/hooks in this case)

## Why is this important

More often than not we let external services drive how our applications are built and while it's fast to get something going, it's also not the best practice for an application that wishes to grow and scale.

## Construction parallel

If you had to build a house with ceiling fans on the front porch, would you first build the front porch with ceiling fans and then the rest of the house around that or would you first come up with a blueprint for a house that included a front porch large enough for a ceiling fan?

Think of this service definition as a blueprint for any authentication service. The application does not care (or need to know) about who is providing that service, only that it conforms to our specifications (or, the blueprint).

## Try it

Run this application with `npm start` and you will be able to sign-in using a local fake authentication provider; or firebase; or AWS. (I'll leave the configuration files in this repo and hope the internet won't mess too much with them 🤷).

To switch between providers you must edit the file `src/App.tsx` to use one of the 3 providers available (uncomment their lines and comment the others).
