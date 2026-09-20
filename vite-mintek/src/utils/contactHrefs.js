// Build tel / WhatsApp / SMS hrefs from a NAP phone string (e.g. site.phone).
// WhatsApp needs digits only; tel and sms keep a leading +. Optional `text`
// prefills the WhatsApp compose box.

export function contactHrefs(phone, { text } = {}) {
  const telOrSms = String(phone).replace(/[^\d+]/g, "");
  const digits = String(phone).replace(/[^\d]/g, "");
  const waBase = `https://wa.me/${digits}`;
  return {
    tel: `tel:${telOrSms}`,
    sms: `sms:${telOrSms}`,
    wa: text ? `${waBase}?text=${encodeURIComponent(text)}` : waBase,
  };
}

export function hasChannel(contact, channel) {
  return Array.isArray(contact?.channels) && contact.channels.includes(channel);
}

// Canonical WhatsApp opener. Underscores are intentional blanks the visitor
// can fill in; pass real values from a service page or the scope tool.
export function whatsappPrefill({
  helpWith = "___",
  business = "___",
  discuss = "___",
} = {}) {
  return `Hi Mintek, I'm looking for help with ${helpWith}. My business is ${business}. I'd like to discuss ${discuss}.`;
}
