import { z } from "zod";

const clean = (value: string) => value.replace(/[<>]/g, "").trim();

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(100).transform(clean),
  company: z.string().trim().min(2, "Informe sua empresa.").max(120).transform(clean),
  email: z.email("Informe um e-mail válido.").max(160),
  phone: z.string().trim().min(8, "Informe um telefone válido.").max(30).transform(clean),
  subject: z.string().trim().min(3, "Informe o assunto.").max(120).transform(clean),
  message: z.string().trim().min(10, "Conte um pouco mais sobre o projeto.").max(2000).transform(clean),
  consent: z.boolean().refine((value) => value, "Você precisa aceitar a política de privacidade."),
});

export type ContactFormData = z.infer<typeof contactSchema>;
