
const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
try {
  const payload = github.context.payload;
  // console.log('payload object: ',payload);
  // console.log('github context object: ',github);
  const owner = payload.repository.owner.name;
  const repo = payload.repository.name;
  const token = core.getInput('token', { required: true });
  const octokit = new github.getOctokit(token);
  const SHA = github.context.sha;

  console.log("pulls rest object: ", octokit.rest.pulls)

  const pulls = await octokit.rest.pulls.list({
    owner,
    repo,
    per_page: 10
  });

  console.log('pulls: ',pulls);

  const ISSUES = await octokit.request(`GET /repos/${owner}/${repo}/issues`, {
    owner,
    repo
  });
  console.log('issues: ',ISSUES)
  const PR = pulls.data.find(p => p.merge_commit_sha === sha);
  console.log('PR: ',PR)


} catch (error) {
  core.setFailed(error.message);
}

}
main(); // run fn
