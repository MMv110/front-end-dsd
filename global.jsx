const global = () => {
  if (typeof globalThis === 'undefined') {
      globalThis = window;
    }
}

export default global