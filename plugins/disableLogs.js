export function disableLogs() {
  console.log = () => {};
}

// if (process.env.NODE_ENV === 'production') disableLogs();
