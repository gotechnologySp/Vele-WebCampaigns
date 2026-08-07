import { render, screen } from "@testing-library/react";
import { SectionHeading } from "./SectionHeading";

describe("SectionHeading", () => {
  it("renderiza título e texto de apoio", () => {
    render(<SectionHeading eyebrow="Contexto" title="Um título claro" text="Texto explicativo" />);
    expect(screen.getByRole("heading", { name: "Um título claro" })).toBeInTheDocument();
    expect(screen.getByText("Texto explicativo")).toBeInTheDocument();
  });
});
