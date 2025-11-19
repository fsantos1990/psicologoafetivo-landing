import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog Page", () => {
  it("deve renderizar o título da página de blog", () => {
    render(<Blog />);
    expect(screen.getByText(/Artigos sobre relacionamentos, terapia de casal e ACT/i)).toBeDefined();
  });

  it("deve renderizar pelo menos 4 artigos", () => {
    render(<Blog />);
    const articles = screen.getAllByRole("article");
    expect(articles.length).toBeGreaterThanOrEqual(4);
  });

  it("deve renderizar artigos com títulos", () => {
    render(<Blog />);
    expect(
      screen.getByText(/Terapia de Casal Online: Por que a IBCT é a Abordagem mais Afetiva/i)
    ).toBeDefined();
    expect(
      screen.getByText(/Ansiedade e Autoestima: Como a ACT Ajuda a Viver com o que Importa/i)
    ).toBeDefined();
  });

  it("deve renderizar links para artigos individuais", () => {
    render(<Blog />);
    const links = screen.getAllByRole("link", { name: /Ler artigo completo/i });
    expect(links.length).toBeGreaterThanOrEqual(4);
  });

  it("deve renderizar footer com informações do profissional", () => {
    render(<Blog />);
    expect(screen.getByText(/CRP 03\/15591/i)).toBeDefined();
  });
});
