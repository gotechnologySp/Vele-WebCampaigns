import { contactSchema } from "./form-schema";

const validData = { name: "Maria Silva", company: "Empresa", email: "maria@empresa.com.br", phone: "11999999999", subject: "Novo site", message: "Gostaria de reformular nosso site.", consent: true };

describe("contactSchema", () => {
  it("aceita dados válidos e remove caracteres perigosos", () => {
    const result = contactSchema.parse({ ...validData, name: "<Maria>" });
    expect(result.name).toBe("Maria");
  });
  it("recusa e-mail inválido e ausência de consentimento", () => {
    expect(contactSchema.safeParse({ ...validData, email: "invalido", consent: false }).success).toBe(false);
  });
});
