"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactFormData } from "@/lib/form-schema";
import { trackEvent } from "@/lib/analytics";

const fields = [
  { name: "name", label: "Nome", type: "text", autoComplete: "name" },
  { name: "company", label: "Empresa", type: "text", autoComplete: "organization" },
  { name: "email", label: "E-mail profissional", type: "email", autoComplete: "email" },
  { name: "phone", label: "Telefone", type: "tel", autoComplete: "tel" },
  { name: "subject", label: "Assunto", type: "text", autoComplete: "off" },
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [started, setStarted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema), defaultValues: { consent: false } });
  const markStarted = () => { if (!started) { setStarted(true); trackEvent("form_start"); } };
  const submit = async (data: ContactFormData) => {
    setStatus("idle");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error("submission_failed");
      setStatus("success"); trackEvent("form_submit"); reset();
    } catch { setStatus("error"); }
  };
  return <form onSubmit={handleSubmit(submit)} onFocus={markStarted} className="w-full max-w-lg rounded-2xl bg-white p-5 text-zinc-950 shadow-2xl shadow-black/20 sm:p-6" noValidate>
    <div className="grid gap-3 sm:grid-cols-2">{fields.map((field) => <label key={field.name} className={field.name === "subject" ? "sm:col-span-2" : ""}><span className="mb-1 block text-xs font-medium">{field.label}</span><input {...register(field.name)} type={field.type} autoComplete={field.autoComplete} aria-invalid={Boolean(errors[field.name])} className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200" />{errors[field.name] && <span className="mt-1 block text-xs text-red-700">{errors[field.name]?.message}</span>}</label>)}</div>
    <label className="mt-3 block"><span className="mb-1 block text-xs font-medium">Mensagem</span><textarea {...register("message")} rows={3} aria-invalid={Boolean(errors.message)} className="w-full resize-y rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200" />{errors.message && <span className="mt-1 block text-xs text-red-700">{errors.message.message}</span>}</label>
    <label className="mt-3 flex items-start gap-2 text-xs leading-5 text-zinc-600"><input {...register("consent")} type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-amber-500" /><span>Concordo com o uso dos meus dados para retorno deste contato, conforme a política de privacidade.</span></label>{errors.consent && <span className="mt-1 block text-xs text-red-700">{errors.consent.message}</span>}
    <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
    <button disabled={isSubmitting} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:cursor-wait disabled:opacity-70">{isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />} {isSubmitting ? "Enviando..." : "Quero conversar"}</button>
    <div aria-live="polite" className="mt-3 text-xs">{status === "success" && <p className="flex items-center gap-2 text-green-700"><CheckCircle2 className="h-4 w-4" /> Recebemos sua mensagem. Em breve entraremos em contato.</p>}{status === "error" && <p className="text-red-700">Não foi possível enviar agora. Tente novamente em alguns instantes.</p>}</div>
  </form>;
}
