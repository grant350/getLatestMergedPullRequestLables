
const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
try {
  const payload = github.context.payload;
  const event = core.getInput('event');
  const owner = event.repository.owner.name
  const repo = event.repository.name
  const token = core.getInput('token', { required: true });
  const octokit = new github.getOctokit(token);
  const pubEvents = await  octokit.rest.issues.listEvents({
    owner,
    repo
  });
} catch (error) {
  core.setFailed(error.message);
}

}
main(); 
