import typescript from "@rollup/plugin-typescript";

export default [
    {
        input: "src/background.ts",
        output: {
            file: "dist/background.js",
            format: "iife",
        },
        plugins: [typescript()],
    },
    {
        input: "src/popup.ts",
        output: {
            file: "dist/popup.js",
            format: "iife",
        },
        plugins: [typescript()],
    },
];