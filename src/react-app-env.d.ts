/// <reference types="react-scripts" />
declare module 'react';
declare module 'react/jsx-runtime';
declare module 'three-map-controls';
declare namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }