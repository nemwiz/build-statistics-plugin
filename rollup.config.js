import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default [
    {
        input: `packages/rollup-plugin/src/index.ts`,
        output: [
            {
                file: `packages/rollup-plugin/dist/index.js`,
                format: 'cjs',
                exports: 'auto',
            }
        ],
        external: ['fs'],
        plugins: [nodeResolve(), typescript()],
    },
    {
        input: `packages/webpack-plugin/src/index.ts`,
        output: {
            file: `packages/webpack-plugin/dist/index.js`,
            format: 'cjs',
            exports: 'auto',
        },
        external: ['webpack', 'fs'],
        plugins: [nodeResolve(), typescript()],
    },
];
