import AzureRestApi from "@doc-gen/dg-data-provider-azuredevops";

export default class AzuredevopsRestapi {
  azureRestApi;
  constructor(orgUrl, token) {
    this.azureRestApi = new AzureRestApi(orgUrl, token);
  }
  async getTeamProjects() {
    let managmentDataProvider =
      await this.azureRestApi.getMangementDataProvider();
    return managmentDataProvider.GetProjects();
  }
  async getSharedQueries(teamProjectId = null) {
    let ticketDataProvider = await this.azureRestApi.getTicketsDataProvider();
    return ticketDataProvider.GetSharedQueries(teamProjectId, "");
  }
  async getQueryResults(queryId = null, teamProjectId = "") {
    let ticketDataProvider = await this.azureRestApi.getTicketsDataProvider();
    return ticketDataProvider.GetQueryResultById(queryId, teamProjectId);
  }

  async getTestPlansList(teamProjectId = "") {
    let testDataProvider = await this.azureRestApi.getTestDataProvider();
    return testDataProvider.GetTestPlans(teamProjectId);
  }

  async getCollectionLinkTypes() {
    try {
      let linkTypes = await this.azureRestApi.GetCllectionLinkTypes();
      return await linkTypes.value
        .map((link) => {
          return {
            key: link.attributes.oppositeEndReferenceName,
            text: link.name,
            selected: false,
          };
        })
        .filter((link) => {
          return (
            link.text !== "Shared Steps" &&
            link.text !== "Duplicate" &&
            link.text !== "Hyperlink" &&
            link.text !== "Artifact Link" &&
            link.text !== "Attached File" &&
            link.text !== "Duplicate Of" &&
            link.text !== "Test Case"
          );
        });
    } catch (e) {
      console.warn(
        `no linkTypes found - this could mean azure devops connection problems`
      );
      return [];
    }
  }
}
