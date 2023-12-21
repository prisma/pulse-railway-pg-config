# Create a Pulse-ready Postgres Database on railway.app

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/pulse-pg)

This project is used to configure a Postgres database on [railway.app](https://railway.app) to be used with [Prisma Pulse](https://prisma.io/pulse). This enables you to quickly set up a database without having to do any configuration. Click the `Deploy on Railway` button above to get started.

## Once the template is deployed

### Get your database connection string and delete the service

-   Click on the service called `restart-db-then-delete-me`
-   You will see a list of deployments under the **Deployments** tab.
-   Click the most recent build's **View Logs** button.
-   Click on the **Deploy Logs** tab.
    > If the service ran correctly, you should see a message in the logs that says _"All done please restart the database"_ along with your `DATABASE_URL` connection string.
-   Copy the `DATABASE_URL` connection string and save it for later.
-   Close the logs view with the **X** in the top right corner of the opened drawer.
-   Navigate to the settings tab of the `restart-db-then-delete-me` service.
-   Scroll down to the bottom and click the red **Delete Service from All Environments** button.
    > Note: If you would like to use this service and the corresponding repo to create a new Pulse project. You can by cloning the repo from your GitHub account to your local machine.
    -   Once you have cloned the repository, you can run the following command.
        ```bash
        rm config-db.ts
        ```
    -   Then remove the script `start: ts-node config-db.ts` from the `scripts` object in the `package.json` file.
        > This is to prevent the script from running every time you push up to the repo associated with the `restart-db-then-delete-me` service.

### Restart your database

-   Go into your project on the railway dashboard
-   Click on the **Postgres** database
-   Navigate to the **Deployments** tab
-   Click the dropdown for your current deployment, click **Restart**

## How to connect Pulse to your database

[Documentation Reference](https://prismaio.notion.site/Pulse-documentation-137ca256325d4a22b80b54a89975f059?pvs=25#f241de6db85f42f5a6db7d27efbd73a1)

-   Go to your [Prisma Data Platform dashboard](https://cloudprojects.prisma.io)
-   Click on the project you want to add Pulse to (or create a new one)
-   Click on **Configure Pulse**
-   Paste in the connection string from the railway dashboard

> The connection string can be found by clicking on the **Postgres** database and navigating to the **Connect** tab, then clicking the copy icon next to `DATABASE_URL`

Once you have done that, you will need to wait for Pulse to establish the connection. This can take a few minutes.

Now you can follow [the Pulse documentation to get started using Pulse in your projects](https://prismaio.notion.site/Pulse-documentation-137ca256325d4a22b80b54a89975f059#e8420b42cfd24b94aa6848a2c4993855).

## More example Pulse projects

-   [Pulse Railway Starter Project](https://github.com/prisma/pulse-railway-starter)
-   [Pulse Multi-Subscription Project](https://github.com/prisma/pulse-starter)

## More information about Pulse

-   [Pulse documentation](https://pris.ly/pulse-docs)
-   [Pulse setup video](https://www.youtube.com/watch?v=Lvn05wM26zs)
-   [Pulse announcement blog post](https://www.prisma.io/blog/introducing-pulse-jtu4UPC8ujy4)
