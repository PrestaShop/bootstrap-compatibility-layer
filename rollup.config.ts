import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';

export default {
  input: 'src/js/index.ts',
  plugins: [
    terser(),
    scss({
      // @ts-expect-error
      processor: () => postcss([autoprefixer()]),
      fileName: 'bootstrap-compatibility-layer.min.css',
      outputStyle: 'compressed'
    })
  ],
  output: [
    {
      name: 'listree',
      file: pkg.browser,
      format: 'umd'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ]
};
