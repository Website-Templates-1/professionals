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
    heading: "Agreement to these terms",
    body: (
      <Typography component="p">
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the website
        operated by {site.legalName} (&ldquo;{site.brand},&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;
        or &ldquo;our&rdquo;) and, where applicable, the services we provide. By using our website
        or engaging our services, you agree to these Terms. If you do not agree, please do not use
        the site or services.
      </Typography>
    ),
  },
  {
    heading: "Our services",
    body: (
      <Typography component="p">
        We provide custom software development, business automation, web development and related
        services. The specific scope, deliverables, timeline and fees for any engagement are set
        out in a separate written proposal or agreement between you and {site.brand}. Where those
        terms conflict with these Terms, the signed proposal or agreement controls.
      </Typography>
    ),
  },
  {
    heading: "Client responsibilities and authorizations",
    body: (
      <>
        <Typography component="p">If you engage us to deliver services, you agree to:</Typography>
        <ul>
          <li>
            provide accurate information and the access, accounts and materials we reasonably need
            to perform the work;
          </li>
          <li>
            ensure you have the right to grant us any access you provide, and that our authorized
            use will not infringe the rights of others; and
          </li>
          <li>
            where we manage your Google Business Profile, grant us manager access and authorize us
            to read and respond to reviews on your behalf. You remain the owner of your profile and
            may revoke this access at any time.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "Acceptable use",
    body: (
      <Typography component="p">
        You agree not to misuse the website or services, including by attempting to gain
        unauthorized access, interfering with normal operation, uploading malicious code, or using
        the site or services to violate any law or the rights of others.
      </Typography>
    ),
  },
  {
    heading: "Intellectual property",
    body: (
      <Typography component="p">
        The content, design and code of this website are owned by {site.brand} or its licensors
        and are protected by applicable intellectual-property laws. Ownership of deliverables
        created for a client is governed by the applicable proposal or agreement. Absent such
        terms, we retain ownership of pre-existing materials, tools and know-how used to deliver
        the work.
      </Typography>
    ),
  },
  {
    heading: "Third-party services",
    body: (
      <Typography component="p">
        Our website and services may integrate with or link to third-party services, including
        Google services. Your use of those services is subject to their own terms and privacy
        policies, and we are not responsible for third-party content or practices. Where we access
        Google user data on your behalf, we do so in accordance with our{" "}
        <Link component={RouterLink} to="/privacy" underline="hover">
          Privacy Policy
        </Link>{" "}
        and the Google API Services User Data Policy.
      </Typography>
    ),
  },
  {
    heading: "Fees and payment",
    body: (
      <Typography component="p">
        Fees for services are those set out in the applicable proposal or written agreement.
        Unless stated otherwise, invoices are due as specified in that agreement. Our website is
        provided free of charge for informational purposes.
      </Typography>
    ),
  },
  {
    heading: "Disclaimers",
    body: (
      <Typography component="p">
        Our website is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
        warranties of any kind, whether express or implied, including implied warranties of
        merchantability, fitness for a particular purpose and non-infringement. We do not warrant
        that the website will be uninterrupted, error-free or secure. Warranties relating to
        client engagements, if any, are set out in the applicable agreement.
      </Typography>
    ),
  },
  {
    heading: "Limitation of liability",
    body: (
      <Typography component="p">
        To the fullest extent permitted by law, {site.brand} will not be liable for any indirect,
        incidental, special, consequential or punitive damages, or any loss of profits, data or
        goodwill, arising out of or relating to your use of the website. Nothing in these Terms
        limits liability that cannot be limited under applicable law.
      </Typography>
    ),
  },
  {
    heading: "Indemnification",
    body: (
      <Typography component="p">
        You agree to indemnify and hold harmless {site.brand} from any claims, damages or expenses
        arising out of your misuse of the website or services, or your breach of these Terms.
      </Typography>
    ),
  },
  {
    heading: "Governing law",
    body: (
      <Typography component="p">
        These Terms are governed by the laws of the Province of {site.address.regionName} and the
        federal laws of {site.address.countryName} applicable there, without regard to conflict-of-law
        rules. The courts located in {site.address.regionName} will have exclusive jurisdiction
        over any dispute arising from these Terms.
      </Typography>
    ),
  },
  {
    heading: "Changes to these terms",
    body: (
      <Typography component="p">
        We may update these Terms from time to time. When we do, we will revise the &ldquo;Last
        updated&rdquo; date above. Your continued use of the website after changes take effect
        constitutes acceptance of the updated Terms.
      </Typography>
    ),
  },
  {
    heading: "Contact us",
    body: (
      <Typography component="p">
        Questions about these Terms can be sent to {mail}, or by mail to {site.legalName},{" "}
        {site.address.formatted}, {site.address.countryName}.
      </Typography>
    ),
  },
];

const Terms = () => (
  <LegalPage
    title="Terms of Service"
    description={`The terms that govern use of the ${site.brand} website and services.`}
    path="/terms"
    lastUpdated={LAST_UPDATED}
    intro={`Please read these Terms of Service carefully before using the ${site.brand} website or engaging our services.`}
    sections={sections}
  />
);

export default Terms;
