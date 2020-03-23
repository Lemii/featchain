const pathsMap = {
  home: () => '/',
  authority: () => '/authority',
  verify: () => '/verify',
  createAccount: () => '/createAccount',
  signIn: () => '/signIn',
  account: () => '/account',
  // editArticle: (articleId: string) => `/articles/${articleId}/edit`,
};
type PathsMap = typeof pathsMap;

export const getPath = <TRoute extends keyof PathsMap>(
  route: TRoute,
  ...params: Parameters<PathsMap[TRoute]>
) => {
  const pathCb: (...args: any[]) => string = pathsMap[route];

  return pathCb(...params);
};
