export type TRoute = {
  key: string;
  name: string;
  path: string;
  exact: boolean;
  component: JSX.Element | any;
  isPrivate?: boolean;
};

export type TRoutes = TRoute[];
