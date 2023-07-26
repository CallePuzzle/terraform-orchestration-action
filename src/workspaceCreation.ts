import axios, { AxiosResponse } from 'axios'; 

// Interface definition. This is needed for a well-formed request body.
interface Attributes {
  name: string;
  'resource-count': number;
  'execution-mode': string;
}
interface DataInterface {
  attributes: Attributes;
  type: string;
}
interface BodyInterface {
  data?: DataInterface; // The value may be nullable
}

// Generic function for interacting with the TFE API
async function terraformApiCall(method: string, projectName: string, organizationName: string, authToken: string): Promise<boolean> {
  // Set
  const baseUrl: string = `https://app.terraform.io/api/v2/organizations/${organizationName}/workspaces`
  var body: BodyInterface;
  var apiUrl: string;
  var goodStatus: number;

  switch(method) {
    case 'get': {
      // body = '';
      goodStatus = 200;
      apiUrl = baseUrl + `/${projectName}`;
      break;
    }
    case 'post': {
      apiUrl = baseUrl;
      goodStatus = 201;
      body = {
        data: {
          attributes: { 
            name: projectName,
            'resource-count': 0,
            'execution-mode': 'local'
          },
          type: 'workspaces'
        }
      };
      break;
    }
  }

  // Exec
  try {
    const response: AxiosResponse = await axios.request({
      url: apiUrl,
      method: method,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/vnd.api+json',
      },
      data: body,
    });

    if (response.status === goodStatus) {
      return true;
    } else if (response.status === 404) {
      return false;
    }
  } catch (error) {
    console.error('There was an error when calling the API', error.response.data);
    return false;
  }
}

// Logic execution
export const workspaceOperation = (projectName: string, organizationName: string, authToken: string): void => {
  terraformApiCall('get', projectName, organizationName, authToken).then((result) => {
    if (result) {
      console.log('The workspace exists. Nothing to do...');
    } else {
      console.log('The workspace does not exist. Creating...');
      terraformApiCall('post', projectName, organizationName, authToken).then((result) => {
        if (result) {
          console.log('Workspace created.');
        } else {
          console.log('Something went wrong.');
        }
      })
    }
  })
}
