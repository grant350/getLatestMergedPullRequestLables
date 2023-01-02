
const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
try {
  const payload = github.context.payload;
  const owner = core.getInput('owner', { required: true });
  const repo = core.getInput('repo', { required: true });
  const pr_number = core.getInput('pr_number', { required: true });
  const token = core.getInput('token', { required: true });
  const octokit = new github.getOctokit(token);

  const pubEvents = await octokit.rest.activity.listPublicEventsForUser({
    username: payload.pusher.name,
  })[0];

  console.log(`The event payload: ${JSON.stringify(pubEvents)}`);
} catch (error) {
  core.setFailed(error.message);
}

}
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