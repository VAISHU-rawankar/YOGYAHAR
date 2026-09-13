import { useState } from "react";
import { api } from "../lib/apiClient";
import { useSectionContent } from "../hooks/useSectionContent";

export default function InquiryModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [productsContent] = useSectionContent("products", {
    juices: [],
    salads: [],
    nonSubItems: []
  });

  const allProductNames = [
    ...(productsContent.juices || []).map(p => p.name),
    ...(productsContent.salads || []).map(p => p.name),
    ...(productsContent.nonSubItems || []).map(p => p.name),
  ];

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.target);
    try {
      await api.post("/api/inquiries", {
        firstName: form.get("firstName"),
        middleName: form.get("middleName"),
        lastName: form.get("lastName"),
        subject: form.get("subject"),
        productName: form.get("productName"),
        email: form.get("email"),
        phone: form.get("phone"),
        city: form.get("city"),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-[#faf8f5] rounded-3xl w-full max-w-md p-7 relative shadow-2xl border border-[#d4ddb9]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-200/70 text-stone-700 flex items-center justify-center text-sm font-bold hover:bg-stone-300 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        <h3 className="text-xl text-[#1f2b12] font-black font-display mb-1 text-left">
          Send Us a Message
        </h3>
        <p className="text-xs text-[#555546] mb-4 text-left">
          Fill out the form below and our team will get in touch with you.
        </p>

        {submitted ? (
          <p className="text-sm text-[#6a7059] mt-4 font-medium">
            Thank you! We'll get back to you shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field label="First Name" name="firstName" required />
              <Field label="Middle Name" name="middleName" />
              <Field label="Last Name" name="lastName" required />
            </div>
            
            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-medium text-[#20281a]">
                Select Subject / Topic
              </span>
              <select
                name="subject"
                className="rounded-lg border border-[#d4ddb9] px-3.5 py-2.5 text-sm outline-none bg-white focus:border-[#3d5223] cursor-pointer"
              >
                <option value="General Inquiry">General Inquiry / Question</option>
                <option value="Subscription Plans">Subscription Plans & Pricing</option>
                <option value="Grab Sample">Grab Sample / 1-Day Trial</option>
                <option value="Corporate Orders">Corporate & Bulk Orders</option>
                <option value="Feedback & Suggestions">Feedback & Suggestions</option>
                <option value="Careers / Join Team">Careers & Join Our Team</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-left">
              <span className="text-xs font-medium text-[#20281a]">
                Select Product Name (Optional)
              </span>
              <select
                name="productName"
                className="rounded-lg border border-[#d4ddb9] px-3.5 py-2.5 text-sm outline-none bg-white focus:border-[#3d5223] cursor-pointer"
              >
                <option value="">-- Choose a Product (Optional) --</option>
                {allProductNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>

            <Field label="Email" name="email" type="email" />
            <Field label="Phone" name="phone" type="tel" required />
            <Field label="City" name="city" />

            {error && <p className="text-xs text-[#b3452a] font-medium">{error}</p>}

            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-[#cfe04a] hover:bg-[#c2d43c] px-6 py-3.5 text-sm font-bold text-[#1f2b12] transition-all hover:scale-[1.02] shadow-sm"
            >
              Enquire Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", required = false }) {
  return (
    <label className="flex flex-col gap-1.5 text-left w-full">
      <span className="text-xs font-medium text-[#20281a]">
        {label}
        {required && <span className="text-[#b3452a]">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="rounded-lg border border-[#d4ddb9] px-3.5 py-2.5 text-sm outline-none focus:border-[#3d5223] w-full"
      />
    </label>
  );
}
