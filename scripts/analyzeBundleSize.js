import { build } from "vite";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import { gzipSync } from "zlib";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const componentsDir = path.resolve(rootDir, "src/components");

async function getComponentDirectories() {
  const entries = await fs.promises.readdir(componentsDir, {
    withFileTypes: true,
  });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

async function analyzeComponent(componentName) {
  const entry = path.resolve(componentsDir, componentName, "index.ts");
  if (!fs.existsSync(entry)) {
    console.warn(`Skipping ${componentName}: index.ts not found`);
    return null;
  }

  const outDir = path.resolve(rootDir, "dist/analysis", componentName);

  try {
    await build({
      configFile: false,
      root: rootDir,
      logLevel: "silent",
      build: {
        outDir,
        emptyOutDir: true,
        lib: {
          entry,
          name: componentName,
          formats: ["es"],
          fileName: () => "index.js",
        },
        rollupOptions: {
          external: [
            "react",
            "react-dom",
            "react/jsx-runtime",
            "tailwindcss",
            "clsx",
            "tailwind-merge",
            "class-variance-authority",
          ],
        },
        minify: true,
      },
    });

    const outFile = path.resolve(outDir, "index.js");
    if (fs.existsSync(outFile)) {
      const content = fs.readFileSync(outFile);
      const size = content.length;
      const gzipped = gzipSync(content).length;
      return { name: componentName, size, gzipped };
    }
  } catch (e) {
    console.error(`Error building ${componentName}:`, e);
  }
  return null;
}

async function main() {
  console.log("Analyzing component sizes...");
  const components = await getComponentDirectories();
  const results = [];

  for (const comp of components) {
    process.stdout.write(`Building ${comp}... `);
    const result = await analyzeComponent(comp);
    if (result) {
      console.log(
        `Done. ${(result.size / 1024).toFixed(2)} KB / ${(result.gzipped / 1024).toFixed(2)} KB (gzip)`,
      );
      results.push(result);
    } else {
      console.log("Failed or skipped.");
    }
  }

  console.log("\n--- Final Report (Minified / Gzipped) ---");
  console.table(
    results.map((r) => ({
      Component: r.name,
      "Size (KB)": (r.size / 1024).toFixed(2),
      "Gzipped (KB)": (r.gzipped / 1024).toFixed(2),
    })),
  );

  const mdContent = `| Component | Minified Size (KB) | Gzipped Size (KB) |
| :--- | :--- | :--- |
${results.map((r) => `| ${r.name} | ${(r.size / 1024).toFixed(2)} | ${(r.gzipped / 1024).toFixed(2)} |`).join("\n")}
`;
  fs.writeFileSync(
    path.resolve(rootDir, "component_bundle_sizes.md"),
    mdContent,
  );
  console.log("Saved report to component_bundle_sizes.md");
}

main();
