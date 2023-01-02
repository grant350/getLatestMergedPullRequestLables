
const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
try {
  const payload = github.context.payload;
  console.log('payload object: ',payload);
  const owner = payload.repository.owner.name;
  const repo = payload.repository.name;
  const token = core.getInput('token', { required: true });
  const octokit = new github.getOctokit(token);

  octokit.rest.pulls.list({
    owner,
    repo,
  });
  // await octokit.request('GET /repos/{owner}/{repo}/issues{?milestone,state,assignee,creator,mentioned,labels,sort,direction,since,per_page,page}', {
  //   owner: 'OWNER',
  //   repo: 'REPO'
  // });

  console.log(`Repo issue events: ${JSON.stringify(pubEvents)}`);
} catch (error) {
  core.setFailed(error.message);
}

}
main(); // run fn
// https://api.github.com/repos/grant350/kuberform/issues/events [events]
// object.issue.labels


// https://api.github.com/repos/grant350/kuberform/pulls/2
// object.labels //[]
// -->   {
//   "id": 4921402286,
//   "node_id": "LA_kwDOIc0cy88AAAABJVajrg",
//   "url": "https://api.github.com/repos/grant350/kuberform/labels/patch",
//   "name": "patch",
//   "color": "E55659",
//   "default": false,
//   "description": "versionControl patch"
// }