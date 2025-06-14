"use client";

// app/page.tsx – Next.js 14 (App Router)
// A self‑contained page you can drop into the `app/` directory of a new `create-next-app` project.
// It relies on shadcn/ui and lucide-react, just like the original component.

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronUp, ChevronDown, Trash2 } from "lucide-react";

/**
 * Built‑in string operations. Add more by pushing to this array.
 */
const BUILT_IN_OPS = [
  {
    id: "unescape_json",
    name: "Un‑escape JSON string",
    fn: (input: string) => {
      try {
        let temp = input.trim();
        if (
          (temp.startsWith("\"") && temp.endsWith("\"")) ||
          (temp.startsWith("'") && temp.endsWith("'"))
        ) {
          temp = temp.slice(1, -1);
        }
        return temp.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
      } catch {
        return input;
      }
    },
  },
  {
    id: "beautify_json",
    name: "Beautify / Pretty‑print JSON",
    fn: (input: string) => {
      try {
        return JSON.stringify(JSON.parse(input), null, 2);
      } catch {
        return input;
      }
    },
  },
  {
    id: "decode_url",
    name: "URL‑decode entire string",
    fn: (input: string) => {
      try {
        return decodeURIComponent(input);
      } catch {
        return input;
      }
    },
  },
] as const;

type OpId = typeof BUILT_IN_OPS[number]["id"];

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [ops, setOps] = useState<OpId[]>([]);
  const [output, setOutput] = useState<string>("");

  /** Add an operation to the pipeline */
  const addOp = (id: string) => {
    if (!id) return;
    setOps((prev) => [...prev, id as OpId]);
  };

  /** Move an op up/down */
  const moveOp = (index: number, dir: 1 | -1) => {
    setOps((prev) => {
      const next = [...prev];
      const newIndex = index + dir;
      if (newIndex < 0 || newIndex >= next.length) return prev;
      [next[index], next[newIndex]] = [next[newIndex], next[index]];
      return next;
    });
  };

  /** Remove op */
  const removeOp = (index: number) => setOps((prev) => prev.filter((_, i) => i !== index));

  /** Execute pipeline */
  const runPipeline = () => {
    const final = ops.reduce((acc, id) => {
      const op = BUILT_IN_OPS.find((o) => o.id === id);
      return op ? op.fn(acc) : acc;
    }, input);
    setOutput(final);
  };

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch {}
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center p-8">
      <Card className="w-full max-w-5xl shadow-xl">
        <CardContent className="grid gap-6 p-6 grid-cols-1 md:grid-cols-2">
          {/* Input / Operations Column */}
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Input</h1>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste or type your string here…"
              className="h-60"
            />
            <div className="flex items-center gap-2">
              <select
                className="border rounded-md p-2 flex-1"
                defaultValue=""
                onChange={(e) => {
                  addOp(e.target.value);
                  e.target.value = "";
                }}
              >
                <option value="" disabled>
                  + Add operation…
                </option>
                {BUILT_IN_OPS.map((op) => (
                  <option key={op.id} value={op.id}>
                    {op.name}
                  </option>
                ))}
              </select>
              <Button onClick={runPipeline}>Run</Button>
            </div>
            {/* Selected Operations List */}
            <ul className="space-y-2">
              {ops.map((id, idx) => {
                const op = BUILT_IN_OPS.find((o) => o.id === id);
                return (
                  <li
                    key={idx}
                    className="bg-white rounded-xl shadow flex items-center justify-between px-4 py-2"
                  >
                    <span className="text-sm">{op?.name || id}</span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveOp(idx, -1)}
                        className="hover:bg-slate-100"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveOp(idx, 1)}
                        className="hover:bg-slate-100"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOp(idx)}
                        className="hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Output Column */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Output</h2>
            <Textarea
              value={output}
              readOnly
              placeholder="Run the pipeline to see results…"
              className="h-60 bg-slate-100"
            />
            <div className="flex justify-end">
              <Button onClick={copyOutput} disabled={!output.length}>
                Copy to clipboard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
