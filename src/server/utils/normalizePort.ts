export default (val: any) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};
