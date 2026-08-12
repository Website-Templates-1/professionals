# Blog content backlog

Editable topic queue for the Mintek Software blog. Topics are derived by auditing
the services and case studies in `src/config/siteConfig.js` and asking what a
small or growing GTA business would search before hiring a studio like Mintek.

Integrity rules (non-negotiable): never fabricate statistics, clients,
testimonials, results, or credentials. Only claim what the site already claims
(e.g. published starting prices, service-area statement, real case studies).

Workflow: pick a topic, drop a new `src/content/blog/<slug>.md` (copy
`_template.md`), link to the mapped service/case-study page and `/contact`, then
mark the topic Done and move it below.

Columns: Working title | Target keyword | Intent | Primary internal link(s)

## Done

- How Much Does a Business Website Cost in the GTA? | business website cost GTA | commercial/research | `/website-development`, `/web-design-brampton`
- Custom Software vs Off-the-Shelf: How to Choose | custom software vs off the shelf | research | `/custom-software-development`, `/case-studies/parking-marketplace-platform`
- 5 Repetitive Tasks You Can Automate with Google Sheets | google sheets automation for business | how-to | `/spreadsheet-automation`, `/google-sheets-website-development`, `/case-studies/google-sheets-event-discovery-app`
- Do You Need a Website or a Web Application? | website vs web application | research | `/website-development`, `/web-application-development`
- What Is Business Process Automation (and When Is It Worth It)? | business process automation small business | research | `/business-automation`, `/case-studies/restaurant-online-ordering-system`, `/case-studies/google-sheets-event-discovery-app`
- What Goes Into a High-Converting Restaurant Website | restaurant website design | commercial | `/restaurant-website-design`, `/case-studies/doaba-junction`, `/case-studies/relax-cafe`
- How Online Ordering Systems Work for Independent Restaurants | restaurant online ordering system | commercial/how-to | `/restaurant-website-design`, `/case-studies/restaurant-online-ordering-system`
- Signs Your Business Has Outgrown Spreadsheets | outgrown spreadsheets business software | research | `/spreadsheet-automation`, `/web-application-development`
- How a Custom Online Ordering System Paid Off for a Brampton Restaurant | custom online ordering system case study | commercial/proof | `/case-studies/restaurant-online-ordering-system`, `/custom-software-development`
- How to Scope a Custom Software Project (a Practical Checklist) | how to scope software project | how-to | `/custom-software-development`
- MVP First: Why We Recommend Starting Small | build an mvp first | research | `/custom-software-development`, `/web-application-development`
- What to Expect When You Build Custom Software | custom software development process | research | `/custom-software-development`
- Building a Marketplace: What to Plan Before You Start | how to build a marketplace | research | `/marketplace-development`, `/case-studies/parking-marketplace-platform`
- Native vs Web App for Your First Mobile Product | native vs web app | research | `/mobile-app-development`, `/web-application-development`
- Choosing a Software or Web Developer in the GTA: Questions to Ask | choosing a software developer | commercial | `/web-design-brampton`, `/custom-software-development`
- How Local SEO Works for GTA Service Businesses | local seo greater toronto area | how-to | `/website-development`, `/web-design-toronto`, `/web-design-brampton`, `/case-studies/pawpals`, `/case-studies/doaba-junction`
- How Much Does Custom Software Cost? A GTA Budgeting Guide | custom software cost | commercial/research | `/custom-software-development`, `/web-application-development`
- How We Built a Local Food Marketplace Connecting GTA Farmers and Shoppers | local food marketplace GTA | commercial/proof | `/marketplace-development`, `/web-application-development`, `/website-development`, `/case-studies/parking-marketplace-platform`, `/blog/building-a-marketplace-what-to-plan` — Published as `how-we-built-a-local-food-marketplace-for-the-gta.md`. Framed as a capability/build showcase of GTA Farm Market (an early preview build, pending onboarding), NOT a client case study. Only visible features described (produce/dairy/eggs storefront, delivery-or-farm-pickup at checkout, "meet the farms" profiles); no metrics, testimonials, or partner names fabricated; preview URL labelled temporary.
- Online Booking Software for Barbers, Makeup Artists and Small Studios | online booking software for barbers | commercial | `/web-application-development`, `/case-studies/bookme-scheduling-platform` — Published as `online-booking-software-for-barbers-and-studios.md`. Framed BookMe as a demonstration/prototype of web application work (not a paid client engagement). Only features and safeguards from siteConfig described; no fabricated no-show %, adoption, or revenue claims. Tags: scheduling, web applications, small business (scheduling already in TOPIC_MAP).

## Queued

- How to Stop No-Shows and Double-Bookings at Your Salon or Studio | reduce no-shows salon booking | how-to | `/web-application-development`, `/case-studies/bookme-scheduling-platform`

## Rejected (covered elsewhere)

- Signs You've Outgrown Off-the-Shelf Software | duplicates the "Consider custom when..." section and FAQ in `custom-software-vs-off-the-shelf.md`, and collides in format/intent with the live "Signs Your Business Has Outgrown Spreadsheets" post. Fold any unique angle into those posts instead of publishing a separate article.
- Do You Own Your Code? Why It Matters for Custom Software | code ownership is already an FAQ in `custom-software-vs-off-the-shelf.md` and `what-to-expect-building-custom-software.md`, and a core section of `choosing-a-software-developer-in-the-gta.md`. Too thin as a standalone; would cannibalize the "choosing a developer" post.
