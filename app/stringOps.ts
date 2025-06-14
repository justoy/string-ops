// String operations utility for String Ops App

export type StringOp = {
  id: string;
  name: string;
  fn: (input: string) => string;
};

export const BUILT_IN_OPS: readonly StringOp[] = [
  // Un-escape string
  {
    id: "unescape_string",
    name: "Un‑escape string",
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
  // Beautify JSON
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
  // URL-decode
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
  // URL-encode
  {
    id: "encode_url",
    name: "URL‑encode entire string",
    fn: (input: string) => {
      try {
        return encodeURIComponent(input);
      } catch {
        return input;
      }
    },
  },
  // Base64 encode
  {
    id: "base64_encode",
    name: "Base64 Encode",
    fn: (input: string) => {
      try {
        return btoa(input);
      } catch {
        return input;
      }
    },
  },
  // Base64 decode
  {
    id: "base64_decode",
    name: "Base64 Decode",
    fn: (input: string) => {
      try {
        return atob(input);
      } catch {
        return input;
      }
    },
  },
  // HTML encode
  {
    id: "html_encode",
    name: "HTML Encode (entities)",
    fn: (input: string) => {
      try {
        return input.replace(/[&<>"']/g, (c) => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        }[c] || c));
      } catch {
        return input;
      }
    },
  },
  // HTML decode
  {
    id: "html_decode",
    name: "HTML Decode (entities)",
    fn: (input: string) => {
      try {
        return input
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&amp;/g, '&');
      } catch {
        return input;
      }
    },
  },
  // To UPPERCASE
  {
    id: "to_uppercase",
    name: "Convert to UPPERCASE",
    fn: (input: string) => input.toUpperCase(),
  },
  // To lowercase
  {
    id: "to_lowercase",
    name: "Convert to lowercase",
    fn: (input: string) => input.toLowerCase(),
  },
  // To Title Case
  {
    id: "to_title_case",
    name: "Convert to Title Case",
    fn: (input: string) => input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
  },
  // To camelCase
  {
    id: "to_camel_case",
    name: "Convert to camelCase",
    fn: (input: string) => {
      return input
        .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
        .replace(/^(.)/, (m) => m.toLowerCase());
    },
  },
  // To snake_case
  {
    id: "to_snake_case",
    name: "Convert to snake_case",
    fn: (input: string) => {
      return input
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/[-\s]+/g, '_')
        .toLowerCase();
    },
  },
  // Normalize whitespace
  {
    id: "normalize_whitespace",
    name: "Normalize whitespace",
    fn: (input: string) => input.replace(/\s+/g, ' ').trim(),
  },
  // Remove line breaks
  {
    id: "remove_line_breaks",
    name: "Remove line breaks",
    fn: (input: string) => input.replace(/[\r\n]+/g, ' '),
  },
  // Character count
  {
    id: "char_count",
    name: "Count characters",
    fn: (input: string) => `${input.length} characters`,
  },
  // Word count
  {
    id: "word_count",
    name: "Count words",
    fn: (input: string) => `${(input.trim().match(/\S+/g) || []).length} words`,
  },
  // Line count
  {
    id: "line_count",
    name: "Count lines",
    fn: (input: string) => `${input.split(/\r?\n/).length} lines`,
  },
];

export type OpId = typeof BUILT_IN_OPS[number]["id"]; 