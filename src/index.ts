import { Hono } from "hono";

interface User{
    name: string;
    age: number;
}

const app = new Hono();

const myData: User[] = [
    {
        name: "Parsa",
        age: 16
    },
    {
        name: "Yasna",
        age: 19
    }
]
app.get("/messages", (c) => c.json(myData));

app.post("/messages", async (c) => {
    try {
        const body = await c.req.json();
        myData.push(body);
        return c.json({ success: true, data: body });
    } catch (error) {
        return c.json({ success: false, error: "Invalid request" }, 400);
    }
});

export default app;