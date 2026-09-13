---
name: "Fintio"
tag: "Personal annual budget planner for European households"
excerpt: "Running a whole year's budget in a spreadsheet works until a formula breaks, you can't open it on your phone and every January means copying and cleaning the template. Fintio turns it into an app: set up categories and projections once, log each month's transactions, and it works out carry-overs, the 50/30/20 rule, subscriptions, savings and net worth without touching a formula. I built it solo, from product to deployment; it's a public MVP in production since December 2025."
year: "2025"
role: "Founder · product, design and engineering"
status: "Public MVP in production"
stack:
  - Next.js 16
  - React 19
  - TypeScript
  - MongoDB Atlas
  - Clerk
url: https://fintio.app
cover: /projects/fintio.jpg
gallery:
  - /projects/fintio-features.jpg
  - /projects/fintio-security.jpg
order: 3
source: es
translatedFrom: es
---

## The problem

Running a whole year's budget in a spreadsheet works, but it is fragile. A formula that breaks in March throws off the rest of the year, you can't check or log anything from your phone, and every January means copying the template, cleaning it up and hoping nothing gets lost along the way.

## What I built

Fintio turns that spreadsheet into a web app. You set up the year's categories and projections once, log transactions month by month, and the app handles the rest: carry-overs between months, the 50/30/20 rule, recurring subscriptions, savings goals and net worth. No formulas to maintain, and your data available from any device.

- **Recurring**: fixed expenses and income are generated automatically every month.
- **Calendar**: a monthly view for planning transactions.
- **Annual dashboard**: the year at a glance with a breakdown by category.
- **50/30/20**: the rule applied to your real numbers, not to an example.
- **Savings and net worth**: goals and their evolution over time.

## Technical decisions

- **Next.js 16 and React 19** with the App Router and Server Actions: most of the app is server components and the client only loads what is interactive.
- **MongoDB Atlas** as the database: an annual budget is a natural document (year → months → transactions) and doesn't force a migration every time a new category shows up.
- **Clerk** for authentication: sign-up, sessions and account recovery solved without writing a line of auth code.
- **Tailwind CSS v4 and shadcn/ui** for the interface, deployed on Vercel.
- Built for European households: euros, multiple currencies and GDPR as a design requirement, not an afterthought.

## Status

Fintio has been in production since December 2025 as a public MVP, under the Collybrix umbrella. I built it solo, from product to deployment. Right now I'm working on account tracking and on net worth over time.
