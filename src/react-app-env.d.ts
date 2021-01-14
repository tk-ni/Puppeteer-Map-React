/// <reference types="react-scripts" />
declare module 'react';
declare module 'react/jsx-runtime';
declare module './interface.tsx';
declare namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }