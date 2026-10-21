---
title: "Almost Half the Brampton Sample Looked Like WordPress. That Does Not Explain the Slow Pages."
metaDescription: "WordPress signals appeared on 43 of 87 Brampton homepages (49.4%). Scored WordPress sites sat near the sample median. The platform is not the cause."
date: "2026-10-21"
author: "Mintek Software"
tags: ["websites", "local seo", "small business"]
category: "Research"
scopeTool: true
relatedServices: ["web-design-brampton", "website-development"]
faqs:
  - q: "How many Brampton homepages looked like WordPress in the 2026 study?"
    a: >-
      On **87** fetched homepages, WordPress signals (`wp-content` or a
      WordPress generator, including the word “wordpress” in the HTML) appeared
      on **43 (49.4%)**. Shopify signals appeared on **6 (6.9%)**, Wix on
      **3 (3.4%)**, Squarespace on **2 (2.3%)**, and Webflow on **1 (1.1%)**.
      Tables are in
      [The State of Brampton Business Websites: 2026](/research/brampton-business-websites-2026).
  - q: "Did WordPress cause the 8.3 second median LCP?"
    a: >-
      No. WordPress homepages that received a Lighthouse score (**n=35**) had
      median performance **56**, next to the sample median of **56.5** on
      **76** scored homepages. Median Largest Contentful Paint was **8.3
      seconds** across those 76 runs. The study does not show that WordPress,
      Shopify, or any builder caused that paint time.
  - q: "What could the CMS check actually see?"
    a: >-
      A text pattern in the fetched homepage HTML, the generator tag, or the
      page URL. It could not see the theme, the plugin list, who hosts the
      site, or whether the business still uses that system to edit pages. A
      match is a signal. A miss is “not identified,” not proof of a custom
      build.
  - q: "Can a WordPress homepage be light and another be very heavy?"
    a: >-
      Yes, in this file. **Kesar Sweets & Restaurant** matched WordPress,
      scored performance **93**, had LocalBusiness-style schema detected, and
      recorded LCP **3.0s**. **German Sandhu Realtor** also matched WordPress,
      with performance **24**, about **12.4 MB**, **137** requests, and LCP
      **31.2s**. Both are measurements from 11 September 2026, not reviews.
  - q: "Should a Brampton business leave WordPress because of this study?"
    a: >-
      Not on this evidence. The useful questions are how heavy the homepage
      is, which third parties load with it, and what the first screen is for.
      The stack is secondary to those. A platform change that keeps the same
      photos, sliders, and widgets will not fix the lab result by itself.
---

Almost half the homepages we could fetch in Mintek’s 2026 Brampton study looked like WordPress. On **87** fetched homepages, WordPress signals — `wp-content`, or the word “wordpress” in the HTML, the generator tag, or the URL — appeared on **43 (49.4%)**.

The other named signals were much smaller. Shopify appeared on **6 (6.9%)**, about 7%. Wix appeared on **3 (3.4%)**, about 3%. Squarespace appeared on **2 (2.3%)**, about 2%. Webflow appeared on **1 (1.1%)**, about 1%. Those five signals cover **55** of **87** fetches. Of the other **32**, **27** were not identified, **4** matched a GoDaddy builder pattern, and **1** carried a Hostinger website builder generator tag. “Not identified” is the largest bucket after WordPress. It is not a platform.

Those are lab labels from one fetch on **11 September 2026**, drawn for [The State of Brampton Business Websites: 2026](/research/brampton-business-websites-2026). They do not explain the slow pages.

## WordPress sat near the middle

The performance problem in this study is Largest Contentful Paint. On **76** mobile PageSpeed Insights runs, median LCP was **8.3 seconds**, and **73 of 76** were over 2.5 seconds. That finding is written up in [Why Are Brampton Business Websites So Slow?](/blog/why-are-brampton-business-websites-so-slow).

WordPress does not account for it. Of the **43** homepages with a WordPress signal, **35** also received a Lighthouse score. Their median performance was **56**. The median for all **76** scored homepages was **56.5**. A group that contains nearly half the fetched sample, and scores like the sample, is not the thing that made the sample slow.

The other platform slices are too small to rank. Shopify had a score on **5** homepages, Wix on **3**, Squarespace on **2**, Webflow on **1**. A median on five stores, or on one site, is not a comparison of builders. This study does not show that WordPress, Shopify, Wix, Squarespace, Webflow, or any other system causes poor performance.

## What the study could actually detect

The check is a pattern match on the homepage HTML we fetched, plus the generator meta tag and the page URL. WordPress wins if the blob contains `wp-content` or “wordpress.” Shopify is a CDN host (`cdn.shopify.com` or `myshopify.com`). Wix, Squarespace, Webflow, and GoDaddy are their own markers. The first match wins, and WordPress is tested first.

That is a fingerprint of the response body. It is not a login to the admin, not a plugin inventory, and not a statement from the business about what they use. A headless front end that still requests `/wp-content/uploads/` for photographs counts as WordPress. A page that never leaks those strings counts as something else, even if the editor behind it is WordPress.

The fetch was the homepage document. A booking subdomain, a menu on a second host, and a shop that lives on another domain were not a second CMS check. Seventeen URLs in the wider sample of **93** never received a Lighthouse score. A platform label on an unscored fetch still says nothing about paint time.

## False positives and false negatives

Pattern matching misses in both directions. The study page already says false positives and unidentified custom stacks are expected.

A false positive here means the marker is in the file and the business is not “a WordPress site” in the sense a reader assumes. The word “wordpress” anywhere in the HTML, the generator, or the URL is enough. A copied snippet, a blog post that names the software, or an image hotlinked from a `wp-content` path can trip the same check. Because WordPress is tested first, a page that also loads another builder’s assets is labelled WordPress only.

A false negative is a WordPress site that does not leak the strings. Some hosts and security plugins remove the generator tag and rewrite asset paths. A front end that never mentions WordPress in the homepage HTML lands in “not identified,” or under whatever other marker appears first. Opaque custom HTML lands there too. So does a page whose only platform clue is a cookie, a header, or a script host we did not list.

“Not identified” (**27 of 87**) is the honest residue. It mixes custom sites, stripped WordPress, older builders, and pages that simply did not match. It is not a league of hand-built sites, and it is not a league of broken ones.

## Platform is not page weight, script load, or media

A CMS is the system that stores the page. Page weight is what the browser downloads. Those are different measurements.

Across the **76** scored homepages, median transfer was about **3.3 MB** and the median request count was **86**. Heavier pages and pages with more requests tended to score lower. The study page reports those associations (Pearson **−0.557** for bytes, **−0.614** for requests). They are associations. They are also about bytes and requests, not about which editor saved the file. The weight article, [How Much Does a Brampton Business Website Actually Need to Load?](/blog/how-much-does-a-brampton-business-website-need-to-load), is the place those megabytes are unpacked.

The same WordPress signal can sit on a small document or a huge one. Theme demos ship sliders, icon fonts, and page-builder JavaScript. A careful WordPress build ships a sized photograph, a system font or one webfont, and the script the page actually needs. Shopify can be a small catalogue or a jewellery grid with hundreds of requests. The label does not record image dimensions, autoplay video, chat bubbles, booking embeds, or tag managers.

Script signatures for gtag/GA4 and Google Tag Manager were common in the fetch. The study treats that as “a matching script was detected,” not as proof the property is configured well. A tag is a third party. It loads because someone pasted it, on WordPress or on anything else.

## Light and heavy, on the same signal

Named businesses below are measurements from the 11 September snapshot. They are not reviews, and they are not a ranking of the businesses or of WordPress.

**Kesar Sweets & Restaurant** matched WordPress. Performance **93**. LocalBusiness-style schema **detected**. LCP **3.0 seconds**. The file also records about **2.66 MB** and **29** requests. That LCP is still above 2.5 seconds. It is also far from the sample median of 8.3 seconds. A WordPress homepage in this sample was able to paint in that range.

**German Sandhu Realtor** matched WordPress too. Performance **24**. About **12.4 MB**. **137** requests. LCP **31.2 seconds**. Same class of signal, a transfer several times the sample median, and a paint time several times Kesar’s.

Both pages are real homepages with a job to do. The difference the lab recorded is payload and how long the largest element took, not the presence of `wp-content`. One WordPress match at 93 and another at 24 is the whole argument: the platform label does not sort the slow pages from the faster ones.

## How we'd choose a stack for a Brampton business website

The honest answer is that the stack is secondary. Payload, media, third parties, and what the homepage is for come first.

If we were scoping one of these businesses, we would not open with “WordPress or not.” We would open with the job of the first screen. A restaurant needs the menu, the phone, and the location to be obvious. A clinic needs a way to book or call. A realtor needs the person and the listing path. A retailer needs the products that matter, not every photograph in the catalogue on the first document. The homepage that tries to be all of those at once is how a 3 MB page becomes a 12 MB page, on any stack.

Then we would look at the files. Which image is the Largest Contentful Paint candidate, and what does it weigh? Is video autoplaying to set a mood? How many font files load before the phone number is readable? The weight article is the test we would apply: every element has a cost, and the cost has to earn a place on the first screen.

Then the third parties. Chat, booking, maps, review widgets, heatmaps, and a stack of tags. Each one is a script the lab will wait on, whether the theme is a WordPress builder or a hosted store. We would keep the one the business uses every week and drop the ones nobody opens.

Only then the stack. WordPress is a reasonable choice when the business will edit pages, posts, and menus, and when the theme is stripped to that job. A hosted builder is a reasonable choice when the editing model fits and the template is not shipping a demo’s worth of assets. A custom front end is a reasonable choice when the page has a job those tools fight — a catalogue with real filters, a booking flow, a site that should not carry a theme’s JavaScript. We would not migrate a business off WordPress because 49.4% of this sample matched it, and we would not stay on WordPress because the median of 35 scored WordPress sites was ordinary. We would stay or move based on who edits the site, what it must do next year, and whether the current homepage’s bytes are the theme or the content.

That work belongs in a [web design in Brampton](/web-design-brampton) build beside the speed work. Changing the logo on the generator tag, and leaving the 12 MB homepage in place, is not a rebuild.

## What this study can and cannot tell us

It can tell us how often a fetched homepage leaked a platform marker on one day. WordPress **43 of 87 (49.4%)**. Shopify **6**. Wix **3**. Squarespace **2**. Webflow **1**. Not identified **27**. It can tell us that the **35** scored WordPress homepages had median performance **56**, beside a sample median of **56.5**, while median LCP on all **76** scored runs was **8.3 seconds**.

It cannot tell us that a builder caused those paint times. It cannot tell us the theme, the plugin list, or whether the marker was a live CMS or a leftover path. It cannot rank Shopify against WordPress on five scored stores. It cannot say a “not identified” site is custom, fast, or well built.

Kesar and German Sandhu are two rows in that file. They show the spread inside one label. They are not a verdict on either business.

## Conclusion

Almost half the fetched Brampton homepages matched a WordPress signal. That is a fact about the HTML. It is not a cause for the **8.3 second** median LCP, and it is not a reason to treat WordPress, Shopify, or any builder as the slow platform. Scored WordPress sites sat on the sample’s performance median. Inside the same signal, one homepage recorded LCP **3.0s** and another **31.2s**.

The method, the CMS table, and the byte and request associations are in [The State of Brampton Business Websites: 2026](/research/brampton-business-websites-2026). What the slow paint looks like is in [Why Are Brampton Business Websites So Slow?](/blog/why-are-brampton-business-websites-so-slow). What the megabytes are for is in [How Much Does a Brampton Business Website Actually Need to Load?](/blog/how-much-does-a-brampton-business-website-need-to-load).

If you run a Brampton or GTA business, the useful question is what the homepage downloads before a customer can call, book, or read the offer — and whether the current stack is helping that job or carrying a theme’s extra files. [Get in touch](/contact) if you want that read on your own homepage. We will say what the lab measured, and what we would change first, without blaming the CMS the detector happened to name.
