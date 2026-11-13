import ts from 'typescript';
import { readFile } from 'node:fs/promises';
/** Use the existing TypeScript compiler; no extra runtime or translation dependency. */
export async function loadCopy() {
  const source = await readFile(new URL('../lib/copy.ts', import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}
