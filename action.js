
const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
try {
  const payload = github.context.payload;
  console.log('payload ',payload);
  const owner = payload.repository.owner.name;
  const repo = payload.repository.name;
  const token = core.getInput('token', { required: true });
  const octokit = new github.getOctokit(token);
  const SHA = github.context.sha;


  var pullRequests = await octokit.rest.pulls.list({
    owner,
    repo,
    per_page: 10
  });
  pullRequests = pullRequests.data
  console.log('PULLS', pullRequests);
  console.log('SHA',SHA);
  const PR = pullRequests.find(p => p.merge_commit_sha === SHA);
  console.log('PR: ',PR)

// return lables array
} catch (error) {
  core.setFailed(error.message);
}

}
main(); // run fn
