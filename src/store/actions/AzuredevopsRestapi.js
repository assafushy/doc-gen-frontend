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
  async getGitRepoList(teamProjectId = "") {
    let gitDataProvider = await this.azureRestApi.getGitDataProvider();
    return gitDataProvider.GetTeamProjectGitReposList(teamProjectId);
  }

  async getGitRepoCommits(RepoId = "",teamProjectId = "") {
    let gitDataProvider = await this.azureRestApi.getGitDataProvider();
    return gitDataProvider.GetCommitsForRepo(teamProjectId,RepoId);
  }

  async getReleaseList(teamProjectId = "") {
    let pipelineDataProvider = await this.azureRestApi.getPipelinesDataProvider();
    return pipelineDataProvider.getAllReleases(teamProjectId);
  }

  async getPipelineList(teamProjectId = "") {
    let pipelineDataProvider = await this.azureRestApi.getPipelinesDataProvider();
    return pipelineDataProvider.GetAllPipelines(teamProjectId);
  }

  async getReleaseHistory(definitionId = "",teamProjectId = ""){
    let pipelineDataProvider = await this.azureRestApi.getPipelinesDataProvider();
    return pipelineDataProvider.GetReleaseHistory(teamProjectId,definitionId);
  }

  async getPipelineRunHistory(pipelineId = "",teamProjectId = ""){
    let pipelineDataProvider = await this.azureRestApi.getPipelinesDataProvider();
    return pipelineDataProvider.GetPipelineRunHistory(teamProjectId,pipelineId);
  }
  
  async getCollectionLinkTypes() {
    try {
      let mangementDataProvider = this.azureRestApi.getMangementDataProvider();
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
