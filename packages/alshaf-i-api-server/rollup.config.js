import {nodeResolve} from '@rollup/plugin-node-resolve';
import summary from 'rollup-plugin-summary';
import {copy} from '@web/rollup-plugin-copy';
import commonjs from "@rollup/plugin-commonjs";


function onwarn(warning) {
  if (warning.code !== 'THIS_IS_UNDEFINED') {
    console.error(`(!) ${warning.message}`);
  }
}

export default {
  input: 'dist/index.js',
  onwarn,
  plugins: [
    commonjs(),
    nodeResolve(),
    summary(),
    copy({
      patterns: ['package.json', '.env'],
    }),
  ],
  output: [
    {
      file: 'build/index.js',
      format: 'cjs',
    }
  ],
};
