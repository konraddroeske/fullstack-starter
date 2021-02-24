class ApiRoute {
  constructor(private host: string) {}

  getRoute(routeName: string) {
    return `${this.host}/api/${routeName}`;
  }
}

const apiRoute: ApiRoute = new ApiRoute('http://localhost:3000');

export default apiRoute;
