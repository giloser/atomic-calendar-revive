import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json'

const dev = process.env.ROLLUP_WATCH;

const serveopts = {
    contentBase: ['./dist'],
    host: '0.0.0.0',
    port: 5000,
    allowCrossOrigin: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
};

const plugins = [
    resolve(),
    commonjs(),
    typescript(),
    json(),
    babel({
        exclude: 'node_modules/**',
    }),
    dev && serve(serveopts),
    !dev && terser(),
];


export default {
    input: ['src/index.ts'],
    output: {
        dir: 'dist',
        format: 'es',
    },
    watch: {
        clearScreen: false
    },
    plugins: [...plugins],
};
