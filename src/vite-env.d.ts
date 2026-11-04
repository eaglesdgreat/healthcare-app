/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
}

declare module '*.svg?react' {
  import React from 'react'
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}
