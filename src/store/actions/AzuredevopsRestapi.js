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
    let ticketsDataProvider = await this.azureRestApi.getTicketsDataProvider()
    return ticketsDataProvider.GetSharedQueries(teamProjectId, ""); 
  }
  async getQueryResults(queryId = null, teamProjectId = "") {
    let ticketsDataProvider = await this.azureRestApi.getTicketsDataProvider()
    return ticketsDataProvider.GetQueryResultById(queryId, teamProjectId);    
  }

  async getTestPlansList(teamProjectId = "") {
    let testDataProvider = this.azureRestApi.getTestDataProvider()
    return testDataProvider.GetTestPlans(teamProjectId);
  }

  async getCollectionLinkTypes() {
    try {
      let mangementDataProvider = this.azureRestApi.getMangementDataProvider()
      let linkTypes = await mangementDataProvider.GetCllectionLinkTypes();
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
