// Alternador de tema (dark/light) para Vite + Tailwind ou classes utilitárias
export function toggleTheme() {
  if (typeof window !== "undefined") {
    const current = window.localStorage.getItem("shalom_theme");
    const next = current === "light" ? "dark" : "light";
    console.log("[toggleTheme] Tema atual:", current);
    console.log("[toggleTheme] Próximo tema:", next);
    window.localStorage.setItem("shalom_theme", next);
    if (next === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
    console.log(
      "[toggleTheme] Classes no <html>:",
      document.documentElement.className,
    );
    // Força atualização visual
    window.location.reload();
  }
}
