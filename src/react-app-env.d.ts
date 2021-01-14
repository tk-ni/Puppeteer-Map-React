/// <reference types="react-scripts" />
declare module 'react';
declare module 'react/jsx-runtime';

declare namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }