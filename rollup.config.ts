import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';
import ts from 'rollup-plugin-ts';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';

export default {
  input: 'src/js/index.ts',
  plugins: [
    ts(),
    terser(),
    scss({
      // @ts-expect-error the type are not up-to-date
      processor: () => postcss([autoprefixer()]),
      fileName: pkg.style.split('/')[1],
      outputStyle: 'compressed'
    })
  ],
  output: [
    {
      name: 'bootstrap-compatibility-layer',
      file: pkg.browser,
      format: 'umd',
      exports: 'named'
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named'
    }
  ]
};
