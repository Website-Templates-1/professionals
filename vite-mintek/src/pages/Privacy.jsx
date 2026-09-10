import { Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LegalPage from "../components/legal/LegalPage";
import { site } from "../config/siteConfig";

const LAST_UPDATED = "September 10, 2026";

const mail = (
  <Link href={`mailto:${site.email}`} underline="hover">
    {site.email}
  </Link>
);

const sections = [
  {
    heading: "Who we are",
    body: (
      <>
        <Typography component="p">
          {site.legalName} (&ldquo;{site.brand},&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo; or
          &ldquo;our&rdquo;) is a custom software, automation and web development studio based at{" "}
          {site.address.formatted}, {site.address.countryName}. This Privacy Policy explains
          what information we collect through our website and services, how we use it, and the
          choices you have.
        </Typography>
        <Typography component="p">
          If you have questions about this policy, contact us at {mail}.
        </Typography>
      </>
    ),
  },
  {
    heading: "Information we collect",
    body: (
      <>
        <Typography component="p">We collect information in three ways:</Typography>
        <ul>
          <li>
            <strong>Information you give us.</strong> When you submit a contact or enquiry form,
            or email or call us, we receive your name, email address, phone number and any
            details you include in your message.
          </li>
          <li>
            <strong>Information collected automatically.</strong> Like most websites, we collect
            basic usage and device data (such as pages viewed, referring page, browser type and
            approximate region) through analytics and server logs to understand how the site is
            used and to keep it secure.
          </li>
          <li>
            <strong>Information we process on a client&rsquo;s behalf.</strong> When you engage us
            to deliver services, we may access data belonging to your business or your accounts
            with third-party platforms, strictly to perform the work you have authorized. This is
            described further under &ldquo;Google user data&rdquo; below.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "Google user data (Google Business Profile)",
    body: (
      <>
        <Typography component="p">
          As part of our review-management service, and only for clients who have explicitly
          added us as a manager of their Google Business Profile, we access certain data through
          Google&rsquo;s APIs using the{" "}
          <code>https://www.googleapis.com/auth/business.manage</code> scope. Specifically we may
          access:
        </Typography>
        <ul>
          <li>the list of business locations you have authorized us to manage;</li>
          <li>basic location information (such as business name and address); and</li>
          <li>customer reviews on those locations, including star rating, review text and the
            reviewer&rsquo;s public display name.</li>
        </ul>
        <Typography component="p">
          We use this data solely to display your reviews to our staff and, where you have asked
          us to, to post replies to reviews on your behalf. Every reply is reviewed and approved
          by a person before it is posted.
        </Typography>
        <Typography component="p">
          Our use and transfer of information received from Google APIs adheres to the{" "}
          <Link
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            Google API Services User Data Policy
          </Link>
          , including its Limited Use requirements. We do <strong>not</strong> sell Google user
          data, use it for advertising, or transfer it to others except as needed to provide the
          service you requested, to comply with applicable law, or as part of a merger or
          acquisition. We do not use this data to train generalized machine-learning models.
        </Typography>
        <Typography component="p">
          You can revoke our access at any time by removing us as a manager of your Google
          Business Profile, or by contacting us at {mail} to request deletion of any related data
          we hold.
        </Typography>
      </>
    ),
  },
  {
    heading: "How we use information",
    body: (
      <>
        <ul>
          <li>to respond to your enquiries and provide the services you request;</li>
          <li>to operate, maintain, secure and improve our website and services;</li>
          <li>to communicate with you about projects, support and administrative matters; and</li>
          <li>to comply with legal obligations and enforce our agreements.</li>
        </ul>
        <Typography component="p">
          We do not sell your personal information, and we do not use it for advertising.
        </Typography>
      </>
    ),
  },
  {
    heading: "How we share information",
    body: (
      <>
        <Typography component="p">
          We share information only as needed to run our business and deliver services:
        </Typography>
        <ul>
          <li>
            <strong>Service providers.</strong> We use trusted third parties for hosting,
            analytics and communications who process data on our behalf under confidentiality
            obligations.
          </li>
          <li>
            <strong>Legal and safety.</strong> We may disclose information where required by law
            or to protect our rights, users or the public.
          </li>
          <li>
            <strong>Business transfers.</strong> Information may be transferred as part of a
            merger, acquisition or sale of assets, subject to this policy.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "Data retention and security",
    body: (
      <Typography component="p">
        We keep personal information only for as long as needed for the purposes described here
        or as required by law, then delete or de-identify it. We use reasonable technical and
        organizational safeguards to protect information, though no method of transmission or
        storage is completely secure.
      </Typography>
    ),
  },
  {
    heading: "Your choices and rights",
    body: (
      <Typography component="p">
        Subject to applicable law, including Canada&rsquo;s Personal Information Protection and
        Electronic Documents Act (PIPEDA), you may request access to, correction of, or deletion
        of the personal information we hold about you. To make a request, email us at {mail}. You
        can also opt out of non-essential analytics through your browser settings.
      </Typography>
    ),
  },
  {
    heading: "Cookies and analytics",
    body: (
      <Typography component="p">
        Our website uses cookies and similar technologies for essential functionality and to
        measure usage through analytics. You can control cookies through your browser settings;
        disabling them may affect some features.
      </Typography>
    ),
  },
  {
    heading: "Children&rsquo;s privacy",
    body: (
      <Typography component="p">
        Our website and services are intended for businesses and are not directed to children
        under 13. We do not knowingly collect personal information from children.
      </Typography>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <Typography component="p">
        We may update this Privacy Policy from time to time. When we do, we will revise the
        &ldquo;Last updated&rdquo; date above. Material changes will be highlighted on this page.
      </Typography>
    ),
  },
  {
    heading: "Contact us",
    body: (
      <Typography component="p">
        Questions or requests about this policy or your information can be sent to {mail}, or by
        mail to {site.legalName}, {site.address.formatted}, {site.address.countryName}. See also
        our{" "}
        <Link component={RouterLink} to="/terms" underline="hover">
          Terms of Service
        </Link>
        .
      </Typography>
    ),
  },
];

const Privacy = () => (
  <LegalPage
    title="Privacy Policy"
    description={`How ${site.brand} collects, uses and protects your information, including data accessed through Google Business Profile.`}
    path="/privacy"
    lastUpdated={LAST_UPDATED}
    intro={`This Privacy Policy describes how ${site.brand} handles personal information collected through our website and in the course of providing our services.`}
    sections={sections}
  />
);

export default Privacy;
