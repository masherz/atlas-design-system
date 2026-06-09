import React from "react";
import { createRoot } from "react-dom/client";
import { Button } from "./components/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/Card";
import { TextInput } from "./components/TextInput";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <main style={{ padding: "var(--atlas-space-xl)" }}>
      <div style={{ display: "grid", gap: "var(--atlas-space-md)", maxWidth: 420 }}>
        <Card fullWidth variant="stroke">
          <CardHeader>
            <CardTitle>Atlas Design System</CardTitle>
            <CardDescription>Composable enterprise SaaS primitives.</CardDescription>
          </CardHeader>
          <CardContent>
            <TextInput label="Dataset name" placeholder="Enter dataset name" helperText="Use a name your team will recognize." fullWidth />
          </CardContent>
          <CardFooter>
            <Button>Atlas Button</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  </React.StrictMode>,
);
