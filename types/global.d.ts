import ProcessEnv from 'process'
import { BaseEnv, NodeEnv } from './envType'
declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv extends BaseEnv, NodeEnv {}
    }
  }
}
declare function openBrowser (url: string): void