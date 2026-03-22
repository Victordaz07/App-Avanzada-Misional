import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const leadersRoot = path.join(__dirname, '../src/leaders');

const LEADERS_APP = '/leaders/app';
const LEADERS_ROOT = '/leaders';

function relImportToLeadersPaths(fromFile) {
  const dir = path.dirname(fromFile);
  const rel = path.relative(dir, path.join(leadersRoot, 'leadersPaths.ts')).replace(/\\/g, '/');
  if (!rel.startsWith('.')) return './' + rel;
  return rel;
}

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) {
      if (name !== 'node_modules') walk(p, out);
    } else if (p.endsWith('.tsx')) {
      out.push(p);
    }
  }
  return out;
}

const files = walk(leadersRoot).filter(
  (f) =>
    f.includes(`${path.sep}features${path.sep}`) ||
    f.includes(`${path.sep}router${path.sep}`) ||
    f.includes(`${path.sep}layouts${path.sep}`)
);

let n = 0;
for (const file of files) {
  let s = fs.readFileSync(file, 'utf8');
  if (!s.includes('navigate(') && !s.includes('<Navigate')) continue;

  const orig = s;

  s = s.replace(/navigate\(\s*['"]\/['"]/g, `navigate('${LEADERS_APP}'`);
  s = s.replace(/navigate\(`\//g, `navigate(\`${LEADERS_APP}/`);

  if (s !== orig && !s.includes("from '../leadersPaths'") && !s.includes('from "../../leadersPaths"') && !s.includes("from './leadersPaths'")) {
    const imp = relImportToLeadersPaths(file);
    const importLine = `import { LEADERS_APP } from '${imp.replace(/\.ts$/, '')}';\n`;
    const idx = s.search(/^import /m);
    if (idx >= 0) {
      s = s.slice(0, idx) + importLine + s.slice(idx);
    }
  }

  if (s !== orig) {
    fs.writeFileSync(file, s);
    n++;
  }
}

console.log('Updated', n, 'files');
