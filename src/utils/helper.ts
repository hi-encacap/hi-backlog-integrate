const joinURLs = (...urls: string[]): string => {
  return urls.join("/").replace(/\/+/g, "/");
};

export { joinURLs };
