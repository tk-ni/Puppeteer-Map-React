/// <reference types="react-scripts" />
declare module 'react';
declare module 'react/jsx-runtime';
declare module './P_S_Interface.tsx';
declare namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }