class UrlBuilderHelper {
  ecomApi() {
    return `http://localhost:8081/api`; // local connection
    // return `http://localhost:8080/api`; // docker connection
    // return `http://43.204.236.19:8080/api`; // live connection
  }
}
export const UrlBuilder = new UrlBuilderHelper();
