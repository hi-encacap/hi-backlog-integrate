// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface BasePageParams<TKeys extends string = unknown> extends Record<string, string> {
  locale: string;
  [key in TKeys]: string;
}

interface BasePageProps<TKeys extends string = unknown> {
  params: BasePageParams<TKeys>;
}
