class ApiRoute {
  constructor(private host: string) {}

  getRoute(routeName: string) {
    return `${this.host}/api/${routeName}`;
  }
}

const host =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

const apiRoute: ApiRoute = new ApiRoute(host);

export default apiRoute;
