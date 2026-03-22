/**
 * Prefix absolute in-app navigations under /leaders/app for merged SPA.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../src/leaders');

const SKIP_DIRS = new Set(['node_modules']);

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (!SKIP_DIRS.has(name)) walk(p, out);
    } else if (name.endsWith('.tsx') || name.endsWith('.ts')) {
      out.push(p);
    }
  }
  return out;
}

const files = walk(root);
let changed = 0;

for (const file of files) {
  let s = fs.readFileSync(file, 'utf8');
  const orig = s;

  // navigate('/foo -> navigate(`${LEADERS_APP}/foo` — only when / is root of leaders app (not http)
  s = s.replace(/navigate\(([`'"])\//g, (m, q) => {
    if (q === '`') return `navigate(\`${LEADERS_APP}/`;
    return `navigate(${q}${LEADERS_APP}/`;
  });

  // navigate(`/path
  s = s.replace(/navigate\(`\//g, 'navigate(`${LEADERS_APP}/');

  // <Navigate to="/  (not //)
  s = s.replace(/<Navigate to=(["'])\//g, (m, q) => `<Navigate to=${q}${q === '"' ? '${LEADERS_APP}/' : "${LEADERS_APP}/"}`);
  // botched - skip Navigate automated - do manually

  if (s !== orig) {
    fs.writeFileSync(file, s);
    changed++;
  }
}

console.log('Patched files:', changed);
