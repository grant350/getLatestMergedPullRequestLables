
const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
try {
  const payload = github.context.payload;
  console.log(payload);
  console.log('repo: ',payload.repository);

  // const event = core.getInput('event');
  // const owner = event.repository.owner.name
  // const repo = event.repository.name
  // const token = core.getInput('token', { required: true });
  // const octokit = new github.getOctokit(token);

  // const pubEvents = await  octokit.rest.issues.listEvents({
  //   owner,
  //   repo
  // });
  // console.log(`Repo issue events: ${JSON.stringify(pubEvents)}`);
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