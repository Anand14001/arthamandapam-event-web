import { useState } from 'react';
import { REGISTER_URL, REGISTRATION } from '../data/content';

const FIELD =
  'w-full rounded-xl border border-black/15 bg-white px-4 py-3 font-body text-[15px] text-ink ' +
  'transition-colors duration-200 placeholder:text-black/35 ' +
  'focus:border-brand focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-brand/40';

function Label({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block font-display text-[13px] font-medium text-ink">
      {children}
      {required && (
        <span className="ml-1 text-brand" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

/**
 * Registration form.
 *
 * Field for field the same as the live Zoho form: name, WhatsApp number, email,
 * city, age, current status (with a free-text box when "Other" is picked), the
 * two open questions, the pass, and the amount payable.
 *
 * The amount is derived from the pass rather than typed, because that is what
 * it is — Standard is ₹5,900 and Premium ₹17,700, both GST inclusive.
 *
 * NOTE: this is the interface only. Nothing is submitted anywhere yet, so the
 * form deliberately does not claim success — it says so and offers the live
 * Zoho form, which does take registrations and payment. Wire `handleSubmit` to
 * a real endpoint before this replaces that link in production.
 */
export default function RegistrationForm() {
  const [status, setStatus] = useState('');
  const [pass, setPass] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const amount = REGISTRATION.passes.find((p) => p.label === pass)?.amount ?? '—';

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: POST the collected values to the registration endpoint.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-5 px-6 py-10 text-center">
        <h3 className="font-display text-[1.15rem] font-semibold text-ink">
          This form isn&apos;t connected yet
        </h3>
        <p className="max-w-[46ch] font-body text-[14.5px] leading-[1.6] text-black/60">
          Your details were not sent anywhere. To book a seat right now, use the live registration
          form, which also handles payment.
        </p>
        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-brand-alt px-7 py-3 font-display text-[14px] font-semibold
                     text-white transition-colors duration-200 hover:bg-ink"
        >
          Open the live form
        </a>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="font-body text-[13px] text-black/45 underline-offset-4 hover:text-brand hover:underline"
        >
          Back to the form
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="px-[clamp(18px,4vw,28px)] py-6">
      <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="reg-name" required>
            Full Name
          </Label>
          <input id="reg-name" name="name" type="text" required autoComplete="name" className={FIELD} />
        </div>

        <div>
          <Label htmlFor="reg-phone" required>
            WhatsApp Number
          </Label>
          <input
            id="reg-phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            className={FIELD}
          />
        </div>

        <div>
          <Label htmlFor="reg-email" required>
            Email Address
          </Label>
          <input
            id="reg-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={FIELD}
          />
        </div>

        <div>
          <Label htmlFor="reg-city" required>
            City
          </Label>
          <input
            id="reg-city"
            name="city"
            type="text"
            required
            autoComplete="address-level2"
            className={FIELD}
          />
        </div>

        <div>
          <Label htmlFor="reg-age" required>
            Age
          </Label>
          <input id="reg-age" name="age" type="number" min="1" required inputMode="numeric" className={FIELD} />
        </div>

        <div>
          <Label htmlFor="reg-status" required>
            Current Status
          </Label>
          <select
            id="reg-status"
            name="status"
            required
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={FIELD}
          >
            <option value="">Select…</option>
            {REGISTRATION.statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Zoho reveals a free-text box when "Other" is chosen. */}
        {status === 'Other' && (
          <div className="sm:col-span-2">
            <Label htmlFor="reg-status-other">Tell us your current status</Label>
            <input id="reg-status-other" name="statusOther" type="text" className={FIELD} />
          </div>
        )}

        <div className="sm:col-span-2">
          <Label htmlFor="reg-struggle">What&apos;s your biggest struggle right now?</Label>
          <textarea id="reg-struggle" name="struggle" rows={3} className={`${FIELD} resize-y`} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="reg-topic">Any specific topic you want to cover</Label>
          <textarea id="reg-topic" name="topic" rows={3} className={`${FIELD} resize-y`} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="reg-pass" required>
            Pass
          </Label>
          <select
            id="reg-pass"
            name="pass"
            required
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className={FIELD}
          >
            <option value="">Select a pass…</option>
            {REGISTRATION.passes.map((p) => (
              <option key={p.label} value={p.label}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* Zoho's Lead Source field: fixed value, nothing for the visitor to choose. */}
        <input type="hidden" name="leadSource" value={REGISTRATION.leadSource} readOnly />

        <div className="sm:col-span-2">
          <div className="flex items-center justify-between gap-4 rounded-xl bg-lilac px-4 py-3.5">
            <span className="font-display text-[13px] font-medium text-ink">
              Amount payable
              <span className="ml-2 font-body text-[12px] font-normal text-black/50">
                incl. GST
              </span>
            </span>
            <span className="font-display text-[1.25rem] font-black leading-none text-brand-alt">
              {amount}
            </span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-brand-alt px-6 py-[15px] font-display text-[15px]
                   font-bold tracking-[0.02em] text-white transition-all duration-300
                   hover:-translate-y-0.5 hover:bg-ink focus-visible:outline
                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        Complete Registration
      </button>
    </form>
  );
}
