import { test, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

test("Deve retornar a mensagem inicial da API", async () => {
    const resposta = await request(app).get("/");

    expect(resposta.status).toBe(200);

    expect(resposta.text).toBe("Minha primeira API Taskly!");
});