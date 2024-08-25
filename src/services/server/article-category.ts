const getAllPublic = async (): Promise<Record<string, number | string>[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, slug: "first-article", title: "First Article" },
        { id: 2, slug: "second-article", title: "Second Article" },
      ]);
    }, 1000);
  });
};

export { getAllPublic };
