import { observable, action, makeObservable, computed } from "mobx";
import { enableLogging } from "mobx-logger";
import RestApi from "./actions/AzuredevopsRestapi";
import cookies from "js-cookies";
import {
  getBucketFileList,
  getJSONContentFromFile,
  sendDocumentTogenerator,
} from "../store/data/docManagerApi";

const azureDevopsUrl = cookies.getItem("azuredevopsUrl");
const azuredevopsPat = cookies.getItem("azuredevopsPat");
class DocGenDataStore {
  azureRestClient = new RestApi(azureDevopsUrl, azuredevopsPat);

  constructor() {
    makeObservable(this, {
      documentTitle: observable,
      documentTemplates: observable,
      teamProject: observable,
      selectedTemplate: observable,
      contentControls: observable,
      sharedQueries: observable,
      teamProjectsList: observable,
      templateList: observable,
      testPlansList: observable,
      linkTypes: observable,
      documents: observable,
      requestJson: computed,
      fetchTeamProjects: action,
      setTeamProject: action,
      fetchTemplatesList: action,
      setSelectedTemplate: action,
      fetchSharedQueries: action,
      setSharedQueries: action,
      fetchTestPlans: action,
      setTestPlansList: action,
    });
    this.fetchDocTemplates();
    this.fetchTeamProjects();
    this.fetchTemplatesList();
    this.fetchCollectionLinkTypes();
  }

  documentTitle = "";
  documentTemplates = [];
  teamProjectsList = [];
  teamProject = "";
  teamProjectName = "";
  templateList = [];
  contentControls = [];
  selectedTemplate = { key: "", name: "" };
  sharedQueries = []; // list of queries
  linkTypes = []; // list of link types
  linkTypesFilter = []; // list of selected links to filter by
  testPlansList = []; // list of testplans
  documents = []; //list of all project documents

  //for setting focused teamProject
  setDocumentTitle(documentTitle) {
    this.documentTitle = documentTitle;
  }
  //for fetching docTemplates
  fetchDocTemplates() {
    getBucketFileList("document-forms").then(async (data = []) => {
      await Promise.all(
        data.map(async (form) => {
          let jsonFormTemplate = await getJSONContentFromFile(
            "document-forms",
            form.name
          );
          console.log(jsonFormTemplate);
          let json = JSON.parse(JSON.stringify(jsonFormTemplate));
          this.documentTemplates.push(json);
          console.log(this.documentTemplates);
        })
      );
    });
  }

  //for fetching teamProjects
  fetchTeamProjects() {
    this.azureRestClient.getTeamProjects().then((data) => {
      console.log(data);
      this.teamProjectsList =
        data.value.sort((a, b) => (a.name > b.name ? 1 : -1)) || [];
    });
  }
  //for setting focused teamProject
  setTeamProject(teamProjectId, teamProjectName) {
    this.teamProject = teamProjectId;
    this.teamProjectName = teamProjectName;
    this.fetchDocuments();
    this.fetchSharedQueries();
    this.fetchTestPlans();
  }
  //for fetching templatefiles list
  fetchTemplatesList() {
    getBucketFileList("templates").then((data) => {
      this.templateList = data || [];
    });
  }
  //for fetching all the collections links
  fetchCollectionLinkTypes() {
    this.azureRestClient.getCollectionLinkTypes().then((data) => {
      this.linkTypes = data || [];
    });
  }
  //for setting the selected link type filters
  updateSelectedLinksFilter = (selectedLinkType) => {
    console.log(JSON.stringify(selectedLinkType));
    let linkIndex = this.linkTypesFilter.findIndex(
      (linkFilter) => linkFilter.key === selectedLinkType.key
    );
    if (linkIndex >= 0) {
      this.linkTypesFilter[linkIndex] = selectedLinkType;
    } else {
      this.linkTypesFilter.push(selectedLinkType);
    }
    console.log(this.linkTypesFilter);
  };
  //for setting selected template
  setSelectedTemplate(templateObject) {
    this.selectedTemplate = templateObject;
  }
  //for fetching shared quries
  fetchSharedQueries() {
    this.azureRestClient.getSharedQueries(this.teamProject).then((data) => {
      this.setSharedQueries(data);
    });
  }
  //for setting shared queries
  setSharedQueries(data) {
    this.sharedQueries = data;
  }
  //for fetching test plans
  fetchTestPlans() {
    this.azureRestClient.getTestPlansList(this.teamProject).then((data) => {
      this.setTestPlansList(data);
    });
  }
  //for fetching documents
  fetchDocuments() { 
    getBucketFileList(this.teamProjectName.toLowerCase()).then((data) => {
      this.documents = data;
    });
  }
  //setting the testplans array
  setTestPlansList(data) {
    this.testPlansList = data.value || [];
  }
  //add a content control object to the doc object
  addContentControlToDocument = (contentControlObject, arrayIndex = null) => {
    //adding link types filterss to contetn control
    //TODO: not the best implementation - in case there are multiple link selector might cause issues
    if (this.linkTypesFilter.length > 0) {
      let linkTypeFilterArray = this.linkTypesFilter
        .map((filter) => {
          return filter.selected ? filter.key : null;
        })
        .filter((link) => link !== null);
      contentControlObject.data.linkTypeFilterArray = linkTypeFilterArray;
    }
    //zeroing down the filter object
    this.linkTypesFilter = [];

    if (arrayIndex) {
      this.contentControls[arrayIndex] = contentControlObject;
    } else {
      this.contentControls.push(contentControlObject);
    }
  };
  sendRequestToDocGen() {
    let docReq = this.requestJson;
    console.log(docReq);
    sendDocumentTogenerator(docReq);
  }
  get requestJson() {
    return {
      documentTitle: this.documentTitle,
      teamProjectName: this.teamProject,
      templateFile: this.selectedTemplate.key,
      contentControls: this.contentControls,
    };
  }
  getTeamProjectsList() {
    return this.teamProjectsList;
  }
}

let config = {
  action: true,
  reaction: false,
  transaction: false,
  compute: true,
};
enableLogging(config);
var store = new DocGenDataStore();

export default store;

// 53f0f596-fe4c-48b2-b661-b696f7fb5a42
// c8fa0686-bbde-412b-806b-c59677664da2
