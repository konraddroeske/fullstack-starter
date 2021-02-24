class ApiRoute {
  host: string;

  constructor(host: string) {
    this.host = host;
  }

  getRoute(routeName: string) {
    return `${this.host}/api/${routeName}`;
  }
}

const apiRoute: ApiRoute = new ApiRoute('http://localhost:3000');

export default apiRoute;
