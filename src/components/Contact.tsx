"use client";

import { FormEvent, useState } from "react";
import { contact, placeholders, services, site } from "@/content/site";
import { Reveal } from "./Reveal";

type FieldName = "name" | "phone" | "email" | "postcode" | "service" | "message" | "photo";

type FormState = {
  name: string;
  phone: string;
  email: string;
  postcode: string;
  service: string;
  message: string;
  photo: File | null;
};

const emptyForm: FormState = {
  name: "",
  phone: "",
  email: "",
  postcode: "",
  service: "",
  message: "",
  photo: null,
};

const fieldClass =
  "mt-2 w-full border border-navy/15 bg-white px-3 py-3 text-base text-ink outline-none focus:border-navy";

function isUkPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  const national = digits.startsWith("44") ? digits.slice(2) : digits.replace(/^0/, "");
  return national.length === 10;
}

function isUkPostcode(value: string) {
  return /^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/.test(value.toUpperCase().replace(/\s+/g, ""));
}

function validate(form: FormState) {
  const errors: Partial<Record<FieldName, string>> = {};
  if (form.name.trim().length < 2) errors.name = "Enter your name.";
  if (!isUkPhone(form.phone)) errors.phone = "Enter a UK phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Enter a valid email address.";
  if (!isUkPostcode(form.postcode)) errors.postcode = "Enter a UK postcode.";
  if (!services.some((service) => service.title === form.service)) errors.service = "Choose a service.";
  if (form.message.trim().length < 10) errors.message = "Tell us a little about the work (at least 10 characters).";
  if (form.photo) {
    if (!form.photo.type.startsWith("image/")) errors.photo = "The attachment needs to be an image.";
    else if (form.photo.size > 5 * 1024 * 1024) errors.photo = "Please use a photo smaller than 5 MB.";
  }
  return errors;
}

export function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "unconfigured">("idle");
  const [fileKey, setFileKey] = useState(0);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0];
    if (firstInvalid) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    if (!site.formEndpoint) {
      setStatus("unconfigured");
      return;
    }

    setStatus("submitting");
    const body = new FormData();
    body.set("name", form.name.trim());
    body.set("phone", form.phone.trim());
    body.set("email", form.email.trim());
    body.set("postcode", form.postcode.trim().toUpperCase());
    body.set("service", form.service);
    body.set("message", form.message.trim());
    body.set("_subject", "New quote enquiry — Briteline website");
    body.set("_replyto", form.email.trim());
    if (form.photo) body.set("photo", form.photo);

    try {
      const response = await fetch(site.formEndpoint, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Form request failed");
      setForm(emptyForm);
      setFileKey((value) => value + 1);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <Reveal>
          <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-slate">
            Contact
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium text-navy md:text-4xl">
            Ask for a quote
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Tell us about the room and we will come back to you to arrange a visit.
          </p>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="font-display text-xs uppercase tracking-[0.16em] text-slate">Phone</dt>
              <dd className="mt-1">
                <a href={contact.phoneTel} className="text-lg text-navy hover:underline">
                  {contact.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-display text-xs uppercase tracking-[0.16em] text-slate">Email</dt>
              <dd className="mt-1">
                <a href={contact.emailHref} className="text-navy hover:underline">
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-display text-xs uppercase tracking-[0.16em] text-slate">WhatsApp</dt>
              <dd className="mt-1">
                <a
                  href={contact.whatsappHref}
                  className="inline-flex bg-navy px-4 py-3 font-display text-xs font-medium uppercase tracking-[0.16em] text-white hover:bg-[#02386f]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message on WhatsApp
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-display text-xs uppercase tracking-[0.16em] text-slate">Service area</dt>
              <dd className="mt-1 max-w-sm text-muted">{placeholders.serviceArea}</dd>
            </div>
          </dl>
        </Reveal>

        <form onSubmit={onSubmit} noValidate className="border border-navy/10 bg-paper p-5 sm:p-8">
          <div aria-live="polite">
            {status === "success" ? (
              <p className="mb-6 border border-navy/15 bg-white px-4 py-3 text-sm text-navy">
                Thank you. We have received your enquiry and will be in touch.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="mb-6 border border-[#8C2F2F]/30 bg-white px-4 py-3 text-sm text-[#8C2F2F]" role="alert">
                The form could not be sent. Please call or email us and we will take the details from you.
              </p>
            ) : null}
            {status === "unconfigured" ? (
              <p className="mb-6 border border-navy/15 bg-white px-4 py-3 text-sm text-ink" role="status">
                The online form is not connected yet. Please call, email or WhatsApp us and we will arrange the quote.
              </p>
            ) : null}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm text-ink">
              Name
              <input
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={fieldClass}
              />
              {errors.name ? <span id="name-error" className="mt-1 block text-sm text-[#8C2F2F]">{errors.name}</span> : null}
            </label>
            <label className="block text-sm text-ink">
              Phone
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(event) => update("phone", event.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={fieldClass}
              />
              {errors.phone ? <span id="phone-error" className="mt-1 block text-sm text-[#8C2F2F]">{errors.phone}</span> : null}
            </label>
            <label className="block text-sm text-ink">
              Email
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => update("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={fieldClass}
              />
              {errors.email ? <span id="email-error" className="mt-1 block text-sm text-[#8C2F2F]">{errors.email}</span> : null}
            </label>
            <label className="block text-sm text-ink">
              Postcode
              <input
                name="postcode"
                autoComplete="postal-code"
                value={form.postcode}
                onChange={(event) => update("postcode", event.target.value)}
                aria-invalid={Boolean(errors.postcode)}
                aria-describedby={errors.postcode ? "postcode-error" : undefined}
                className={fieldClass}
              />
              {errors.postcode ? <span id="postcode-error" className="mt-1 block text-sm text-[#8C2F2F]">{errors.postcode}</span> : null}
            </label>
          </div>

          <label className="mt-5 block text-sm text-ink">
            Service
            <select
              name="service"
              value={form.service}
              onChange={(event) => update("service", event.target.value)}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? "service-error" : undefined}
              className={fieldClass}
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
            {errors.service ? <span id="service-error" className="mt-1 block text-sm text-[#8C2F2F]">{errors.service}</span> : null}
          </label>

          <label className="mt-5 block text-sm text-ink">
            Message
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={(event) => update("message", event.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={fieldClass}
            />
            {errors.message ? <span id="message-error" className="mt-1 block text-sm text-[#8C2F2F]">{errors.message}</span> : null}
          </label>

          <div className="mt-5">
            <label className="block text-sm text-ink">
              Photo of the space <span className="text-muted">(optional)</span>
              <input
                key={fileKey}
                name="photo"
                type="file"
                accept="image/*"
                onChange={(event) => update("photo", event.target.files?.[0] ?? null)}
                aria-invalid={Boolean(errors.photo)}
                aria-describedby={errors.photo ? "photo-error" : "photo-hint"}
                className="mt-2 block w-full text-sm text-muted file:mr-4 file:border-0 file:bg-navy file:px-4 file:py-3 file:font-display file:text-xs file:uppercase file:tracking-[0.14em] file:text-white"
              />
            </label>
            <p id="photo-hint" className="mt-2 text-sm text-muted">
              JPEG, PNG or WEBP, up to 5 MB.
            </p>
            {errors.photo ? <p id="photo-error" className="mt-1 text-sm text-[#8C2F2F]">{errors.photo}</p> : null}
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-6 inline-flex bg-navy px-5 py-3.5 font-display text-xs font-medium uppercase tracking-[0.16em] text-white hover:bg-[#02386f] disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Send enquiry"}
          </button>
        </form>
      </div>
    </section>
  );
}
