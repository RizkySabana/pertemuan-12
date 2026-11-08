
"use client";

import { createContext, useContext, useState } from "react";

const TemaContext = createContext();

export function TemaProvider({ children }) {
  const [tema, setTema] = useState("terang");

  function ubahTema() {
    setTema((temaSekarang) =>
      temaSekarang === "terang" ? "gelap" : "terang"
    );
  }

  return (
    <TemaContext.Provider value={{ tema, ubahTema }}>
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  return useContext(TemaContext);
}