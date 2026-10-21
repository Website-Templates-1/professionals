---
title: "Brampton Website Accessibility Scores Look Fine. That Is Not a WCAG Audit."
metaDescription: "Among 76 mobile Brampton homepage runs, median Lighthouse accessibility was 88.5. What that lab score checks, and why it is not a WCAG audit."
date: "2026-10-21"
author: "Mintek Software"
tags: ["websites", "local seo", "small business"]
category: "Research"
scopeTool: true
relatedServices: ["web-design-brampton", "website-development"]
faqs:
  - q: "What was the median accessibility score in Mintek’s 2026 Brampton study?"
    a: >-
      Among **76** mobile Lighthouse runs on 11 September 2026, median
      accessibility was **88.5**. Median SEO was **92** and median best
      practices was **96**. These are lab category scores from one PageSpeed
      Insights run per URL. Tables are in
      [The State of Brampton Business Websites: 2026](/research/brampton-business-websites-2026).
  - q: "Is a Lighthouse accessibility score a WCAG audit?"
    a: >-
      No. The score reflects the automated checks in that Lighthouse category.
      It is not WCAG certification, not a legal determination, and not proof
      that a person with a disability can use the site. The study did not test
      with assistive technology or review the full WCAG criteria.
  - q: "What kinds of checks sit inside the accessibility score?"
    a: >-
      The category looks for problems a program can see in the page, such as
      text contrast, a label on a form field, an accessible name on a button or
      link, and a language set on the page. A pass means that check did not
      fail in the lab snapshot. It does not mean a person confirmed the page.
  - q: "Can a high accessibility score hide real barriers?"
    a: >-
      Yes. The tool can miss text painted into an image, a control that only
      appears after a click, a name that exists but does not say what the
      control does, and a booking widget that loads late. A homepage can score
      well and still be hard to use.
  - q: "Does a strong accessibility score mean the homepage is fast?"
    a: >-
      No. On the same 76 runs, median Largest Contentful Paint was **8.3
      seconds**, and **73 of 76** were over 2.5 seconds. The accessibility
      category does not measure that wait. The LCP finding is in
      [Why Are Brampton Business Websites So Slow?](/blog/why-are-brampton-business-websites-so-slow).
---

Among **76** mobile Lighthouse runs on independently operated Brampton homepages, median accessibility was **88.5**. Median SEO was **92**. Median best practices was **96**.

Those three numbers look calm next to the performance finding from the same runs. Median Largest Contentful Paint was **8.3 seconds**, and **73 of 76** homepages were over 2.5 seconds. The accessibility median does not cancel that. It is a different instrument.

This is a lab result from **11 September 2026**, one PageSpeed Insights mobile run per URL, drawn for [The State of Brampton Business Websites: 2026](/research/brampton-business-websites-2026). **88.5** is the median of Lighthouse’s accessibility category. It is the share of that tool’s automated checks that passed, weighted the way Lighthouse weights them. It is not a WCAG audit, not a certificate, and not a finding that these sites are usable for people with disabilities.

## What the accessibility score measures

Lighthouse splits a run into categories. Performance, accessibility, best practices, and SEO each produce a score from the audits inside that category. The Brampton study recorded the category scores. It did not publish a list of which accessibility audits failed on which homepage.

The accessibility category is a set of checks a program can run against the built page. Typical checks in that category include whether text has enough contrast against its background, whether a form field has a programmatic label, whether a button or link has an accessible name, and whether the page declares a language. When those checks pass, the score goes up. When they fail, it goes down.

A pass is narrow. It means that audit did not find a violation in the snapshot the lab loaded. It does not mean a person used the page. It does not mean every state of the page was opened. The study fetched each homepage once, on mobile, in Google’s lab. Menus, dialogs, and later screens were outside that single document unless they were already in the first response.

The SEO category works the same way, on a different list. A median of **92** mostly reflects crawl basics the lab can see, such as a title, HTTPS, and robots rules. The study page already says that category is not evidence of Google rankings. Best practices, median **96**, is another lab list. A high number there is not a quality award. All three medians are category scores. Only the accessibility one gets mistaken for an audit of disability access, because the word on the report sounds like the whole subject.

## What the score misses

Automated checks stop where a program cannot tell whether the page works for a person.

**Meaning.** An image can have an alt attribute and still describe the wrong thing, or say “image.” A button can have a name of “click here” and pass a name check while telling nobody what happens next. The tool often sees that a name exists. It does not judge whether the name is the right one.

**Sequence and operation.** Someone using a keyboard needs to reach the call link, the menu, and the form, in an order that matches the task, and to see where focus is. Some focus failures are automated. A confusing order, a control that only appears on hover, or a dialog that traps focus after a widget loads can sit outside the snapshot. The study did not tab through these homepages.

**Assistive technology.** A screen reader user hears the accessible names, the headings, and the language of the page. Lighthouse does not run a screen reader and listen. Passing the name check is not the same as a coherent reading of the homepage.

**Content that is not text in the DOM.** Contrast checks computed text. Words baked into a photograph, a logo with a tagline, or a slide of white type over a busy picture can be invisible to that audit and unreadable to a person. Captions, transcripts, and whether a video is the only way to get the information were not part of this score.

**The rest of the site, and the rest of the visit.** The run scored the homepage document it received. A booking panel, a chat widget, and a page the visitor opens next were not a separate audit. One lab run is also not a median of three, and it is not what a particular person’s phone did that day.

The study’s methodology already says automated accessibility scores are not WCAG certification. This article is that sentence unpacked. WCAG is a set of success criteria, many of which require a person to judge them. Certification, where it exists, is a process with a scope, a method, and a reviewer. A Lighthouse number is neither. Nothing in this file is legal advice, and nothing in it is a statement that a business meets or fails a legal duty.

## Contrast, labels, names, and language

Four checks show how small the automated question is. They are examples of the kind of audit in the category. The Brampton file does not say how many homepages failed each one.

**Contrast.** The check compares the computed colour of text with the computed colour behind it, for elements it can see. It asks whether that pair meets the ratio the audit uses. Text in an image, text that appears only after a hover, and text over a photo whose pixels the tool did not treat as the background can escape it. A pass is evidence about the pairs the tool measured.

**Labels.** A form field needs a label the browser can attach to the field, not only placeholder text that disappears when someone types. The audit looks for that attachment. It does not know whether the label says what the business actually needs to know, or whether the form can be completed and understood.

**Names.** Links and buttons need an accessible name: the text inside them, or a name provided for an icon button. An empty icon button fails. A named button passes even when the name is vague. “Contact us” can be a perfectly detectable name and still be an unclear next step. The name check and the conversion question are different jobs.

**Language.** The page should declare a language, such as English, on the document, in a form the browser accepts. That lets some tools pronounce the page correctly. The audit does not read the copy, and it does not notice a page that declares English and then mixes in unmarked passages of another language.

Fixing a failure on that list is worth doing. It removes a barrier the tool could see. Clearing the list is not the end of the work.

## A high score can still hide a barrier

**88.5** is a median, so half of the scored homepages sat at or above it and half at or below it. A homepage at 90 or above has passed most of the weighted automated checks. That is a real fact about the lab run. It is a weak fact about use.

The barriers that hide are the ones in the previous section. A late widget with no name. A hero sentence that exists only inside a picture. A menu that cannot be opened from the keyboard. A form that is labelled and still asks for information in an order no one can follow. None of those have to move the category score if they were not in the checks that ran, or not in the HTML the lab scored.

A simple page can also score well because there is less to fail. Few controls, little custom markup, no dialog. That can be a good homepage. It can also be a homepage that pushes the real task — book, pay, upload — into a tool the score never opened. The median does not separate those cases. The study did not retest the high-scoring URLs with a person.

Treat a low score as a queue of specific failures to open and fix. Treat a high score as “these automated checks were mostly quiet on this snapshot.” Neither sentence is “the site is accessible.”

## The same runs were slow

The accessibility category does not include Largest Contentful Paint. A page can collect a calm accessibility score while the largest thing in the first screen is still painting.

On these **76** runs the median LCP was **8.3 seconds**, and **73 of 76** were slower than 2.5 seconds. That is the common lab failure in the study, and it is already written up in [Why Are Brampton Business Websites So Slow?](/blog/why-are-brampton-business-websites-so-slow). Someone who cannot see the call link until the hero arrives is waiting, whether or not the link has an accessible name once it exists. A person using a screen reader may reach the name sooner than the paint, and a person looking at the screen may not. The study did not measure either experience. It measured both scores on the same URLs, and they do not move together by definition.

Speed is not a substitute for names, contrast, and labels. Names, contrast, and labels are not a substitute for a first screen that arrives. The medians sit side by side so nobody quotes **88.5** and skips **8.3 seconds**.

## How we'd use the score without pretending it is an audit

If we were handed one of these homepages, we would open the Lighthouse accessibility report and read the failing audits, not the medal at the top. A missing button name, a field with no label, a document with no language, and a contrast failure the tool could compute are concrete repairs. We would fix those and run the category again to see whether the repair held.

We would then do the passes the score cannot make.

**Keyboard.** From the top of the mobile and desktop page, reach the menu, the primary action, and the form without a mouse. Focus should be visible. The order should follow the task.

**Names and text.** Read the accessible name of every icon control. Read the alt text of the hero. If the only version of a phone number or a heading is inside a picture, put it in text.

**The widget the business actually uses.** Open the booking panel, the chat, or the map the homepage depends on. The homepage score did not grade that layer. If the next step lives there, that layer is part of the page.

**The first screen.** Keep the LCP work in the same pass. A named control that paints at 8 seconds is still a late control. The performance write-up is the list for that half of the job.

We would not put “accessibility score 88” on a proposal, a footer, or a sales page. We would not tell a client the site is WCAG compliant, and we would not tell them it is non-compliant, because this run cannot say either. We would not offer the number as legal advice. The useful record is which checks failed, which tasks a person can finish, and what we have not tested.

That belongs in a [web design in Brampton](/web-design-brampton) build beside the other homepage work: a first screen that arrives, a next step that is named in the interface and in the markup, and type that can be read. The score is a flashlight for one class of bugs. It is not the inspection.

## What this study can and cannot tell us

**It can tell us** what one mobile lab run recorded for 76 homepages on one day. Median accessibility **88.5**. Median SEO **92**. Median best practices **96**. Median LCP **8.3 seconds**, with **73 of 76** over 2.5 seconds. Seventeen URLs in the wider sample never received a Lighthouse score. Those gaps were left as not available.

**It cannot tell us** which audits produced the accessibility median, whether a particular homepage is usable with a screen reader or a keyboard, or whether any business meets WCAG or a legal standard. It cannot tell us that Brampton sites are “fine” for disabled visitors. A median near 90 means the automated checks were mostly passing. People were not in the method. One PSI run varies by day. The sample is businesses that appeared in Places for the chosen queries and already had a website.

A higher accessibility score does not, on this evidence, mean a faster page, a better ranking, or a completed audit.

## Conclusion

The 2026 Brampton homepage study did not find that local sites are accessible. It found a median Lighthouse accessibility score of **88.5** on **76** mobile runs, beside a median SEO score of **92**, a median best-practices score of **96**, and a median LCP of **8.3 seconds**.

The accessibility figure is the tool’s own automated checks: contrast it could compute, labels, names, language, and the other audits in that category. It misses meaning, operation, assistive technology, and anything the snapshot did not contain. A high score can hide a barrier. A slow first screen can sit beside a calm score, and on these runs it usually did.

If you run a Brampton or GTA business, the useful question is which automated failures are on the report, and which tasks a person still cannot finish. The method and the category medians are in [The State of Brampton Business Websites: 2026](/research/brampton-business-websites-2026). The paint-time half of the same runs is in [Why Are Brampton Business Websites So Slow?](/blog/why-are-brampton-business-websites-so-slow). If you want a look at a homepage report — the failing checks, the first screen, and what the score does not cover — [get in touch](/contact). We will say what the lab measured, and we will not call that an audit.
