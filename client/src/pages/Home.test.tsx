import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home Page", () => {
  it("deve renderizar o título principal", () => {
    render(<Home />);
    expect(screen.getByText(/Quando o vínculo começa a doer/i)).toBeDefined();
  });

  it("deve renderizar a seção sobre", () => {
    render(<Home />);
    expect(screen.getByText(/Psicólogo clínico, terapeuta de casais e professor/i)).toBeDefined();
  });

  it("deve renderizar os três serviços principais", () => {
    render(<Home />);
    expect(screen.getByText(/Terapia de Casal Online \(IBCT\)/i)).toBeDefined();
    expect(screen.getByText(/Terapia Individual 1:1 \(ACT\)/i)).toBeDefined();
    expect(screen.getByText(/Supervisão e formação/i)).toBeDefined();
  });

  it("deve renderizar a seção de depoimentos", () => {
    render(<Home />);
    expect(screen.getByText(/O que dizem casais que passaram por aqui/i)).toBeDefined();
  });

  it("deve renderizar a seção de FAQ", () => {
    render(<Home />);
    expect(screen.getByText(/Dúvidas comuns sobre terapia de casal/i)).toBeDefined();
  });

  it("deve renderizar botões de CTA com links para WhatsApp", () => {
    render(<Home />);
    const whatsappLinks = screen.getAllByRole("link", { name: /whatsapp/i });
    expect(whatsappLinks.length).toBeGreaterThan(0);
  });

  it("deve renderizar o footer com informa\u00e7\u00f5es do profissional", () => {
    render(<Home />);
    const crpElements = screen.getAllByText(/CRP 03\/15591/i);
    expect(crpElements.length).toBeGreaterThan(0);
  });
});